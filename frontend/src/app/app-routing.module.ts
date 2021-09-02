import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListPostComponent } from "./post/list-post/list-post.component";
import { SavePostComponent } from "./post/save-post/save-post.component";

//importamos el guard
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full', //para que salga el login si se coloca la url completa
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: 'listPost',
    component: ListPostComponent,
    canActivate: [AuthGuard], //se agrega para bloquear el acceso si no esta logueado
  },
  {
    path: 'savePost',
    component: SavePostComponent,
    canActivate: [AuthGuard], //se agrega para bloquear el acceso si no esta logueado
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
