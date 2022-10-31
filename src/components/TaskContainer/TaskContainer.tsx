import { TaskType } from "../../@types";
import { Task } from "../Task/Task";

import styles from './TaskContainer.module.css';
import { ClipboardText } from "phosphor-react";

interface TaskContainerProps {
  tasks: TaskType[]
  onCompleteTask: (id: string) => void
  onDeleteTask: (id:string) => void
}

export function TaskContainer({tasks, onDeleteTask, onCompleteTask}: TaskContainerProps){
  const completedTasks = tasks.filter(task => task.completed).length

  return(
     <section className={styles.taskContainer}>
      <header className={styles.taskCounterContainer}>
        <p className={styles.taskCreatedCounter}>
          Tarefas criadas
          <button>{tasks.length}</button>
        </p>
        
        <p className={styles.taskConcludedCounter}>
          Concluídas{' '}
          <button>
            {completedTasks > 0 
              ? `${completedTasks} de ${tasks.length}`
              : completedTasks}
          </button>
        </p>
      </header>
       {tasks.length <= 0 ? (
        <div className={styles.noTasks}>
        <ClipboardText size={56} />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong> 
          <br/>
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
       ) : (
        tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
          />
        ))
       )}
    </section>
  )
}