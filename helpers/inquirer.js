/** @format */

const inquirer = require('inquirer');
require('colors');
console.clear();

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What would you like to do?',
		choices: [
			{
				value: 1,
				name: `${'1.'.cyan} Create task`
			},
			{
				value: 2,
				name: `${'2.'.cyan} list tasks`
			},
			{
				value: 3,
				name: `${'3.'.cyan} List completed tasks`
			},
			{
				value: 4,
				name: `${'4.'.cyan} List pending tasks`
			},
			{
				value: 5,
				name: `${'5.'.cyan} to Complete task/s`
			},
			{
				value: 6,
				name: `${'6.'.cyan} to Delete Task`
			},
			{
				value: 0,
				name: `${'0.'.cyan} Exit`
			}
		]
	}
];
const inquirerMenu = async () => {
	console.clear();
	console.log('================='.blue);

	console.log(` Select an Option`.cyan);

	console.log('================='.blue);

	const { option } = await inquirer.prompt(questions);

	return option;
};

const pause = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Press ${'Enter'.cyan} to continue`
		}
	];
	console.log('\n');
	await inquirer.prompt(question);
};

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) return 'Please add a value';
				return true;
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const listTaskDelete = async (tasks = []) => {
	const choices = tasks.map((task, i) => {
		const idx = `${i + 1}.`.cyan;
		return {
			value: task.id,
			name: `${idx} ${task.desc}`
		};
	});
	choices.unshift({
		value: 0,
		name: '0.'.cyan + ' Cancel'
	});
	const questions = [
		{
			type: 'list',
			name: 'íd',
			message: 'Delete',
			choices
		}
	];
	const { id } = await inquirer.prompt(questions);
	return id;
};

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	];
	const { ok } = await inquirer.prompt(question);
	return ok;
};

const showListCheckList = async (tasks) => {
	const choices = tasks.map((task, i) => {
		const idx = `${i + 1}.`.cyan;
		return {
			value: task.id,
			name: `${idx} ${task.desc}`,
			checked: task.completedIn ? true : false
		};
	});
	const question = [
		{
			type: 'checkbox',
			name: 'íds',
			message: 'Select',
			choices
		}
	];
	const { ids } = await inquirer.prompt(question);
	return ids;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	listTaskDelete,
	confirm,
	showListCheckList
};
