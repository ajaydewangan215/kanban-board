import React, { useState } from "react";
import "./style.css"

export default function KanbanBoard() { 

	let [tasks, setTasks] = useState([
		{ name: 'Task 1', stage: 0 },
		{ name: 'Task 2', stage: 0 },
	])

	// eslint-disable-next-line
	let [stagesNames, setStagesNames] = useState(['Backlog', 'To Do', 'Ongoing', 'Done']);
	let [inputValue, setInputValue] = useState('');

  const CreateNewTask = () => {
    setTasks([...tasks, {name: inputValue, stage: 0}]);
    setInputValue('');
  }

  const moveForward = (currentStage, taskname) => {
    if(currentStage !== 3 ) {
      let newArr = tasks.filter(ele => ele.name===taskname ? ele.stage += 1 : ele)
      setTasks(newArr)
    }
  }

  const moveBack = (currentStage, taskname) => {
    if(currentStage !== 0 ) {
      let newArr = tasks.filter(ele => ele.name===taskname ? Number.isFinite(ele.stage -= 1) : ele)
	  console.log(newArr)
      setTasks(newArr)
    }
  }

  const deleteItem = (taskname) => {
    let newArr = tasks.filter(ele => ele.name !== taskname)
    setTasks(newArr)
  }

	let stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}
	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
  	}

	return (
		<div className="layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
				<input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
				<button type="submit" className="ml-30" data-testid="create-task-button" onClick={CreateNewTask}>Create task</button>
			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={()=>moveBack(task.stage, task.name)}>
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={()=>moveForward(task.stage, task.name)}>
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={() => deleteItem(task.name)}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}