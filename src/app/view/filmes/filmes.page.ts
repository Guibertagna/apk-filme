import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  user: any;
  catalogoFilme: Filme[] = [];
  filteredFilmes: Filme[] = [];
  isLoading: boolean = false;
  isSearching: boolean = false; // Adicione a propriedade isSearching
  query: string = '';
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef; // Defina a propriedade sInput

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthserviceService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    setTimeout(() => { 
      if (this.searchInput) { // Certifique-se de que searchInput foi definido antes de chamar setFocus
        this.searchInput.nativeElement.setFocus();
      }
    }, 500);

    this.user = this.authService.getUserLogged();
    this.firebaseService.read(this.user.uid).subscribe((res) => {
      this.catalogoFilme = res.map((filme) => {
        return {
          id: filme.payload.doc.id,
          ...(filme.payload.doc.data() as any),
        } as Filme;
      });
      this.isLoading = true;
    });
  }

  irParaCadastrarPage() {
    this.router.navigate(['/cadastrar']);
  }

  editar(filme: Filme) {
    this.router.navigateByUrl('/detalhes', { state: { filme: filme } });
  }

  async fazerLogout() {
    try {
      this.alertService.simpleLoader();
      await this.authService.signOut();
      this.router.navigate(['/signin']);
      this.alertService.presentAlert('Deslogar', 'Sucesso ao Deslogar!');
      setTimeout(() => {
        this.alertService.dismissLoader();
      }, 500);
    } catch (error) {
      this.alertService.presentAlert('Deslogar', 'Erro ao Deslogar!');
      this.alertService.dismissLoader();
    }
  }

  // Corrija o tipo de evento e ajuste a lógica de pesquisa
  onSearchChange(event: any) {
    const query = event.detail.value.toLowerCase();
    if (query.trim() === '') {
      this.filteredFilmes = this.catalogoFilme;
      this.isSearching = false;
      this.isLoading = true;
    } else {
      this.filteredFilmes = this.catalogoFilme.filter((element: any) => {
        return element.titulo.includes(query);
      });
      this.isSearching = true;
    }
  }

}
