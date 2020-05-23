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

var modalRegister = document.querySelector(".modal_register-js");
var buttonRegisterOpen = document.querySelector(".header__register-button_js");
var buttonRegisterClose = document.querySelector(".modal__close_register-js");
var inputRegister = document.querySelector(".form__input_register-js");

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

var modalSingIn = document.querySelector(".modal_sing-in-js");
var buttonSingInOpen = document.querySelector(".header__sing-in-button_js");
var buttonSingInClose = document.querySelector(".modal__close_sing-in-js");
var inputSingIn = document.querySelector(".form__input_sing-in-js");

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