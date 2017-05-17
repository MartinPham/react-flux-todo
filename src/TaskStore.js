import EventEmitter from 'events';
import {Task} from './Task';

export class TaskStore extends EventEmitter {
	items = []

	constructor() {
		super();

		
		if(localStorage.getItem('tasks') === null)
		{
			this.push();
		}

		this.pull();
	}

	find = (id) => {
		for(let task of this.items)
		{
			if(task.getId() === id)
			{
				return task;
			}
		}

		return null;
	}

	findAll = () => {
		return this.items;
	}

	hydrate = (obj) => {
		var task = new Task(obj.name);
		task.setId(obj.id);
		task.setCompleted(obj.completed);

		return task;
	}

	persist = (task) => {
		if(task.getId() === null) 
		{
			task.setId(this.items.length + 1);
			this.items.push(task);

			this.emit('CREATED');
		} else {
			for(let i in this.items)
			{
				if(this.items[i].getId() === task.getId())
				{
					this.items[i] = task;

					this.emit('UPDATED');

					break;
				}
			}
		}

		this.push();
	}

	remove = (task) => {
		for(let i in this.items)
		{
			if(this.items[i].getId() === task.getId())
			{
				this.items.splice(i, 1);

				this.emit('DELETED');

				break;
			}
		}

		this.push();
	}

	push = () => {
		localStorage.setItem('tasks', JSON.stringify(this.items));
	}

	pull = () => {
		var rawItems = JSON.parse(localStorage.getItem('tasks'));
		var items = [];
		for(let item of rawItems)
		{
			items.push(this.hydrate(item));
		}

		this.items = items;
	}
}