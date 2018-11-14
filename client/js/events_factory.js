const search = new Vue({
    el: "#searchbar",
    data: {
      search: ""
    }
});

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
    filteredList: function (){
      let keywords = search._data.search;
      return this.events.filter(event => {
        return event.name.toLowerCase().includes(keywords.toLowerCase());
      })
    }
  }
});

const getEvents = () => {
  console.log(events);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/Home/Events", true);
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
