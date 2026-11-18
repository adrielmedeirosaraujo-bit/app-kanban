import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular/lazy';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: false,
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() moveTask = new EventEmitter<{ id: string; status: TaskStatus }>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  constructor(private actionSheetCtrl: ActionSheetController) {}

  get nextStatus(): TaskStatus | null {
    const map: Record<TaskStatus, TaskStatus | null> = {
      todo: 'doing',
      doing: 'done',
      done: null,
    };
    return map[this.task.status];
  }

  get nextStatusLabel(): string {
    const map: Record<string, string> = {
      doing: 'Mover para Fazendo',
      done: 'Mover para Concluído',
    };
    return this.nextStatus ? map[this.nextStatus] : '';
  }

  onMove() {
    if (this.nextStatus) {
      this.moveTask.emit({ id: this.task.id, status: this.nextStatus });
    }
  }

  async openMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções da Tarefa',
      buttons: [
        {
          text: 'Editar',
          icon: 'pencil-outline',
          handler: () => {
            this.editTask.emit(this.task);
          }
        },
        {
          text: 'Excluir',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteTask.emit(this.task.id);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
