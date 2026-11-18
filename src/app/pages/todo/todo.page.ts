import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular/lazy';
import { TaskService } from '../../services/task.service';
import { TaskFormModalComponent } from '../../shared/components/task-form-modal/task-form-modal.component';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: false
})
export class TodoPage {
  tasks$ = this.taskService.todo$;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormModalComponent,
      componentProps: { defaultStatus: 'todo' },
    });
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.taskService.addTask({ ...data, status: 'todo' });
      const toast = await this.toastCtrl.create({
        message: 'Tarefa criada com sucesso',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
    }
  }

  async onMove(event: { id: string; status: TaskStatus }) {
    await this.taskService.moveTask(event.id, event.status);
    const toast = await this.toastCtrl.create({
      message: 'Tarefa movida para Fazendo ✓',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
  
  async onDelete(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir tarefa?',
      message: 'Esta ação não pode ser desfeita.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', role: 'destructive', handler: () => this.taskService.deleteTask(id) },
      ],
    });
    await alert.present();
  }
  
  async onEdit(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormModalComponent,
      componentProps: { task },
    });
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.taskService.updateTask({ ...task, ...data });
    }
  }
}
