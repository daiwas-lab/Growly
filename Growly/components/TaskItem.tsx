import { Text, View, TouchableOpacity } from 'react-native';
import { Task } from '../models/Task';
import { styles } from '../App.styles';

interface TaskItemProps {
  item: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({ item, onToggle, onDelete }: TaskItemProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskText, item.isDone && styles.completedTaskText]}>
          {item.text} ({item.statusLabel})
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => onToggle(item.id)}
          style={[styles.actionButton, styles.toggleButton, item.isDone && styles.completedToggleButton]}
        >
          <Text style={[styles.toggleButtonText, item.isDone && styles.completedToggleButtonText]}>
            完了
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.deleteButtonText}>削除</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
