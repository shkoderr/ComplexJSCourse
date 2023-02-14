//Деструктуризация в JS https://www.youtube.com/watch?v=wWYokY0Pt2M&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=16
function calcValues(a, b) {
  return [
    a + b,
    a - b,
    a * b,
    a / b
  ]
}

//Деструктуризация с массивами: 

//const result = calcValues(42, 10)
//const sum = result[0]
//const sub = result[1]
//Оптимиизируем наш код, использовав деструктуризацию: 
//const [sum, sub] = calcValues(42, 10)   //результат ф-ии массив, который мы сразу разбиваем

//Если мы хотим получить только сложение и умножение, можно написать так: 
//const [sum,, mult, ...other] = calcValues(42, 10)  //доп-но используем оператор rest чтобы занести другие аргументы массивом
//Также мы можем задавать дефолтные значения: 
//const [sum, sub = 'Вычитания нет', mult, ...other] = calcValues(42, 10)
//console.log(sum, mult, other, sub)   //в other получили массив из результата деления = 4.2, результат вычитания игнорится


//Деструктуризация с объектами: 

const person = {
  name: 'Timur',
  age: 20,
  address: {
    country: 'Russia', 
    city: 'Moscow'
  }
}

//const name = person.name - the same result
//const {name: firstName = 'Нет имени', age, car = 'Машины нет', address: {city: hometown, country}} = person
//console.log(firstName, age, car, hometown, country)

//Поработаем с Rest:
//const {name, ...info} = person
//console.log(name, info) 


//===========PRACTICE===============
//function logPerson(per) {
//  console.log(per.name + ' ' + per.age)
//}

//logPerson(person)

//А теперь применим деструктуризацию и оптимизируем код: 
function logPerson({name, age}) {
  console.log(name + ' ' + age)
}

logPerson(person)
