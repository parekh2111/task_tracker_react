import { useState } from 'react';
import Header from './component/Header';
import Task from './component/Tasks';
import AddTask from './component/AddTask';

function App () {
  	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'learning React',
			day: '19th April',
			reminder: true,
		},
		{
			id: 2,
			text: 'learning C# & C++ ',
			day: '20th April',
			reminder: true,
		},
		{
			id: 3,
			text: 'learning Java',
			day: '21th April',
			reminder: true,
		},
	]);
	// Add Task 
	const addTask = (task) => {
		console.log(task)
	}

	// Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task)=> task.id !== id))
    console.log('delete', id)
	}
	
	// Toggel Reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) => task.id === id
				? { ...task, reminder: !task.reminder }
				: task))
	}

  return (
    <div className='container'>
			<Header />
			<AddTask onAdd={addTask}/>
			{tasks.length > 0
				? <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
				: ('No Task To Show')}
    </div>
  );
}

export default App;
