import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  private loading: any;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authServices: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  segmentChanged(event: any){
    if (event.detail.value === "login"){
      this.navCtrl.navigateForward('/login')
    } else{
      this.navCtrl.navigateForward('/cadastro')
    }
  }

  async login(){
    await this.presentLoading();
    
    try{
      await this.authServices.login(this.userLogin);
    } catch(error){
      this.presentToast(error.message);
      } finally{
      this.loading.dismiss();
    }
    
    this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({message: 'Por favor, aguarde...'});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({message});
    toast.present();
  }
}
