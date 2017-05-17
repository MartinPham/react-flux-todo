import React, {
	Component
} from 'react';

import {
	List, 
	ListItem,
	IconButton,
	Checkbox
} from 'material-ui';
import {redA700} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';


export class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks ? props.tasks : []
		};
	}

	taskItem_TouchTap = (e) => {
		var id = e.currentTarget.dataset.id;

		if (typeof this.props.onItemClick === 'function') {
            this.props.onItemClick({
				task: this.state.tasks[id]
			});
        }
	}

	taskItem_RightButtonTouchTap = (e) => {
		var id = e.currentTarget.dataset.id;

		if (typeof this.props.onItemActionClick === 'function') {
            this.props.onItemActionClick({
				task: this.state.tasks[id]
			});
        }
	}

	taskItem_Check = (e, checked) => {
		var id = e.currentTarget.dataset.id;

		if (typeof this.props.onItemCheck === 'function') {
			var task = this.state.tasks[id];
			task.setCompleted(checked);

            this.props.onItemCheck({
				task: task
			});
        }
	}

	

	render() {


		return (
			<List>
				{this.state.tasks.map((task, index) => {
					return <ListItem 
							data-id={index} 
							
							key={index} 
							primaryText={task.name}
							leftCheckbox={<Checkbox checked={task.completed} data-id={index} onCheck={this.taskItem_Check}/>}
							rightIconButton={
								<div>
									<IconButton
										data-id={index} 
										onTouchTap={this.taskItem_TouchTap} 
									>
										<EditorModeEdit/>
									</IconButton>
									<IconButton
										data-id={index} 
										onTouchTap={this.taskItem_RightButtonTouchTap} 
									>
										<ActionDelete color={redA700}/>
									</IconButton>
								</div>
							}
							/>;
				})}
			</List>
		);
	}
}