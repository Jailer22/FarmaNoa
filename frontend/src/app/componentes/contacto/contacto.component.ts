import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  constructor() {
  }

  ngOnInit() {
  }

  Nombres: string = ""
  Apellidos: string = ""
  Correo: string = ""
  mensaje: string = ""

}
