//Контекст в JS
function hello() {
  console.log('Hello', this)
}
//При выводе в консоль мы получим строку 'Hello' и глобальный объект 'window'
//const person = {
//  name: 'Timur',
//  age: 26,
//  sayHello: hello
//}
/*При вызове функции sayHello у объекта person в this будет находиться объект перед точкой, в данном случае это person.
Однако, если мы вызовем тот же самый sayHello у глобального объекта 'window' мы получим в this - window. 
N.B. Таким образом, ключевое слово 'this' всегда динамичное и указывает на тот объект, в контексте которого было вызвано*/

/*Теперь давайте привяжем this к нужному нам контексту. В JS всё является объектами, в т.ч. и функции, таким образом, мы можем вызвать у функции (объекта) hello метод 'bind', который привязывает 'this' к нужному нам контексту. В качестве параметра функция 'bind' принимает желаемый контекст. 
По умолчанию this привязан к контексту глобального объекта 'window' (this === window). Таким образом, если мы заменим в методе 'bind' window на this ничего не изменится*/
//const person = {
//  name: 'Timur',
//  age: 26,
//  sayHello: hello,
//  sayHelloWindow: hello.bind(window)
//}

//Благодаря этому мы можем создать универсальный метод объекта, который будет выводить информацию об объекте
const person = {
  name: 'Timur',
  age: 26,
  sayHello: hello,
  sayHelloWindow: hello.bind(window),
  logInfo: function (job, phone) {
    console.group(`${this.name} info:`)
    console.log(`Name is ${this.name}`) //this.name = person.name, т.к. this вызывается в методе и привязан к контексту объекта person
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`)
    console.log(`Phone number is ${phone}`)
    console.groupEnd()
  },
}

//Теперь создадим новый объект без метода logInfo, однако мы хотим вызвать этот метод у нового объекта
const sokol = {
  name: 'Sergey',
  age: 27,
}

//person.logInfo.bind(sokol)() //метод 'bind' не вызывает новую функцию,а возвращает новую функцию с привязанным новым контекстом, которую мы можем вызвать добавив скобочки в конце, в консоли теперь будет выведено сообщение с данными Сокола

//const fnSokolInfoLog = person.logInfo.bind(sokol)
//fnSokolInfoLog('Back-End developer', '8-999-277-02-24')
//Сейчас мы внесли функцию person.logInfo.bind(sokol) в функцию fnSokolInfoLog и при её вызове внесли параметры работы и телефона. Однако, мы можем сделать это проще, метод bind принимает в себя 1-ым параметром контекст, к которому необходимо привязать ключевое слово this, а остальными параметрами он принимает необходимые нам параметры, данную запись можно упростить следующим образом:
//const fnSokolInfoLog = person.logInfo.bind(sokol, 'Back-End developer', '8-999-277-02-24') //получим тот же вывод в консоли!
//fnSokolInfoLog()

//Теперь поговорим о другим методах 'call' and 'apply'
//person.logInfo.bind(sokol, 'Back-End developer', '8-999-277-02-24')() //'bind' возвращает новую функцию, которую мы можем вызвать потом
//person.logInfo.call(sokol, 'Back-End developer', '8-999-277-02-24') //метод 'call' в отличие от 'bind' помимо привязывания контекста к ключевому слову this СРАЗУ вызывает данную функцию.
//person.logInfo.apply(sokol, ['Back-End developer', '8-999-277-02-24']) //в отличие от  метода 'bind' 'apply' всегда принимает только 2 параметра, таким образом, чтобы внести два дополнительных параметра, необходимо использовать массив

//Теперь поработаем с прототипами и контекстами
//Создадим функцию, которая умножит каждый элемент массива на указанное число
const array = [1, 2, 3, 4, 5]

function multBy(arr, n) {
return arr.map (function (i) {
  return i * n
})
}

//Однако, теперь нам надо всегда юзать эту функцию. Мы хотим сделать так чтобы у нашего массива был метод, позволяющий сделать тоже самое. Чтобы решить эту задачу прибегнем к прототипам

//Array.prototype.multBy = function (n) {
//  console.log('multBy', this)  //ключевое слово 'this' привязано к контексту нашего массива, у которого мы вызываем метод multBy
//}

Array.prototype.multBy = function (n) {
  return this.map(function (i) {
    return i * n
  })
}

console.log(array.multBy(7))
/*Ключевое слово 'this' будет привязано к контексту, который указывает на объект слева от точки, в нашем случае (array.multBy) это будет наш массив 'array'
Таким образом, мы можем применять наш метод multBy к любому созданному массиву, т.к. мы внесли его в прототип массива и подключаем через ключевое слово this, которое всегда указывает на объект слева от него, в итоге мы получили быстрый и гибкий код*/



//Practice: 
//Напишем метод прототипа массивов, который разделит каждое число массива на 2, используем для этого ключевое слово 'this' и поработаем с прототипом массива

//const array2 = [1, 1, 2, 3, 5, 8, 13] 

//Array.prototype.multBy = function (n) {
//  return this.map (function (i) {   //this мы привязали к тому что будет слева от точки, т.е. любой массив 
//    return i / n
//  })
//}

//console.log(array2.multBy(2)) 
