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

/* форма Password edit */

var modalPasswordEdit = document.querySelector(".modal_password-edit-js");
var buttonPasswordEditOpen = document.querySelector(".profile__button-password-js");
var buttonPasswordEditClose = document.querySelector(".modal__close_password-edit-js");
var inputPasswordEdit = document.querySelector(".form__input_sing-in-js");

buttonPasswordEditOpen.addEventListener("click", function(){
  modalPasswordEdit.classList.remove("modal_close");
  inputPasswordEdit.focus();
});

buttonPasswordEditClose.addEventListener("click", function(){
  modalPasswordEdit.classList.add("modal_close");
  buttonPasswordEditOpen.focus();
});

window.addEventListener("keydown", function(event){
  if(!modalPasswordEdit.classList.contains("modal_close") && event.code === "Escape") {
    modalPasswordEdit.classList.add("modal_close");
    buttonPasswordEditOpen.focus();
  }
});

/* форма Editing data */

var modalEditingData = document.querySelector(".modal_editing-data-js");
var buttonEditingDataOpen = document.querySelector(".profile__button-data-js");
var buttonEditingDataClose = document.querySelector(".modal__close-editing-data-js");
var inputEditingData = document.querySelector(".form__input_editing-data-js");

buttonEditingDataOpen.addEventListener("click", function(){
  modalEditingData.classList.remove("modal_close");
  inputEditingData.focus();
});

buttonEditingDataClose.addEventListener("click", function(){
  modalEditingData.classList.add("modal_close");
  buttonEditingDataOpen.focus();
});

window.addEventListener("keydown", function(event){
  if(!modalEditingData.classList.contains("modal_close") && event.code === "Escape") {
    modalEditingData.classList.add("modal_close");
    buttonEditingDataOpen.focus();
  }
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
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
        case "file":
          body[input.name] = input.files; 
          break; 
        default:
          body[input.name] = input.value; 
          break;
    }  
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

function setInvalidLabel(label) {
  label.classList.add("form__label-picture_bad");
}

function setValidLabel(label) {
  label.classList.add("form__label-picture_good");
}

function setFormErrors(form, errors, verified) {
  const inputs = form.querySelectorAll("input");
  const label = form.querySelector(".form__label-picture"); //////////////////!!!!!!!!!!!!!!
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "file":
        if(errors[input.name]) {
          setInvalidLabel(label); //////////////////////////!!!!!!!!!!!!
          errorMessageInputCreate(input, errors[input.name]);
        }
        else {
          setValidLabel(label); ////////////////////////////!!!!!!!!!!!!
          verifiedMessageInputCreate(input, verified[input.name]);
        }
        break;
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

function verifiedMessageInputCreate (input, text) {  //////
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

/* Верификация формы sing-in*/

(function() {
  let formRegister = document.forms["form-password-edit"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const password = form.querySelector(".password-js");
    const newPassword = form.querySelector(".new-password-js");
    const newPasswordRep = form.querySelector(".new-password-repeat-js");
    let errors = {};
    let verified = {};  

    if(values.password === null || values.password === "") {
      errors.password = 'This field is required';
    }
    else {
      verified.password = 'All right';
    }

    if(values.newPassword === null || values.newPassword === "") {
      errors.newPassword = 'This field is required';
    }
    else if (values.password == values.newPassword) {
      errors.newPassword = 'The new password cannot be the same as the old';
    }
    else {
      verified.newPassword = 'All right';
    }

    if(values.newPasswordRep === null || values.newPasswordRep === "") {
      errors.newPasswordRep = 'This field is required';
    }
    else if (values.newPassword != values.newPasswordRep) {
      errors.newPasswordRep = 'New password mismatch';
    }
    else {
      verified.newPasswordRep = 'All right';
    }

    setFormErrors(form, errors, verified);
  });
})();

/* Верификация формы editing-data*/

(function() {
  let formRegister = document.forms["form-editing-data"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    const email = form.querySelector(".email-js");
    const name = form.querySelector(".name-js");
    const surname = form.querySelector(".surname-js");
    const location = form.querySelector(".location-js");
    const age = form.querySelector(".age-js");
    const avatar = form.querySelector(".avatar-js");
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

    if(values.avatar.length === 0) {
      errors.avatar = 'You forgot to choose a photo';
    }
    else {
      verified.avatar = 'All right';
    }

    setFormErrors(form, errors, verified);
  });
})();

/* Поле загрузки изображения*/

const output = document.querySelector('.form__label-picture');
if (window.FileList && window.File) {
  document.getElementById('form-profile-picture-editing-data').addEventListener('change', event => {
    output.innerHTML = '';
    for (const file of event.target.files) {
      const span = document.createElement('span');
      const name = file.name ? file.name : 'NOT SUPPORTED';
      span.textContent = `${name}`;
      output.appendChild(span);
    }
  }); 
}