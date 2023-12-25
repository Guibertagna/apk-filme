import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    loadChildren: () => import('./view/filmes/filmes.module').then( m => m.FilmesPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./view/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./view/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/usuario/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/usuario/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/usuario/signup/signup.module').then( m => m.SignupPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
