import { readInput, inquirerMenu, pause , listCities } from './helpers/inquirer.js';
import Search from './models/search.js';

// initialize dotenv configuration
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
    const search = new Search();
    let opt; 
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Show message
                const input = await readInput('City: ');

                // Search cities
                const places = await search.searchCity(input);
                const selectedId = await listCities(places);
                if (selectedId === '0') continue;

                const selectedCity = places.find( place => place.id === selectedId);  
                search.addHistory(selectedCity.name);

                // Search weather of the city
                const weather = await search.weatherCity(selectedCity.lat, selectedCity.lng);
            
                console.log('\nInformation of the city:\n'.green);
                console.log('City: ', selectedCity.name);
                console.log('Lat: ', selectedCity.lat);
                console.log('Lng: ', selectedCity.lng);
                console.log('Temperature: ', weather.temp);
                console.log('Min: ', weather.min);
                console.log('Max: ', weather.max);
                console.log('Humidity: ', weather.humidity);
                console.log('Description: ', weather.desc);
                break;

            case 2:
                console.log('\nRecord:'.green);
                search.historyCapitalized.forEach( (place, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${place}`);
                });
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}
    
main().catch(err => console.error(err));