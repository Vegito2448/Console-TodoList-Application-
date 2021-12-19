/**
 * _listado:
 *      {'uuid-123712-123123-2: {id:12, desc:asd, CompletedIn:92231}}
 *
 * @format
 */

const Task = require('./task');

class Tasks {
	_list = {
		'abc': 123
	};

	get ListArr() {
		const list = [];
		Object.keys(this._list).forEach((key) => {
			const task = this._list[key];
			list.push(task);
		});

		return list;
	}

	constructor(_list) {
		this._list = {};
	}

	deleteTask(id = '') {
		if (this._list[id]) delete this._list[id];
	}

	loadTaskFromArray(tasks = []) {
		tasks.forEach((task) => {
			this._list[task.id] = task;
		});
	}

	createTask(desc = '') {
		const task = new Task(desc);

		this._list[task.id] = task;
	}

	completeList() {
		console.log('\n');
		this.ListArr.forEach((task, i) => {
			const idx = `${i + 1}`.green;
			const { desc, completedIn } = task;
			const status = completedIn ? 'Completed'.green : 'earring'.red;

			console.log(`${idx} ${desc} :: ${status}`);
		});
	}

	listCompletedPending(list = true) {
		console.log('\n');
		let count = 0;
		this.ListArr.forEach((task) => {
			const { desc, completedIn } = task;
			const status = completedIn ? 'Completed'.green : 'earring'.red;
			if (list) {
				if (completedIn) {
					count += 1;
					console.log(`${(count + '.').cyan} ${desc} :: ${status}`);
				}
			} else {
				if (!completedIn) {
					count += 1;
					console.log(`${(count + '.').cyan} ${desc} :: ${status}`);
				}
			}
		});
	}
	toogleCompleteds(ids = []) {
		ids.forEach((id) => {
			const task = this._list[id];
			if (!task.completedIn) {
				task.completedIn = new Date.toISOString();
			}
		});

		this.ListArr.forEach((task) => {
			if (!ids.includes(task.id)) {
				this._list[task.id].completedIn = null;
			}
		});
	}
}
module.exports = Tasks;
