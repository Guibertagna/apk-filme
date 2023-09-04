import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Filme from 'src/app/model/entities/Filme';
import { FirebaseService } from 'src/app/service/firebase-service.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  titulo: string;
  anoLancamento: number;
  genero: string;
  avaliacao: string;
  duracao: number;
  edicao: boolean = true;
  indice: number;
  filme: Filme;
  
  constructor(private actRoute : ActivatedRoute, private firebaseService : FirebaseService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
      this.filme = history.state.filme
      console.log(this.filme)  
      this.titulo = this.filme.titulo;
      this.anoLancamento = this.filme.anoLancamento;
      this.genero = this.filme.genero;
      this.avaliacao = this.filme.avaliacao;
      this.duracao = this.filme.duracao;
    }
  
 
  
  
  habilitar(){
    if(!this.edicao){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }
  confirmar(){
    this.confirmDelete()
    
  }
  
  excluir(){
    
    
    this.firebaseService.excluirFilme(this.filme)
    this.router.navigate(["/filmes"])
  }


 editar(){
    if(this.titulo && this.genero && this.duracao && this.anoLancamento){
    let novo : Filme =  new Filme(this.titulo, this.genero, this.anoLancamento, this.avaliacao, this.duracao);
    this.firebaseService.editarFilme(novo, this.filme.id);
    this.router.navigate(["/filmes"])
    this.presentAlert("Salvo", "As edições foram salvas");
    }
    else{
      this.presentAlert("Erro", "Campos Nome e Telefone Obrigatórios!");
    }

  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você realmente deseja excluir este contato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operação de exclusão cancelada.');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluir();
          }
        }
      ]
    });
    await alert.present();
  }
  


  async presentAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      subHeader: 'Catalogo de Filmes',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}



