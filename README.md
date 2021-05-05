# Setlift

Voyage into a band's history and get updated as they grow using this setlist-generating app that consumes the phantasy tour API. You may take a look at a tour and choose a show and have a setlist generated. If you see a song you like, explore it further for details and performances. You keep an active tab of your favorite songs so you can stay in the loop with your favorite artist's performances or reminisce about a past musical and friendship experience.



## Installation:
### 1. `git clone` this repository then cd into the project directory.
2. run: `npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Operation:
You will be directed to a song category window for a band. You may choose your band at any time in the footer. 
This navigation window also features a list updating search bar.  If you enter a song not included in the catalog, the list will refresh. 
Search by:
1. Song  -  Dashboard main display. Options for cover songs, originals, all, or just your favorite songs.
2. Tour - Footer link that shows every time a band hit the road! Link to shows and songs played on that tour
3. Specific Show - Jump right into the shows to see all shows in order.  (currently Limited to 100, try tours for older shows)
4. Press the Setlift icon at the upper left to get back to your song category choice window


## Tech utilized:
* Node
* React Router and hooks
* Cypress for testing
* Express

## Future Extensions:
1 Image Component for dynamic image rendering for top twenty bands.
2 Setlist submission to group for sharing / user comparison and collection


