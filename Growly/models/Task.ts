import * as SQLite from 'expo-sqlite';
import { BaseModel } from './BaseModel';

export type TaskStatus = typeof Task.STATUS[keyof typeof Task.STATUS];

export class Task extends BaseModel {
  static readonly STATUS = {
    TODO: 'todo',
    DOING: 'doing',
    DONE: 'done',
  } as const;

  id: number;
  text: string;
  status: TaskStatus;

  constructor(id: number, text: string, status: TaskStatus) {
    super();
    this.id = id;
    this.text = text;
    this.status = status;
  }

  // 完了しているかどうか
  get isDone(): boolean {
    return this.status === Task.STATUS.DONE;
  }

  // ステータスの表示名
  get statusLabel(): string {
    const labels: Record<TaskStatus, string> = {
      [Task.STATUS.TODO]: '未完了',
      [Task.STATUS.DOING]: '進行中',
      [Task.STATUS.DONE]: '完了',
    };
    return labels[this.status];
  }

  // 静的メソッド: 全件取得
  static async all(db: SQLite.SQLiteDatabase): Promise<Task[]> {
    const rows = await db.getAllAsync<any>('SELECT * FROM tasks');
    return rows.map(row => new Task(row.id, row.text, row.status as TaskStatus));
  }

  // 静的メソッド: 新規作成
  static async create(db: SQLite.SQLiteDatabase, text: string): Promise<Task> {
    const result = await db.runAsync(
      'INSERT INTO tasks (text, status) VALUES (?, ?)',
      [text, Task.STATUS.TODO]
    );
    return new Task(result.lastInsertRowId, text, Task.STATUS.TODO);
  }

  // インスタンスメソッド: ステータス切替
  async toggle(db: SQLite.SQLiteDatabase): Promise<TaskStatus> {
    const nextStatus = this.isDone ? Task.STATUS.TODO : Task.STATUS.DONE;
    await db.runAsync(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [nextStatus, this.id]
    );
    this.status = nextStatus;
    return nextStatus;
  }

  // インスタンスメソッド: 削除
  async destroy(db: SQLite.SQLiteDatabase): Promise<void> {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [this.id]);
  }
}
