import { readInput } from './helpers/inquirer.js';

const main = async () => {
    const text = await readInput('Description: ');
}
    
main().catch(err => console.error(err));