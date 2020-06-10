/* форма Message */

let modalMessage = document.querySelector(".modal_message-js");
let buttonMessageOpen = document.querySelector(".footer__button_message-js");
let buttonMessageClose = document.querySelector(".modal__close_message-js");
let inputMessage = document.querySelector(".form__input_message-js");

buttonMessageOpen.addEventListener("click", function(){
  modalMessage.classList.remove("modal_close");
  inputMessage.focus();
});

buttonMessageClose.addEventListener("click", function(){
  modalMessage.classList.add("modal_close");
  buttonMessageOpen.focus();
});

window.addEventListener("keydown", function(event){
  if(!modalMessage.classList.contains("modal_close") && event.code === "Escape") {
    modalMessage.classList.add("modal_close");
    buttonMessageOpen.focus();
  }
});

/* форма Register */

let modalRegister = document.querySelector(".modal_register-js");
let buttonRegisterOpen = document.querySelector(".header__register-button_js");
let buttonRegisterOpenMobile = document.querySelector(".mobile-header__register-button_js");
let buttonRegisterClose = document.querySelector(".modal__close_register-js");
let inputRegister = document.querySelector(".form__input_register-js");

buttonRegisterOpenMobile.addEventListener("click", function(){
  modalRegister.classList.remove("modal_close");
  inputRegister.focus();
});

buttonRegisterOpen.addEventListener("click", function(){
  modalRegister.classList.remove("modal_close");
  inputRegister.focus();
});

buttonRegisterClose.addEventListener("click", function(){
  modalRegister.classList.add("modal_close");
  buttonRegisterOpen.focus();
});

window.addEventListener("keydown", function(event){
  if(!modalRegister.classList.contains("modal_close") && event.code === "Escape") {
    modalRegister.classList.add("modal_close");
    buttonRegisterOpen.focus();
  }
});

/* форма Sing in */

let modalSingIn = document.querySelector(".modal_sing-in-js");
let buttonSingInOpen = document.querySelector(".header__sing-in-button_js");
let buttonSingInOpenMobile = document.querySelector(".mobile-header__sing-in-button_js");
let buttonSingInClose = document.querySelector(".modal__close_sing-in-js");
let inputSingIn = document.querySelector(".form__input_sing-in-js");

buttonSingInOpenMobile.addEventListener("click", function(){
  modalSingIn.classList.remove("modal_close");
  inputSingIn.focus();
});

buttonSingInOpen.addEventListener("click", function(){
  modalSingIn.classList.remove("modal_close");
  inputSingIn.focus();
});

buttonSingInClose.addEventListener("click", function(){
  modalSingIn.classList.add("modal_close");
  buttonSingInOpen.focus();
});

window.addEventListener("keydown", function(event){
  if(!modalSingIn.classList.contains("modal_close") && event.code === "Escape") {
    modalSingIn.classList.add("modal_close");
    buttonSingInOpen.focus();
  }
});

/* мобильное меню */

let buttonMobileHeader = document.querySelector(".header__mobile-menu_js");
let buttonCloseMobileHeader = document.querySelector(".mobile-header__button-close_js");
let mobileHeader = document.querySelector(".mobile-header");

buttonMobileHeader.addEventListener("click", function(){
  mobileHeader.classList.add("mobile-header_open");
});

buttonCloseMobileHeader.addEventListener("click", function(){
  mobileHeader.classList.remove("mobile-header_open");
});

/* кнопка скролла наверх */

(function() {
  'use strict';

  function trackScroll() {
    let scrolled = window.pageYOffset;

    if (scrolled > 1500) {
      goTopBtn.classList.add('top-button_show');
    }
    if (scrolled < 1500) {
      goTopBtn.classList.remove('top-button_show');
    }
  }

  function backToTop() {
    let scrollStep = window.pageYOffset / 50;
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -(scrollStep));
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector('.top-button');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();


/* Верификация форм */

function getValuesForm(form) {
  let body = {};
  const inputs = form.querySelectorAll("input"); 
  const textareas = form.querySelectorAll("textarea");
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "checkbox":
        if (!(input.checked)) {
          body[input.name] = input.value; 
        }
        else {
          body[input.name] = 'yes';
        }
        break;
        default:
          body[input.name] = input.value; 
          break;
    }  
  }
  l = textareas.length;
  for (let i = 0; i < l; i++) {  
    const textarea = textareas[i];
    body[textarea.name] = textarea.value; 
  }
  return body;
}

function setInvalidInput(input) {
  input.classList.add("form__input_bad");
  input.addEventListener("input", function handlerInput(event) {
    input.classList.remove("form__input_bad");
    input.removeEventListener("input", handlerInput);
  })
}

function setValidInput(input) {
  input.classList.add("form__input_good");
  input.addEventListener("input", function handlerInput(event) {
    input.classList.remove("form__input_good");
    input.removeEventListener("input", handlerInput);
  })
}

