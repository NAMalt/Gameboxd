import data from '../SteamGames.json' with { type: 'json' };

document.addEventListener("DOMContentLoaded", function (){

const query = window.location.search;

// const gameid = ;
let gameid = null;

if (query.includes("game=")) {
  const onlyid = query.split("=")
  gameid = onlyid[1];
  //gameid = onlyid[2];
}

//const game = "";
//const game = ;
let game = null;

for (let i = 0; i < data.length; i++) {
  if (data[i].steamid == gameid) {
    game = data[i];
    break
  }
}


if (game == null)  {
  console.log("Game ID does not match");
  return
}


document.querySelector('#gameTitle').textContent = game.name;
const cover = document.querySelector('#gameCover');
//this is for the game cover, but it does not match the apect ratio currently
//cover.src = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/" + game.steamid + "/header.jpg";



document.querySelector('#releaseDate').textContent = "Release Date: " + (game.releasedate);

document.querySelector('#devs').textContent = "Developer: " + (game.company);

document.querySelector('#genre').textContent = "Genre: " + (game.genre);

//hardcoded randomized number
const likes = Math.floor(Math.random() * 1200);

document.querySelector('#likeCount').textContent = likes.toLocaleString() + " likes";

})