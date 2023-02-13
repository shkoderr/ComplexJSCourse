//ARRAYS METHODS https://www.youtube.com/watch?v=nEabP9CYCAQ&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=12&t=15s
//Создадим массив и проитерируемся по его индексам: 
const people = [
  { name: 'Timur', age: 26, budget: 40000 },
  { name: 'Sokol', age: 27, budget: 3400 },
  { name: 'Kolyan', age: 17, budget: 50000 },
  { name: 'Yura', age: 24, budget: 1800 },
  { name: 'Vlados', age: 15, budget: 25000 },
  { name: 'Lesch', age: 50, budget: 2300 }
]

//1 способ: цикл for in - с помощью которого мы пробежимся по всем индексам и выведем в консоль:
//for (let i = 0; i < people.length; i++) {
//  console.log(people[i])
//}

//2 способ: цикл for of - сделает то же самое:
//for (let person of people) {
//  console.log(person)
//}



//FOR EACH METHOD - выполняет какую-либо итерацию для каждого элемента массива, в параметр данный метод принимает функцию, которая в свою очередь принимает 3 параметра: 1. элемент массива (person в нашем случае), 2. индекс. 3. массив (people - pArr). 2 и 3 параметры используются достаточно редко, в основном работаем с элементом массива
//people.forEach(function (person) {
//  console.log(person)
//})
//Сократим нашу функцию: 
//people.forEach(person => console.log(person))  //arrow function



//MAP - похож на for each, принмает те же параметры, но с помощью метода 'map' мы можем преобразовывать наши массивы и создавать новые массивы, занося результат в переменные:
//const newPeople = people.map(person => {
//  return person
//})
//console.log(newPeople)  //выведет в консоль тот же массив, потому что мы итерируем по всему массиву и возвращаем сам объект, т.е. новый массив newPeople

//Метод 'map' хорошо тем, что с помощью него мы можем как угодно преобразовывать наш исходный массив:
//const newPeople = people.map(person => `${person.name} (${person.age})`) //получим новый массив с именами и возрастом

//console.log(newPeople) 



//FILTER - фильтрует исходный массив по указанному условию, принимает 3 параметра (1 - элемент, 2 - индекс, 3 - массив), данный метод возвращает true or false в зависимости от соответствия элемента массива нашему условию
//Задача - отфильтруем элементы нашего массива по условию - человек может покупать алкоголь: 

//Базовый способ с ипользованием цикла 'for': 
//const adults = []                       //создадим пустой массив для взрослых людей из нашего массива
//for (let i = 0; i < people.length; i++) {
//  if(people[i].age >= 18) {             //если, возраст элемента по индексу больше или равен 18-ти, то...
//    adults.push(people[i])              //добавим его в новый массив 'adults' при помощи метода 'push'
//  }
//}

//console.log(adults)                    //выведет в консоль новый массив со взрослыми

//Способ с использованием метода 'filter'
//const adults = people.filter(person => {
//  if(person.age >= 18) {                     //если возраст э-та больше 18, то возвращается true и элемент попадает в новый массив
//    return true
//  }
//})
//можем использовать возможности стрелочных функций, чтобы укоротить запись: 
//const adults = people.filter(person => person.age >= 18)   //результат тот же

//console.log(adults)



//REDUCE - применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение.
//'Reduce' принимает 2 параметра, 1 - callback, который принимает в себя 2 параметра (1 - total, 2 - итерируемый элемент массива); 2 - начальное значение (initial value)
//Задача - суммировать бюджет всех людей в массиве: 
//1 способ - for in loop:
//let amount = 0
//for (let i = 0; i < people.length; i++) {
//  amount += people[i].budget
//}
//console.log(amount)

//2 способ - reduce:
//const amount = people.reduce((total, person) => {
//  return total + person.budget
//}, 0)
//console.log(amount)
//можем использовать возможности стрелочных функций, чтобы укоротить запись: 
//const amount = people.reduce((total, person) => total + person.budget, 0)  //the same result
//console.log(amount)



//FIND - находит нужный элемент по условию, принимает параметром callback функцию, которая принимает параметром итерируемый объект
//const Vlados = people.find(person => person.name === 'Vlados') //вовзращает элемент person, поле name которого равно 'Vlados' и вносит в переменную
//console.log(Vlados)


//FindIndex - похож на метод find, но на выходе получаем индекс
//const indexVlados = people.findIndex(person => person.name === 'Vlados')
//console.log(indexVlados)




//ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ: 
const amount = people
  .filter(person => person.budget > 3000) //filter возвращает массив, поэтому можем сразу вызвать у него метод массива
  .map(person => {                        //например, map - пробежится по всем элементам массива 
    return {                              //на каждой итерации получаем объект person, видоизменяем его и вносим в новый массив
      info: `${person.name} (${person.age})`, 
      budget: person.budget
    }                                     //теперь person имеет поля info и budget, т.о. мы видоизменили исходный массив и...
  })
  .reduce((total, person) => total + person.budget, 0)  //сложили общий бюджет ребят

console.log(amount)


