import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Filme from 'src/app/model/entities/Filme';
import { FirebaseService } from 'src/app/service/firebase-service.service';


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
  imagem : any; 
  
  constructor(private router: Router,
    private firebase: FirebaseService) { }

  ngOnInit() {
      this.filme = history.state.filme
      console.log(this.filme)  
      this.titulo = this.filme.titulo;
      this.anoLancamento = this.filme.anoLancamento;
      this.genero = this.filme.genero;
      this.duracao = this.filme.duracao;
      this.avaliacao = this.filme.avaliacao
    }
  
 
    uploadImagem(imagem: any){
      this.imagem = imagem.files
    }
  
  
  habilitar(){
    if(!this.edicao){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }
 
  excluir(){
    
    this.firebase.excluirFilme(this.filme)
    this.router.navigate(["/filmes"])
  }
  
  editar(){
    let novo: Filme = new Filme(this.titulo, this.genero, this.anoLancamento, this.avaliacao, this.duracao);
    novo.id = this.filme.id;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      this.firebase.editarFilme(novo, this.filme.id);
    }
    this.firebase.editarFilme(novo, this.filme.id)
    this.router.navigate(["/filmes"])
  }



  
  
}



