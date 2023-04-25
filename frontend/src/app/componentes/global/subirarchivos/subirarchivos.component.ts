import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SubirarchivosService } from 'src/app/servicios/subirarchivos.service';

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})
export class SubirarchivosComponent implements OnInit {

  constructor(private uploadService:SubirarchivosService){}

  ngOnInit():void{
    console.log(this.urldestino)
    console.log(this.path)
    console.log(this.inputName)

}
    selectedFiles:any;
    progress:number = 0
    nombrearchivo:string = ""
    archivoseleccionado:any;
    message:string =""
    estado:boolean =  false

    @Input() urldestino:string =""
    @Input() path:string = ""
    @Input() inputName:string =""


    selectFile(event:any){
      this.selectedFiles = event.target.files
      this.nombrearchivo = this.selectedFiles[0].name
    }

    subirarchivo(){
      this.message = ""
      this.progress = 0;
      this.archivoseleccionado = this.selectedFiles.item(0)
      
      this.uploadService.subirarchivo(this.archivoseleccionado, 
        this.urldestino + this.path, this.inputName).subscribe(
        (event:any) => {
          
          if  (event.type === HttpEventType.UploadProgress){
              this.progress = Math.round( 100 * event.loaded / event.total)

          }else if(event instanceof HttpResponse) {

            this.message = event.body.mensaje
            this.estado = event.body.state
            if(event.body.state == false){
              this.nombrearchivo = ""
            }
          }

        }
      )
    }
      
}

