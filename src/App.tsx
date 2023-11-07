import { useState } from 'react';
import { ClipboardText } from '@phosphor-icons/react';
import { Header } from './components/Header';
import { Task } from './components/Task';
import styles from './App.module.css';

export interface TaskType {
  id: number;
  content: string;
  done: boolean;
  created_at: Date;
}

export function App() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const totalCreated = taskList.length;
  const totalCompleted = taskList.filter(task => task.done === true).length;

  function createNewTask(task: TaskType) {
    const newTaksList = [...taskList, task];

    newTaksList.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 1;
      }
    });

    setTaskList(newTaksList);
  }

  function setTaskAsCompleted(taskId: number) {
    const tasksWithoutCompleted = taskList.filter(task => task.id !== taskId);

    const completedTask = taskList.find(task => task.id === taskId)!;
    completedTask.done = !completedTask.done;

    const newTaksList = [...tasksWithoutCompleted, completedTask];

    newTaksList.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 1;
      }
    });

    setTaskList(newTaksList);
  }

  function deleteTask(taskId: number) {
    const tasksWithoutDeleted = taskList.filter(task => task.id !== taskId);

    tasksWithoutDeleted.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 1;
      }
    });

    setTaskList(tasksWithoutDeleted);
  }

  return (
    <div>
      <Header createNewTask={createNewTask} />

      <main className={styles.container}>
        <div className={styles.tasks}>
          <header className={styles.info}>
            <div className={styles.created}>
              <strong>Tarefas criadas</strong>
              <span>{totalCreated}</span>
            </div>
            <div className={styles.done}>
              <strong>Concluídas</strong>
              <span>{totalCompleted}</span>
            </div>
          </header>

          <div className={styles.taskList}>
            {taskList.length > 0 ? (
              taskList.map(task => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    setTaskAsCompleted={setTaskAsCompleted}
                    deleteTask={deleteTask}
                  />
                );
              })
            ) : (
              <div className={styles.emptyList}>
                <ClipboardText size={56} />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
