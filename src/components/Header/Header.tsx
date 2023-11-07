import { FormEvent, ChangeEvent, useState } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { TaskType } from '../../App';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';

interface Props {
  createNewTask: (task: TaskType) => void;
}

export function Header({ createNewTask }: Props) {
  const [newTaskText, setNewTaskText] = useState('');

  const isNewTaskTextEmpty = newTaskText.length === 0;

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value.trimStart());
  }

  function handleCreateNeweTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.floor(Math.random() * 999999),
      content: newTaskText,
      done: false,
      created_at: new Date()
    };

    createNewTask(newTask);
    setNewTaskText('');
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="Logotipo Todo" />

        <form className={styles.form} onSubmit={handleCreateNeweTask}>
          <input
            type="text"
            value={newTaskText}
            onChange={handleNewTaskText}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" disabled={isNewTaskTextEmpty}>
            Criar <PlusCircle size={20} />
          </button>
        </form>
      </div>
    </header>
  );
}
