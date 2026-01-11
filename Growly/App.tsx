import { Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './App.styles';
import { useState } from 'react';
import { Task } from './types';
import { TaskItem } from './components/TaskItem';
import { TaskInput } from './components/TaskInput';

export default function App() {
  const [taskText, setTaskText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    const newTask: Task = { id: Date.now().toString(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    console.log('タスクを追加しました');

    setTaskText('');
  };

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    console.log('タスクを削除しました');
  };

  const handleToggleTask = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    console.log('タスクを完了しました');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Growly</Text>

          <TaskInput
            taskText={taskText}
            setTaskText={setTaskText}
            onAddTask={handleAddTask}
          />

          <Text style={styles.listTitle}>タスク一覧</Text>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskItem
                item={item}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
