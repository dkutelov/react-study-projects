import sound from '../assets/sound.wav';

export default function playSound() {
  const audioElement = new Audio(sound);
  audioElement.play();
}
