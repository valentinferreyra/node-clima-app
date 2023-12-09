import inquirer from 'inquirer';
import _ from 'colors';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`
            },
            {
                value: 2,
                name: `${'2.'.green} Record`
            },
            {
                value: 0,
                name: `${'0.'.green} Quit`
            }
        ]
    },
]

const inquirerMenu = async() => {
    console.clear();
    console.log('===================='.green);
    console.log('  Choose an option:'.white)
    console.log('====================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const confirm = [
        {
            type: 'input',
            name: 'quit',
            message: `Press ${ 'enter'.green } to continue.`
        }
    ]

    console.log('\n');
    await inquirer.prompt(confirm);
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Insert a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listCities = async(places = []) => {

    const choices = places.map( (place, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place',
            choices
        }
    ];
    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listTaskToComplete = async(tasks = []) => {

    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completedDate) ? true : false
        }
    });
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choices',
            choices
        }
    ];
    const { ids } = await inquirer.prompt(question);
    return ids;
}

export {
    inquirerMenu,
    pause,
    readInput,
    listCities,
    confirm,
    listTaskToComplete
}