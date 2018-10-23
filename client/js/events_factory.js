

const events = new Vue ({
  el: "#listings",
  data: {
    events: []
  }
});

const getEvents = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/events", true);
  xhr.onreadystatechange = () => {
    if (xhr.readystate === 4 && xhr.status === 200){
      events.data.events = xhr.response.events;
      console.log(xhr.response);
      console.log(xhr);
    }
  };
  console.log(xhr);
  xhr.send();
}
