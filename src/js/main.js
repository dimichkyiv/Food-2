document.addEventListener('DOMContentLoaded', () => {

    //Tabs

const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');


function hideTabContent () {
 tabsContent.forEach(item => {
    item.style.display = 'none';
 });
 tabs.forEach(item => {
     item.classList.remove('tabheader__item_active');
 });
}

function showTabContent (i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')){
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});


//Timer

const deadLine = '2022-01-19';

function getTimeReamining (endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date);
    const days = Math.floor((time / (1000*60*60*24)));
    const hours = Math.floor ((time / (1000*60*60)%24));
    const minutes = Math.floor ((time /(1000*60)%60));
    const seconds = Math.floor ((time/ 1000)%60);

    return {
        'timeTotal' : time ,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}


function setClock (selector, endtime){
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock(){
        const time = getTimeReamining(endtime);


        days.innerHTML = getZero(time.days);
        hours.innerHTML = getZero(time.hours);
        minutes.innerHTML = getZero(time.minutes);
        seconds.innerHTML = getZero(time.seconds);
        if (time.timeTotal <= 0 && timeInterval){
            clearInterval(timeInterval);
        }
    }

}
setClock('.timer', deadLine);

//Modal

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', () =>{
        modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
});
function closeModal () {
    modal.style.display = 'none';
    document.body.style.overflow = "";
}
modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) =>{
   if(e.target === modal) {
        closeModal();
   }
});
document.addEventListener('keydown', (e) =>{
if (e.code === 'Escape') {
    closeModal();
}
});
});

