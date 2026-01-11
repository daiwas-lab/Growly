import * as SQLite from 'expo-sqlite';
import { Task } from './models/Task';

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('growly.db');

  await db.execAsync(`
    -- データベースの設定
    PRAGMA journal_mode = WAL;

    -- タスク一覧
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- 一意識別子
      text TEXT NOT NULL,                   -- 内容
      -- ステータス (Task.STATUS.TODO, Task.STATUS.DOING, Task.STATUS.DONE)
      status TEXT NOT NULL DEFAULT '${Task.STATUS.TODO}'
    );
  `);

  return db;
};
