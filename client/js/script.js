$(function(){
  var $searchlink = $('#searchtoggl i');
  var $searchbar  = $('#searchbar');

  $('#topnav ul li a').on('click', function(e){
    e.preventDefault();

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

  xhr.onreadystatechange(() => {
    if (xhr.readyState === 4){
      if (callback) callback();
    }
  });

  xhr.send();
}
