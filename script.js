var url = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,racist,sexist&type=single";
var inputTxt;
var joke;
var synth = window.speechSynthesis;
var inputForm = document.querySelector('form');

function getJoke() {
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    joke = json.joke;
    inputTxt = joke + "...hah hehe hoho hihi";
  });
}

function speak() {
  if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
  }
  var utterThis = new SpeechSynthesisUtterance(inputTxt);
  utterThis.onend = function (event) { console.log('SpeechSynthesisUtterance.onend'); }
  utterThis.onerror = function (event) { console.error('SpeechSynthesisUtterance.onerror'); }
  utterThis.voice = synth.getVoices()[7]
  utterThis.pitch = 0;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

inputForm.onsubmit = function(event) {
  event.preventDefault();
  getJoke();
  setTimeout(() => {  speak(); document.getElementById("joke").innerHTML = joke; }, 1500);
}
