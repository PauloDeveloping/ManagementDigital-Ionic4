import { Component, OnInit } from '@angular/core';
import { CadastroFuncionario } from '../interfaces/cadastro-funcionario';
import { Subscription } from 'rxjs';
import { CadastroFuncionarioService } from '../services/cadastro-funcionario.service';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage implements OnInit {
  private cadastros = new Array<CadastroFuncionario>();
  private cadastroSubscription: Subscription;
  private loading: any;

  constructor(private cadastroService: CadastroFuncionarioService, private authService: AuthService, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.cadastroSubscription = this.cadastroService.getCadastros().subscribe(data => {
      this.cadastros = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.cadastroSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    } catch(error){
      console.log(error);
    }
  }

  async delete(id: string){
    try{
      await this.cadastroService.deleteCadastro(id);
      this.presentToast('Funcionário deletado com sucesso!');
    } catch(error){
      this.presentToast('Erro ao tentar deletar!');
    }
  }

  async presenteLoading(){
    this.loading = await this.loadingCtrl.create({message: 'Aguarde...'});
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({message, duration: 1000})
    toast.present();
  }
}
