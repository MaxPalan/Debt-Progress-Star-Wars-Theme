// password section

const password = '123';

const passInput = document.querySelector('.main__enter-inp');
const passBtn = document.querySelector('.main__enter-btn');

const blueSaber = document.querySelector('.main__progress-blue');

passBtn.addEventListener('click', startAnimationAndAudio);
function startAnimationAndAudio(event) {                        //saber animation and sound + input validation
  event.preventDefault();
  if (passInput.value === password) {
    passInput.value = '';
    const saberOn = new Audio('audio/lightsaberOn.mp3');        //saber sound for turning on
    saberOn.autoplay = true;
    setTimeout(function() {                                     //blue saber animation start
      blueSaber.style.display = 'block';
      blueSaber.style.animation = 'swordon 1.5s ease-in-out, blueSaberBlink 0.1s infinite ease-in-out';
    }, 600)
    const saberWorking = new Audio('audio/lightsaberWork.mp3'); //sound of saber work
    setTimeout(function() {
      saberWorking.play();
      saberWorking.loop = true;
    }, 1000)
  }
  else {
    passInput.value = '';                                       //input validation
    passInput.placeholder = 'try again!';
  }
}

//exchange section

class ExchangeModel {
  constructor() {
    this.exchange = [];
    this.apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
  }
  getExchangde() {
    axios.get(this.apiUrl).then((res) => {
      this.exchange = res.data;
      console.log(this.exchange);
    });
  }
}

class ExchangeController {
  constructor() {
    this.model = new ExchangeModel();
    this.init();
  }

  init() {
    this.model.getExchangde();
  }
}

const exchangeController = new ExchangeController();