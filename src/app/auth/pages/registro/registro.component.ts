import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required,]],

  },{
    validators:[ this.validatorService.camposIguales('password','password2')]
  });


  //emailErrorMsg : string = '';
  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Email es obligatorio';
    }else if(errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo'
    }else if(errors?.['emailTomado']){
      return 'El correo ingresado ya fue ocupado '
    }
    return '';
  }
  //se realiza la inyeccion del FormBuider
  //inyecatmosel servicio ValidatorService
  constructor(  private fb : FormBuilder,
                private validatorService:ValidatorService,
                private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Rosalba Galicia',
      email: 'test1@test.com',
      username: 'Rosa galicia',
      password: '123456',
      password2: '123456'
    })
  }
  compoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched
  }
  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }



  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required']
  //    && this.miFormulario.get('email')?.touched;
  // }
  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //    && this.miFormulario.get('email')?.touched;
  // }
  // emailRepetido(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //    && this.miFormulario.get('email')?.touched;
  // }


}
