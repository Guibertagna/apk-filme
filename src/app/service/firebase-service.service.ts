import { Injectable } from '@angular/core';
import Filme from '../model/entities/Filme';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'filme';

  constructor(private angularFirestore: AngularFirestore) { }

  buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(filme : Filme){
    return this.angularFirestore.collection(this.PATH)
    .add({titulo: filme.titulo, anoLancamento: filme.anoLancamento, genero: filme.genero, avaliacao: filme.avaliacao, duracao: filme.duracao});
  }

  editarFilme(filme: Filme, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      titulo: filme.titulo, anoLancamento: filme.anoLancamento, genero: filme.genero, avaliacao: filme.avaliacao, duracao: filme.duracao
    })
  }

  excluirFilme(filme: Filme){
    return this.angularFirestore.collection(this.PATH)
    .doc(filme.id)
    .delete()
  }

}