import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

declare var $:any
declare var swal:any


@Component({
  selector: 'app-agregarprod',
  templateUrl: './agregarprod.component.html',
  styleUrls: ['./agregarprod.component.css']
})
export class AgregarprodComponent implements OnInit {

  constructor (private peticion:PeticionService, private msg:MensajesService){

  }
  ngOnInit(): void {
   this.Listar()
  }

  //Variables
  codigo:String =""
  nombre:string =""
  valor:string = ""
  fecha_venc:string = ""
  categoria:string = ""
  descripcion:string =""
  Id:String =""
 
  destino:string = this.peticion.urlLocal
  path:string = '/ImagenesProductos'

  listadatos:any[] = []

  //ventana modal productos
  OpenModal(){
    $('#Modal').modal('show')
    this.Limpiar()
  }
  
  //funcion cargarid
  CargarId(id:string){
        console.log(id)
        this.Id = id
        this.path = this.path + '/' + this.Id
        
    
        var post = {
          host:this.peticion.urlLocal,
          path:'/productos/listarId',
          payload:{
            id:this.Id  
          }
        }
    
        this.peticion.Post(post.host + post.path ,post.payload).then(
          (respuesta:any) =>{
           
            if(respuesta.state == true){
              this.codigo = respuesta.data.codigo
              this.nombre = respuesta.data.nombre
              this.valor = respuesta.data.valor
              this.fecha_venc = respuesta.data.fecha_venc
              this.categoria = respuesta.data.categoria
              this.descripcion = respuesta.data.descripcion
              console.log(respuesta.state)  
              $('#Modal').modal('show')
            
               
            }
            else{
              this.msg.Load("danger",respuesta.mensaje,5000)
            }
          }
        )
    
  }
  //funcion limpiar
  Limpiar(){
    this.nombre = ""
    this.codigo = ""
    this.valor = ""
    this.fecha_venc =""
    this.Id = ""
    this.categoria = ""
    this.descripcion = ""
  }
   //funcion guardar productos
   GuardarProducto(){

   
    var post = {
      host:this.peticion.urlLocal,
      path:'/productos/guardar',
      payload:{
        codigo:this.codigo,
        nombre:this.nombre,
        valor:this.valor,
        fecha_venc:this.fecha_venc,
        categoria:this.categoria,
        descripcion:this.descripcion
      }
    }

    this.peticion.Post(post.host + post.path ,post.payload).then(
      (respuesta:any) =>{
       
        if(respuesta.state == true){
          swal({
            title: "Producto guardado!",
            text: "Se realizó correctamente el registro!",
            icon: "success",
            button: "Ok",
          });
          //this.msg.Load("success",respuesta.mensaje,5000)
          $('#Modal').modal('hide')
          this.Listar()          
        }
        else{
          swal({
            title: "No se pudo guardar!",
            text: "verifica la información ingresada!",
            icon: "warning",
            button: "Ok",
          });
         // this.msg.Load("danger",respuesta.mensaje,5000)
        }
      }
    )

   }
 //funcion modificar productos
   Modificar(){
    var post = {
      host:this.peticion.urlLocal,
      path:'/productos/modificar',
      payload:{
        id:this.Id,
        codigo:this.codigo,
        nombre:this.nombre,
        valor:this.valor,
        fecha_venc:this.fecha_venc,
        categoria:this.categoria,
        descripcion:this.descripcion
      }
    }

    this.peticion.Post(post.host + post.path ,post.payload).then(
      (respuesta:any) =>{
       
        if(respuesta.state == true){
          this.msg.Load("success",respuesta.mensaje,5000)
          $('#Modal').modal('hide')
          this.Listar()         
        }
        else{
          this.msg.Load("danger",respuesta.mensaje,5000)
        }
      }
    )

   }

   // Funcion cargar productos 
   Listar(){
    var post = {
      host:this.peticion.urlLocal,
      path:'/Productos/listar',
      payload:{
        
      }
    }

    this.peticion.Post(post.host + post.path ,post.payload).then(
      (respuesta:any) =>{
       this.listadatos = respuesta.data
      
      }
    )

   }

// Funcion eliminar productos 
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
        path:'/Controles/eliminar',
        payload:{
          id:this.Id
          
        }
      }
    
      this.peticion.Post(post.host + post.path ,post.payload).then(
        (respuesta:any) =>{
         
          if(respuesta.state == true){
            this.msg.Load("success",respuesta.mensaje,5000)
            //$('#Modal').modal('hide')
            this.Listar()      
          }
          else{
            this.msg.Load("danger",respuesta.mensaje,5000)
          }
        }
      )
      
    }else{
     
    }
  });

}

}
