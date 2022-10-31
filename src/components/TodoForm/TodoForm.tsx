import { PlusCircle } from "phosphor-react";
import { useState, ChangeEvent,FormEvent, useRef } from "react";


import styles from './TodoForm.module.css';

interface TaskFormProps {
  onSubmit: (taks: string) => void
}

export function TodoForm({onSubmit}:TaskFormProps){
  const [taskInput, setTaskInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChangeTaskInput(e: ChangeEvent<HTMLInputElement>){
    setTaskInput(e.target.value);
  }

  function handleSubmitNewTask(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    inputRef.current?.focus()
    if (taskInput.trim()!== ''){
      onSubmit(taskInput)
      setTaskInput('')
    }
  }

  return(
    <form onSubmit={handleSubmitNewTask} className={styles.newTaskForm}>
      <input 
        name="task"
        placeholder="Adicione uma nova tarefa" 
        autoFocus
        ref={inputRef}
        onChange={handleChangeTaskInput}
        value={taskInput}
        className={styles.taskInput}
      />
      <button 
        className={styles.newTaskButton}
        type="submit"
        disabled={taskInput.trim()=== ''} 
      >
        Criar
        <PlusCircle weight="bold" size={16} />
      </button>
    </form>
  )
}