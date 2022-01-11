window.addEventListener('DOMContecntLoaded', () => {

const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__item');


function hideTabContent () {
 tabsContent.forEach(item => {
    item.style.display = 'none';
 });
 tabs.forEach(item => {
     item.classList.remove('tabheader__item_active');
 });
}

function showTabContent (i) {
    tabsContent[i].style.display = 'block';
    tabs.classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent(1);
});