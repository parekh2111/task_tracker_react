// @ts-nocheck
import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Task from './component/Tasks';
import AddTask from './component/AddTask';
import About from './component/About';

function App () {
	const [showAddTask, setShowAddTaskBtn] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const taskFromServer = await fetchTasks();
			setTasks(taskFromServer);
		};
		getTasks();
	}, []);

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		return data;
	};

	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(task),
		});
		const data = await res.json();
		setTasks([...tasks, data]);
		/*
		const id = Math.floor(Math.random() * 10000) + 1
		const newTask = { id, ...task }
		setTasks([...tasks, newTask])
		*/
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });

		setTasks(tasks.filter((task) => task.id !== id));
		console.log('delete', id);
	};

	// Toggel Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(updTask),
		});
		const data = await res.json();

		setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
	};

	return (
		<Router>
			<div className='container'>
				<Header onAdd={() => setShowAddTaskBtn(!showAddTask)} showAdd={showAddTask} />
				<Route
					path='/'
					exact
					render={(props) => (
						<Fragment>
							{showAddTask && <AddTask onAdd={addTask} />}
							{tasks.length > 0 ? (
								<Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
							) : (
								'No Task To Show'
							)}
						</Fragment>
					)}
				/>
				<Route path='/about' component={About} />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
