import { Text, View, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { styles } from '../App.styles';

interface TaskItemProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ item, onToggle, onDelete }: TaskItemProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
          {item.text} {item.completed ? '完了' : '未完了'}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => onToggle(item.id)}
          style={[styles.actionButton, styles.toggleButton, item.completed && styles.completedToggleButton]}
        >
          <Text style={[styles.toggleButtonText, item.completed && styles.completedToggleButtonText]}>
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
