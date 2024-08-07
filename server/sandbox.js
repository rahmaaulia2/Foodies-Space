const axios = require('axios')

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

async function fetchData(){
    try {
        const response = await axios.get(url)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

// fetchData()

module.exports = fetchData