/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //Timer

  const deadLine = '2022-01-19';

  function getTimeReamining(endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor(time / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(time / (1000 * 60) % 60);
    const seconds = Math.floor(time / 1000 % 60);
    return {
      'timeTotal': time,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const time = getTimeReamining(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);

      if (time.timeTotal <= 0 && timeInterval) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine); 
  
  //Modal

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  const modalTimerId = setTimeout(openModal, 3000);
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  function openModal () {
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = "";
  }

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close')=="") {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });
function showModalByScroll () {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
}};
  window.addEventListener('scroll', showModalByScroll);
  


  // использование класа для карточек

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title; 
        this.description = description;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }
      changeToUAH() {
          this.price = this.price * this.transfer;
      }
      render() {
        const element = document.createElement('div');
        this.classes.forEach(className => {element.classList.add(className)});
        element.innerHTML = `  
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.description}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              `;
              this.parent.append(element);
      }

  }
new MenuCard(
  'img/tabs/vegy.jpg',
  "vegy",
  "Меню Фитнес",
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  11,
  ".menu .container",
  "menu__item"
).render();

new MenuCard(
  'img/tabs/elite.jpg',
  "elite",
  "Меню Премиум",
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  19,
  ".menu .container",
  "menu__item"
).render();

new MenuCard(
  'img/tabs/post.jpg',
  "post",
  "Меню Постное",
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  10,
  ".menu .container",
  "menu__item"
).render();

//Forms

const forms = document.querySelectorAll('form');
const message = {
  loading: 'img/form/spinner.svg',
  success: 'everything is ok, we will call you back', 
  failure: 'Something went wrong'
};
forms.forEach(item => {
postData(item);
});

function postData(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage);



    request.setRequestHeader('Content-type', 'aplication/json');
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function (value, key){
        object[key] = value;
      });

    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'aplication/json',
      },
      body: JSON.stringify(object)
    }).then(data => data.text())
    .then(data =>{
      console.log(data);
      ShowThanksModal(message.success);
      statusMessage.remove();
    }).catch(()=>{
      ShowThanksModal(message.failure);
    }).finally(()=>{
      form.reset();
    })


    // request.addEventListener('load', () => {
    //   if(request.status === 200) {
    //     console.log(request.response);
    //     ShowThanksModal(message.success);
    //     form.reset();
    //     statusMessage.remove();
    //   } else {
    //     ShowThanksModal(message.failure);
    //   }
    // });
  });
}
function ShowThanksModal (message){
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  openModal();

  const thankModal = document.createElement('div');
  thankModal.classList.add('.modal__dialog');
  thankModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
          </div>
        </div>

    </div>`;
    document.querySelector('.modal').append(thankModal);
    setTimeout(()=>{
      thankModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
}
});

/***/ })

/******/ })
//# sourceMappingURL=script.js.map