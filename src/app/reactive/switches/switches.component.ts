import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
    // condiciones: true
  }



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });


    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue =>{
    //   console.log(newValue);
    // })
    this.miFormulario.valueChanges.subscribe( form =>{
      delete form.condiciones;
      this.persona = form;
    })
  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    console.log(formValue);

    this.persona = formValue;
  }

}
