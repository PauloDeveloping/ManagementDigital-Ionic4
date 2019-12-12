import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { CadastroGuard } from './guards/cadastro.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule', canActivate: [CadastroGuard] },
  { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosPageModule', canActivate: [AuthGuard] },
  { path: 'cadastro-funcionario', loadChildren: './cadastro-funcionario/cadastro-funcionario.module#CadastroFuncionarioPageModule', canActivate: [AuthGuard] },
  { path: 'cadastro-funcionario/:id', loadChildren: './cadastro-funcionario/cadastro-funcionario.module#CadastroFuncionarioPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
