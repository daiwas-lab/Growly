import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { initDatabase } from '../db';
import { Task } from '../models/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  // 初回起動時にDBを初期化し、データを読み込む
  useEffect(() => {
    const setup = async () => {
      const database = await initDatabase();
      setDb(database);
      await loadTasks(database);
    };
    setup();
  }, []);

  const loadTasks = async (database: SQLite.SQLiteDatabase) => {
    const taskInstances = await Task.all(database);
    setTasks(taskInstances);
  };

  const handleAddTask = async (text: string) => {
    if (!db || text.trim() === '') return;

    const newTask = await Task.create(db, text);
    setTasks((prev) => [...prev, newTask]);
    console.log(`DBにタスクを追加しました (ID: ${newTask.id}, Status: ${newTask.status})`);
  };

  const handleDeleteTask = async (id: number) => {
    if (!db) return;

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await task.destroy(db);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    console.log(`DBからタスクを削除しました (ID: ${id})`);
  };

  const handleToggleTask = async (id: number) => {
    if (!db) return;
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await task.toggle(db);
    // クラスのインスタンスはミュータブルですが、Reactの再レンダリングを確実に走らせるためにクローンを渡します
    setTasks((prev) => prev.map((t) => (t.id === id ? task.clone() : t)));
    console.log(`DBのタスク状態を更新しました (ID: ${id}, Status: ${task.status})`);
  };

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleTask,
  };
};
