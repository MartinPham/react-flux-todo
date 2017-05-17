export class Task {
	id = null
	name = ''
	completed = false

	constructor(name = '') {
		this.name = name;
		this.completed = false;
	}

	getId = () => {
		return this.id;
	}

	setId = (id) => {
		this.id = id;
	}

	getName = () => {
		return this.name;
	}

	setName = (name) => {
		this.name = name;
	}

	getCompleted = () => {
		return this.completed;
	}

	setCompleted = (completed) => {
		this.completed = completed;
	}

}