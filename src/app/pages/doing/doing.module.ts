import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';
import { SharedModule } from '../../shared/shared.module';

import { DoingPageRoutingModule } from './doing-routing.module';

import { DoingPage } from './doing.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DoingPageRoutingModule
  ],
  declarations: [DoingPage]
})
export class DoingPageModule {}
