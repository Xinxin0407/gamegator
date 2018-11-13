

const events = new Vue ({
  el: "#listings",
  data: {
    events: []
  },
  methods: {
    appendDescription: function (index){
      this.events[index].address = this.events[index].address + " ";
    },
    toggleInfo: function (event){
      event.moreInfo = event.moreInfo === false;
    },

    moreInfo: function (event) {
      return event.moreInfo;
    }

  },

  computed: {
    filteredList: function (keywords){
      return this.events.filter(event => {
        for (property in event){
          if (property.toLowerCase().includes(keywords.toLowerCase())) return true;
        }
        return false;
      })
    }
  }
});

const getEvents = () => {
  console.log(events);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/events", true);
  xhr.onreadystatechange = () => {
    console.log(xhr);
    if (xhr.readyState === 4) {
        events._data.events = JSON.parse(xhr.response);
        for (let i = 0; i < events._data.events.length; i++){
          events._data.events[i].moreInfo = false;
        }
    }
  };
  xhr.send();
};
