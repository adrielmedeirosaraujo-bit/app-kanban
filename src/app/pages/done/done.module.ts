import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';
import { SharedModule } from '../../shared/shared.module';

import { DonePageRoutingModule } from './done-routing.module';

import { DonePage } from './done.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DonePageRoutingModule
  ],
  declarations: [DonePage]
})
export class DonePageModule {}
