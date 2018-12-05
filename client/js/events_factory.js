const search = new Vue({
    el: "#searchbar",
    data: {
      search: ""
    }
});

const events = new Vue ({
  el: "#listings",
  data: {
    events: [],
    users: [],
    mode: ""
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
    clicked2: function(user){
      const form = document.getElementById("form-contents");
      form.innerHTML =
        `<label style='font-size: 40px;'>${user.username}</label><br><br>` +
        `<label style='font-size: 25px'><b>ID: ${user._id}</b></label><br><br><br>` +
        `<label style='font-size: 15px'>${user.email}</label><br><br><br>`+
        "" +
        `<button type="button" class="admin btn cancel" onclick="deleteUser('${user._id}'); closeForm2()">(ADMIN) DELETE USER</button>` +
        "";

        renderAdminView(openForm2);
    },

    clicked: function(event) {
      const form = document.getElementById("form-contents");
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
        `<button type='button' class='btn notadmin' onclick=\"${rsvp_f}('${event._id}'); closeForm2();\">${rsvp_msg}</button><button type='button' class='btn notadmin' onclick=\"${favorite_f}('${event._id}'); closeForm2();\">${favorite_msg}</button><button type="button" class="admin btn cancel" onclick="deleteEvent('${event._id}'); closeForm2()">(ADMIN) DELETE EVENT</button>` +
        "<label style='font-size: 12px'>Organized by " + `${event.organizer}`+ "</label><br>" +
        "<label style='font-size: 12px'>Created " + `${(new Date(event.created_at)).toLocaleString()}`+ "</label><br>" +
        "<label style='font-size: 12px'>Updated " + `${(new Date(event.updated_at)).toLocaleString()}`+ "</label><br>" +
        "<label style='font-size: 12px'>Keywords: " + `${event.Keywords.map(kw => kw.name)}`+ "</label><br>" +
        "";

        renderAdminView(openForm2);
    }

  },

  computed: {
    filteredList: function (){
      if (this.mode !== 'events') return [];
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
        ];

        const rsvpBool = document.getElementById('rsvpd') && document.getElementById('rsvpd').checked;
        const favoritedBool = document.getElementById('favorited') && document.getElementById('favorited').checked;
        const createdBool = document.getElementById('created') && document.getElementById('created').checked;

        if (rsvpBool) match &= eventIsRSVPd(event._id);
        if (favoritedBool) match &= eventIsFavorited(event._id);

        for (tagg in TAGS){
          const tag = TAGS[tagg];
          const tagtrue = document.getElementById(tag).checked;
          if (tagtrue) match &= eventHasKeyword(event, tag.replace("-", " "));
        }

        if (createdBool) getUsername(uname => {
          match &= (event.organizer == uname);
          console.log(match);
          return match;
        });
        else return match;
      })
    },
    filteredListUsers: function (){
      if (this.mode !== 'users') return [];
      return this.users;
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

const getEvents = () => {
  console.log(events);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/Home/Events", true);
  xhr.onreadystatechange = () => {
    //console.log(xhr);
    if (xhr.readyState === 4) {
        let json = JSON.parse(xhr.response);

        //sort
        json.sort((e1,e2) => {
          if (!document.getElementById('sorting')) return 1;
          let sortBy = document.getElementById('sorting').value;
          if (sortBy === 'time') return new Date(e1[sortBy]) - new Date(e2[sortBy]);
          if (sortBy === 'created_at') return new Date(e2[sortBy]) - new Date(e1[sortBy]);
          /*
          console.log("sorting by " + sortBy);
          console.log('e1[sortBy] = ' + e1[sortBy]);
          console.log('e2[sortBy] = ' + e2[sortBy]);
          */
          return e1[sortBy] - e2[sortBy];
        });

        //if (callback) callback(json);
        events._data.events = json;
        events._data.mode = "events";
    }
  };
  xhr.send();
};

const getUsers = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/users", true);
  xhr.onreadystatechange = () => {
    //console.log(xhr);
    if (xhr.readyState === 4) {
      console.log("xhr.resopnse" + xhr.response);
        let json = JSON.parse(xhr.response);
        events._data.users = json;
        events._data.mode = "users";

        if (callback) callback(json);
    }
  };
  xhr.send();
};
