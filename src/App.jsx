import { useState } from 'react'

import './App.css'
import Footer from './components/Footer'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setfilter] = useState('')

  return (
    <section className="todoapp">
      <TaskForm
        updateTasks={(task) => {
          setTasks((prevTasks) => [...prevTasks, task])
        }}
      />
      <section className="main">
        <TaskList>
          {tasks
            .filter((val) => val.status === filter || filter === '')
            .map((val, idx) => (
              <Task
                updateTasks={(newVal, oldIdx) => {
                  setTasks((prevTasks) =>
                    prevTasks.map((val, idx) => {
                      if (idx === oldIdx)
                        return {
                          ...val,
                          ...newVal,
                        }

                      return val
                    })
                  )
                }}
                idx={idx}
                onEdit={(key) => {
                  setTasks((prevTasks) =>
                    prevTasks.map((val, idx) => {
                      if (idx !== key) return val
                      return {
                        ...val,
                        status: 'editing',
                      }
                    })
                  )
                }}
                onDelete={(key) => {
                  setTasks((prevTasks) => prevTasks.filter((val, idx) => idx !== key))
                }}
                status={val.status}
                text={val.name}
                key={idx}
                timer={val.timer}
              />
            ))}
        </TaskList>
        <Footer
          onDelete={() =>
            setTasks((prevTasks) => prevTasks.filter((val) => val.status !== 'completed'))
          }
          selectedFilter={filter}
          onChangeFilter={(filter) => setfilter(filter)}
          tasks={tasks}
        />
      </section>
    </section>
  )
}

export default App
