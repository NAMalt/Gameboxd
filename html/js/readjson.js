import data from './SteamGames.json' with { type: 'json' };

//console.log(data[0].name);
//console.log(data[0].company);
//console.log(data[0].steamid);
//console.log(data[0].releasedate);

//establishes variables for labels, covers, and the stars
const labels = document.querySelectorAll('.card-label');

const covers = document.querySelectorAll('.cover');

const stars = document.querySelectorAll('.stars');

const cards = document.querySelectorAll('.game-card');

labels.forEach((cardlabel, i) => {
  if (data[i] != null){
    cardlabel.textContent = data[i].name;
  }
});//labels every entity based on the associated name in the json file, and if there is no name it leaves it blank


document.addEventListener("DOMContentLoaded", () =>  {
covers.forEach((cover, i) => {
  if (data[i] != null) {
    const img = cover.querySelector('img');
    img.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${data[i].steamid}/header.jpg`;
  }
});

})

cards.forEach((card, i) => {
  if (data[i] != null) {

    card.addEventListener('click', () => {
      const gameID = data[i].steamid;
      window.location.href = `log.html?game=${gameID}` //brings to the review page, and has the game ID of the game you clicked
    });
  }

});


stars.forEach((stars, i) => {//shows the start rating for a game based on the number. higher the number the more stars show
  if (data[i] != null)
    {
      if (data[i].rating >= 95){
        stars.textContent = "★★★★★"
      }
      else if (data[i].rating >= 85){
        stars.textContent = "★★★★⯪"
      }
      else if (data[i].rating >= 75){
        stars.textContent = "★★★★☆"
      }
      else if (data[i].rating >= 65){
        stars.textContent = "★★★⯪☆"
      }      
      else if (data[i].rating >= 55){
        stars.textContent = "★★★☆☆"
      } 
      else if (data[i].rating >= 45){
        stars.textContent = "★★⯪☆☆"
      }
      else if (data[i].rating >= 35){
        stars.textContent = "★★☆☆☆"
      }
      else if (data[i].rating >= 25){
        stars.textContent = "★⯪☆☆☆"
      }
      else if (data[i].rating >= 15){
        stars.textContent = "★☆☆☆☆"
      }
      else if (data[i].rating >= 5){
        stars.textContent = "⯪☆☆☆☆"
      }      
      else {
        stars.textContent = "☆☆☆☆☆"
      }                  
  }
});
