import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-detalleprod',
  templateUrl: './detalleprod.component.html',
  styleUrls: ['./detalleprod.component.css']
})
export class DetalleprodComponent implements OnInit {

  constructor (private actroute:ActivatedRoute, private peticion:PeticionService, private msg:MensajesService ){}
  
    ngOnInit():void{
      this.CargarId(this.actroute.snapshot.params["identificador"])
    }
    codigo:string =""
    nombre:string = ""
    valor:string =""
    fecha_venc:string = ""
    categoria:string =""
    descripcion:string =""
    Id:string = ""

    CargarId(id:string){   
      this.Id = id
      console.log(id)  
      var post = {
        host:this.peticion.urlLocal,
        path:'/productos/listarId',
        payload:{
          id:id
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
          }
          else{
            this.msg.Load("danger",respuesta.mensaje,5000)
          }
        }
      )
    }
}


