/* форма Message */

var modalMessage = document.querySelector(".modal_message-js");
var buttonMessageOpen = document.querySelector(".footer__button_message-js");
var buttonMessageClose = document.querySelector(".modal__close_message-js");
var inputMessage = document.querySelector(".form__input_message-js");

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

var modalRegister = document.querySelector(".modal_register-js");
var buttonRegisterOpen = document.querySelector(".header__register-button_js");
var buttonRegisterOpenMobile = document.querySelector(".mobile-header__register-button_js");
var buttonRegisterClose = document.querySelector(".modal__close_register-js");
var inputRegister = document.querySelector(".form__input_register-js");

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

var modalSingIn = document.querySelector(".modal_sing-in-js");
var buttonSingInOpen = document.querySelector(".header__sing-in-button_js");
var buttonSingInOpenMobile = document.querySelector(".mobile-header__sing-in-button_js");
var buttonSingInClose = document.querySelector(".modal__close_sing-in-js");
var inputSingIn = document.querySelector(".form__input_sing-in-js");

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

var buttonMobileHeader = document.querySelector(".header__mobile-menu_js");
var buttonCloseMobileHeader = document.querySelector(".mobile-header__button-close_js");
var mobileHeader = document.querySelector(".mobile-header");

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
    var scrolled = window.pageYOffset;

    if (scrolled > 1500) {
      goTopBtn.classList.add('top-button_show');
    }
    if (scrolled < 1500) {
      goTopBtn.classList.remove('top-button_show');
    }
  }

  function backToTop() {
    var scrollStep = window.pageYOffset / 50;
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -(scrollStep));
      setTimeout(backToTop, 0);
    }
  }

  var goTopBtn = document.querySelector('.top-button');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();


/* Верификация форм */

function getValuesForm(form) {
  let body = {};
  const inputs = form.querySelectorAll("input"); 
  const textareas = form.querySelectorAll("textarea");
  const l = inputs.length;
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
        case "file":
          if (input.checked) { 
            body[input.name] = input.files; 
          }
          break; 
        default:
          body[input.name] = input.value; 
          break;
    }  
  }

  const l2 = textareas.length;
  for (let i = 0; i < l2; i++) {
    const input = inputs[i];
    body[input.name] = input.value; 
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

function setFormErrors(form, errors, verified) {
  const inputs = form.querySelectorAll("input");
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "checkbox":
        if(errors[input.name]) {
          setInvalidInput(input);
        }
        break;
      case "file":
        if(errors[input.name]) {
          setInvalidInput(input);
        }
      default:
        if(errors[input.name]) {
          setInvalidInput(input);
          errorMessageInputCreate(input, errors[input.name]);
        }
        else {
          setValidInput(input);
          verifiedMessageInputCreate(input, verified[input.name]); ///
        }
        break;
    }
  }
}

function mailCheck(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function errorMessageInputCreate(input, text) {
  let message = document.createElement("div");
  message.classList.add("invalid-feedback");
  message.innerText = text;

  input.insertAdjacentElement("afterend", message);
  let nextMessage = input.nextElementSibling.classList.contains('invalid-feedback');
  console.log(nextMessage);
  input.addEventListener("input", function handlerInput(event){
    message.remove();
    input.removeEventListener("input", handlerInput);
  })
}

function verifiedMessageInputCreate (input, text) {  //////
  let message = document.createElement("div");
  message.classList.add("valid-feedback");
  message.innerText = text;

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function handlerInput(event){
    message.remove();
    input.removeEventListener("input", handlerInput);
  })
}

(function() {
  let formRegister = document.forms["form-register"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const email = form.querySelector(".email_js");
    const password = form.querySelector(".password_js");
    const passwordRep = form.querySelector(".password-repeat_js");
    const name = form.querySelector(".name_js");
    const surname = form.querySelector(".surname_js");
    const location = form.querySelector(".location_js");
    const age = form.querySelector(".age_js");
    let errors = {};
    let verified = {};  ////
    
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
    else if(values.name.length < 3 || values.name.length >= 20) {
      errors.name = 'Your name is too short or too long';
    }
    else if(parseInt(name.value)) {
      errors.name = 'This name is not valid';
    }
    else {
      verified.name = 'All right';
    }

    if(values.surname === null || values.surname === "") {
      errors.surname = 'This field is required';
    }
    else if(values.surname.length < 3 || values.surname.length >= 20) {
      errors.surname = 'Your surname is too short or too long';
    }
    else if(parseInt(surname.value)) {
      errors.surname = 'This surname is not valid';
    }
    else {
      verified.surname = 'All right';
    }

    if(values.location === null || values.location === "") {
      errors.location = 'This field is required';
    }
    else if(values.location.length < 3 || values.location.length >= 20) {
      errors.location = 'This field is required';
    }
    else if(parseInt(location.value)) {
      errors.location = 'This location is not valid';
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

    setFormErrors(form, errors, verified);
  });
})();