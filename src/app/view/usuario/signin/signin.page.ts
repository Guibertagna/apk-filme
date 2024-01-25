import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { AlertService } from 'src/app/common/alert.service';
import { AuthserviceService } from 'src/app/model/service/authservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private authService: AuthserviceService) {
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      Confsenha: new FormControl(''),
    });
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this.formLogar.controls;
  }

  private logar() {
    this.authService.singIn(this.formLogar.value['email'], this.formLogar.value['senha']).then((res) => {
      this.alertService.dismissLoader();
      this.alertService.presentAlert('login', 'login realizado com sucesso');
      this.alertService.presentAlert('ola', 'seja bem vindo');
      this.router.navigate(['home']);
    }).catch((error) => {
      this.alertService.dismissLoader();
      this.alertService.presentAlert('login', 'login não realizado com sucesso');
      console.log(error.message);
    });
  }

  submitForm(): boolean {
    if (!this.formLogar.valid) {
      this.alertService.presentAlert('BURRO', 'FAZ DE NOVO');
      return false;
    } else {
      this.alertService.simpleLoader();
      this.logar();
      return true;
    }
  }

  logarComGoogle(): void {
    this.authService.singInWithGoogle().then((res) => {
      this.alertService.dismissLoader();
      this.alertService.presentAlert('login', 'login realizado com sucesso');
      this.alertService.presentAlert('ola', 'seja bem vindo');
      this.router.navigate(['home']);
    }).catch((error) => {
      this.alertService.presentAlert('login', 'login não realizado com sucesso');
      console.log(error.message);
    });
  }

  logarComGitHub(): void {
    this.authService.singInWithGitHub().then((res) => {
      this.alertService.dismissLoader();
      this.alertService.presentAlert('login', 'login realizado com sucesso');
      this.alertService.presentAlert('ola', 'seja bem vindo');
      this.router.navigate(['home']);
    }).catch((error) => {
      this.alertService.presentAlert('login', 'login não realizado com sucesso');
      console.log(error.message);
    });
  }

  irParaSingUp() {
    this.router.navigate(['signup']);
  }
}
