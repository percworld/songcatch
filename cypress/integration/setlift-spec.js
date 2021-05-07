const url = 'http://localhost:3000';

describe('dashboard', () => {
    beforeEach('visit page', () => {
        cy.intercept(`${url}/songs/?bandId=12`)
        //1 getSongs by band
        cy.intercept(`${url}/bands/12/songs`,
            { fixture: 'songs.json' })
        //2 getPlays by song 
        cy.intercept(`${url}/songs/6268/shows?sEcho=1&iColumns=5&sColumns=Show.DateTime%2CShow.Venue.Name%2CShow.Venue.Locale%2CSetNumber%2CPosition&iDisplayStart=0&iDisplayLength=25&mDataProp_0=DateTime&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=Venue&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=Venue.Locale&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=SongStats.SetNumber&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=SongStats.Position&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1618599207911`,
            { fixture: 'plays.json' })
        //3 getShow (setlist / getSet)
        cy.intercept(`${url}/shows/50937/songstats`,
            { fixture: 'show.json' })
        //getShowsByBandId 
        cy.intercept(`${url}/bands/12/shows?pageSize=300&page=1`,
            { fixture: 'shows.json' })
        //get Tours
        cy.intercept(`${url}/bands/12/tours?%24orderby=startDate+desc&%24top=200`,
            { fixture: 'tours-by-band-id.json' })
        //getBands
        cy.intercept(`${url}/bands?%24orderby=followerCount+desc%2C+name&%24top=200`,
            { fixture: 'bands.json' })
        //getSong object
        cy.intercept(`${url}/songs/6142`,
            { fixture: 'song.json' })
    })

    describe('Visit homepage', () => {
        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.visit(`${url}/`)

        })

        it('Has a location', () => {
            cy.location().should((loc) => {
                expect(loc.port).to.eq('3000')
                expect(loc.protocol).to.eq('http:')
                expect(loc.host).to.eq('localhost:3000');
                expect(loc.toString()).to.eq(
                    'http://localhost:3000/'
                )
            })
        })

        it('Shows a header', () => {
            cy.get('h3[data-cy=setlift]')  //get home button
                .contains('Setlift')
        })

        it('Shows a navigation area for the current band', () => {
            cy.get('[data-cy=nav-container]')
                .should('have.class', 'nav-container')
            cy.get('[data-cy=nav-container]')
                .children().should('have.length', '4')
        })

        it('Should navigate to original song list', () => {
            cy.get('a[data-cy=originals]').click()
            cy.get('section[data-cy=song-list]').first().contains('Original Songs')
        })

        it('Navigates to cover song list', () => {
            cy.get('a[data-cy=covers]').click()
            cy.get('section[data-cy=song-list]').first().contains('Cover Songs')
        })

        it('Navigates to All songs list', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().contains('Lotus Songs')
        })

        it('Navigates to All songs list', () => {
            cy.get('a[data-cy=favorites]').click()
            cy.get('p[data-cy=error-no-plays]').contains('When viewing a song\'s plays, you may add to this list by clicking the heart to the left.')
        })

    })
    describe('Serves a list of links to songs meeting incoming category parameter', () => {

        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.visit(`${url}/`)
        })

        it('Lists Originals only', () => {
            cy.get('a[data-cy=originals]').click()
            cy.get('section[class=songSingle]').first().first().contains('And Yet They Fight')

        })
        it('Lists Covers only', () => {
            cy.get('a[data-cy=covers]').click()
            cy.get('section[class=songSingle]').first().first().contains('Yoshimi Battles the Pink Robots Pt 2')
        })
        it('Lists All songs', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[class=songSingle]').first().first().contains('And Yet They Fight')
            cy.get('section[data-cy=song-list]').first().children().contains('Bjorn Gets a Haircut')
            cy.get('section[data-cy=song-list]').first().children().contains('Earl of Grey')

        })
    })

    describe('Has a search bar for filtering songs', () => {

        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.visit(`${url}/`)
        })

        it('Exists on the songlist page and can reveal only songs that match when typed into', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('input[name=songName]').type('earl')
            cy.get('section[data-cy=song-list]').first().children().contains('Earl of Grey')
            cy.get('section[data-cy=song-list]').first().children().should('have.length', '3')
        })
    })

    describe.skip('Song Information Page', () => {
        beforeEach('intercept and visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.intercept(`${url}/songs/6268/shows?sEcho=1&iColumns=5&sColumns=Show.DateTime%2CShow.Venue.Name%2CShow.Venue.Locale%2CSetNumber%2CPosition&iDisplayStart=0&iDisplayLength=25&mDataProp_0=DateTime&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=Venue&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=Venue.Locale&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=SongStats.SetNumber&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=SongStats.Position&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1618599207911`, { fixture: 'plays.json' })
            cy.visit(`${url}/`)
        })

        it('Can be accessed by clicking on song and displays Song Info', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('.title').contains('And Yet They Fight')
            cy.get('.head').contains('Lotus Original')
            cy.get('.playCount').contains('Played 3 Times')
        })

        it('Displays shows in which this song was performed', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('.plays').should('have.length', '1')
            cy.get('.venue').contains('Park West')
            cy.get('.locDate').contains('Chicago, IL / January 18, 2020')
        })

        it('Can Link to a show of interest', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('.play').first().click()
            cy.location().should((loc) => {
                expect(loc.toString()).to.eq(
                    'http://localhost:3000/song/27714'
                )
            })

        })
    })

    describe.skip('Show page (Setlist)', () => {
        beforeEach('intercept and visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.intercept(`${url}/songs/6268/shows?sEcho=1&iColumns=5&sColumns=Show.DateTime%2CShow.Venue.Name%2CShow.Venue.Locale%2CSetNumber%2CPosition&iDisplayStart=0&iDisplayLength=25&mDataProp_0=DateTime&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=Venue&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=Venue.Locale&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=SongStats.SetNumber&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=SongStats.Position&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1618599207911`, { fixture: 'plays.json' })
            cy.intercept(`${url}/shows/50937/songstats`,
                { fixture: 'show.json' })
            cy.visit(`${url}/`)
        })

        it('Displays a  show\'s setlist', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('.plays').last().first().first().click()
            cy.get('p[class=venue]').first().click()
            cy.get('.setList').children().should('have.length', '3')
        })

        it('Displays the stats about the song and details about the performance', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('p[class=venue]').first().click()
            cy.get('.head1').contains('Lotus')
            cy.get('.head1').last().contains('Park West')
            cy.get('.head2').first().contains('January 18, 2020')
            cy.get('.head3').contains('Chicago')
        })

        it('Displays the songs performed in a setlist format', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('p[class=venue]').first().click()
            cy.get('.set').first().contains('Set 1')
                .get('.set').first().last().first().contains('Eats the Light')
        })

        it('Directs to the url of the song when a new song is chosen from the setlist', () => {
            cy.get('a[data-cy=all]').click()
            cy.get('section[data-cy=song-list]').first().click()
            cy.get('p[class=venue]').first().click()
            cy.get('.set').first().last().first().click()
            cy.location().should((loc) => {
                expect(loc.toString()).to.eq(
                    'http://localhost:3000/show/50937'
                )
            })
        })
    })

    describe('Tours Page', () => {
        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.intercept(`${url}/bands/12/tours?%24orderby=startDate+desc&%24top=200`,
                { fixture: 'tours-by-band-id.json' })
            cy.visit(`${url}/`)
        })

        it('Displays a number of tours a band has taken', () => {
            cy.get('a[data-cy=tours]').click()
            cy.get('.tourList').children().should('have.length', '7')
                .get('.tourBandName').contains('Lotus Tours')
                .get('.tourSingle').first().first().contains('Spring 2020')
                .get('.tourSingle').last().last().contains('12 shows')
        })

        it.skip('Links to a specific tour from the Tours page', () => {
            cy.get('a[data-cy=tours]').click()
            cy.get('.tourSingle').last().first().click()
            cy.location().should((loc) => {
                expect(loc.toString()).to.eq(
                    'http://localhost:3000/tours'
                )
            })
        })
    })

    describe('Shows Page', () => {
        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.intercept(`${url}/bands/12/shows?pageSize=300&page=1`,
                { fixture: 'shows.json' })
            cy.visit(`${url}/`)
        })

        it('Displays the most recent 100 shows a band has performed', () => {
            cy.get('a[data-cy=shows]').click()
            cy.get('.showList').children().should('have.length', '6')
                .get('.bandName').contains('Shows: latest 5')
                .get('.showContainer').last().contains('Morrison')
                .get('.singleShow').first().children().first().contains('Red Rocks')
        })
    })

    describe('Bands Page', () => {
        beforeEach('visit the page', () => {
            cy.intercept(`${url}/songs/?bandId=12`, { fixture: 'songs.json' })
            cy.intercept(`${url}/bands?%24orderby=followerCount+desc%2C+name&%24top=200`,
                { fixture: 'bands.json' })
            cy.visit(`${url}/`)
        })

        it('Displays other bands to browse with their Links', () => {
            cy.get('a[data-cy=bands]').click()
            cy.get('.bandList').first().contains('Phish')
            cy.get('.bandList').last().contains('The String Cheese Incident')
        })
    })
})
