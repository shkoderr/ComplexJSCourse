//Spread and Rest https://www.youtube.com/watch?v=SGeQ-U0G7dE&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=15
const citiesRussia = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск']
const citiesEurope = ['Берлин', 'Прага', 'Париж']

const citiesRussiaWithPopulation = {
  Moscow: 20,
  SaintPetersburg: 8, 
  Kazan: 5,
  Novosibirsk: 3
}

const citiesEuropeWithPopulation = {
  Moscow: 27,
  Berlin: 10,
  Praha: 3, 
  Paris: 2
}

//SPREAD - разворачивает массив, преобразуя его в строки
//console.log(...citiesRussia)
//console.log(...citiesEurope)

//const allCities = [...citiesRussia]    //развернули наш исходный массив и обернули его в новый сразу
//const allCities = [...citiesRussia, 'Вашингтон', ...citiesEurope]  //объединили наши массивы в новый
//const allCities = citiesRussia.concat(citiesEurope)    //до ES6 писали так
//console.log(allCities)    //получили массив, содержащий все города


//Spread with objects: 
//console.log({...citiesRussiaWithPopulation})  //мы развернули наш объект и обернули его в новый объект-клон
//console.log({...citiesRussiaWithPopulation, ...citiesEuropeWithPopulation}) //создали общий объект, у Москвы будет 27, т.к. он последний

//=======================ПРАКТИКА========================
//Находим максимальное значение массива:
//const numbers = [5, 37, 42, 17]
////console.log(Math.max(5, 37, 42, 17))
//console.log(Math.max(...numbers))
//console.log(Math.max.apply(null, numbers))  //альтернативый метод, более старый

//Доступ до DOM:
//const divs = document.querySelectorAll('div')
//console.log(divs)      //nodelist - не массив, и с ним мы не можем полноценно работать
//const nodes = [...divs]  //развернули нашу коллекцию нод и завернули в массив
//console.log(nodes)       //получили массив, с которым можем работать


//REST - собирает оставшиеся аргументы в новый массив
//function sum(a, b) {
//  return a + b
//}

//const numbers = [1, 2, 3, 4, 5]

//console.log(sum(...numbers))  //получили 3, использовали оператор spread! Оставшиеся аргументы не обрабатываются


//Используем оператор Rest: 
function sum(a, b, ...rest) {
  //console.log(rest)      //выведет массив [3, 4, 5] - оставшиеся аргументы
  return a + b + rest.reduce((a, i) => a + i , 0)
}

const numbers = [1, 2, 3, 4, 5]

//console.log(sum(...numbers))


//const a = numbers[0]
//const b = numbers[1]

//Деструктуризация: 
//const [a, b, ...other] = numbers
//console.log(a, b, other)


const person = {
  name: 'Max',
  age: 20,
  city: 'Moscow',
  country: 'Russia'
}

const {name, age, ...address} = person

console.log(name, age, address)

