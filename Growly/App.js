import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './App.styles';
import { useState } from 'react';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  console.log(taskText);

  const handleAddTask = () => {
    const newTasks = { id: Date.now().toString(), text: taskText, completed: false };
    setTasks([...tasks, newTasks]);
    console.log('タスクを追加しました');

    setTaskText('');
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    console.log('タスクを削除しました');
  };

  const handleToggleTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    console.log('タスクを完了しました');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
            {item.text} {item.completed ? '完了' : '未完了'}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => handleToggleTask(item.id)}
            style={[styles.actionButton, styles.toggleButton, item.completed && styles.completedToggleButton]}
          >
            <Text style={[styles.toggleButtonText, item.completed && styles.completedToggleButtonText]}>
              完了
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteTask(item.id)}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Text style={styles.deleteButtonText}>削除</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Growly!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="新しいタスクを入力..."
              placeholderTextColor="#ADB5BD"
              style={styles.input}
              value={taskText}
              onChangeText={setTaskText}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.listTitle}>タスク一覧</Text>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
