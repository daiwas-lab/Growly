import { Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './App.styles';
import { useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { TaskInput } from './components/TaskInput';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const [taskText, setTaskText] = useState<string>('');
  const { tasks, handleAddTask, handleDeleteTask, handleToggleTask } = useTasks();

  const onAddTask = () => {
    if (taskText.trim() === '') return;
    handleAddTask(taskText);
    setTaskText('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Growly</Text>

          <TaskInput
            taskText={taskText}
            setTaskText={setTaskText}
            onAddTask={onAddTask}
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
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
