let age, name, sName;

age = +prompt("Введите ваш возраст: ", 18);
name = prompt("Введите ваше имя: ");
sName = prompt("Введите вашу фамилию: ");

let user = {};

user.age = age;
user.name = name;
user.sName = sName;

console.log(user);

let str = age < 18 ? "Несовершеннолетним вход на сайт запрещен" : "Добро пожаловать на сайт";

alert(str);