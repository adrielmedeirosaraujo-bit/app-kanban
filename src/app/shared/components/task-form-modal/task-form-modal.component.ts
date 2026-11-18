import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular/lazy';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  standalone: false
})
export class TaskFormModalComponent implements OnInit {
  @Input() task?: Task;
  @Input() defaultStatus: TaskStatus = 'todo';

  form!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.task?.title ?? '', [Validators.required, Validators.maxLength(100)]],
      description: [this.task?.description ?? ''],
      observations: [this.task?.observations ?? ''],
      comments: [this.task?.comments ?? ''],
      dueDate: [this.task?.dueDate ?? ''],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }

  submit() {
    if (this.form.invalid) return;
    this.modalCtrl.dismiss(this.form.value);
  }
}
