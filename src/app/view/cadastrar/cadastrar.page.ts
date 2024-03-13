import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Filme from 'src/app/model/entities/Filme';
import { AuthserviceService } from 'src/app/model/service/authservice.service';
import { FirebaseService } from 'src/app/model/service/firebase-service.service'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class CadastrarPage implements OnInit {
  public titulo: string;
  public genero: string;
  public anoLancamento: number;
  public avaliacao: string;
  public duracao: number;
  catalogoFilme : Filme [] = [];
  public imagem : any;
  public user : any;
  formCadastrarFilme: FormGroup;

  constructor(private alertService:AlertService, private router:Router, private firebaseService : FirebaseService, private authService : AuthserviceService, private formBuilder: FormBuilder ) { 
    this.user = this.authService.getUserLogged();
    
   this.formCadastrarFilme = new FormGroup({
    titulo : new FormControl(''),
    genero : new FormControl(''),
    anoLancamento : new FormControl(''),
    duracao : new FormControl(''),
    avaliacao : new FormControl(''),

   })
  }

  ngOnInit() {
   
  }

  uploadImagem(imagem: any){
    this.imagem = imagem.files
  }
  onSubmit(formulario: FormGroup) {
    if (formulario.valid) {
      const novoFilme = new Filme(
        formulario.value.titulo,
        formulario.value.genero,
        formulario.value.duracao,
        formulario.value.avaliacao,
        formulario.value.anoLancamento
      );
      novoFilme.uid = this.user.uid;
      this.firebaseService.cadastrarFilme(novoFilme);
      this.alertService.presentAlert('Sucesso', 'Filme Cadastrado!');
    } else {
      this.alertService.presentAlert('Erro', 'Campos obrigatórios');
    }
  }
  todosCamposPreenchidos() {
    return this.formCadastrarFilme.valid;
  }
}
