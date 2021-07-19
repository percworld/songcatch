const baseUrl = 'https://setlift-api.herokuapp.com';

const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('The songs aren\'t currently available.');
    } else {
        return response.json();
    }
}

const getBands = () => {
    return fetch(`${baseUrl}/bands`)
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
        //.then(A => console.log(A))
}

const getShow = (showID) => {
    return fetch(`${baseUrl}/show/${showID}`)
        .then(checkResponse)
}


const getShowsByTour = (id) => {
    return fetch(`${baseUrl}/shows?tourId=${id}`)
        .then(checkResponse)
}

const getToursByBandID = id => {
    return fetch(`${baseUrl}/bands/${id}/tours`)
        .then(checkResponse)
}

const getShows = id => {
    return fetch(`${baseUrl}/latestShows/${id}`)
        .then(checkResponse)
}


export { getBands, getPlays, getSong, getSongs, getShows, getToursByBandID, getShowsByTour, getSet, getShow };