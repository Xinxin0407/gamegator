function openForm() {
  if (!isSignedIn()) alert("You must be signed in!");
  else {
    document.getElementById("myForm").style.display = "block";
    if (getElement("form-background")) getElement("form-background").style.display = "block";
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
