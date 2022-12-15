import axios from 'axios';
import * as dotenv from 'dotenv';
import asyncHandler from '../utils/asyncHandler.js';
import artistData from '../artistData.js';

dotenv.config();

const { FN_API_KEY } = process.env;

async function getRandomArtists() {
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${
        artistData[Math.floor(Math.random() * artistData.length)]
    }&api_key=${FN_API_KEY}&format=json`;
    const response = await axios.get(url);
    const artistInfo = response.data.results.artistmatches.artist;
    if (!artistInfo || !artistInfo.length) {
        return getRandomArtists();
    }
    return artistInfo;
}

function searchForArtist(res, artistName) {
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${FN_API_KEY}&format=json`;
    axios
        .get(url)
        .then((response) => {
            const artistInfo = response.data.results.artistmatches.artist;
            if (!artistInfo || !artistInfo.length) {
                return Promise.resolve(getRandomArtists()).then((result) =>
                    res.json(result)
                );
            }
            return res.json(artistInfo);
        })
        .catch((error) => {
            console.error(error);
        });
}

const searchArtist = asyncHandler(async (req, res, next) => {
    const { name } = req.query;
    searchForArtist(res, name);
});

export default searchArtist;
