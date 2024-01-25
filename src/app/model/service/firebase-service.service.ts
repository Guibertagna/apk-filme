import { Injectable } from '@angular/core';
import Filme from '../entities/Filme'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'filme';

  constructor(private angularFirestore: AngularFirestore, private storage : AngularFireStorage) { }

  buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }
  cadastrarFilme(filme : Filme){
    return this.angularFirestore.collection(this.PATH)
    .add({titulo: filme.titulo, anoLancamento: filme.anoLancamento, genero: filme.genero, avaliacao: filme.avaliacao, duracao: filme.duracao, uid: filme.uid});
  }

  cadastrarFilmeAvatar(filme : Filme){
    return this.angularFirestore.collection(this.PATH)
    .add({titulo: filme.titulo, anoLancamento: filme.anoLancamento, genero: filme.genero, avaliacao: filme.avaliacao, duracao: filme.duracao, downloadURL : filme.downloadURL, uid: filme.uid});
  }


  editarFilme(filme: Filme, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({titulo: filme.titulo, anoLancamento: filme.anoLancamento, duracao: filme.duracao, genero: filme.genero, avaliacao: filme.avaliacao, uid: filme.uid})
  }

  
  read(uid: string){
    return this.angularFirestore.collection(this.PATH, ref => ref.where('uid','==', uid)).snapshotChanges();

  }

  editarFilmeAvatar(filme: Filme, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      titulo: filme.titulo, anoLancamento: filme.anoLancamento, genero: filme.genero, avaliacao: filme.avaliacao, duracao: filme.duracao, downloadURL : filme.downloadURL
    })
  }
  uploadImage(imagem: any, filme: Filme) { 
      const file = imagem.item(0);
      if (file.type.split('/')[0] !== 'image') {
        console.error('Formato de arquivo não suportado');
        return;
      }
  
      const path = `imagens/${filme.titulo}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path, file);
  
      task.snapshotChanges().pipe(finalize(() => {
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(
          resp => {
            filme.downloadURL = resp;
            if (!filme.id) {
              this.cadastrarFilmeAvatar(filme);
            } else {
              this.editarFilmeAvatar(filme, filme.id);
            }
          })
        })).subscribe();
    };
  
  

  excluirFilme(filme: Filme){
    return this.angularFirestore.collection(this.PATH)
    .doc(filme.id)
    .delete()
  }

}