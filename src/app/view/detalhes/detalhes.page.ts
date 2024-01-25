import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Filme from 'src/app/model/entities/Filme';
import { FirebaseService } from 'src/app/model/service/firebase-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/model/service/authservice.service';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  edicao: boolean = true;
  filme: Filme;
  imagem: any;
  user: any;
  formAtualizaFilme: FormGroup;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private alert: AlertService
  ) {
    this.user = this.authService.getUserLogged();
    this.formAtualizaFilme = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      anoLancamento: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      duracao: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      avaliacao: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.filme = history.state.filme;
    console.log('Filme data:', this.filme);
    this.formAtualizaFilme.patchValue({
      titulo: this.filme.titulo,
      genero: this.filme.genero,
      anoLancamento: this.filme.anoLancamento,
      duracao: this.filme.duracao,
      avaliacao: this.filme.avaliacao,
    });
    console.log('Form data:', this.formAtualizaFilme.value);
  }

  uploadImagem(event: any) {
    console.log(event.target.files);
    this.imagem = event.target.files;
  }

  habilitar() {
    this.edicao = !this.edicao;
  }

  excluir() {
    this.firebase.excluirFilme(this.filme);
    this.router.navigate(['/filmes']);
  }

  editar() {
    if (!this.todosCamposPreenchidos()) {
      return;
    }

    // Certifique-se de passar os parâmetros na ordem correta
    let novo: Filme = new Filme(
      this.formAtualizaFilme.value['titulo'],
      this.formAtualizaFilme.value['genero'],
      this.formAtualizaFilme.value['duracao'],
      this.formAtualizaFilme.value['avaliacao'],
      this.formAtualizaFilme.value['anoLancamento']    
     
    );

    novo.id = this.filme.id;
    novo.uid = this.user.uid;

    if (this.imagem) {
      this.firebase.uploadImage(this.imagem, novo);
    } else {
      this.firebase.editarFilme(novo, this.filme.id);
    }

    this.alert.presentAlert('Salvo', 'Filme Modificado!');
    this.router.navigate(['/filmes']);
  }

  todosCamposPreenchidos() {
    return this.formAtualizaFilme.valid;
  }
}
