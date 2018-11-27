function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function submitEvent() {

  const tags = getElement("eventTags").value.split(",").map(x => x.trim().toLowerCase());
  console.log(tags);
  const event = {
        organizer: getUsername(),
        name: getElement("eventName").value,
        address: getElement("eventAd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value,
        description: getElement("eventDesc").value,
        tags: tags
  };
  sendXHR("POST", "/Home/events", JSON.stringify(event), () => alert("Success!"));
}
