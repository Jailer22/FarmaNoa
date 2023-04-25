import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var swal:any
declare var $:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor (private peticion:PeticionService, private msj:MensajesService){

  }
  ngOnInit(): void {
    this.Listar();
  }

   //ventana modal productos
   OpenModal(){
    $('#Modal').modal('show')
    this.Limpiar()
  }
  
  nombre:string = ""
  apellido:string = ""
  email:string = ""
  cedula:string = ""
  password:string = ""
  Id:String =""

  listadatos:any [] = []

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

  Listar(){
    var post = {
      host:this.peticion.urlLocal,
      path:'/usuarios/listar',
      payload:{}
    }

    this.peticion.Post(post.host + post.path ,post.payload).then(
      (respuesta:any) =>{this.listadatos = respuesta.data}
    )

}

   Registrar(){
    var post = {
      host:this.peticion.urlLocal,
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
      this.peticion.Post(post.host + post.path, post.payload).then(
        (respuesta:any) =>{
          if(respuesta.state == false){
            this.msj.Load("danger",respuesta.mensaje,5000)
            swal({
              title: "Error!",
              text: "No se pudo realizar el registro",
              icon: "danger",
              button: "Ok",
            });
            $('#Modal').modal('hide')
          }
          else {
           // this.msj.Load("success",respuesta.mensaje,5000)
            swal({
              title: "Registrado!",
              text: "Se ha enviado enlace de activación al correo registrado!",
              icon: "success",
              button: "Ok",
            });
            $('#Modal').modal('hide')
            this.Listar()    
            
          }
        }
        
      ) 
      
  }

}
   
  CargarId(id:string){
    console.log(id)
    this.Id = id

    var post = {
      host:this.peticion.urlLocal,
      path:'/usuarios/listarId',
      payload:{
        id:this.Id  
      }
    }

    this.peticion.Post(post.host + post.path ,post.payload).then(
      (respuesta:any) =>{
      
        if(respuesta.state == true){
          this.nombre = respuesta.data.nombre
          this.apellido = respuesta.data.apellido
          this.email = respuesta.data.email
          this.cedula = respuesta.data.cedula
          this.password = respuesta.data.password
          $('#Modal').modal('show')
        
          
        }
        else{
          this.msj.Load("danger",respuesta.mensaje,5000)
        }
      }
    )

}

  Modificar(){

    var post = {
      host:this.peticion.urlLocal,
      path:'/usuarios/modificar',
      payload:{
        nombre:this.nombre,
        apellido:this.apellido,
        email:this.email,
        cedula:this.cedula,
        password:this.password,
      }
    }

    swal({
      title: 'Está seguro?',
      text: "¿Desea actualizar este registro?",
      icon: 'info',
      buttons: true,
      dangerMode: true,
  
    })
    .then((willModif:any) => {
      if (willModif) {
  
        
      
        this.peticion.Post(post.host + post.path ,post.payload).then(
          (respuesta:any) =>{
           
            if(respuesta.state == true){
              //this.msj.Load("success",respuesta.mensaje,5000)
              swal({
                title: "Registro actualizado!",
                text: "Se actualizó correctamento el registro!",
                icon: "success",
                button: "Ok",
              });
              $('#Modal').modal('hide')
              this.Listar()      
            }
            else{
              swal({
                title: "Erro al actualizar!",
                text: "No se pudo actualizar el registro!",
                icon: "warning",
                button: "Ok",
              });
              $('#Modal').modal('hide')
              this.msj.Load("danger",respuesta.mensaje,5000)
            }
          }
        )
        
      }else{
        $('#Modal').modal('hide')
      }
    });

  // var post = {
  //   host:this.peticion.urlLocal,
  //   path:'/usuarios/modificar',
  //   payload:{
      
  //     nombre:this.nombre,
  //     apellido:this.apellido,
  //     email:this.email,
  //     cedula:this.cedula,
  //     password:this.password,
      
  //   }
  // }

  // this.peticion.Post(post.host + post.path ,post.payload).then(
  //   (respuesta:any) =>{
     
  //     if(respuesta.state == true){
  //       this.msj.Load("success",respuesta.mensaje,5000)
  //       $('#Modal').modal('hide')
  //       this.Listar()          
  //     }
  //     else{
  //       this.msj.Load("danger",respuesta.mensaje,5000)
  //     }
  //   }
  // )

 }

 Eliminar(){
    
  swal({
    title: 'Está seguro?',
    text: "¿Desea eliminar este registro?",
    icon: 'warning',
    buttons: true,
    dangerMode: true,

  })
  .then((willDelete:any) => {
    if (willDelete) {

      var post = {
        host:this.peticion.urlLocal,
        path:'/usuarios/eliminar',
        payload:{
          id:this.Id
          
        }
      }
    
      this.peticion.Post(post.host + post.path ,post.payload).then(
        (respuesta:any) =>{
         
          if(respuesta.state == true){
            //this.msj.Load("success",respuesta.mensaje,5000)
            swal({
              title: "Registro actualizado!",
              text: "Se actualizó correctamento el registro!",
              icon: "success",
              button: "Ok",
            });
            $('#Modal').modal('hide')
            this.Listar()      
          }
          else{
            swal({
              title: "Error al eliminar!",
              text: "Registro eliminado correctamente!",
              icon: "success",
              button: "Ok",
            });
          
           // this.msj.Load("danger",respuesta.mensaje,5000)
           
          }
          
        }
      )
      
    }else{
      $('#Modal').modal('hide')
    }
  });

}

Limpiar(){
  this.nombre = ""
  this.apellido = ""
  this.email = ""
  this.cedula =""
  this.Id = ""
  this.password = ""

}

}


