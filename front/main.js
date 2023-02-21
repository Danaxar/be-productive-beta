// Update checkbox value according to the backend state
var checkBox = document.getElementById("toggle");
fetch("http://127.0.0.1:5000/state")
  .then((response) => response.json())
  .then((data) => (checkBox.checked = data.state));

// Events -> Change the backend state
checkBox.addEventListener("change", () => {
  var query;
  checkBox.checked === true ? (query = "on") : (query = "off");
  fetch(`http://127.0.0.1:5000/${query}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
});
