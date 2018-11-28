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

        //check the name
        if (event.name.toLowerCase().includes(keywords.toLowerCase())) match = true;
        event.Keywords.map(ekw => {
          match |= (ekw && ekw.name && ekw.name.toLowerCase().includes(keywords));
        });

        if (!match) return false;

        //check the tags

        const TAGS = [
          'role-playing', 'board-games', 'pc-games', 'xbox-games', 'ps4-games', 'card-games', 'no-buy-in', 'tournaments', 'casual'
        ]

        const rsvpBool = getElement('rsvpd').checked;
        const favoritedBool = getElement('favorited').checked;
        const createdBool = getElement('created').checked;

        if (rsvpBool) match &= eventIsRSVPd(event);
        if (favoritedBool) match &= eventIsFavorited(event);
        if (createdBool) match &= isCreatorOfEvent(event);

        for (tagg in TAGS){
          const tag = TAGS[tagg];
          const tagtrue = getElement(tag).checked;
          if (tagtrue) match &= eventHasKeyword(event, tag.replace("-", " "));
        }
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
    //console.log(xhr);
    if (xhr.readyState === 4) {
        let json = JSON.parse(xhr.response);
        json.sort((e1,e2) => {
          let sortBy = getElement('sorting').value;
          if (sortBy === 'time' || sortBy==='created_at'){
            return new Date(e1[sortBy]) - new Date(e2[sortBy]);
          }
          console.log("sorting by " + sortBy);
          console.log('e1[sortBy] = ' + e1[sortBy]);
          console.log('e2[sortBy] = ' + e2[sortBy]);
          return e1[sortBy] - e2[sortBy];
        });

        if (callback) callback(json);
        events._data.events = json;
        for (let i = 0; i < events._data.events.length; i++){
          events._data.events[i].moreInfo = false;
        }
    }
  };
  xhr.send();
};

function applySorting(events){

}
