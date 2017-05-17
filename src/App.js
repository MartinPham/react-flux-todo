import React, { Component } from 'react';
import { Dispatcher } from 'flux';


import { AppBar, FloatingActionButton, Dialog, RaisedButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

import { TaskStore } from './TaskStore';
import { Task } from './Task';

import './index.css';

const taskStore = new TaskStore();
const dispatcher = new Dispatcher();

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskForm_Open: false,
			confirmDialog_Open: false,
			currentTask: new Task(),
			tasks: taskStore.findAll()
		};

		dispatcher.register(( payload ) => {
			switch( payload.action ) {
				case 'UPDATE_TASK':
					taskStore.persist(payload.data.task);
					break;
				case 'DELETE_TASK':
					taskStore.remove(payload.data.task);
					break;

				default:
					break;	
			}
		}); 

		taskStore.on('CREATED', () => {
			this.setState({
				currentTask: new Task(),
				taskForm_Open: false,
				tasks: taskStore.findAll()
			});
			
		});
		taskStore.on('UPDATED', () => {
			this.setState({
				tasks: taskStore.findAll(),
				taskForm_Open: false
			});
		});
		taskStore.on('DELETED', () => {
			this.setState({
				confirmDialog_Open: false,
				taskForm_Open: false
			});
			
			this.setState({
				currentTask: new Task(),
				tasks: taskStore.findAll()
			});
		});
	}

	taskForm_Submit = (data) => {
		dispatcher.dispatch({
			action: 'UPDATE_TASK',
			data: { 
				task: data.task
			}
		});
	}

	taskForm_Cancel = () => {
		this.setState({
			taskForm_Open: false,
			currentTask: new Task()
		});
	}

	taskForm_Delete = (data) => {
		this.setState({
			confirmDialog_Open: true
		});
	}

	taskList_ItemClick = (data) => {
		this.setState({
			taskForm_Open: true,
			currentTask: data.task
		});
	}
	taskList_ItemActionClick = (data) => {
		this.setState({
			currentTask: data.task
		});
		return this.taskForm_Delete(data);
	}
	taskList_ItemCheck = (data) => {
		dispatcher.dispatch({
			action: 'UPDATE_TASK',
			data: { 
				task: data.task
			}
		});
	}

	addTaskButton_TouchTap = () => {
		this.setState({
			taskForm_Open: true
		});
	}


	confirmDialog_Cancel = () => {
		this.setState({
			confirmDialog_Open: false
		});
	};

	confirmDialog_Delete = () => {
		if(this.state.currentTask.getId() === null)
		{
			return this.TaskForm_Cancel();
		}

		dispatcher.dispatch({
			action: 'DELETE_TASK',
			data: { 
				task: this.state.currentTask
			}
		});
	};


  	render() {
		const addTaskButton_Style = {
			position: 'absolute',
			bottom: 10,
			right: 10
		};

		return (
		<div>
			<AppBar
				title="Todo"
			/>
			<FloatingActionButton
				style={addTaskButton_Style}
				onTouchTap={this.addTaskButton_TouchTap}
			>
				<ContentAdd />
			</FloatingActionButton>
			<TaskForm
				open={this.state.taskForm_Open}
				task={this.state.currentTask}
				onSubmit={this.taskForm_Submit}
				onCancel={this.taskForm_Cancel}
				onDelete={this.taskForm_Delete}
			/>
			<TaskList
				tasks={this.state.tasks}
				onItemClick={this.taskList_ItemClick}
				onItemActionClick={this.taskList_ItemActionClick}
				onItemCheck={this.taskList_ItemCheck}
			/>

				

			<Dialog
				title="Confirm"
				actions={[
					<RaisedButton
						label="Delete"
						secondary={true}
						onTouchTap={this.confirmDialog_Delete}
					/>,
					<RaisedButton
						label="Cancel"
						onTouchTap={this.confirmDialog_Cancel}
					/>
				]}
				modal={true}
				open={this.state.confirmDialog_Open}
			>
				Are you sure to delete it?
			</Dialog>
		</div>
		);
  	}
}


