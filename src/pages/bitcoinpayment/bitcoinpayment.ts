import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

declare var QRCode: any;


@IonicPage()
@Component({
  selector: 'page-bitcoinpayment',
  templateUrl: 'bitcoinpayment.html',
})
interface btc {
  address: string;
  index: number;
  callback: string;
}

export class BitcoinpaymentPage {


  public InvestmentDetails: any;
  public btcpayment: string = '';
  public paymentstate = false;
  public paymenterror = false;
  public paymenticon = false;
  public paymentaddress: string;
  public paymentreceived: any;
  public amt : any;

  constructor(private http: HttpClient,public  alertCtrl: AlertController,
    public loadingCtrl: LoadingController, 

    public navCtrl: NavController, public navParams: NavParams,public data_service : DataProvider) {
    
this.amt = this.data_service.investment_amount;

  }

  ionViewDidLoad() {

    this.paymentaddress = "";
    var url = "https://api.blockchain.info/v2/receive?xpub=xpub6CEpb79zVLj9qdVcwKmsrKPmiafn3KChzaSqxumSLaiwekzGhaMKt8bLraMSdkupKaUCR9zvJMkipMXAx3dnR86LPYmoKu6k3zFGEznzAkq&&callback=http%3A%2F%2F18.219.116.22%3A3000%2Fcallback&key=d06ca415-9e77-4705-855f-7881c25f1a38"

    
    var bitcoinadd = this.http.get<btc>(url);
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    
    bitcoinadd.subscribe(
      (v) => {
        console.log(v);
        this.paymentaddress = v.address;
        loader.dismiss();
        this.convertusdtobitcoin(this.data_service.investment_amount);

      }
    );


  }


  convertusdtobitcoin(btc) {

    var result = this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${btc}`);
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    
    result.subscribe((v) => {

      loader.dismiss();
      console.log(v)

      this.btcpayment = v.toString();
      var qrstr = `bitcoin:${this.paymentaddress}?amount=${this.btcpayment}`;
      new QRCode(document.getElementById("qrcode"), qrstr);
           
      var MonitorTransaction = new WebSocket('wss://ws.blockchain.info/inv');

      MonitorTransaction.onopen = () => {
        console.log("websocket connection open");
        MonitorTransaction.send(JSON.stringify({
          "op": "addr_sub", "addr": this.paymentaddress


        }));
      };

      MonitorTransaction.onmessage = (onmsg) => {
        MonitorTransaction.close();
        var response = JSON.parse(onmsg.data);
        console.log(response);
        var transactionOutput = response.x.out;
        var transactionOutputLength = transactionOutput.length;

        for (var i = 0; i < transactionOutputLength; i++) {
          if (response.x.out[i].addr === this.paymentaddress) {


            this.paymenticon= true;
            console.log('address match!');
            var amount = response.x.out[i].value;
            this.paymentreceived = amount / 100000000;
            //
            if (this.paymentreceived === this.btcpayment) {
              this.paymentstate = true;

              this.data_service.create_investment_btc("SCO1", this.data_service.investment_amount, amount / 100000000);

              let alert = this.alertCtrl.create({
                title: 'success!',
                subTitle: 'Payment successful',
                buttons: ['OK']
              });
              alert.present();

            } else {
              this.paymenterror = true;
              let alert = this.alertCtrl.create({
                title: 'error!',
                subTitle: 'Payment error fund received lesser than actual btc',
                buttons: ['OK']
              });
              alert.present();
            //payment error 
            }
            break;
          }
        }
      }





      ////


      /////

      console.log(typeof (v));
    });

  }





}
