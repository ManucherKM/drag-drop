import { useState } from 'react'
import './App.css'

const App = () => {
	const [tables, setTables] = useState([
		{
			id: Math.random(),
			title: 'JS',
			tasks: [
				{ id: Math.random(), text: 'JS One' },
				{ id: Math.random(), text: 'JS Two' },
				{ id: Math.random(), text: 'JS Three' },
			],
		},
		{
			id: Math.random(),
			title: 'Python',
			tasks: [
				{ id: Math.random(), text: 'Python One' },
				{ id: Math.random(), text: 'Python Two' },
				{ id: Math.random(), text: 'Python Three' },
			],
		},
		{
			id: Math.random(),
			title: 'C#',
			tasks: [
				{ id: Math.random(), text: 'C# One' },
				{ id: Math.random(), text: 'C# Two' },
				{ id: Math.random(), text: 'C# Three' },
			],
		},
	])

	const [currTask, setCurrTask] = useState(null)
	const [nextTask, setNextTask] = useState(null)

	function start(task) {
		setCurrTask(task)
	}

	function over(task) {
		setNextTask(task)
	}

	function leave(task) {
		setNextTask(task)
	}

	function end() {
		const newTables = tables.map(tbl => {
			const idxCurr = tbl.tasks.findIndex(tgt => currTask.id === tgt.id)

			if (idxCurr !== -1) {
				tbl.tasks.splice(idxCurr, 1)
			}

			const idxNext = tbl.tasks.findIndex(tgt => nextTask.id === tgt.id)

			if (idxNext !== -1) {
				tbl.tasks.splice(idxNext + 1, 0, currTask)
			}

			return tbl
		})

		setTables(newTables)
	}

	return (
		<div className='App'>
			{tables.map(tbl => (
				<div className='table' key={tbl.id}>
					<h1>{tbl.title}</h1>
					{tbl.tasks.map(tsk => (
						<div
							onDragStart={() => start(tsk)}
							onDragOver={() => over(tsk)}
							onDragLeave={() => leave(tsk)}
							onDragEnd={end}
							draggable={true}
							className='table__item'
							key={tsk.id}
						>
							{tsk.text}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default App
