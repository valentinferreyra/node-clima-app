import fs from 'fs';
import axios from 'axios';

class Search {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapitalized() {
        return this.history.map( place => {
            let words = place.split(' ');
            words = words.map( word => word[0].toUpperCase() + word.substring(1));

            return words.join(' ');
        })
    }

    async searchCity(city = '') {
        try {
            const instance = axios.create({
                baseURL: 'https://us1.locationiq.com/v1/search',
                params: {
                    ...this.paramsMapbox,
                    q: city
                }
            });

            const resp = await instance.get();
            return resp.data.map( city => ({
                id: city.place_id,
                name: city.display_name,
                lng: city.lon,
                lat: city.lat
            }));
            
        } catch (error) {
            console.log('Error:', error);
            return [];
        } 
    }

    async weatherCity(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    ...this.paramsOpenWeather,
                    lat: lat,
                    lon: lon
                }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                humidity: main.humidity,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    get paramsMapbox() {
        return {
            'key': process.env.MAPBOX_KEY,
            'limit': 5,
            'accept-language': 'es',
            'format': 'json'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'en'
        }
    }

    addHistory(city = '') {
        if(this.history.includes(city.toLocaleLowerCase())) return;
        this.history.unshift(city.toLocaleLowerCase());
        this.saveDB();
    };

    saveDB() {
        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if(!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.history = data.history;
    }
}

export default Search;