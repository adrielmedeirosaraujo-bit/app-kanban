import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular/lazy';
import { TaskService } from '../../services/task.service';
import { TaskFormModalComponent } from '../../shared/components/task-form-modal/task-form-modal.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
  standalone: false
})
export class DonePage {
  tasks$ = this.taskService.done$;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

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

  async toggleCheckItem(task: Task, itemId: string) {
    const updatedTask: Task = {
      ...task,
      checklist: task.checklist?.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };
    await this.taskService.updateTask(updatedTask);
  }

  async addCheckItemPrompt(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Novo Item',
      inputs: [{ name: 'label', type: 'text', placeholder: 'Descrição do item' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Adicionar', 
          handler: async (data) => {
            if (data.label) {
              await this.addCheckItem(task, data.label);
            }
          }
        },
      ],
    });
    await alert.present();
  }

  async addCheckItem(task: Task, label: string) {
    const newItem = {
      id: crypto.randomUUID(),
      label,
      checked: false,
    };
    const updatedTask: Task = {
      ...task,
      checklist: [...(task.checklist ?? []), newItem],
    };
    await this.taskService.updateTask(updatedTask);
  }

  getChecklistProgress(task: Task): number {
    if (!task.checklist || task.checklist.length === 0) return 0;
    const completed = task.checklist.filter(i => i.checked).length;
    return completed / task.checklist.length;
  }
}
