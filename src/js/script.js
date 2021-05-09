// password section

const password = '123';

const passInput = document.querySelector('.main__enter-inp');
const passBtn = document.querySelector('.main__enter-btn');

const blueSaber = document.querySelector('.main__progress-blue');
const redSaber = document.querySelector('.main__progress-scale');

const laser = document.querySelector('.main__laser');
const laserTarget = document.querySelector('.laser__target');

const menu = document.querySelector('.main__menu');
const createMenu = '<ul class="main__menu-list"><li class="main__menu-item"><button class="progress__button">Show Progress</button></li><li class="main__menu-item"><button>Payments List</button></li></ul>'

passBtn.addEventListener('click', startAnimationAndAudio);
function startAnimationAndAudio(event) {                        //saber animation and sound + input validation
  event.preventDefault();
  if (passInput.value === password && document.readyState === 'complete') {
    passInput.value = '';
    passInput.placeholder = '';

    const saberOn = new Audio('audio/lightsaberOn.wav');        //saber sound for turning on
    saberOn.play();

    setTimeout(function() {                                     //blue saber animation start
      blueSaber.style.display = 'block';
      blueSaber.style.animation = 'swordon 0.9s ease, blueSaberBlink 0.05s infinite ease';
    }, 600)

    const saberWorking = new Audio('audio/lightsaberWork.wav'); //sound of saber work
    setTimeout(function() {
      saberWorking.play();
      saberWorking.loop = true;
    }, 1000)

    menu.innerHTML = createMenu;                                //menu creation
    
    const showProgress = document.querySelector('.progress__button');//progress animation and sound
    showProgress.addEventListener('click', progressAnimation);
    const laserShot = new Audio('audio/laserShot.wav');
    
    function progressAnimation() {
      laserTarget.addEventListener('click', targetLocated);
      laserTarget.click();

      function targetLocated() {                                    //laser shot animation
        laser.animate([
          { top: '105vh', left: '101vw' },
          { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x + 45}px` }
        ], {
          duration: 250,
          iterations: 1
        })
      
        laserShot.play();
        laserTarget.style.animation = 'target 0.2s ease 0.2s';
        setTimeout(function() {
          redSaber.style.display = 'block';
          redSaber.style.animation = 'createMenu 1s ease, redSaberBlink 0.05s infinite ease';
        }, 500)
      }
      setTimeout(function shotAnimation() {
        laserTarget.style.animation = '';
        laser.animate([
          { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x}px` },
          { top: '55vh', left: '-1vw' }
        ], {
          duration: 150,
          iterations: 1
        });
        laser.style.transform = 'rotate(-25deg)';
        setTimeout(function() {
          laser.style.transform = 'rotate(25deg)';
        }, 301)
      }, 300)
    }
  }
  else {
    passInput.value = '';                                       //input validation
    passInput.placeholder = 'try again!';
  }
}

//exchange section
const exchangeForm = document.querySelector('.main__exchange');

const inpUsd = document.querySelector('#usd');
const inpUah = document.querySelector('#uah');
const inpUsd2 = document.querySelector('#usd2');
const inpUah2 = document.querySelector('#uah2');

let exchange = [];
const apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
axios.get(apiUrl).then((res) => {
  exchange = res.data;
  const usd = exchange.find((x) => {return x.ccy === 'USD'}).buy;

  inpUsd.placeholder = 1;
  inpUah.placeholder = usd;
  inpUah2.placeholder = 1;
  inpUsd2.placeholder = 1 / usd;

  inpUsd.addEventListener('input', calcUah);
  function calcUah() {
    inpUah.value = (inpUsd.value * usd).toFixed(2);
  }
  inpUah2.addEventListener('input', calcUsd);
  function calcUsd() {
    inpUsd2.value = (inpUah2.value / usd).toFixed(2);
  }
});