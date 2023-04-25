import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-prodnutricional',
  templateUrl: './prodnutricional.component.html',
  styleUrls: ['./prodnutricional.component.css']
})
export class ProdnutricionalComponent {

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



