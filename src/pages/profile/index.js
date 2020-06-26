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

/* форма Password edit */

let modalPasswordEdit = document.querySelector(".modal_password-edit-js");
let buttonPasswordEditOpen = document.querySelector(".profile__button-password-js");
let buttonPasswordEditClose = document.querySelector(".modal__close_password-edit-js");
let inputPasswordEdit = document.querySelector(".form__input_sing-in-js");

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

let modalEditingData = document.querySelector(".modal_editing-data-js");
let buttonEditingDataOpen = document.querySelector(".profile__button-data-js");
let buttonEditingDataClose = document.querySelector(".modal__close-editing-data-js");
let inputEditingData = document.querySelector(".form__input_editing-data-js");

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

function getValuesForm(form, type) {
  if(type === "formData") {
    return new FormData(form);
  }
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

let inputFile = document.getElementById("form-profile-picture-editing-data"); 

function setInvalidLabel(label) {
  label.classList.add("form__label-picture_bad");
  inputFile.oninput = function () { 
    label.classList.remove("form__label-picture_bad"); //// ?
  }
}

function setValidLabel(label) {
  label.classList.add("form__label-picture_good");
  inputFile.oninput = function() { 
    label.classList.remove("form__label-picture_good"); //// ?
  }
}

function setFormErrors(form, errors, verified) {
  const inputs = form.querySelectorAll("input");
  const label = form.querySelector(".form__label-picture"); 
  let l = inputs.length;
  for (let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "file":
        if(errors[input.name]) {
          setInvalidLabel(label); 
          errorMessageInputCreate(label, errors[input.name]);
        }
        else {
          setValidLabel(label); 
          verifiedMessageInputCreate(label, verified[input.name]);
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

  inputFile.onclick = function() {    //// ?
    message.remove(); 
  }
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
  
  inputFile.onchange = function() {    //// ?
    message.remove(); 
  }
}

/* buttons */

let buttonEditingData = document.querySelector(".button_modal-editing-data");
let buttonPasswordEdit = document.querySelector(".button_modal-password-edit");

function setInvalidEditingData() {
  buttonEditingData.classList.add("button_bad");
  buttonEditingData.classList.remove("button_good");  
}
function setValidEditingData() {
  buttonEditingData.classList.add("button_good"); 
  buttonEditingData.classList.remove("button_bad");
}

function setInvalidPasswordEdit() {
  buttonPasswordEdit.classList.add("button_bad"); 
  buttonPasswordEdit.classList.remove("button_good");
}
function setValidPasswordEdit() {
  buttonPasswordEdit.classList.add("button_good");
  buttonPasswordEdit.classList.remove("button_bad");  
}

/* fetch */

const SERVER_URL = "https://academy.directlinedev.com";

function sendReq({url, method="GET", body={}, headers={}}) {
  let settings = {
    method,
    body,
    headers,
  };

  if(method === "GET") {
    settings.body = undefined;
  }

  return fetch(SERVER_URL + url, settings);
}

/* Token */

let buttonSingInOpen = document.querySelector(".header__sing-in-button_js");
let buttonSingInOpenMobile = document.querySelector(".mobile-header__sing-in-button_js");
let buttonRegisterOpen = document.querySelector(".header__register-button_js");
let buttonRegisterOpenMobile = document.querySelector(".mobile-header__register-button_js");
let buttonProfileOpen = document.querySelector(".header__profile_js");
let buttonProfileOpenMobile = document.querySelector(".mobile-header__profile_js");
let buttonSingOut = document.querySelector(".header__sing-out-button_js");
let buttonSingOutMobile = document.querySelector(".mobile-header__sing-out-button_js");

(function checkToken () {
  const token = localStorage.getItem("token");
  if(token) {
    buttonSingInOpen.classList.add("hidden-block");
    buttonSingInOpenMobile.classList.add("hidden");
    buttonRegisterOpen.classList.add("hidden-block");
    buttonRegisterOpenMobile.classList.add("hidden");
    buttonProfileOpen.classList.remove("hidden-block");
    buttonProfileOpenMobile.classList.remove("hidden");
    buttonSingOut.classList.remove("hidden-block");
    buttonSingOutMobile.classList.remove("hidden");
  } else {
    if(window.location.pathname === "/pages/profile/index.html") {
      window.location.pathname = "/index.html"
    }
    buttonSingInOpen.classList.remove("hidden-block");
    buttonSingInOpenMobile.classList.remove("hidden");
    buttonRegisterOpen.classList.remove("hidden-block");
    buttonRegisterOpenMobile.classList.remove("hidden");
    buttonProfileOpen.classList.add("hidden-block");
    buttonProfileOpenMobile.classList.add("hidden");
    buttonSingOut.classList.add("hidden-block");
    buttonSingOutMobile.classList.add("hidden");
  }
})();

function updateToken (token) {
  if(token) {
    localStorage.setItem("token", token);
    buttonSingInOpen.classList.add("hidden-block");
    buttonSingInOpenMobile.classList.add("hidden");
    buttonRegisterOpen.classList.add("hidden-block");
    buttonRegisterOpenMobile.classList.add("hidden");
    buttonProfileOpen.classList.remove("hidden-block");
    buttonProfileOpenMobile.classList.remove("hidden");
    buttonSingOut.classList.remove("hidden-block");
    buttonSingOutMobile.classList.remove("hidden");
  } else {
    localStorage.removeItem("token");
    buttonSingInOpen.classList.remove("hidden-block");
    buttonSingInOpenMobile.classList.remove("hidden");
    buttonRegisterOpen.classList.remove("hidden-block");
    buttonRegisterOpenMobile.classList.remove("hidden");
    buttonProfileOpen.classList.add("hidden-block");
    buttonProfileOpenMobile.classList.add("hidden");
    buttonSingOut.classList.add("hidden-block");
    buttonSingOutMobile.classList.add("hidden");
  }
  checkToken();
}

const loaderBox = document.querySelector(".loader-container_js");

function createLoader () {
  return `
  <div class="container-loader">
    <div class="load-3">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
  `
}

const profileImg = document.querySelector(".profile__img");
const profileName = document.querySelector(".profile__name");
const profileSurname = document.querySelector(".profile__surname");
const profileEmail = document.querySelector(".profile__email");
const profileLocation = document.querySelector(".profile__location");
const profileAge = document.querySelector(".profile__age");

let userData = {};

function updateUserData () {
  sendReq({
    method: "GET",
    url: "/api/users/" + localStorage.getItem("userId"), 
  })

  .then(function (res) {
    return res.json();
  })

  .then(function (user) {
    console.log(user.data);
    profileName.innerHTML = user.data.name;
    profileSurname.innerHTML = user.data.surname;
    profileEmail.innerHTML = user.data.email;
    profileLocation.innerHTML = user.data.location;
    profileAge.innerHTML = user.data.age;
    profileImg.style = `
    background-image: url(${SERVER_URL}${user.data.photoUrl});
    background-position: center;
    background-size: cover;
    `
    userData = user.data;
  })
  .catch(function (error) {
    alert("Information about you is not available.");
  })
}

updateUserData ();

/*password edit*/

(function() {
  let formRegister = document.forms["form-password-edit"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    loaderBox.innerHTML = createLoader();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    let errors = {};
    let verified = {};  

    sendReq({
      method: "PUT",
      url: "/api/users",
      body: getValuesForm(form, "formData"),
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })

    .then(function (res) {
      return res.json();
    })

    .then (function (res) {
      if(res.success) {
        updateUserData();
        loaderBox.innerHTML = "";
        setValidPasswordEdit();
        setTimeout(function () {
          modalPasswordEdit.classList.add("modal_close");
        }, 2000);
      } else {
        throw json.errors
      }
    })

    .catch(function(errors) {       
      loaderBox.innerHTML = "";
      setInvalidPasswordEdit();                               
      setFormErrors(form, errors, verified);               //////// !!!
      alert("ERROR!");
    });

    if(values.oldPassword === null || values.oldPassword === "") {
      errors.oldPassword = 'This field is required';
    }
    else {
      verified.oldPassword = 'All right';
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

/*editing-data*/

(function() {
  let formRegister = document.forms["form-editing-data"];
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    loaderBox.innerHTML = createLoader();
    const form = event.target;
    const values = getValuesForm(form);
    const name = form.querySelector(".name-js");
    const surname = form.querySelector(".surname-js");
    const location = form.querySelector(".location-js");
    const age = form.querySelector(".age-js");
    let errors = {};
    let verified = {};

    sendReq({
      method: "PUT",
      url: "/api/users",
      body: getValuesForm(form, "formData"),
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })

    .then(function (res) {
      return res.json();
    })

    .then (function (res) {
      if(res.success) {
        updateUserData();
        loaderBox.innerHTML = "";
        setValidEditingData();
        setTimeout(function () {
          modalEditingData.classList.add("modal_close");
        }, 2000);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        throw json.errors
      }
    })

    .catch(function(errors) {       
      loaderBox.innerHTML = "";                            
      setFormErrors(form, errors, verified); 
      setInvalidEditingData();               //////// !!!
      alert("ERROR!");
    });

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

/* Delete profile */

let profileDeleteButton = document.querySelector(".profile__button-delete-js");  //Error 403

(function() {
  profileDeleteButton.addEventListener("click", function(event) {
    event.preventDefault();

    sendReq({
      method: "DELETE",
      url: "/api/users/" + localStorage.getItem("userId"),
      headers: {       
        "x-access-token": localStorage.getItem("token") 
      }
    })
  
    .then(function (res) {
      return res.json();
    })

    .then (function (res) {
      if(res.success) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        alert("User successfully deleted!");
        window.location.pathname = "/index.html";
      } else {
        throw alert("ERROR!");
      }
    })
  })
})();

/* Sing out profile */

let singOutProfile = document.querySelector(".header__sing-out-button_js");
let singOutProfileMobile = document.querySelector(".mobile-header__sing-out-button_js");

singOutProfile.addEventListener("click", function(){
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});

singOutProfileMobile.addEventListener("click", function(){
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});