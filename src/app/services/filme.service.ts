import { Injectable } from '@angular/core';
import Filme from '../model/entities/Filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  catalogoFilme : Filme [] = [];

  constructor() { 
    let c1: Filme = new Filme("Como eu era antes de você", "romace", 150,"Bom", 1998)
    let c2: Filme = new Filme("Se beber não case", "comédia", 120,"Mediano", 2000)
    this.catalogoFilme.push(c1);
    this.catalogoFilme.push(c2);
  }

  obterTodos(): Filme[]{
    return this.catalogoFilme;
  }
  obterPorIndice(indice: number){
    return this.catalogoFilme[indice];
  }

  editar(indice: number, filmes: Filme){
    this.catalogoFilme[indice] = filmes;
  }

  excluir(indice: number){
    this.catalogoFilme.splice(indice,1);
  }
}
