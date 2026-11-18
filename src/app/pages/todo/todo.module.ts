import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';
import { SharedModule } from '../../shared/shared.module';

import { TodoPageRoutingModule } from './todo-routing.module';

import { TodoPage } from './todo.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
