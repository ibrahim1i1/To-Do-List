import { useMemo, useState } from 'react';
import type { TaskList } from './types/Task';
import './index.css';

function App() {
  const [tasks, setTasks] = useState<TaskList>([{id:1, completed:false, text: 'buy phone'}, {id:1, completed:false, text: 'buy phone'}, {id:1, completed:false, text: 'buy phone'}])
  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  return (
    <div>
      <div>
        <h1>Todo List</h1>

        <input type="text" placeholder='Add a new task' />
        <button>+</button>

        {tasks.map((task) =>(
          <div key={task.id}>
            <input type="checkbox" checked={task.completed} />
            <span>{task.text}</span>
            <button>-</button>
          </div>
        ))}
        <div >Remaining tasks: {remainingTasks}</div>
      </div>
    </div>
  )
}

export default App;
