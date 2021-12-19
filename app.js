/** @format */
require('colors');

const {
	inquirerMenu,
	pause,
	readInput,
	listTaskDelete,
	confirm,
	showListCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');

console.clear();

const main = async () => {
	let opt;

	const tasks = new Tasks();

	const taskDB = readDB();

	if (taskDB) {
		// set task
		// Todo load task
		tasks.loadTaskFromArray(taskDB);
	}

	do {
		opt = await inquirerMenu();
		switch (opt) {
			case 1:
				// Create Option
				const desc = await readInput('Description:');
				tasks.createTask(desc);
				break;
			case 2:
				tasks.completeList();
				break;
			case 3:
				tasks.listCompletedPending(true);
				break;
			case 4:
				tasks.listCompletedPending(false);
				break;
			case 5:
				const ids = await showListCheckList(tasks.ListArr);
				tasks.toogleCompleteds();
				break;
			case 6:
				const id = await listTaskDelete(tasks.ListArr);

				if (id !== 0) {
					const ok = await confirm('Are you sure?');
					if (ok) {
						tasks.deleteTask(id);
						console.log('task deleted');
					}
				}
				break;
		}

		saveDB(tasks.ListArr);

		if (opt !== 0) await pause();
	} while (opt !== 0);
};
main();
