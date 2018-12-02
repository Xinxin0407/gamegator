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
    },

    clicked: function(event) {
      const form = getElement("form-contents");
      const rsvpd = eventIsRSVPd(event._id);
      let rsvp_msg = rsvpd ? "Already RSVPd'!":"RSVP";
      let rsvp_f = rsvpd ? 'console.log' : 'rsvp';

      const favorited = eventIsFavorited(event._id);

      let favorite_msg = favorited ? "Remove from favorites" : "Add to favorites!";
      let favorite_f = favorited ? 'unfavorite' : 'favorite';

      form.innerHTML =
        `<label style='font-size: 40px;'>${event.name}</label><br><br>` +
        `<label style='font-size: 25px'><b>${event.description}</b></label><br><br><br>` +
        `<img src='${(event && event.games && event.games[0]) ? event.games[0].coverUrl : "/Home/styles/missing.png"}'><br><br>`+
        `<label style='font-size: 25px'>${(new Date(event.time)).toLocaleString()}</label><br>`+
        `<label style='font-size: 15px'>${event.address}</label><br><br><br>`+
        "" +
        `<button type='button' class='btn' onclick=\"${rsvp_f}('${event._id}'); closeForm2();\">${rsvp_msg}</button><button type='button' class='btn' onclick=\"${favorite_f}('${event._id}'); closeForm2();\">${favorite_msg}</button>` +
        "<label style='font-size: 12px'>Organized by " + `${event.organizer}`+ "</label><br>" +
        "<label style='font-size: 12px'>Created " + `${(new Date(event.created_at)).toLocaleString()}`+ "</label><br>" +
        "<label style='font-size: 12px'>Updated " + `${(new Date(event.updated_at)).toLocaleString()}`+ "</label><br>" +
        "<label style='font-size: 12px'>Keywords: " + `${event.Keywords.map(kw => kw.name)}`+ "</label><br>" +
        "";

      openForm2();
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

        const rsvpBool = getElement('rsvpd') && getElement('rsvpd').checked;
        const favoritedBool = getElement('favorited') && getElement('favorited').checked;
        const createdBool = getElement('created') && getElement('created').checked;

        if (rsvpBool) match &= eventIsRSVPd(event._id);
        if (favoritedBool) match &= eventIsFavorited(event._id);
        if (createdBool) match &= isCreatorOfEvent(event._id);

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

        //sort
        json.sort((e1,e2) => {
          if (!getElement('sorting')) return 1;
          let sortBy = getElement('sorting').value;
          if (sortBy === 'time') return new Date(e1[sortBy]) - new Date(e2[sortBy]);
          if (sortBy === 'created_at') return new Date(e2[sortBy]) - new Date(e1[sortBy]);
          /*
          console.log("sorting by " + sortBy);
          console.log('e1[sortBy] = ' + e1[sortBy]);
          console.log('e2[sortBy] = ' + e2[sortBy]);
          */
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
