// similar to app.js for listings project


/* register the modules the application depends upon here*/
/*
angular.module('events', []);
*/

/* register the application and inject all the necessary dependencies */
/*
var app = angular.module('gamergatorApp', ['events']);
*/


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
