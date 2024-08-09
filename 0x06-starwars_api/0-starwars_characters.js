const https = require('https');

// Function to fetch data from a URL
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Function to get and print characters of a Star Wars movie
const getStarWarsCharacters = async (movieId) => {
  try {
    // Base URL for the Star Wars API film endpoint
    const filmUrl = `https://swapi.dev/api/films/${movieId}/`;

    // Fetch the film data
    const filmData = await fetchData(filmUrl);

    // Get the list of character URLs
    const characterUrls = filmData.characters;

    // Fetch and print each character's name
    for (const url of characterUrls) {
      const characterData = await fetchData(url);
      console.log(characterData.name);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
};

// Main script execution
const movieId = process.argv[2];
if (!movieId) {
  console.error('Usage: node script.js <Movie ID>');
  process.exit(1);
}

getStarWarsCharacters(movieId);

