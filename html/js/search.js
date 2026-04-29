import data from '../SteamGames.json' with { type: 'json' };


const container = document.querySelector('#resultsContainer');
const title = document.querySelector('#resultsTitle');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const sortSelect = document.querySelector('#sortSelect');




const userinputsearch = new URLSearchParams(window.location.search);

let query = userinputsearch.get('query') || "";


//searchInput = query;
searchInput.value = query;


showgames()


searchBtn.addEventListener('click', () => {
    query = searchInput.value
    showgames()
});



sortSelect.addEventListener('change', () =>
{
    showgames()
});


function convertdate(dateString) {
    if (dateString ==  false){
        return new Date(0)
    }

    // const justnumber = dateString.replace(st, nd, rd, th)
    const justnumber = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1')

    return new Date(justnumber)
}



function showgames()
{
    //    let results = data.filter(game =>
      //  game.name.includes(query)
    //);
    let results = data.filter(game =>
        game.name.toLowerCase().includes(query) //doesnt have to match the capital letters
    );

    if (sortSelect.value == "hightolow")
    {
        results.sort((high, low) => low.rating - high.rating);

    }
    else if (sortSelect.value == "lowtohigh") {
        results.sort((low, high) => low.rating - high.rating);

    }
    else if (sortSelect.value == "AtoZ") {
        results.sort((A, Z) => A.name.localeCompare(Z.name));

    }
    else if (sortSelect.value == "ZtoA") {
        results.sort((Z, A) => A.name.localeCompare(Z.name));

    }
    else if (sortSelect.value == "newtoold") {
        results.sort((newdate, olddate) => convertdate(olddate.releasedate) - convertdate(newdate.releasedate));

    }
    else if (sortSelect.value == "oldtonew") {
        results.sort((olddate, newdate) => convertdate(olddate.releasedate) - convertdate(newdate.releasedate));
    }


    //title.textContent = query? 'Results for "${query}"'
    title.textContent = query? `Results for "${query}"`: "All Games";//the "All Games" is when you search nothing so it shows all games


    container.innerHTML = ""

    if (results.length == 0)
    {
        container.innerHTML = "<p>No games match your search</p>"
        return
    }

    

    results.forEach(game => {
        const gamedisplay = document.createElement('div')
        gamedisplay.className = 'game-card'

        gamedisplay.innerHTML = `<div class="cover">
                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.steamid}/header.jpg">
            </div>
            <div class="card-label">${game.name}</div>
            <div class="stars">${getStars(game.rating)}</div>`

        container.appendChild(gamedisplay)
    })
}




function getStars(rating)
{
    if (rating >= 95) return "★★★★★"
    if (rating >= 85) return "★★★★⯪"
    if (rating >= 75) return "★★★★☆"
    if (rating >= 65) return "★★★⯪☆"
    if (rating >= 55) return "★★★☆☆"
    if (rating >= 45) return "★★⯪☆☆"
    if (rating >= 35) return "★★☆☆☆"
    if (rating >= 25) return "★⯪☆☆☆"
    if (rating >= 15) return "★☆☆☆☆"
    if (rating >= 5) return "⯪☆☆☆☆"
    if (rating >= 0) return "☆☆☆☆☆"
}