var buttonMobileHeader = document.querySelector(".header__mobile-menu_js");
var buttonCloseMobileHeader = document.querySelector(".mobile-header__button-close_js");
var mobileHeader = document.querySelector(".mobile-header");

buttonMobileHeader.addEventListener("click", function(){
  mobileHeader.classList.add("mobile-header_open");
});

buttonCloseMobileHeader.addEventListener("click", function(){
  mobileHeader.classList.remove("mobile-header_open");
});

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