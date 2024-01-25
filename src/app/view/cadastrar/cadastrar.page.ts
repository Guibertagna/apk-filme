import { Component, OnInit } from '@angular/core';
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
    this.formCadastrarFilme = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      anoLancamento: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      duracao: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      avaliacao: ['', [Validators.required]],
    });
  }

  uploadImagem(imagem: any){
    this.imagem = imagem.files
  }
  cadastrar(){
    if(this.formCadastrarFilme.value['titulo'] && this.formCadastrarFilme.value['genero']  && this.formCadastrarFilme.value['anoLancamento']  && this.formCadastrarFilme.value['duracao']){
    let novo : Filme = new Filme(this.formCadastrarFilme.value['titulo'], this.formCadastrarFilme.value['genero'], this.formCadastrarFilme.value['duracao'], this.formCadastrarFilme.value['avaliacao'],  this.formCadastrarFilme.value['anoLancamento']);
    novo.uid = this.user.uid;
    console.log(this.user.uid)
    if(this.imagem){
      this.firebaseService.uploadImage(this.imagem, novo)
    }else{
      this.firebaseService.cadastrarFilme(novo);
    }
   this.alertService.presentAlert("Sucesso", "Filme Cadastrado!")
    this.router.navigate(["/filmes"]);
    }
    else{
      this.alertService.presentAlert("Erro", " Campos obrigatorios")
    }
  }
  todosCamposPreenchidos() {
    return this.formCadastrarFilme.valid;
  }
}
