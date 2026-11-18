import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'kanban_tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];

  private todoSubject = new BehaviorSubject<Task[]>([]);
  private doingSubject = new BehaviorSubject<Task[]>([]);
  private doneSubject = new BehaviorSubject<Task[]>([]);

  todo$ = this.todoSubject.asObservable();
  doing$ = this.doingSubject.asObservable();
  done$ = this.doneSubject.asObservable();

  constructor(private storageService: StorageService) {}

  async loadTasks(): Promise<void> {
    const saved = await this.storageService.get<Task[]>(STORAGE_KEY);
    this.tasks = saved ?? [];
    this.broadcast();
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    await this.persist();
  }

  async moveTask(id: string, newStatus: TaskStatus): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();

    if (newStatus === 'done' && !task.checklist) {
      task.checklist = [];
    }
    
    await this.persist();
  }

  async updateTask(updated: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === updated.id);
    if (index === -1) return;
    
    this.tasks[index] = { ...updated, updatedAt: new Date().toISOString() };
    await this.persist();
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.persist();
  }

  private broadcast(): void {
    this.todoSubject.next(this.tasks.filter(t => t.status === 'todo'));
    this.doingSubject.next(this.tasks.filter(t => t.status === 'doing'));
    this.doneSubject.next(this.tasks.filter(t => t.status === 'done'));
  }

  private async persist(): Promise<void> {
    await this.storageService.set(STORAGE_KEY, this.tasks);
    this.broadcast();
  }
}
