import React, {
	Component
} from 'react';

import {
	TextField,
	RaisedButton,
	Dialog
} from 'material-ui';

// import { Task } from './Task';

export class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open,
			task: props.task
		};
	}

	componentWillReceiveProps = (props) => {
		this.setState({
			open: props.open,
			task: props.task
		});
	}
	
	doneButton_TouchTap = () => {
		if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit({
				task: this.state.task
			});
        }
	}

	
	cancelButton_TouchTap = () => {
		if (typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
	}

	
	deleteButton_TouchTap = () => {
		if (typeof this.props.onDelete === 'function') {
			this.props.onDelete({
				task: this.state.task
			});
        }
	}

	nameField_KeyPress = (e) => {
		if(e.key === 'Enter') {
			this.doneButton_TouchTap();
		}
	}

	nameField_Change = (e) => {
		var task = this.state.task;
		task.setName(e.target.value);

		this.setState({
			task : task
		});
	}



	render() {
		var actions = [
			<RaisedButton
				label="OK"
				onTouchTap={this.doneButton_TouchTap}
				primary={true} 
			/>,
			
		];

		var title = "Add new Task";

		if(this.state.task.getId() !== null)
		{
			title = "Update Task";

			actions.push(
				<RaisedButton
					label="Delete"
					onTouchTap={this.deleteButton_TouchTap}
					secondary={true} 
				/>);
		}

		actions.push(
			<RaisedButton
				label="Cancel"
				onTouchTap={this.cancelButton_TouchTap}
			/>);

		return (
			<div>
				<Dialog
					title={title}
					modal={true}
					actions={actions}
					open={this.state.open}
				>
					<TextField
					value={this.state.task.getName()}
					hintText=""
					floatingLabelText="Task name"
					fullWidth={true}
					onChange={this.nameField_Change}  
					onKeyPress={this.nameField_KeyPress}  
					/>
					
				</Dialog>
			</div>
		);
	}
}