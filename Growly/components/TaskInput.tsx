import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../App.styles';

interface TaskInputProps {
  taskText: string;
  setTaskText: (text: string) => void;
  onAddTask: () => void;
}

export const TaskInput = ({ taskText, setTaskText, onAddTask }: TaskInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="新しいタスクを入力..."
        placeholderTextColor="#ADB5BD"
        style={styles.input}
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
