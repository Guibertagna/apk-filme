import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmesComponentComponent } from './filmes-component/filmes-component.component';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { CadastrarComponentComponent } from './cadastrar-component/cadastrar-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalharComponentComponent } from './detalhar-component/detalhar-component.component';



@NgModule({
  declarations: [FilmesComponentComponent, EmptyScreenComponent, LoadingScreenComponent , CadastrarComponentComponent, DetalharComponentComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule
  ],
  exports:[FilmesComponentComponent, EmptyScreenComponent, LoadingScreenComponent , CadastrarComponentComponent,DetalharComponentComponent]
})
export class ComponentsModule { }
