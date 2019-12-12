import { Component, OnInit } from '@angular/core';
import { CadastroFuncionario } from '../interfaces/cadastro-funcionario';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CadastroFuncionarioService } from '../services/cadastro-funcionario.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.page.html',
  styleUrls: ['./cadastro-funcionario.page.scss'],
})
export class CadastroFuncionarioPage implements OnInit {
  public cadastro: CadastroFuncionario = {};
  private loading: any;
  private cadastroId: string = null;
  private cadastroSubscription: Subscription;
  public fGroup: FormGroup;

  constructor(private cadastroService: CadastroFuncionarioService, private loadingCtrl: LoadingController, private authService: AuthService, private toastCtrl: ToastController, private navCtrl: NavController, private activatedRoute: ActivatedRoute, private fBuilder: FormBuilder) {  
    this.cadastroId = this.activatedRoute.snapshot.params['id'];
    this.fGroup = this.fBuilder.group({
      'nome': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'dataNasc': ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      'rg': ['', Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
      'cpf': ['', Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      'celular': ['', Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      'telefone': ['', Validators.compose([
        Validators.minLength(10)
      ])],
      'cargo': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'setor': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'salario': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'logradouro': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'numero': ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ])],
      'complemento': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'bairro': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'cidade': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      'estado': ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ])],
    });

    if(this.cadastroId) this.carregarFuncionario();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.cadastroSubscription) this.cadastroSubscription.unsubscribe();
  }

  carregarFuncionario(){
    this.cadastroSubscription = this.cadastroService.getCadastro(this.cadastroId).subscribe(data => {
      this.cadastro = data;
    })
  }

  async cadastrarFuncionario(){
    await this.presenteLoading();

    this.cadastro.userId = this.authService.getAuth().currentUser.uid;

    if(this.cadastroId){
      try{
        await this.cadastroService.updateCadastro(this.cadastroId, this.cadastro);
        this.presentToast('Perfil alterado com sucesso!');
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/funcionarios');
      } catch(error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    } else{
      this.cadastro.createdAt = new Date().getTime();

      try{
        await this.cadastroService.addCadastro(this.cadastro);
        this.presentToast('Funcionário cadastrado com sucesso!');
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/funcionarios');
      } catch(error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }
  }

  async logout(){
    try{
      await this.authService.logout();
    } catch(error){
      console.log(error);
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
