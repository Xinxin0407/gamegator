function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function submitEvent() {

  let tags = getElement("eventTags").value.split(",").map(x => x.trim().toLowerCase());
  console.log(tags);
  const tagobjs = tags.map(tag => {
    const obj = {};
    obj.name = tag;
    return obj;
  });
  console.log(tagobjs);
  const event = {
        organizer: getUsername(),
        name: getElement("eventName").value,
        address: getElement("eventAd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value,
        description: getElement("eventDesc").value,
        Keywords: tagobjs
  };
  sendXHR("POST", "/Home/events", JSON.stringify(event), () => alert("Success!"));
}
