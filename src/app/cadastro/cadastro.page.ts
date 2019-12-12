import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public userRegister: User = {};
  private loading: any;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authServices: AuthService, private navCtrl: NavController) { 
  }

  ngOnInit() {
  }

  segmentChanged(event: any){
    if (event.detail.value === "cadastro"){
      this.navCtrl.navigateForward('/cadastro')
    } else{
      this.navCtrl.navigateForward('/login')
    }
  }

  async register(){
    await this.presentLoading();
    
    try{
      await this.authServices.register(this.userRegister);
      this.presentToast('Administrador cadastrado com sucesso!');
      console.log(this.userRegister)
    } catch(error){
        this.presentToast(error.message);
        
        if(this.userRegister.password !== this.userRegister.passwordConfirm){
          this.presentToast("Senhas incompatíveis!");
          }
      } finally{
      this.loading.dismiss();
    }
    
    
    this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({message: 'Por favor, aguarde...', duration: 1000});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({message, duration: 1000});
    toast.present();
  }
}