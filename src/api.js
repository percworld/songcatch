const baseUrl = 'http://localhost:3001';

const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('The songs aren\'t currently available.');
    } else {
        return response.json();
    }
}

const getBands = () => {
    return fetch(`${baseUrl}/bands?%24orderby=followerCount+desc%2C+name&%24top=154`)
        .then(checkResponse)
}

const getSongs = (id) => {
    return fetch(`${baseUrl}/songs/?bandId=${id}`)
        .then(checkResponse)
}

const getSong = (songID) => {
    return fetch(`${baseUrl}/songs/${songID}`)
        .then(checkResponse)
}

const getPlays = (songID) => {
    return fetch(`${baseUrl}/plays/${songID}`)
        .then(checkResponse)
}

const getSet = (showID) => {
    return fetch(`${baseUrl}/set/${showID}`)
        .then(checkResponse)
}


const getShowsByTour = (id) => {
    return fetch(`${baseUrl}/shows?tourId=${id}`)
        .then(checkResponse)
}

const getToursByBandID = id => {
    return fetch(`${baseUrl}/bands/${id}/tours?%24orderby=startDate+desc&%24top=200`)
        .then(checkResponse)
}

const getShows = id => {
    return fetch(`${baseUrl}/latestShows/${id}`)
        .then(checkResponse)
}


export { getBands, getPlays, getSong, getSongs, getShows, getToursByBandID, getShowsByTour, getSet };