//4 ways to create your own bind function https://www.youtube.com/watch?v=fJqYa3BuwaU
//Создаём простой объект с одним параметром "имя"
const person = {
  name: 'Timur',
}
//создаём простую функцию 'info', которая выводит в консоль сообщение с контекстом 'this', однако 'this' на данный момент по умолчанию привязан к контексту глобального объекта 'window' (this === window)
//console.log(this) - window
//function info() {
//  console.log(`Name is ${this.name}`)
//}
//Привяжем ключевое слово 'this' к контексту объекта 'person'
//info.bind(person)()

//Усложним задачу:
//function info(phone) {   //добавляем параметр вне контекста 'phone'
//  console.log(`Name is ${this.name}, phone number: ${phone}`)
//}

//info.bind(person)('+7-953-547-74-65') //внесём номер телефона в параметр нашей функции bind, которая возвращает функцию 'info' с контекстом 'this'

//Усложним ещё, добавив дополнительный параметр:
//function info(phone, email) {   //добавляем ещё параметр вне контекста 'email'
//  console.log(`Name is ${this.name}, phone number: ${phone}, E-mail: ${email}`)
//}

//Однако, мы можем сделать это проще, метод bind принимает в себя 1-ым параметром контекст, к которому необходимо привязать ключевое слово this, а остальными параметрами он принимает необходимые нам параметры, данную запись можно упростить следующим образом:
//info.bind(person)('+7-953-547-74-65', 'tbirgalin@yandex.ru') // --->
//info.bind(person, '+7-953-547-75-65', 'tbirgalin@yandex.ru')() //результат будет тот же

function info(phone, email) {
  console.log(`Name is ${this.name}, phone number: ${phone}, E-mail: ${email}`)
}
//Теперь непосредственно к способам:
/*Метод bind() в JavaScript используется для привязки метода к объекту, а это означает, что ключевое слово this внутри функции всегда будет ссылаться на указанный объект. Метод bind() возвращает новую функцию с ключевым словом this, установленным для указанного объекта, поэтому при вызове возвращаемой функции ключевое слово this внутри нее всегда будет ссылаться на указанный объект. Метод bind() также можно использовать для передачи аргументов связываемой функции. 
Иными словами: идея метода 'bind' в том, что мы берём какой-то метод и вызываем его в контексте объетка */

/*1 способ (простой): 
1) 1-ым параметром в нашу кастомную 'bind' функцию мы принимаем fn (это тот метод, который мы хотим забайндить), 2-ым параметром мы принимаем контекст, который нам необходимо привязать;
2) используем нативный способ 'bind' у функции 'fn', которую мы возвращаем в нашу кастомную функцию 'bind' и привязываем контекст.
3) синтаксис '...rest' в JavaScript называется оператором остатка. Это позволяет функции принимать неопределенное количество аргументов в виде массива. Оператор rest собирает все оставшиеся элементы в массив. Он обозначается тремя точками (...) перед именем параметра. */
//function bind(fn, context, ...rest) {
//  return fn.bind(context, ...rest)      //Таким образом, bind(info, person) === info.bind(person)
//}

/*2 способ (без встроенных методов) 
Метод bind привязывает метод к объекту и нам надо сделать то же самое. В данном случае наша функция 'fn' == info. Чтобы привязать метод к объекту достаточно вызвать этот метод внутри объекта. Если мы создадим в нашем объекте (context == person) новое поле, в нём вызовем нашу функцию fn (info), у нас получится реализовать метод bind*/
function bind(fn, context, ...rest) {
  //наш 'bind' принимает в параметры fn(info), context(поле объекта person)
  return function (...args) {
    //это и есть та функция, которую мы вызываем после работы метода bind() - эти скобки это и есть наша функция внутри
    const uniqId = Date.now().toString() //Date.now() in JavaScript returns the number of milliseconds elapsed since January 1, 1970
    //мы присвоили рандомный ключ нашему объекту (person == context) и внесли это новое рандомное поле в нашу функцию fn
    context[uniqId] = fn // in our case == person[name] = info, ! т.е. наша функция fn (info) хранится в объекте (context == person), таким образом мы привязали метод info к контексту объекта person!
    //context[uniqId]() - вызываем нашу функцию fn c рандомным uniqId и записываем результат в 'result'
    const result = context[uniqId](...rest.concat(args)) //result == функция info в контексте person[uniqId]
    //после внесения результата в 'result' удаляем уникальный айдишник у объекта, чтобы не модифицировать наш объект person
    delete context[uniqId]
    //возвращаем результат функции (в нашем случае info в контексте person)
    return result
  }
}

