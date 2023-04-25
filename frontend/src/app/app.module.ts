import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { Page404Component } from './componentes/page404/page404.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MenulateralComponent } from './componentes/menulateral/menulateral.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ProdninosComponent } from './componentes/prodninos/prodninos.component';
import { PielComponent } from './componentes/piel/piel.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { ProdCuidadoperComponent } from './componentes/cuidadoper/prodcuidadoper.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ConveniosComponent } from './componentes/convenios/convenios.component';
import { ProdnutricionalComponent} from './componentes/prodnutricional/prodnutricional.component';
import { ProdOfertasComponent } from './componentes/prodofertas/prodofertas.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { AgregarprodComponent } from './componentes/agregarprod/agregarprod.component';
import { InterceptorInterceptor } from './interceptores/interceptor.interceptor';
import { PrefjMonedaPipe } from './pipes/prefj-moneda.pipe';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { SubirarchivosComponent } from './componentes/global/subirarchivos/subirarchivos.component';
import { DetalleprodComponent } from './componentes/detalleprod/detalleprod.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    LoginComponent,
    RegistroComponent,
    Page404Component,
    MenuComponent,
    MensajesComponent,
    HeaderComponent,
    FooterComponent,
    MenulateralComponent,
    DashboardComponent,
    ProdninosComponent,
    PielComponent,
    InformacionComponent,
    ProdCuidadoperComponent,
    ContactoComponent,
    ConveniosComponent,
    ProdOfertasComponent,
    ProdnutricionalComponent,
    UsuariosComponent,
    InventarioComponent,
    AgregarprodComponent,
    PrefjMonedaPipe,
    AgregarComponent,
    SubirarchivosComponent,
    DetalleprodComponent,
    CarouselComponent,

  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
 
   
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
