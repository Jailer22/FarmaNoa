import { Component } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';
declare var $:any

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  constructor (private peticion:PeticionService){
  }

  listadatos:any[] = []

  ngOnInit(): void {
    
    this.Listar()
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

}
