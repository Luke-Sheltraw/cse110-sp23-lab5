// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM selectors
  const dropdown = document.querySelector('#horn-select');
  const picture = document.querySelector('img');
  const slider  = document.querySelector('#volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const button = document.querySelector('button');
  const audio = document.querySelector('audio.hidden');

  const jsConfetti = new JSConfetti();

  let curVolume = slider.value;
  let curSelected = null;

  dropdown.addEventListener('change', () => {
    curSelected = dropdown.value;
    picture.src = 'assets/images/' + curSelected + '.svg';
  });

  slider.addEventListener('input', () => {
    curVolume = +(slider.value);
    let volLevel;
    if (curVolume === 0) {
      volLevel = 0;
    } else if (curVolume < 33) {
      volLevel = 1;
    } else if (curVolume < 67) {
      volLevel = 2;
    } else {
      volLevel = 3;
    }
    volumeIcon.src = 'assets/icons/volume-level-' + volLevel + '.svg';
  });

  button.addEventListener('click', () => {
    if (curSelected === null) {
      return;
    }
    audio.src = 'assets/audio/' + curSelected + '.mp3';
    audio.load();
    audio.volume = (curVolume / 100);
    audio.play();
    if (curSelected === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}