import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var swal:any

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent implements OnInit{

  constructor(private router:Router, private Peticion:PeticionService){

  }

  ngOnInit(): void{
    this.MenuBackend()
  }

  datosmenu:any[] = []

MenuBackend(){
    var post = {
      host:this.Peticion.urlLocal,
      path:"/usuarios/menu_rol",
      payload:{

      }
    }
      this.Peticion.Post(post.host + post.path, post.payload).then(
        (respuesta:any) =>{
            this.datosmenu = respuesta.datos
          }
      )
  }

CerrarSesion(){

  var post = {
    host:this.Peticion.urlLocal,
    path:"/cerrarsesion",
    payload:{}
  }

    this.Peticion.Post(post.host + post.path, post.payload).then(
      (respuesta:any) =>{
          this.router.navigate(['/home'])
          swal({
            title: "Hasta pronto!",
            text: "Sesión cerrada!",
            icon: "info",
            button: "Ok",
          });
    }
  
    )
  }
}