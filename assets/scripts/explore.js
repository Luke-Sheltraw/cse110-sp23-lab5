// explore.js

window.addEventListener('DOMContentLoaded', init);


let voices = [];

function updateVoices(dropdown) {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    dropdown.appendChild(option);
  });
}

function init() {
  const dropdown = document.querySelector('#voice-select');
  const button = document.querySelector('button');
  const input = document.querySelector('#text-to-speak');
  const image = document.querySelector('img');

  updateVoices(dropdown);
  speechSynthesis.onvoiceschanged = () => { updateVoices(dropdown) };

  button.addEventListener('click', () => {
    if (dropdown.value === 'select') {
      return;
    }
    const speak = new SpeechSynthesisUtterance(input.value);
    const voiceName = dropdown.selectedOptions[0].getAttribute('data-name');
    speak.addEventListener('end', () => {
      image.src = 'assets/images/smiling.png';
    });
    speak.addEventListener('start', () => {
      image.src = 'assets/images/smiling-open.png';
    });
    speak.voice = voices.find((voice) => voice.name === voiceName);
    speechSynthesis.speak(speak);
  })
}