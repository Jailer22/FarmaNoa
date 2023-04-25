import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  public datos:any[] = []
  
  private BorrarMsj(tiempo:number){

        setTimeout(() =>{this.datos.splice(0,1)}, tiempo);
   
  }
  
  /**
   * Función para enviar mensajes
   * @param tipo // sucess, primary, danger
   * @param mensajes // mensaje enviado
   * @param tiempo // tiempo de espera para msj
   */
  public Load (tipo:string,mensajes:string,tiempo:number){
    this.datos.push({tipo:tipo,mensajes:mensajes})
    this.BorrarMsj(tiempo)
  }
}
