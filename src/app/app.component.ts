import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.storageService.init();
    await this.taskService.loadTasks();
  }
}
