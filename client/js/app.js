// similar to app.js for listings project


//Events module
new Vue({
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

new Vue({
  el: "#example",
  data: {
    greeting: "hi"
  }
});

//Tags module
new Vue({
  el: "#tags",
  data: {
    options: [
      {text: "Most Recent"},
      {text: "Most Popular"},
      {text: "No buy-in"},
      {text: "Tournaments"},
      {text: "Casual"},
      {text: "Prizes"}
    ]
  }
});
