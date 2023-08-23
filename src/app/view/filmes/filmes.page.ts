import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Filme from 'src/app/model/entities/Filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
  catalogoFilme : Filme [] = [];
  
  
  constructor(private router: Router, private filmeService : FilmeService ) {
    this.catalogoFilme = this.filmeService.obterTodos();
   }

   ngOnInit() {  }

  
  irCadastroFilme(){
    this.router.navigate(["/cadastrar"])
  }

  editar(index : number){
    this.router.navigate(["/detalhes", index])
  }
}
