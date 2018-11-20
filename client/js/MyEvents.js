function submit() {
    const event = {
        organizer: getCookie("username"),
        name: getElement("eventname").value,
        address: getElement("eventAd").value,
        time: getElement("eventTime").value,
        price: getElement("eventFee").value
    };



}
