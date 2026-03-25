import data from './SteamGames.json' with { type: 'json' };

//console.log(data[0].name);
//console.log(data[0].company);
//console.log(data[0].steamid);
//console.log(data[0].releasedate);

const labels = document.querySelectorAll('.card-label');

const covers = document.querySelectorAll('.cover');

const stars = document.querySelectorAll('.stars');

labels.forEach((cardlabel, i) => {
  if (data[i] != null){
    cardlabel.textContent = data[i].name;
  }
});


covers.forEach((cover, i) => {
  if (data[i] != null) {
    const img = cover.querySelector('img');
    img.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${data[i].steamid}/header.jpg`;
  }
});



stars.forEach((stars, i) => {
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