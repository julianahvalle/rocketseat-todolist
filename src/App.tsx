import { useState } from "react";
import { Prohibit } from "phosphor-react";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';


import { TaskType } from "./@types";
import { Header } from "./components/Header/Header";
import { TaskContainer } from './components/TaskContainer/TaskContainer';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getItemFromStore, store } from "./utils/store";

export function App() {
  const [tasks,setTasks] = useState<TaskType[]>(
    getItemFromStore({key: 'tasks'}) || [] 
  )

  function storeTasksLocally(tasks: TaskType[]) {
    store({
      key: 'tasks',
      value: tasks
    })
  }

  function handleCreateNewTask(task: string){
    const newId = uuidv4()

    const taskExistsAndIsNotComplete = tasks.find(
      t => t.task === task && !t.completed  
    )
    if (taskExistsAndIsNotComplete) {
      return toast('Essa tarefa já existe!', {
        icon: <Prohibit weight="bold"/>
      })
    }
    const newTasks = [{id:newId, completed:false, task}, ...tasks]
    storeTasksLocally(newTasks)
    setTasks(newTasks)
  }

  function handleCompleteTask(id:string){
    handleDeleteTask(id)
    setTasks(state =>{
      const task = tasks.find(t => t.id === id)!
      const newTasks = task.completed
      ? [{...task, completed:false}, ...state]
      : [...state, {...task, completed:true}]
      storeTasksLocally(newTasks)
      return newTasks
    })
  }

  function handleDeleteTask(id:string) {
    const newTasks = tasks.filter(task => task.id !== id)
    storeTasksLocally(newTasks)
    setTasks(newTasks)
  }

  return (
   <>
    <Header/>
    <main>
      <TodoForm onSubmit={handleCreateNewTask}/>
      <TaskContainer
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
        tasks={tasks}
      />
    </main>
   </>
  )
}