function setInvalidCheck(span) {
  span.classList.add("form__checkbox-indicator_bad");
}

function setFormErrors(form, errors, verified) {
  const inputs = form.querySelectorAll("input");
  const textareas = form.querySelectorAll("textarea");
  const span = form.querySelector(".form__checkbox-indicator");
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "checkbox":
        if(errors[input.name]) {
          setInvalidCheck(span); 
        }
        break;
      default:
        if(errors[input.name]) {
          setInvalidInput(input);
          errorMessageInputCreate(input, errors[input.name]);
        }
        else {
          setValidInput(input);
          verifiedMessageInputCreate(input, verified[input.name]); 
        }
        break;
    }
  }
  l = textareas.length;
  for (let i = 0; i < l; i++) {  
    const textarea = textareas[i];
    if(errors[textarea.name]) {
      setInvalidInput(textarea);
      errorMessageInputCreate(textarea, errors[textarea.name]);
    }
    else {
      setValidInput(textarea);
      verifiedMessageInputCreate(textarea, verified[textarea.name]);
    }
  }
}

function mailCheck(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function phoneCheck(phone) {
  return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function errorMessageInputCreate(input, text) {
  let message = document.createElement("div");
  message.classList.add("invalid-feedback");
  message.innerText = text;

  let nextMessage = input.nextElementSibling;
  console.log(nextMessage);
  if(nextMessage != null) {
    return
  }

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function handlerInput(event){
    message.remove();
    input.removeEventListener("input", handlerInput);
  })
}

function verifiedMessageInputCreate (input, text) { 
  let message = document.createElement("div");
  message.classList.add("valid-feedback");
  message.innerText = text;

  let nextMessage = input.nextElementSibling;
  console.log(nextMessage);
  if(nextMessage != null) {
    return
  }

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function handlerInput(event){
    message.remove();
    input.removeEventListener("input", handlerInput);
  })
}

/* Верификация формы form-register*/

(function() {
  let formRegister = document.forms["form-register"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const email = form.querySelector(".email-js");
    const password = form.querySelector(".password-js");
    const passwordRep = form.querySelector(".password-repeat-js");
    const name = form.querySelector(".name-js");
    const surname = form.querySelector(".surname-js");
    const location = form.querySelector(".location-js");
    const age = form.querySelector(".age-js");
    const acceptbutton = form.querySelector(".acceptbutton-js"); 
    let errors = {};
    let verified = {}; 
    
    if(values.email === null || values.email === "") {
      errors.email = 'This field is required';
    }
    else if(!mailCheck(values.email)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    else {
      verified.email = 'All right';
    }

    if(values.passwordRep === null || values.passwordRep === "") {
      errors.passwordRep = 'This field is required';
    }
    else if (values.password != values.passwordRep) {
      errors.passwordRep = 'Password mismatch';
    }
    else {
      verified.passwordRep = 'All right';
    }

    if(values.password === null || values.password === "") {
      errors.password = 'This field is required';
    }
    else if(values.password.length < 3 || values.password.length >= 20) {
      errors.password = 'Password must be between 3 and 20 characters';
    }
    else {
      verified.password = 'All right';
    }

    if(values.name === null || values.name === "") {
      errors.name = 'This field is required';
    }
    else if(parseInt(name.value)) {
      errors.name = 'This name is not valid';
    }
    else if(values.name.length < 3 || values.name.length >= 20) {
      errors.name = 'Your name is too short or too long';
    }
    else {
      verified.name = 'All right';
    }

    if(values.surname === null || values.surname === "") {
      errors.surname = 'This field is required';
    }
    else if(parseInt(surname.value)) {
      errors.surname = 'This surname is not valid';
    }
    else if(values.surname.length < 3 || values.surname.length >= 20) {
      errors.surname = 'Your surname is too short or too long';
    }
    else {
      verified.surname = 'All right';
    }

    if(values.location === null || values.location === "") {
      errors.location = 'This field is required';
    }
    else if(parseInt(location.value)) {
      errors.location = 'This location is not valid';
    }
    else if(values.location.length < 3 || values.location.length >= 20) {
      errors.location = 'Location name is too short or too long';
    }
    else {
      verified.location = 'All right';
    }

    if(age.value < 0 || age.value >= 100) {
      errors.age = 'This age is not valid';
    }
    else if(values.age === null || values.age === "") {
      errors.age = 'This field is required';
    }
    else {
      verified.age = 'All right';
    }

    if(values.acceptbutton === "no") {
      errors.acceptbutton = "You didn't agree to processing of your personal data";
    }

    setFormErrors(form, errors, verified);
  });
})();

/* Верификация формы sing-in*/

