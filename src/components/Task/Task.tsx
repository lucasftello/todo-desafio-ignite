import { Trash } from '@phosphor-icons/react';
import styles from './Task.module.css';
import { TaskType } from '../../App';

interface Props {
  task: TaskType;
  setTaskAsCompleted: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
}

export function Task({ task, setTaskAsCompleted, deleteTask }: Props) {
  function handleSetTaskAsCompleted() {
    setTaskAsCompleted(task.id);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          onChange={handleSetTaskAsCompleted}
          checked={task.done}
        />
        <span></span>
      </div>
      <p className={task.done ? styles.completed : undefined}>{task.content}</p>
      <button onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
