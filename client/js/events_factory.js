

const events = new Vue ({
  el: "#listings",
  data: {
    events: []
  }
});

const getEvents = () => {
  console.log(events);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/events", true);
  xhr.onreadystatechange = () => {
    console.log(xhr);
    if (xhr.readyState === 4){
      console.log(xhr.response);
      events._data.events = JSON.parse(xhr.response);
      console.log("updated");
      console.log(events);
    }
  };
  xhr.send();
}
