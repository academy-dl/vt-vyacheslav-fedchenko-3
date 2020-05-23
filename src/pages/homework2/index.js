alert("Программа 1");
function filter() {
	let max = +prompt("Введите максимальное число");

	if (Number.isNaN(max)) {
		alert("Ошибка! Вы не ввели число");
		filter();

	} else {
		for(let i=1; i<=max; i++) {
			if(i % 4) {
				console.log(i);
			}
		}
		alert("Все числа не кратные четырем записаны");
	}
}

filter();

alert("Программа 2");
function check() {
	let num = +prompt("Введите любое число до 100");

	if (num >= 100) {
		alert("Ошибка! Вы ввели слишком большое число");
		check();

  } else if(Number.isNaN(num)) {
		alert("Ошибка! Вы не ввели число");
		check();

  } else {
		console.log(num);
		alert("Отлично. Ваше число записано");
	}
}

check();

alert("Программа 3");
function sumTimer() {
	let t = +prompt("Введите любое число");

	if(Number.isNaN(t)) {
		alert("Ошибка! Вы не ввели число");
		sumTimer();

  } else {
		console.log(t);

		let timerId = setInterval(function sumTimer() {
			console.log(t+=3);
		}, 3000)

		setTimeout(function sumTimer() {
			clearInterval(timerId);
			alert("Таймер закончил работу");
		}, 9000)
	}
	
}

sumTimer();