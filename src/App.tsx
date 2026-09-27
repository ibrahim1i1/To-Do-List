import { useMemo, useState } from 'react';
import type { TaskList } from './types/Task';
import './index.css';

function App() {
  const [tasks, setTasks] = useState<TaskList>([{id:1, completed:false, text: 'buy phone'}, {id:1, completed:false, text: 'buy phone'}, {id:1, completed:false, text: 'buy phone'}])
  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  return (
    <div className='min-h-screen flex justify-center items-center '>
      <div className='max-w-md flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Todo List</h1>
        <div>
          <input className='border-b-2 border-gray-300 py-1 px-2' type="text" placeholder='Add a new task' />
          <button className='bg-gray-900 text-white py-1 px-2.5 mx-1 rounded-md'>+</button>
        </div>
        {tasks.map((task) =>(
          <div className='border-1 border-gray-200 p-2 rounded-md flex justify-between' key={task.id}>
            <div className='flex items-center gap-2'>
              <input type="checkbox" checked={task.completed} />
              <span>{task.text}</span>
            </div>
            <button>❌</button>
          </div>
        ))}
        <div >Remaining tasks: {remainingTasks}</div>
      </div>
    </div>
  )
}

export default App;