//3 способ (ES5) - в ранних спецификациях JS не было объекта 'rest', поэтому нам придётся создать отдельный объект, в который мы занесём наши параметры, apply применяем, т.к. он принимает в себя в кач-ве 2-го параметра массив, а мы как раз не знаем сколько дополнительных параметров у нас будет, поэтмоу call не очень подойдёт.
//Метод slice в JS используется для извлечения части массива и возврата нового массива без изменения исходного массива. Синтаксис метода среза следующий: array.slice(start, end), где start — это индекс первого элемента, который нужно включить в новый массив, а end — это индекс первого элемента, который нужно исключить из нового массива. Если конец не указан, все элементы от начала до конца исходного массива включаются в новый массив. Call юзаем, чтоюы превратить полученные данные из массива (arguments) в новый массив:
//function bind(fn, context) {
//  const rest = Array.prototype.slice.call(arguments, 2)
//  return function () {
//    const args = Array.prototype.slice.call(arguments)
//    return fn.apply(context, rest.concat(args))
//  }
//}
//Вроде понял, завтра повторить!

//4 способ (ES6)
//function bind(fn, context, ...rest) {
//  return function (...args) {
//    return fn.apply(context, rest.concat(args))
//    //return fn.call(context, ...rest.concat(args))  //тут разворачиваем тремя точками spread, про это позже узнаем, так что не вникай пока
//  }
//}

//bind(info, person)('+7-953-547-75-65', 'tbirgalin@yandex.ru')
//bind(info, person, '+7-953-547-75-65')('tbirgalin@yandex.ru')
//bind(info, person, '+7-953-547-75-65', 'tbirgalin@yandex.ru')()

//СОЗДАНИЕ МЕТОДА CALL
//function call(fn, context, ...args) {
//  const uniqId = Date.now().toString()

//  context[uniqId] = fn

//  const result = context[uniqId](...args)

//  delete context[uniqId]

//  return result
//}

//call(info, person, '+7-953-547-74-65', 'tbirgalin@yandex.ru')

//СОЗДАНИЕ МЕТОДА APPLY
function apply(fn, context, args) {
  //apply принимает в кач-ве параметра массив, поэтому args мы не разворачиваем
  const uniqId = Date.now().toString()

  context[uniqId] = fn

  const result = context[uniqId](...args)

  return result
}

apply(info, person, ['+7-953-547-74-65', 'tbirgalin@yandex.ru']) //т.к. apply принимает в кач-ве параметра массив аргументы необходимо обернуть в массив

//Моя практика:

//Создадим новый объект
//const chelik = {
//  name: 'Timur',
//  age: 26,
//  job: 'FrontEnd'
//}

//function info() {
//  console.log(`Name is ${this.name}, age: ${this.age}, job: ${this.job}`)
//}

//info.bind(chelik)() //привязали нашу функцию к контексту объекта chelik, довольно просто

//Теперь поработаем доп-но с параметрами вне контекста, снова создадим функцию
//const chelik = {
//  name: 'Timur',
//  age: 26,
//  job: 'FrontEnd'
//}

//function info(hairColor, dream) {
//  console.log(`Hi! My name is ${this.name}, age: ${this.age}, job: ${this.job}, hair color is ${hairColor} and his dream is ${dream}`)
//}

//info.bind(chelik)('black', 'to fly') //привязали нашу функцию к контексту объекта chelik, а при вызове добавили в параметры значения вне нашего контекста
//info.bind(chelik, 'black', 'to fly')() //the same result

//Теперь создадим свою собственную функцию bind простым способом. Чтобы добавлять неограниченное кол-во параметров воспользуемся оператором ...rest
//function bind(fn, context, ...rest) {
//  return fn.bind(context, ...rest) // == info.bind(chelik)
//}

//bind(info, chelik)('black', 'to fly')
//bind(info, chelik, 'black', 'to fly')() //great, everything works!

//Теперь самое интересное:
//const chelik = {
//  name: 'Timur',
//  age: 26,
//  job: 'FrontEnd'
//}

//function ktonakh(hairColor, dream) {
//  console.log(`Hi! My name is ${this.name}, age: ${this.age}, job: ${this.job}, my hair color is ${hairColor} and my dream is ${dream}`)
//}

//Итак, у нас есть объект chelik и функция ktonakh, создадим свой bind
//function bind(fn, context, ...rest) {
//  return function (...args) {
//    const uniqId = Date.now().toString() + Math.random() //создали рандомное поле

//    context[uniqId] = fn //привязали это поле к функции ktonakh (наш this теперь относится к chelik), теперь она в контексте объекта chelik

//    const result = context[uniqId](...rest.concat(args)) //вызвали функцию (ktonakh) и занесли результат в result

//    delete context[uniqId] //после внесения результата в 'result' удаляем уникальный айдишник у объекта, чтобы не модифицировать наш объект person

//    return result //вернули результат в конце нашей функции
//  }
//}

//bind(ktonakh, chelik, 'black', 'to fly')()
//bind(ktonakh, chelik)('black', 'to fly')
//Тимур, ты молодец, ты смог сам без подсказок создать свою bind функцию. Завтра повторим всё!
