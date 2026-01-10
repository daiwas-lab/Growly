import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 52,
    height: 52,
    borderRadius: 12,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#ADB5BD',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
  },
  toggleButton: {
    backgroundColor: '#E7F5FF',
  },
  completedToggleButton: {
    backgroundColor: '#F1F3F5',
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
  },
  toggleButtonText: {
    color: '#228BE6',
    fontSize: 12,
    fontWeight: '700',
  },
  completedToggleButtonText: {
    color: '#868E96',
  },
  deleteButtonText: {
    color: '#FA5252',
    fontSize: 12,
    fontWeight: '700',
  },
});
