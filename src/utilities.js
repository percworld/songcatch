const getSongs = () => {
    return fetch("/songs/?bandId=12")
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('The songs aren\'t available')
            }
        })
}

const getShowsByTour = (id) => {
    return fetch(`https://www.phantasytour.com/api/shows?tourId=${id}`)
        .then(response => response.json())
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('These shows aren\'t available')
            }
        })
}

const getSong = (song) => {

}
export { getSong, getSongs, getShowsByTour };