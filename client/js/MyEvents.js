function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else {
    getElement("form-background").onclick= closeForm;
    document.body.style.overflow = "hidden";
    document.getElementById("myForm").style.display = "block";
    if (getElement("form-background")) getElement("form-background").style.display = "block";
  }
}

function openForm2() {
  if (!isSignedIn()) alert("You must be signed in!");
  else {
    getElement("form-background").onclick=closeForm2;
    document.body.style.overflow = "hidden";
    document.getElementById("myForm2").style.display = "block";
    if (getElement("form-background")) getElement("form-background").style.display = "block";
  }
}

function switchToFormIGDB(){
  getElement("form-background").onclick = switchBackToForm1;
  document.body.style.overflow = "hidden";
  //close form2
  document.getElementById("myForm").style.display = "none";

  document.getElementById("myFormIGDB").style.display = "block";
  if (getElement("form-background")) getElement("form-background").style.display = "block";
}

function closeForm() {
  getElement("form-background").onclick= () => {};
  document.body.style.overflow = "initial";
  document.getElementById("myForm").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "none";
}
function closeForm2() {
  getElement("form-background").onclick= () => {};
  document.body.style.overflow = "initial";
  document.getElementById("myForm2").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "none";
}
function switchBackToForm1(){
  getElement("form-background").onclick=closeForm;
  document.getElementById("myFormIGDB").style.display = "none";
  document.getElementById("myForm2").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "block";
  openForm();
}

function searchGames(){

  let games = [];

  const search = getElement("gameSearch").value;
  //sendXHR("GET", `https://api-endpoint.igdb.com/games/?search=${search}`, undefined, res => console.log(res));

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4){
      //xhr.response.forEach(entry => console.log(entry));
      //[{"id":41240},{"id":8533},{"id":8593},{"id":1039},{"id":45141},{"id":45142},{"id":1034},{"id":1027},{"id":38319},{"id":2909}]
      if (!xhr.response) return;
      const gameids = JSON.parse(xhr.response);

      let gameTable = getElement("games");
      gameTable.innerHTML = "";

      const renderGame = (game) => {
        console.log("rendering: " + game.name);
        if (!game.coverUrl) return;
        gameTable.innerHTML = gameTable.innerHTML + "<div style='display: block; float: down; height: 90px'>";

        if (game.coverUrl){
          gameTable.innerHTML = gameTable.innerHTML +  `<img src=\"${game.coverUrl}\" style='float: left;'>`;
        } else {
          gameTable.innerHTML = gameTable.innerHTML +  "<img src='/Home/styles/missing.png'>";
        }
        if (game.name){
          gameTable.innerHTML = gameTable.innerHTML +  `<h3 style='width: 100%; margin-left: 10px; float: down; height: 100%;'>${game.name}</h3>`;
        } else {
          gameTable.innerHTML = gameTable.innerHTML +  "<h3>Name not available</h3>";
        }

        gameTable.innerHTML += `<button onclick="attach(${game.id}); this.innerText = 'Selected'; this.disabled = true;" type="button" style="">Select</button>`

        gameTable.innerHTML = gameTable.innerHTML +  "</div>";

      };

      gameids.forEach(entry => getGame(entry.id, renderGame));

      console.log("Query done");
    }
  };

  xhr.open("GET", `/cors/search?kw=${search}`);
  xhr.send();
}

function getGame(id, callback){
  console.log(`getGame(${id})`);
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200){
      if (callback) {
        const game = {};
        const json = JSON.parse(xhr.response);
        game.id = json[0].id;
        game.name = json[0].name;
        game.coverUrl = "http:" + json[0].cover.url;
        game.keywords = json[0].keywords;
        callback(game);
      }
    };
  };

  xhr.open("GET", `/cors/game?id=${id}`);
  xhr.send();
}


function submitEvent() {

  let tags = getElement("eventTags").value.split(",").map(x => x.trim().toLowerCase());
  //console.log(tags);
  const tagobjs = tags.map(tag => {
    const obj = {};
    obj.name = tag;
    return obj;
  });
  const event = {
        organizer: "",
        name: getElement("eventName").value,
        address: getElement("eventAdd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value,
        description: getElement("eventDesc").value,
        Keywords: tagobjs,
        games: games
  };
  getUsername(username => {
    event.organizer = username;
    sendXHR("POST", "/Home/events", JSON.stringify(event));
  });
}


function addTag(tag){
  if (getElement("eventTags").value.split(",").map(tag => tag.toLowerCase().trim()).includes(tag.toLowerCase().trim()))
    return;

  getElement("eventTags").value = getElement("eventTags").value + "," + tag;
  refreshTags();
}

const TAGS = [
  'role playing',
  'board games',
  'pc games',
  'xbox games',
  'ps4 games',
  'card games',
  'no buy-in',
  'tournaments',
  'casual'
];


function refreshTags(){
  let tags = getElement("eventTags").value.split(",").map(tag => tag.toLowerCase().trim());
  //console.log("tags: " + tags);
  for (tag in TAGS) {
    //console.log(TAGS[tag].replace(" ", "-").trim());
    const element = getElement(TAGS[tag].replace(" ", "-").trim() + "-create");
    if (element) element.classList.toggle("absent", tags.indexOf(TAGS[tag]) === -1);
  }
}

let games = [];
function attach(gameID){
  getGame(gameID, (game) => games.push(game));
}
