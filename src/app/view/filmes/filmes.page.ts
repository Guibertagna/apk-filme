import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Filme from 'src/app/model/entities/Filme';
import { AuthserviceService } from 'src/app/model/service/authservice.service';
import { FirebaseService } from 'src/app/model/service/firebase-service.service';
@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
  user : any;
  catalogoFilme : Filme [] = [];
 
  
  constructor(private router : Router, private firebaseService: FirebaseService, private authService : AuthserviceService, private alertService : AlertService ) {
this.user = this.authService.getUserLogged()
console.log(authService.getUserLogged())
         console.log(this.catalogoFilme)
this.firebaseService.read(this.user.uid)
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
 
   getCorAvaliacao(avaliacao: string): string {
    switch (avaliacao) {
      case 'Bom':
        return 'green';
      case 'Mediano':
        return 'yellow';
      case 'Ruim':
        return 'red';
      default:
        return 'black'; 
    }
  }
  async fazerLogout() {
    try {
      this.alertService.simpleLoader(); 
      await this.authService.signOut(); 
      this.router.navigate(['/signin']); 
      this.alertService.presentAlert("Deslogar", "Sucesso ao Deslogar!")
      setTimeout(() => {
        this.alertService.dismissLoader();
      }, 500);
    } catch (error) {
      this.alertService.presentAlert("Deslogar", "Erro ao Deslogar!")
      this.alertService.dismissLoader();
    }
  }
  }
  

 
