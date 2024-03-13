import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalhesPage } from 'src/app/view/detalhes/detalhes.page';

@Component({
  selector: 'app-detalhar-component',
  templateUrl: './detalhar-component.component.html',
  styleUrls: ['./detalhar-component.component.scss'],
})
export class DetalharComponentComponent implements OnInit {
  @Input() filme: any;
  formAtualizaFilme: FormGroup;
  @Input() disabled: boolean = false; // Adicione esta linha para definir a propriedade 'disabled'
  @Output() formularioEnviado = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder, private detalhes: DetalhesPage) {
    this.formAtualizaFilme = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      anoLancamento: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      duracao: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      avaliacao: ['', [Validators.required]],
    });
  }

  editar() {
    if (this.formAtualizaFilme.valid) {
      this.formularioEnviado.emit(this.formAtualizaFilme);
    }
  }

  excluir() {
    return this.detalhes.excluir();
  }

  uploadImagem(event: any) {
    console.log(event.target.files);
   
  }

  todosCamposPreenchidos() {
    return this.formAtualizaFilme.valid;
  }

  ngOnInit() {}
}
