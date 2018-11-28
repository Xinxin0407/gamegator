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
        let match = false;
        if (event.name.toLowerCase().includes(keywords.toLowerCase())) match = true;
        event.Keywords.map(ekw => {
          match |= (ekw && ekw.name && ekw.name.toLowerCase().includes(keywords));
        });

        const TAGS = [
          'role-playing', 'board-games', 'pc-games', 'xbox-games', 'ps4-games', 'card-games', 'no-buy-in', 'tournaments', 'casual'
        ]

        for (tagg in TAGS){
          const tag = TAGS[tagg];
          const tagtrue = getElement(tag).checked;
          if (tagtrue) match &= eventHasKeyword(event, tag.replace("-", " "));
        }

        //match |= event.description.contains(keywords);
        /*
        if (getElement("role-playing").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("role-playing"));
        if (getElement("board-games").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("board-games"));
        if (getElement("pc-games").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("pc-games"));
        if (getElement("xbox-games").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("xbox-games"));
        if (getElement("ps4-games").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("ps4-games"));
        if (getElement("card-games").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("card-games"));
        if (getElement("no-buy-in").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("no-buy-in"));
        if (getElement("tournaments").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("tournaments"));
        if (getElement("casual").checked) match &= event.Keywords && event.Keywords.map(kw => kw && kw.name.includes("casual"));
        */

        console.log(getElement("casual").checked);
        return match;
      })
    }
  }
});

function eventHasKeyword(event, keyword){
  let match = false;
  event.Keywords.map(kw => {
    if (kw && kw.name && (kw.name.toLowerCase().includes(keyword) || keyword.toLowerCase().includes(kw.name.toLowerCase()))) match = true;
  })
  return match;
}

const getEvents = (callback) => {
  console.log(events);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/Home/Events", true);
  xhr.onreadystatechange = () => {
    console.log(xhr);
    if (xhr.readyState === 4) {
        let json = JSON.parse(xhr.response);
        if (callback) callback(json);
        events._data.events = json;
        for (let i = 0; i < events._data.events.length; i++){
          events._data.events[i].moreInfo = false;
        }
    }
  };
  xhr.send();
};