(function() {
  let formRegister = document.forms["form-sing-in"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const email = form.querySelector(".email-js");
    const password = form.querySelector(".password-js");
    let errors = {};
    let verified = {};  
    
    if(values.email === null || values.email === "") {
      errors.email = 'This field is required';
    }
    else if(!mailCheck(values.email)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    else {
      verified.email = 'All right';
    }

    if(values.password === null || values.password === "") {
      errors.password = 'This field is required';
    }
    else if(values.password.length < 3 || values.password.length >= 20) {
      errors.password = 'Password must be between 3 and 20 characters';
    }
    else {
      verified.password = 'All right';
    }

    setFormErrors(form, errors, verified);
  });
})();

/* Верификация формы message*/

(function() {
  let formRegister = document.forms["form-message"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const email = form.querySelector(".email-js");
    const name = form.querySelector(".name-js");
    const message = form.querySelector(".message-js");
    const phone = form.querySelector(".phone-js");
    const messagetext = form.querySelector(".messagetext-js"); 
    let errors = {};
    let verified = {};  
    
    if(values.email === null || values.email === "") {
      errors.email = 'This field is required';
    }
    else if(!mailCheck(values.email)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    else {
      verified.email = 'All right';
    }

    if(values.name === null || values.name === "") {
      errors.name = 'This field is required';
    }
    else if(parseInt(name.value)) {
      errors.name = 'This name is not valid';
    }
    else if(values.name.length < 3 || values.name.length >= 20) {
      errors.name = 'Your name is too short or too long';
    }
    else {
      verified.name = 'All right';
    }

    if(values.message === null || values.message === "") {
      errors.message = 'This field is required';
    }
    else if(parseInt(message.value)) {
      errors.message = 'This message is not valid';
    }
    else if(values.message.length < 3 || values.message.length >= 20) {
      errors.message = 'Your message is too short or too long';
    }
    else {
      verified.message = 'All right';
    }

    if(values.phone === null || values.phone === "") {
      errors.phone = 'This field is required';
    }
    else if(!phoneCheck(values.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    else {
      verified.phone = 'All right';
    }

    if(values.messagetext === null || values.messagetext === "") { 
      errors.messagetext = 'This field is required';
    }
    else if(values.messagetext.length < 3) {
      errors.messagetext = 'Your message is too short';
    }
    else {
      verified.messagetext = 'All right';
    }

    if(values.acceptbutton === "no") {
      errors.acceptbutton = "You didn't agree to processing of your personal data";
    }
    
    setFormErrors(form, errors, verified);
  });
})();

/* Slider 1 */

const wrapper = document.querySelector(".slider__wrapper");
const innerWrapper = document.querySelector(".slider__inner-wrapper");
const pagination = document.querySelector(".slider__pagination");
const buttonBack = document.querySelector(".slider__button_back");
const buttonNext = document.querySelector(".slider__button_next");
const slides = document.querySelectorAll(".slider__slide");

let shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
let numberSlides = innerWrapper.childElementCount - 1;
let activeSlide = 0;
let dots = [];

function initWidthSlides() {
  shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
  for(let i = 0; i < slides.length; i++) {
    slides[i].style.width = shearWidth + "px";
  }
}

initWidthSlides();

function init() {
  for(let i = 0; i < slides.length; i++) {
    let dot = document.createElement("button");
    dot.classList.add("slider__dot");
    if(i === activeSlide) {
      dot.classList.add("slider__dot_active");
    }
    dot.addEventListener("click", function () {
      setActiveSlide(i);
    })
    dots[dots.length] = dot;
    pagination.insertAdjacentElement("beforeend", dot);
  }
}

init();

function setActiveSlide(index) {
  if(index < 0 || index > numberSlides) {
    return;
  }
  innerWrapper.style.transition = "margin-left .5s";
  dots[activeSlide].classList.remove("slider__dot_active");
  dots[index].classList.add("slider__dot_active");
  if(activeSlide - index > 0) {
    buttonNext.removeAttribute("disabled");
  }
  if(activeSlide - index < 0) {
    buttonBack.removeAttribute("disabled");
  }
  if(index === 0) {
    buttonBack.setAttribute("disabled", "disabled");
  }
  if(index === numberSlides) {
    buttonNext.setAttribute("disabled", "disabled");
  }
  innerWrapper.style.marginLeft = "-" + shearWidth*index + "px";
  activeSlide = index;
  localStorage.setItem("activeSlide", activeSlide);   /* Несброс слайдера */ 
}

buttonNext.addEventListener("click", function () {
  const index = activeSlide + 1;
  setActiveSlide(index);
})

buttonBack.addEventListener("click", function () {
  const index = activeSlide - 1;
  setActiveSlide(index);
})

window.addEventListener("resize", function () {
  innerWrapper.style.transition = "";
  initWidthSlides();
  setActiveSlide(activeSlide);
  innerWrapper.style.transition = "margin-left .5s";
})

if(localStorage.getItem("activeSlide")){
  setActiveSlide(+localStorage.getItem("activeSlide"));  /* Несброс слайдера */ 
}

/* Slider 2 */

let mySwiper = new Swiper ('.swiper-container', {

  autoHeight: true, //enable auto height
  spaceBetween: 20,
  loop: true,


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})