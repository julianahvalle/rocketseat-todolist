import { Trash } from "phosphor-react";
import { TaskType } from '../../@types';
import { useRef } from 'react';
import styles from './Task.module.css';

interface TaskProps{
  task: TaskType
  onCompleteTask: (id:string) => void
  onDeleteTask: (id:string) => void
}

export function Task({task, onDeleteTask, onCompleteTask}: TaskProps){
  const inputRef = useRef<HTMLInputElement>(null)

  function changeInputChecked(){
    const input = inputRef.current!
    if (input.checked){
      input.checked = false
    } else {
      input.checked = true
    }
  }

  function completeTask(){
    changeInputChecked()
    onCompleteTask(task.id)
  }

  function deleteTask(){
    return onDeleteTask(task.id)
  }

  return (
    <div className={styles.taskCard}>
        <label className={styles.taskInput}>
          <input 
            ref={inputRef}
            onChange={completeTask}
            defaultChecked={task.completed}
            checked={task.completed}
            name={task.id}
            type="checkbox"
          />
          <span className={styles.checkbox}></span>
          <p
            className={`${styles.task} 
            ${
              task.completed && `${styles.taskChecked}`
            }`}
          >
            {task.task}
          </p>
          </label>
       
      
        <button
          className={styles.taskDelete}
          onClick={deleteTask}
        >
          <Trash size={32}/>
        </button>
      </div>
  )
}