import { useState } from 'react';
import Header from './component/Header';
import Task from './component/Tasks';
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

  return (
    <div className='container'>
      <Header />
      <Task tasks={tasks}/>
    </div>
  );
}

export default App;
