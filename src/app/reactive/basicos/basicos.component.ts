import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit{

  // miFormulario: FormGroup = new FormGroup({
  //   nombre    : new FormControl('RTX 4080TI'),
  //   precio    : new FormControl(1500),
  //   existencia: new FormControl(5)
  // });

  miFormulario: FormGroup = this.fb.group({
    nombre    : [,[Validators.required, Validators.minLength(3)]],
    precio    : [, [Validators.min(0),Validators.required]],
    existencia: [, [Validators.min(0),Validators.required]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'RTX 4080TI',
      precio: 500,
      existencia: 5
    })
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo]?.errors
            && this.miFormulario.controls[campo]?.touched
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return ;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
