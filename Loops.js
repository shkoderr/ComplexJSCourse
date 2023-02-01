//Замыкания (loops) - по сути, замыкание - это функция внутри другой функции
//function createCalcFunction(n) {
//  return function () {
//    console.log(1000 * n)
//  }
//}

//const calc = createCalcFunction(5) //Когда мы вызываем функцию createCalcFunction, она возвращает нам функцию console.log(1000 * n) и мы можем занести её в отдельную переменную для дальнейших взаимодействий. Теперь calc это функция console.log(1000 * n)
//calc()
//при вызове данной фунции мы получим ответ 5000. При вызове функции createCalcFunction с параметром n = 5, она вернула нам другую функцию console.log(1000 * n) и учитывая, что данная функция была вызвана в контексте функции createCalcFunction, переменная 'n' была замкнута в той функции, которую мы возвращаем. И всегда вызывая функцию calc мы получим ответ из createCalcFunction, так она замкнута

//Теперь к примерам
//function createIncrementor(n) {
//  return function (num) {
//    return n + num
//  }
//}

//const addOne = createIncrementor(1)
//const addTen = createIncrementor(10)

//console.log(addOne(10))
//console.log(addTen(10))

/*По сути, добавляя функцию createIncrementor в переменную мы замыкаем её параметр, а эта функция возвращает нам внутреннюю (scope) функцию, в которой мы можем менять параметр*/

//Ещё пример
//function urlGenerator(domain) {
//  return function (url) {
//    return `https://${url}.${domain}`
//  }
//}

//const comUrl = urlGenerator('com')
//const ruUrl = urlGenerator('ru')

//console.log(comUrl('google')) //https://google.com
//console.log(comUrl('netflix')) //https://netflix.com

//console.log(ruUrl('yandex')) //ну ты понял
//console.log(ruUrl('avito'))

//Практическая задача, сам я не допёр, вот решение автора:
function bind(context, fn) {
  return function (...args) {
    fn.apply(context, args)
  }
}

function logPerson() {
     console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
   }
  
   const person1 = {name: 'Михаил', age: 22, job: 'Frontend'}
   const person2 = {name: 'Елена', age: 19, job: 'SMM'}
  
   bind(person1, logPerson)()
   bind(person2, logPerson)()

