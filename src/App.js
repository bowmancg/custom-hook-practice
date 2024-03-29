import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './hooks/use-http';


function App() {
  const [tasks, setTasks] = useState([])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = []

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text })
      }

      setTasks(loadedTasks)
    }
    
    fetchTasks({ url: 'https://http-practice-68dcb-default-rtdb.firebaseio.com/tasks.json' }, transformTasks)
  }, [])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
