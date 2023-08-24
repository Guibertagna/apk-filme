import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Filme from 'src/app/model/entities/Filme';
import { FilmeService } from 'src/app/services/filme.service';

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

  constructor(private alertController: AlertController, private router:Router, private filmeService: FilmeService ) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.titulo && this.genero && this.anoLancamento && this.duracao){
    let novo : Filme = new Filme(this.titulo, this.genero, this.duracao, this.avaliacao,  this.anoLancamento);
    this.filmeService.catalogoFilme.push(novo);
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
