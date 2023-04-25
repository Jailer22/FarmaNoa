import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var swal:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router,public msj:MensajesService, private Peticion:PeticionService){
    
  }
  ngOnInit(){
  }

  email:string = ""
  password:string = ""

  PreValidacion():boolean{
  
    if(this.email == "" || this.email == undefined || this.email == null){
      this.msj.Load('danger',"Ingrese su correoooooo",5000)
      return false
    }

    if(this.password == "" || this.password == undefined || this.password == null){
      this.msj.Load('danger',"Ingrese la contraseña",5000)
      return false
    }

return true
  }


  Login(){
    var post = {
      host:this.Peticion.urlLocal,
      path:"/usuarios/login",
      payload:{
        email:this.email,
        password:this.password
      }
    }
    
    if(this.PreValidacion() == true){
      this.Peticion.Post(post.host + post.path, post.payload).then(
        (respuesta:any) =>{
          if(respuesta.state == false){
            this.msj.Load("danger",respuesta.mensaje,5000)
            swal({
              title: "No se pudo iniciar sesión!",
              text: "Verifique su correo o contraseña!",
              icon: "warning",
              button: "Ok",
            });
          }
          else {
           // this.msj.Load("success",respuesta.mensaje,5000)
            this.router.navigate(['/dashboard'])
            swal({
              title: "Bienvenido!",
              text: "Has iniciado sesión correctamente!",
              icon: "success",
              button: "Ok",
            });
          } 
        }
      )
      
    }

  }

}
