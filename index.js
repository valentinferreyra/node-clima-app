import { readInput, inquirerMenu, pause } from './helpers/inquirer.js';
import Search from './models/search.js';

const main = async () => {
    const search = new Search();
    let opt; 

    do {
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case 1:
                // Show message
                const site = await readInput('City: ');
                await  search.searchCity(site);

                // Search cities
                // Select city
                // Weather
                // Show results
                console.log('\nInformation of the city:\n'.green);
                console.log('City: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temperature: ', );
                console.log('Min: ', );
                console.log('Max: ', );
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}
    
main().catch(err => console.error(err));