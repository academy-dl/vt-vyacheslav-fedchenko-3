alert("Программа 1");
function f1() {
	let max = +prompt("Введите максимальное число");

	if (Number.isNaN(max)) {
		alert("Ошибка! Вы не ввели число");
		f1();

	} else {
		for(let i=1; i<=max; i++) {
			if(i % 4!=0) {
				console.log(i);
			}
		}
		alert("Все числа не кратные четырем записаны");
	}
}

f1();

alert("Программа 2");
function f2() {
	let num = +prompt("Введите любое число");

	if (num >= 100) {
		alert("Ошибка! Вы ввели слишком большое число");
		f2();

  } else if(Number.isNaN(num)) {
		alert("Ошибка! Вы не ввели число");
		f2();

  } else {
		console.log(num);
		alert("Отлично. Ваше число записано");
	}
}

f2();

alert("Программа 3");
function f3() {
	let t = +prompt("Введите любое число");

	if(Number.isNaN(t)) {
		alert("Ошибка! Вы не ввели число");
		f3();

  } else {
		console.log(t);

		let timerId = setInterval(function f3() {
			console.log(t+=3);
		}, 3000)

		setTimeout(function f3() {
			clearInterval(timerId);
			alert("Таймер закончил работу");
		}, 9000)
	}
	
}

f3();