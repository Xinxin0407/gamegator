function deleteEvent(){
  const eventId = getElement("eventid").value;
  console.log(`want to delete event ${eventId}`);
  console.log(`/Home/events/?eventId=${eventId}`)
  sendXHR('DELETE', `/Home/events/?eventId=${eventId}`, null, () => console.log("Deleted!"));
}
