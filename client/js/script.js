$(function(){
  var $searchlink = $('#searchtoggl i');
  var $searchbar  = $('#searchbar');

  $('#topnav ul li a').on('click', function(e){

    if($(this).attr('id') == 'searchtoggl') {
      if(!$searchbar.is(":visible")) {
        // if invisible we switch the icon to appear collapsable
        $searchlink.removeClass('fa-search').addClass('fa-search-minus');
      } else {
        // if visible we switch the icon to appear as a toggle
        $searchlink.removeClass('fa-search-minus').addClass('fa-search');
      }

      $searchbar.slideToggle(300, function(){
        // callback after search bar animation
      });
    } else {  }
  });

  $('#searchform').submit(function(e){
    e.preventDefault(); // stop form submission
  });
});


//        DOM
//-----------------------------------------------------------------------------
function getElement(id){
  return document.getElementById(id);
}

function editText(id, text){
  getElement(id).innerText = text;
}

function editHTML(id, html){
  getElement(id).innerHTML = html;
}



//        COOKIES
//-------------------------
function setCookie(key, value) {
    document.cookie = key + "=" + value + ";path=/";
}

function clearCookie(key){
  setCookie(key, "");
}

function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//        AJAX
//------------------------------------------------------------
function sendXHR(method, path, body, callback){
  let xhr = new XMLHttpRequest();
  xhr.open(method, path);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4){
      if (callback) callback(xhr.response);
    }
  };

  if (body) xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(body);
}

//TODO
function getUsername(){
  return "default user";
}
//TODO
function isSignedIn(){
  return true;
}
//TODO
function getEmail(){
  return "";
}

function isCreatorOfEvent(event){
  return event.organizer === getUsername();
}

//TODO
function eventIsFavorited(event){
  return true;
}

//TODO
function eventIsRSVPd(event){
  return true;
}

function insertNavBar(){
  let navbar = getElement("navbar");
  navbar.innerHTML = ""+
  "<div class=\"height\" >"+
  "<header id=\"topbar\" class=\"clearfix\">"+
    "<nav id=\"topnav\">"+

      "<ul>"+
        "<li><a href=\"/Home\" > GamerGator</a></li>"+
        "<li><a href=\"#\" id=\"searchtoggl\" >Search  </a></li>"+
        "<li><a href=\"/About\" class=\"headerLink\" style=\"text-decoration: none;\">About</a></li>"+
        "<li><a href=\"/Map\" >Map</a></li>"+
        "<li><a href=\"/MyEvents\" >My Events</a></li>"+

        "<li style=\"float: right;\">"+
          "<div class=\"dropdown\" style=\"float: middle;\">"+
          "<a href=\"#\"> <!-- profile view pop up -->"+
            "<button class=\"profile-button\" onclick=\"document.getElementById('id02').style.display='block'\">"+
            "<input type=\"image\"  id=\"profile dropdown\" src=\"/Home/profile.png \" alt=\"User Options\" width='75' height='75' /></a>"+
              "<div class=\"dropdown-content\" id=\"dropdown-content\">"+
                "<a href=\"#\" style=\"color: #000000; font-size: 15px;\">View Profile</a>"+
                "<a href=\"/MyEvents\" style=\"color: #000000; font-size: 15px;\">My Events</a>"+
                "<a href=\"/\" style=\"color: #000000; font-size: 15px;\">Log Off</a>"+
              "</div>"+
            "</div>"+
          "</button>"+
         "</li>"+

      "</ul>"+
     "</nav>"+
   "</header>"+
   "</div>"+


"<div id=\"id02\" class=\"profile-modal\">"+
  "<form class=\"profile-modal-content profile-animate\" action=\"/action_page.php\">"+
    "<div class=\"piccontainer\" style=\"padding-right: 92px;\">"+
      "<img src=\"/Home/profile.png\" alt=\"image\" class=\"profile\" style=\"float: right;\">"+
    "</div>"+

    "<div class=\"viewprofile\">"+
      "<label for=\"uname\" style=\"color: #0021A5; font-size: 40px;\"><b>Username</b></label>"+
     "<br><br><hr>"+

      "<label style=\"color: #0021A5; font-size: 25px;\" ><b>Bio:</b></label>"+
      "<p>This is where a user bio would be located</p>"+
      "<label style=\"color: #0021A5; font-size: 25px;\"><b>Interests:</b></label>"+
      "<p>This is where a user could display any games they are interested in</p>"+
      "<div id=\"profile-outer\">"+
      "<div class=\"profile-inner\"><button href=\"/\" type=\"submit\">Log Out</button></div>"+
      "<div class=\"profile-inner\"><button href=\"/profile\" type=\"new submit\">Edit Profile</button></div>"+
      "</div>"+
    "</div>"+
  "</form>"+
"</div>"+





  "<script>  var modal = document.getElementById('id02'); window.onclick = function(event) {"+
      "if (event.target == modal) {"+
          "modal.style.display = \"none\";} }   </script>"+


  "<!----------------------------------------------- SEARCH BAR ---------------------------------------------->"+
  "<div id=\"searchbar\" class=\"clearfix\">"+
    "<form id=\"searchform\" method=\"get\" action=\"searchpage.php\">"+
      "<button type=\"submit\" id=\"searchsubmit\" class=\"fa fa-search fa-4x\"></button>"+
      "<input type=\"search\" name=\"s\" id=\"s\" placeholder=\"Keywords...\" autocomplete=\"off\" v-model=\"search\">"+
    "</form>"+
  "</div>";
}

insertNavBar();

function saveEvent(e){
  const form = getElement("form-contents");
  form.innerHTML =
    `<h1>${e}</h1>` +
    `<h1>${e.address}</h1>`;

}
