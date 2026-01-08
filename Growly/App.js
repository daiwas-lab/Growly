import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
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
      <View>
        <Text>{item.text} {item.completed ? '完了' : '未完了'}</Text>
        <View>
          <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
            <Text>完了</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Text>削除</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Growly!</Text>
      <TextInput placeholder="タスクを入力" style={styles.input} value={taskText} onChangeText={setTaskText} />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>

      <View>
        <Text>タスク一覧</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
