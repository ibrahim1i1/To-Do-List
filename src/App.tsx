import { useEffect, useMemo, useRef, useState } from 'react';
import type { TaskList } from './types/Task';
import './index.css';
function App() {
    const [tasks, setTasks] = useState<TaskList>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });


    const newTaskRef = useRef<HTMLInputElement>(null);
    const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })

    const handleAddTask = () => {
        const text = newTaskRef.current?.value;
        if (!text) return;
        setTasks(prev => [...prev, { id: prev.length + 1, completed: false, text }]);
        newTaskRef.current!.value = '';
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
             handleAddTask()
        }        
    };


    const handleToggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const handleDeleteTask = (id: number) => {
        setTasks((prev) => prev.filter(task => task.id !== id));
    };
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='max-w-md flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>Todo List</h1>
                <div>
                    <input onKeyDown={handleKeyDown} ref={newTaskRef} className='border-b-2 border-gray-300 py-1 px-2' type="text" placeholder='Add a new task' />
                    <button onClick={handleAddTask} className='bg-gray-900 text-white py-1 px-2.5 mx-1 rounded-md'>+</button>
                </div>
                {tasks.map((task) => (
                    <div className='border border-gray-200 p-2 rounded-md flex justify-between' key={task.id}>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} />
                            <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
                        </div>
                        <button onClick={() => handleDeleteTask(task.id)}>❌</button>
                    </div>
                ))}
                <div >Remaining tasks: {remainingTasks}</div>
            </div>
        </div>
    )
}

export default App;
