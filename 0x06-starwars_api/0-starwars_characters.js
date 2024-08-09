#!/usr/bin/node

const https = require('https');

const movieId = process.argv[2];

if (!movieId) {
    console.error('Please provide a movie ID as the first argument.');
    process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

https.get(apiUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const film = JSON.parse(data);
        const characters = film.characters;

        characters.forEach((characterUrl) => {
            https.get(characterUrl, (res) => {
                let charData = '';

                res.on('data', (chunk) => {
                    charData += chunk;
                });

                res.on('end', () => {
                    const character = JSON.parse(charData);
                    console.log(character.name);
                });
            });
        });
    });
}).on('error', (err) => {
    console.error('Error fetching the movie:', err.message);
});
