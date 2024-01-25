import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Filme from 'src/app/model/entities/Filme';
import { FirebaseService } from 'src/app/model/service/firebase-service.service';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { AuthserviceService } from 'src/app/model/service/authservice.service';
@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  edicao: boolean = true;
  indice: number;
  filme: Filme;
  imagem : any; 
  user : any;
  formAtualizaFilme: FormGroup;
  
  constructor(private router: Router, private firebase: FirebaseService, private formBuilder: FormBuilder, private authService: AuthserviceService) { 
    this.user = this.authService.getUserLogged();
    this.formAtualizaFilme = new FormGroup({
      titulo : new FormControl(''),
      genero : new FormControl(''),
      anoLancamento : new FormControl(''),
      duracao : new FormControl(''),
      avaliacao : new FormControl(''),
    })
    


    }

  ngOnInit() {
    this.filme = history.state.filme;
    this.formAtualizaFilme = this.formBuilder.group({
      titulo: [this.filme.titulo, [Validators.required]],
      genero: [this.filme.genero, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      anoLancamento: [this.filme.anoLancamento, [Validators.required]],
      duracao: [this.filme.duracao, [Validators.required]],
      avaliacao: [this.filme.avaliacao, [Validators.required]],
    })
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
    let novo: Filme = new Filme(this.formAtualizaFilme.value['titulo'], this.formAtualizaFilme.value['genero'], this.formAtualizaFilme.value['anoLancamento'], this.formAtualizaFilme.value['avaliacao'], this.formAtualizaFilme.value['duracao']);
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



