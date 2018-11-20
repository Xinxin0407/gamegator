function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function submitEvent() {
  const event = {
        organizer: getUsername(),
        name: getElement("eventName").value,
        address: getElement("eventAd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value,
        description: getElement("eventDesc").value
  };

  sendXHR("POST", "/Home/events", JSON.stringify(event), () => alert("Success!"));






}
