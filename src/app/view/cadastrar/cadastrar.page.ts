import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import Filme from 'src/app/model/entities/Filme';
import { AuthserviceService } from 'src/app/model/service/authservice.service';
import { FirebaseService } from 'src/app/model/service/firebase-service.service'; 

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

  constructor(private alertService:AlertService, private router:Router, private firebaseService : FirebaseService, private authService : AuthserviceService ) { 
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {
  }

  uploadImagem(imagem: any){
    this.imagem = imagem.files
  }
  cadastrar(){
    if(this.titulo && this.genero && this.anoLancamento && this.duracao){
    let novo : Filme = new Filme(this.titulo, this.genero, this.duracao, this.avaliacao,  this.anoLancamento);
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
}
