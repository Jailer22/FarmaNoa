import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var swal:any 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  implements OnInit  {

  constructor(public msj:MensajesService, private Peticion:PeticionService, private router:Router){
  }

  ngOnInit(){
  }

  Terminos:boolean = false
  nombre:string = ""
  apellido:string = ""
  email:string = ""
  cedula:string = ""
  password:string = ""
  


  aceptarterminos (){
    this.Terminos = !this.Terminos

  }

  PreValidacion():boolean{
    if(this.nombre == "" || this.nombre == undefined || this.nombre == null){
      this.msj.Load('danger',"Ingrese su nombre",5000)
      return false
    }

    if(this.apellido == "" || this.apellido == undefined || this.apellido == null){
      this.msj.Load('danger',"Ingrese su Apellido",5000)
      return false
    }

    if(this.email == "" || this.email == undefined || this.email == null){
      this.msj.Load('danger',"Ingrese su correoooooo",5000)
      return false
    }

    if(this.password == "" || this.password == undefined || this.password == null){
      this.msj.Load('danger',"Ingrese la contraseña",5000)
      return false
    }

    if(this.nombre == "" && this.apellido == "" && this.email == "" && this.cedula == "" && this.password == "" ){
      this.msj.Load('danger',"Ingrese los datos a registrar",5000)
      return false
    }

return true
  }

  Registrar(){
    var post = {
      host:this.Peticion.urlLocal,
      path:"/usuarios/guardar",
      payload:{
        nombre:this.nombre,
        apellido:this.apellido,
        email:this.email,
        cedula:this.cedula,
        password:this.password
      }
    }

    if(this.PreValidacion() == true){
      this.Peticion.Post(post.host + post.path, post.payload).then(
        (respuesta:any) =>{
          if(respuesta.state == false){
            this.msj.Load("danger",respuesta.mensaje,5000)
            swal({
              title: "Error!",
              text: "No se pudo realizar el registro",
              icon: "danger",
              button: "Ok",
            });
          }
          else {
           // this.msj.Load("success",respuesta.mensaje,5000)
            swal({
              title: "Registrado!",
              text: "Se ha enviado enlace de activación al correo registrado!",
              icon: "success",
              button: "Ok",
            });
            this.router.navigate(['/login'])
          }
        }
        
      ) 
      
  }

}
    
}
