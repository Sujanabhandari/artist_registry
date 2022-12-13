import axios from 'axios';
import { createObjectCsvWriter } from 'csv-writer';
import asyncHandler from '../utils/asyncHandler.js';
// import artistData from '../artist-names.js';
import artistData from  '../artist-names.json' assert { type: 'json' };

const API_KEY = 'bcaecf3a83f9fefef61fb702672880f6';

function searchForArtist(res, artistName) {
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${API_KEY}&format=json`;
    axios
        .get(url)
        .then((response) => {
            const artistInfo = response.data.results.artistmatches.artist;
            if (!artistInfo || !artistInfo.length) {
                const randomArtist = artistData.artists[
                        Math.floor(Math.random() * artistData.artists.length)
                    ];
                return res.json(randomArtist);
            }
            res.json(artistInfo);

            const csvWriter = createObjectCsvWriter({
                path: 'artist_data.csv',
                header: [
                    { id: 'name', title: 'Name' },
                    { id: 'mbid', title: 'MBID' },
                    { id: 'url', title: 'URL' },
                    { id: 'image_small', title: 'Image (small)' },
                    { id: 'image', title: 'Image' },
                ],
            });
            csvWriter
                .writeRecords(artistInfo)
                .then(() =>
                    console.log('The CSV file was written successfully')
                );
        })
        .catch((error) => {
            console.error(error);
        });
}

const searchArtist = asyncHandler(async (req, res, next) => {
    const { query } = req.query;
    searchForArtist(res, query);
});

export default searchArtist;
