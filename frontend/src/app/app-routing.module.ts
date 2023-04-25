import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { Page404Component } from './componentes/page404/page404.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ProdninosComponent } from './componentes/prodninos/prodninos.component';
import { ProdnutricionalComponent } from './componentes/prodnutricional/prodnutricional.component';
import { PielComponent } from './componentes/piel/piel.component';
import { ProdOfertasComponent } from './componentes/prodofertas/prodofertas.component';
import { ProdCuidadoperComponent } from './componentes/cuidadoper/prodcuidadoper.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { AgregarprodComponent } from './componentes/agregarprod/agregarprod.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { DetalleprodComponent } from './componentes/detalleprod/detalleprod.component';




const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'productos',component:ProductosComponent,pathMatch:'full'},
  {path:'registro',component:RegistroComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,pathMatch:'full'},
  {path:'prodnutricional',component:ProdnutricionalComponent,pathMatch:'full'},
  {path:'prodninos',component:ProdninosComponent,pathMatch:'full'},
  {path:'piel',component:PielComponent,pathMatch:'full'},
  {path:'prodofertas',component:ProdOfertasComponent,pathMatch:'full'},
  {path:'prodcuidadoper',component:ProdCuidadoperComponent,pathMatch:'full'},
  {path:'usuarios',component:UsuariosComponent,pathMatch:'full'},
  {path:'agregarprod',component:AgregarprodComponent,pathMatch:'full'},
  {path:'informacion',component:InformacionComponent,pathMatch:'full'},
  {path:'contacto',component:ContactoComponent,pathMatch:'full'},
  {path:'detalleprod/:identificador',component:DetalleprodComponent,pathMatch:'full'},
  {path:'**',component:Page404Component,pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
