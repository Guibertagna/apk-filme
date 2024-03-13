import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastrarPage } from 'src/app/view/cadastrar/cadastrar.page';

@Component({
  selector: 'app-cadastrar-component',
  templateUrl: './cadastrar-component.component.html',
  styleUrls: ['./cadastrar-component.component.scss'],
})
export class CadastrarComponentComponent  implements OnInit {
  formCadastrarFilme: FormGroup;
  @Output() formularioEnviado = new EventEmitter<FormGroup>();
  constructor(private formBuilder: FormBuilder) {


    this.formCadastrarFilme = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      anoLancamento: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      duracao: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      avaliacao: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  enviarFormulario() {
    if (this.formCadastrarFilme.valid) {
      this.formularioEnviado.emit(this.formCadastrarFilme);
    }
  }
  
  

  todosCamposPreenchidos(): boolean {
    return this.formCadastrarFilme.valid;
  }
}
