//data, calculations and scale width
const redSaber = document.querySelector('.main__progress-scale');

const regularData = {
  debtPercent: 15,
  widhPercent: 3.1,
}

const payments = [
  {
    name: 'first',
    date: '30.04.2021',
    paymentUah: 200,
    currentCourse: 27.75,
    payment() { return (this.paymentUah / this.currentCourse).toFixed(2) },
    coef() { return (regularData.debtPercent / this.payment()).toFixed(2) },
    percent() { return (1 / this.coef()).toFixed(2) },
    width() { return (regularData.widhPercent / this.coef()).toFixed(2) }
  },
]

let scaleWidth = [];
payments.forEach((p) => { scaleWidth.push( Number(p.width()) ) });
const scale = scaleWidth.reduce((acc, curr) => {
  return acc + curr;
});

redSaber.style.width = `${scale}px`;

let totalUsd = [];
payments.forEach((p) => { totalUsd.push( Number(p.payment()) ) });
const total = totalUsd.reduce((acc, curr) => {
  return acc + curr;
});

let totalPercent = [];
payments.forEach((p) => { totalPercent.push( Number(p.percent()) ) });
const percent = totalPercent.reduce((acc, curr) => {
  return acc + curr;
});

// password section
const password = 'hello polanko';

const passInput = document.querySelector('.main__enter-inp');
const passBtn = document.querySelector('.main__enter-btn');

const blueSaber = document.querySelector('.main__progress-blue');

const laser = document.querySelector('.main__laser');
const laserTarget = document.querySelector('.laser__target');

//menu render
const menu = document.querySelector('.main__menu');
const createMenu = '<ul class="main__menu-list"><li class="main__menu-item"><button class="progress__button">Show Progress</button></li><li class="main__menu-item"><button class="payments__button">Payments List</button></li></ul>'

//payments list render
const paymentsList = document.querySelector('.payments');

const ls = document.createElement('div');
ls.innerHTML = `<div class="payments__bg"></div><div class="payments__list"><ul class="list"></ul></div><h3 class="payments__total">Total progress: ${total.toFixed(2)}usd / ${percent.toFixed(2)}<span>%</span></h3>`

const li = document.createElement('li');
payments.forEach((p) => { li.innerHTML += `<li class="payments__item"><span>Date - ${p.date}</span><span>Current course: 1usd = ${p.currentCourse}uah</span><span>Payment: ${p.paymentUah}uah = ${p.payment()}usd = ${p.percent()}%</span></li>` });

//functionality
passBtn.addEventListener('click', startAnimationAndAudio);
function startAnimationAndAudio(event) {                        //saber animation and sound + input validation
  event.preventDefault();
  if (passInput.value.toLowerCase() === password && document.readyState === 'complete') {
    passInput.value = '';
    passInput.placeholder = '';

    const saberOn = new Audio('audio/lightsaberOn.wav');        //saber sound for turning on
    saberOn.play();

    const mediaQuery1 = window.matchMedia('(min-width: 992px)');//blue saber animation start + meidia queryes
    const mediaQuery2 = window.matchMedia('(max-width: 991px)');
    const mediaQuery3 = window.matchMedia('(max-width: 767px)');
    if (mediaQuery1.matches) {
      setTimeout(function() {                                     
        blueSaber.style.display = 'block';
        blueSaber.style.animation = 'swordon1 0.9s ease, blueSaberBlink 0.05s infinite ease';
      }, 600)
    }
    if (mediaQuery2.matches) {
      setTimeout(function() {                                     
        blueSaber.style.display = 'block';
        blueSaber.style.animation = 'swordon2 0.9s ease, blueSaberBlink 0.05s infinite ease';
      }, 600)
    }
    if (mediaQuery3.matches) {
      setTimeout(function() {                                     
        blueSaber.style.display = 'block';
        blueSaber.style.animation = 'swordon3 0.9s ease, blueSaberBlink 0.05s infinite ease';
      }, 600)
    }

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
        if (mediaQuery1.matches) {
          laser.animate([
            { top: '105vh', left: '101vw' },
            { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x + 45}px` }
          ], {
            duration: 250,
            iterations: 1
          });
        }
        if (mediaQuery2.matches) {
          laser.animate([
            { top: '80vh', left: '101vw' },
            { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x + 45}px` }
          ], {
            duration: 200,
            iterations: 1
          });
        }
        if (mediaQuery3.matches) {
          laser.animate([
            { top: '40vh', left: '101vw' },
            { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x + 45}px` }
          ], {
            duration: 150,
            iterations: 1
          });
        }
        
        laserShot.play();
        laserTarget.style.animation = 'target 0.2s ease 0.2s';
        setTimeout(function() {
          redSaber.style.display = 'block';
          redSaber.style.animation = 'createMenu 1s ease, redSaberBlink 0.05s infinite ease';
        }, 500)
      }
      setTimeout(function shotAnimation() {
        laserTarget.style.animation = '';
        if (mediaQuery1.matches) {
          laser.animate([
            { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x}px` },
            { top: '60vh', left: '-1vw' }
          ], {
            duration: 150,
            iterations: 1
          });
          laser.style.transform = 'rotate(-25deg)';
          setTimeout(function() {
            laser.style.transform = 'rotate(25deg)';
          }, 301);
        }
        if (mediaQuery2.matches) {
          laser.animate([
            { top: `${laserTarget.getBoundingClientRect().y + 10}px`, left: `${laserTarget.getBoundingClientRect().x}px` },
            { top: '40vh', left: '-1vw' }
          ], {
            duration: 100,
            iterations: 1
          });
          laser.style.transform = 'rotate(-25deg)';
          setTimeout(function() {
            laser.style.transform = 'rotate(25deg)';
          }, 301);
        }
        
      }, 300)
    }

    const showPayments = document.querySelector('.payments__button'); //payments list create
    showPayments.addEventListener('click', renderPeyments);
    function renderPeyments() {
      paymentsList.append(ls);
      paymentsList.style.animation = 'createPaymentList 3s ease';
      const listBody = document.querySelector('.list');
      payments.forEach(() => { listBody.append(li) });
    }
  }
  else {
    passInput.value = '';                                       //input validation
    passInput.placeholder = 'try again!';
  }
}

// exchange section
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