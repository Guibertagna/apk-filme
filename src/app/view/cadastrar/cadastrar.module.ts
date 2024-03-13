import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import { ComponentsModule } from 'src/app/components/components.module';
@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastrarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CadastrarPage]
})
export class CadastrarPageModule {}
