import axios from 'axios';

class Search {
    history = [];

    constructor() {
        // TODO: read DB if exists
    }

    async searchCity(city = '') {
        try {
            // http request
            const resp = await axios.get('https://us1.locationiq.com/v1/search?key=pk.3ee66ac37abe100f37895bfd7fae8c3c&q=Buenos%20aires&limit=5&accept-language=es&format=json');
            console.log(resp.data);
            
        } catch (error) {
            console.log('Error:');
        } finally {
            return []; // return cities
        }
    }
}

export default Search;