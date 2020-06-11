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
    const name = form.querySelector(".name-js");
    const surname = form.querySelector(".surname-js");
    const location = form.querySelector(".location-js");
    const age = form.querySelector(".age-js");
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
    const name = form.querySelector(".name-js");
    const message = form.querySelector(".message-js");

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

/* фильтр */

const SERVER_URL = "https://academy.directlinedev.com";

(function () {
  let tagsBox = document.querySelector(".filter__tag");
  let cardsBox = document.querySelector(".blog");
  let allValuesPage = getValuesFromUrl();

  function createLoader () {
    return `
    <div class="load-3">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    `
  }

  function createCard(card) {
    return `
    <li class="blog__item">
            <picture class="blog__img-box">
              <source srcset="${SERVER_URL}${card.mobilePhotoUrl}, ${SERVER_URL}${card.mobile2xPhotoUrl}" media="(max-width: 700px)">
              <source srcset="${SERVER_URL}${card.tabletPhotoUrl}, ${SERVER_URL}${card.tablet2xPhotoUrl}" media="(max-width: 850px)">
              <source srcset="${SERVER_URL}${card.desktopPhotoUrl}, ${SERVER_URL}${card.desktop2xPhotoUrl}">
              <img class="blog__img" src="${SERVER_URL}${card.desktopPhotoUrl}" width="320" height="236" alt="${card.title}"/>
            </picture>
            <div class="blog__content">
              <ul class="blog__tag-list list-point-none">
                <li class="blog__tag blog__tag_1"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_2"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_3"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_4"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_5"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_6"></li>
                <li class="blog__tag blog__tag_hidden blog__tag_7"></li>
                <li class="blog__tag blog__tag_8"></li>
              </ul>
              <span class="blog__date blog__info">${parseDate(card.date)}</span>
              <span class="blog__views blog__info">${card.views} views</span>
              <span class="blog__comments blog__info">${card.commentsCount} comments</span>
              <h2 class="blog__title">${card.title}</h2>
              <p class="blog__text">${card.text}</p>
              <a class="blog__link" href="#">Go to this post</a>
            </div>
          </li>
    `
  }

  function parseDate (cardDate) {
    let date = new Date(cardDate);
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return (day + "." + month + "." + year);
  }

  call("GET", "/api/tags", function (res) {
    let response = JSON.parse(res.response);
    if(response.success) {
      const tags = response.data;
      let tagsHTML = "";
      for(let i=0; i < tags.length; i++) {
        tagsHTML += createTag(tags[i]);
      }
      tagsBox.innerHTML = tagsHTML;
      setAllValuesForForm(filterForm, getValuesFromUrl());
    } else {
      alert("ERROR!");
    }
  }, function () {
    tagsBox.innerHTML = createLoader();
  });

  getCards(allValuesPage);

  function getCards(allValuesPage) {
    const page = allValuesPage.page ? +allValuesPage.page : 1;
    const howShow = allValuesPage.howShow ? +allValuesPage.howShow : 5;
    const offset = (page-1)*howShow;
    let tags = JSON.stringify(allValuesPage.tags || []);

    let commentsArr = allValuesPage.commentsCount || []; 
    let minComm = 1000000;
    let maxComm = -1;
    for(let i=0; i < commentsArr.length; i++) {
      let a = commentsArr[i].split("-")[0];
      let b = commentsArr[i].split("-")[1];
      console.log(a, b);
      minComm = +getMin(+minComm, getMin(+a, +b));
      maxComm = +getMax(+maxComm, getMax(+a, +b));
    }

    let filterComm = {};
    let commentStr = "";
    if(minComm !== 1000000 && maxComm !== -1) {
      filterComm.commentsCount = {"$between": [minComm, maxComm]}
    }
    if(Object.keys(filterComm)) {
      commentStr += "&filter="+JSON.stringify(filterComm);   
    }



    let allViews = +allValuesPage.views; //// ????
    let maxViews = 1000000;

    console.log(allViews);
    maxViews = +getMax(+maxViews, +allViews);

    let filterViews = {};
    let viewsStr = "";
    filterViews.views = {"$between": [allViews, maxViews]} ;  //// ????
    
    if(Object.keys(filterViews)) {
      viewsStr += "&filter="+JSON.stringify(filterViews);   
    }

    

    call("GET", `/api/posts?limit=${howShow}&offset=${offset}&tags=${tags}${commentStr}${viewsStr}`, function (res) {
      let response = JSON.parse(res.response);
      if(response.success) {
        const cards = response.data;
        let cardHtml = "";
        for(let i=0; i < cards.length; i++) {
          for(let j=0; cards[i].tags.lenght; j++) {  ///????
            const tag = cards[i].tags[j].tag;
          }
          cardHtml += createCard(cards[i]);
        }
        cardsBox.innerHTML = cardHtml;
        createPagination(response.count/howShow, page);
      } else {
        alert("ERROR!");
      }
    }, function () {
      cardsBox.innerHTML = createLoader();
    });
  }

  function createTag(tag) {
    return `
    <label class="filter__checkbox-label">
      <input class="filter__form-checkbox hidden" type="checkbox" value="${tag.id}" name="tags">
      <span class="filter__form-checkbox-indicator filter__form-checkbox-indicator_2 filter__form-checkbox-indicator_tag-${tag.id}"></span>
    </label>
    `
  }

  function getMax(a, b) {
    if(a > b) {
      return a;
    } else {
      return b;
    }
  }
  
  function getMin(a, b) {
    if(a > b) {
      return b;
    } else {
      return a;
    }
  }

  function call(method, path, fn, onstart, onerror) {
    if(onstart)
      onstart();
    let xhr = new XMLHttpRequest();
    xhr.open(method, SERVER_URL + path);
    xhr.send();
    xhr.onload = function () {
      fn(xhr)
    }
    xhr.onerror = function () {
      if(onerror)
      onerror(xhr)
    }
  }

  function getAllValuesFromForm(form) {
    let body = {};
    const inputs = form.querySelectorAll("input"); 
    let l = inputs.length;
    for (let input of inputs) {
      switch (input.type) {
        case "radio":
          if (input.checked)
            body[input.name] = input.value; 
          break;
        case "checkbox":
          if (!body[input.name]) 
            body[input.name] = [];
          if (input.checked)
            body[input.name].push(input.value);
          break;
          default:
          body[input.name] = input.value; 
      }  
    }
    return body;
  }

  function setAllValuesForForm(form, values) {
    const inputs = form.querySelectorAll("input"); 
    let l = inputs.length;
    for (let input of inputs) {
      switch (input.type) {
        case "radio":
          if(values[input.name] && values[input.name] === input.value) {
            input.checked = true;
          } 
          break;
        case "checkbox":
          if(values[input.name]){
            if(typeof values[input.name] === "object") {
              for(let i=0; i < values[input.name].length; i++) {
                if(values[input.name][i] === input.value) {
                  input.checked = true;
                }
              }
            } else {
              if(values[input.name] === input.value) {
                input.checked = true;
              } 
            }
          }
          break;
        default:
          if(values[input.name]) {
            input.value = values[input.name]; 
          }
          break;
      }  
    }
  }

  function getValuesFromUrl() {
    let params = {};
    if(location.search) {
      let paramsArray = location.search.substring(1).split("&");
      for(let i=0; i < paramsArray.length; i++) {
        let split = paramsArray[i].split("=");
        let name = split[0];
        let value = split[1].replace(/%20/g, " ");
        if(params[name]) {
          if(typeof params[name] === "string") {
            params[name] = [params[name], value];
          } else {
            params[name].push(value);
          }
        } else {
          params[name] = value;
        }
      }
    }
    return params;
  }

  function setValuesToUrl(values) {
    let params = [];
    let names = Object.keys(values);
    for(let i = 0; i < names.length; i++) {
      if((typeof values[names[i]]) === "string") {
        params.push(names[i] + "=" + values[names[i]]);
      } else {
        for(let j = 0; j < values[names[i]].length; j++) {
          params.push(names[i] + "=" + values[names[i]][j]);
        }
      }
    }
    window.history.replaceState({}, document.title, "?" + params.join("&"));
  }

  console.log();
  const filterForm = document.forms.filterForm;

  setAllValuesForForm(filterForm, getValuesFromUrl());

  filterForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let value = getAllValuesFromForm(event.target);
    setValuesToUrl(value);
    allValuesPage.page = "1";
    allValuesPage = value;
    getCards(allValuesPage);
  });

  function createPagination (countPage, activePage) {
    let links = document.querySelector(".selector-pages");
    links.innerHTML = "";
    for(let i = 0; i < countPage; i++) {
      let link = document.createElement("a");
      link.classList.add("selector-link");
      link.setAttribute("href", "?page="+(i+1));
      if(activePage === i+1){
        link.classList.add("selector-link_active");
      }
      link.innerHTML = i+1; 
      link.addEventListener("click", function(event){
        event.preventDefault();
        let value = getAllValuesFromForm(filterForm);
        value.page = i + 1 + "";
        setValuesToUrl(value);
        allValuesPage = value;
        getCards(allValuesPage);
      })
      links.insertAdjacentElement("beforeend", link);
    }
  }
})();