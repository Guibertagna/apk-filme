import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Filme from 'src/app/model/entities/Filme';

import { FirebaseService } from 'src/app/service/firebase-service.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
  catalogoFilme : Filme [] = [];
  
  
  constructor(private router : Router,
    private firebaseService: FirebaseService) {
     this.firebaseService.buscarTodos()
     .subscribe(res => {
       this.catalogoFilme= res.map(filme => {
         return{
           id: filme.payload.doc.id,
           ...filme.payload.doc.data()as any
         }as Filme;
       })
     })
     

   }
   ngOnInit(): void {
       
   }
 
   irParaCadastrarPage(){
     this.router.navigate(['/cadastrar']);
   }
 
   editar(filme: Filme){
     this.router.navigateByUrl("/detalhes",
     {state: {filme:filme}});
   }
 
 }
 
