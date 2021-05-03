const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('The songs aren\'t currently available.');
    } else {
        return response.json();
    }
}

const getBands = () => {
    return fetch('/bands?%24orderby=followerCount+desc%2C+name&%24top=40')
        .then(checkResponse)
}

const getSet = (showID) => {
    return fetch(`/shows/${showID}/songstats`)
        .then(checkResponse)
}

const getSongs = (id) => {
    return fetch(`/songs/?bandId=${id}`)
        .then(checkResponse)
}

const getShowsByTour = (id) => {
    return fetch(`/shows?tourId=${id}`)
        .then(checkResponse)
}

const getShows = id => {
    return fetch(`/shows/?bandId=${id}`)
        .then(checkResponse)
}

const getSong = (songID) => {
    return fetch(`/songs/${songID}`)
        .then(checkResponse)
}

const getPlays = (songID) => {
    return fetch(`/songs/${songID}/shows?sEcho=1&iColumns=5&sColumns=Show.DateTime%2CShow.Venue.Name%2CShow.Venue.Locale%2CSetNumber%2CPosition&iDisplayStart=0&iDisplayLength=250&mDataProp_0=DateTime&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=Venue&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=Venue.Locale&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=SongStats.SetNumber&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=SongStats.Position&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1618599207911`)
        .then(checkResponse)
}

export { getBands, getPlays, getSong, getSongs, getShows, getShowsByTour, getSet };