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
  return "Default User (change later)";
}
//TODO
function isSignedIn(){
  return true;
}
//TODO
function getEmail(){
  return "";
}

function isCreatorOfEvent(eventid){
  return false;
}

//TODO
function eventIsFavorited(eventid){
  return true;
}

//TODO
function eventIsRSVPd(eventid){
  return true;
}

//TODO
function favorite(eventid){
  //return void\
  console.log("favorited " + eventid);
}

//TODO
function unfavorite(eventid){
  //return void
  console.log("unfavorited " + eventid);
}

//TODO
function rsvp(eventid){
  console.log("rsvp'd " + eventid);
  //return void
}

function insertNavBar(){
  let navbar = getElement("navbar");
  const navbarhtml = ""+
  "<div class=\"height\" >"+
  "<header id=\"topbar\" class=\"clearfix\">"+
    "<nav id=\"topnav\">"+

      "<ul>"+
        "<li><a href=\"/Home\" > GamerGator</a></li>"+
        "<li><a href=\"#\" id=\"searchtoggl\" >Search  </a></li>"+
        "<li><a href=\"/About\" class=\"headerLink\" style=\"text-decoration: none;\">About</a></li>"+
        "<li><a href=\"/Map\" >Map</a></li>"+
        "<li class=\"notadmin\"><a href=\"/MyEvents\" >My Events</a></li>"+
        "<li class=\"admin\"><a href=\"/Admin\">ADMIN</a></li>"+

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
      "<label for=\"uname\" style=\"color: #0021A5; font-size: 40px;\"><b>"+getUsername()+"</b></label>"+
     "<br><br><hr>"+

     "<form id=\"form1\">"+
        "<label style=\"color: #0021A5; font-size: 25px;\" ><b>Bio:</b></label>"+
        "<br><input type=\"text\" placeholder=\"Default bio...\" name=\"bio\"></br>"+
        "<label style=\"color: #0021A5; font-size: 25px;\"><b>Interests:</b></label>"+
        "<br><input type=\"text\" placeholder=\"Default interests...\" name=\"interests\"></br>"+
      "</form>"+
      "<div id=\"profile-outer\">"+
      "<div class=\"profile-inner\"><button><a href=\"/\" type=\"submit\">Log Out</a></button></div>"+
      "<div class=\"profile-inner\"><button type=\"button\" id=\"formButton\">Edit Profile</button></div>"+
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

  navbar.innerHTML = navbarhtml;

  renderAdminView();
}

insertNavBar();

function saveEvent(e){
  const form = getElement("form-contents");
  form.innerHTML =
    `<h1>${e}</h1>` +
    `<h1>${e.address}</h1>`;

}

function isAdmin(callback){
  sendXHR("GET", "/users/admin", null, res => callback(res));
}


isAdmin(res => console.log(res));


// DESKTOP
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
// (Source: http://stackoverflow.com/a/4770179)
var keys = [32,33,34,35,36,37,38,39,40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  disable_scroll_mobile();
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  	enable_scroll_mobile();
}


// MOBILE
function disable_scroll_mobile(){
  document.addEventListener('touchmove',preventDefault, false);
}
function enable_scroll_mobile(){
  document.removeEventListener('touchmove',preventDefault, false);
}


function deleteEvent(eventid){
  sendXHR("DELETE", `/Home/events/?eventId=${eventid}`, null, () => getEvents());
}

function deleteUser(userid){
  sendXHR("DELETE", `/users/?userId=${userid}`, null, () => getUsers());
}

function renderAdminView(callback){

  isAdmin(res => {
    if (res === 'false') console.log("You are not admin");
    else {
      console.log("you are admin");
      const adminsOnly = document.getElementsByClassName("admin");
      for (let i = 0; i < adminsOnly.length; i++){
        const element = adminsOnly[i];
        element.style.display = "block";
      }
      const nonAdminsOnly = document.getElementsByClassName("notadmin");
      for (let i = 0; i < nonAdminsOnly.length; i++){
        const element = nonAdminsOnly[i];
        element.style.display = "none";
      }
    }
    if (callback) callback();
  });
}