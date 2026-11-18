import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';

@NgModule({
  declarations: [TaskCardComponent, TaskFormModalComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [TaskCardComponent, TaskFormModalComponent]
})
export class SharedModule {}
