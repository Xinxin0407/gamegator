

events = new Vue ({
  el: "#listings",
  data: {
    events: [
      {
        title: "Online tournament",
        desc: "very cool event"
      },
      {
        title: "Merch sale",
        desc: "Lots to sell"
      },
      {
        title: "Call of Duty 1v1",
        desc: "no scope only"
      }
    ]
  }
});

const getEvents = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/events", true);
  xhr.onreadystatechange = () => {
    if (xhr.readystate === 4 && xhr.status === 200){
      events.data.events = xhr.response.events;
    }
  };
  xhr.send();
}
