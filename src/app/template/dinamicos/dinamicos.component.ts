import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string;
  favoritos: Favoritos[]
}

interface Favoritos{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm;
  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Rosalba',
    favoritos: [
      {id: 1, nombre:'Metal Gear'},
      {id: 2, nombre:'Deatring'}
    ]
  }

  agregarJuego(){
    const nuevoFavorito: Favoritos = {
      id: this.persona.favoritos.length+1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index : number){
    this.persona.favoritos.splice(index,1);
  }

  guardar(){
    console.log('Formulario posteado');
  }


  nombreValido(): boolean{

    return this.miFormulario?.controls['nombre']?.invalid
    &&  this.miFormulario?.controls['nombre']?.touched
  }
}
