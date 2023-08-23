import { Injectable } from '@angular/core';
import Filme from '../model/entities/Filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  catalogoFilme : Filme [] = [];

  constructor() { 
    let c1: Filme = new Filme("PINTO GORDO", "adada", 223232,"sasasasa", 1212121)
    let c2: Filme = new Filme("PINTO GORDO", "adada", 223232,"sasasasa", 1212121)
    this.catalogoFilme.push(c1);
    this.catalogoFilme.push(c2);
  }

  obterTodos(): Filme[]{
    return this.catalogoFilme;
  }
}
