import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Filme from 'src/app/model/entities/Filme';
import { FirebaseService } from 'src/app/service/firebase-service.service';


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

  constructor(private alertController: AlertController, private router:Router, private firebaseService : FirebaseService ) { }

  ngOnInit() {
  }

  uploadImagem(imagem: any){
    this.imagem = imagem.files
  }
  cadastrar(){
    if(this.titulo && this.genero && this.anoLancamento && this.duracao){
    let novo : Filme = new Filme(this.titulo, this.genero, this.duracao, this.avaliacao,  this.anoLancamento);
    if(this.imagem){
      this.firebaseService.uploadImage(this.imagem, novo)
    }else{
      this.firebaseService.cadastrarFilme(novo);
    }
    this.presentAlert("Cadastrado", "Filme Cadastrado");
    this.router.navigate(["/filmes"]);
    }
    else{
      this.presentAlert("Erro", "Campos Obrigatórios!");
    }
  }
  async presentAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      subHeader: 'Cátalogo de filmes',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  

}
