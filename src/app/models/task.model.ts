export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string; // UUID gerado no momento da criação
  title: string; // Título obrigatório da tarefa
  description?: string; // Descrição que aparece abaixo do título
  observations?: string; // Observações com o ícone de balão
  comments?: string; // Comentários que aparecem na caixa amarela
  dueDate?: string; // Data de entrega (ISO string)
  status: TaskStatus; // Estágio atual no Kanban
  checklist?: CheckItem[]; // Apenas para tasks com status 'done'
  createdAt: string; // ISO string — para ordenação futura
  updatedAt: string; // ISO string — controle de auditoria
}

export interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}
