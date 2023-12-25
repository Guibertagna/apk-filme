import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { AlertService } from 'src/app/common/alert.service';
import { AuthserviceService } from 'src/app/model/service/authservice.service'; 


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar : FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private authService : AuthserviceService) { 
    this.formCadastrar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confsenha: new FormControl('') 
    });
  }
  ngOnInit(){
    this.formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['',[Validators.required, Validators.minLength(6)]],
      confsenha: ['',[Validators.required, Validators.minLength(6)]]
    })
  }
  get errorControl(){
    return this.formCadastrar.controls;
  }
  cadastrar(){
    this.authService.signUpWithEmailAndPassword(this.formCadastrar.value['email'], this.formCadastrar.value['senha']).then((res)=>{
      this.alertService.presentAlert("cadastro", "cadastro realizado com sucesso")
      this.alertService.presentAlert("ola","seja bem vindo");
      this.router.navigate(["singnin"])
    }).catch((error)=>{
      this.alertService.presentAlert("cadastro", "cadastro não realizado com sucesso")
      console.log(error.message)
    })
}
  submitForm() : boolean{
    if(!this.formCadastrar.valid || this.formCadastrar.value['senha'] != this.formCadastrar.value['confsenha']){
      this.alertService.presentAlert("BURRO","FAZ DE NOVO");
      return false
    }else{
      this.cadastrar();
      return true;
    }
  }

}
