function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else {
    document.getElementById("myForm").style.display = "block";
    if (getElement("form-background")) getElement("form-background").style.display = "block";
  }
}

function openForm2() {
  if (!isSignedIn()) alert("You must be signed in!");
  else {
    document.getElementById("myForm2").style.display = "block";
    if (getElement("form-background")) getElement("form-background").style.display = "block";
  }
}

function switchToFormIGDB(){
  //close form2
  document.getElementById("myForm").style.display = "none";

  document.getElementById("myFormIGDB").style.display = "block";
  if (getElement("form-background")) getElement("form-background").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "none";
}
function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "none";
}
function closeFormIGDB(){
  document.getElementById("myFormIGDB").style.display = "none";
  if (getElement("form-background")) getElement("form-background").style.display = "none";
}

function searchGames(){
  const search = getElement("gameSearch").value;
  //sendXHR("GET", `https://api-endpoint.igdb.com/games/?search=${search}`, undefined, res => console.log(res));

  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api-endpoint.igdb.com/games/?search=${search}`);

  xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
    if (xhr.readyState === 4){
      console.log(xhr.response);
    }
  };

  xhr.open("GET", `/cors/search?kw=${search}`);
  console.log("sending xhr");
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
  console.log(tagobjs);
  const event = {
        organizer: getUsername(),
        name: getElement("eventName").value,
        address: getElement("eventAdd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value,
        description: getElement("eventDesc").value,
        Keywords: tagobjs
  };
  sendXHR("POST", "/Home/events", JSON.stringify(event));
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
