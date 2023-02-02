//Прототип - это объект, который присутствует у объекта и он вызывается по цепочке "сверху вниз"
//Прототипы - это механизм, с помощью которого объекты JavaScript наследуют свойства друг от друга. (определение из mdn)
//https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/Object_prototypes

//Обычный способ создания объекта
//const person = {
//  name: 'Timur',
//  age: 26,
//  greet: function() {
//    console.log('Greet!')
//  }
//}

//В данном примере мы создаём объект используя функцию 'new', т.е. мы вносим в переменную 'person' пример нашего глобального объекта с нашими кастомными параметрами 
const person = new Object({
  name: 'Timur',
  age: 26,
  greet: function() {
    console.log('Greet!')
  }
})

//Мы можем внести в прототип объекта новую функцию следующим способом. Таким образом, мы расширили базовый прототип класса 'Object' и добавили в него новый метод
Object.prototype.sayHello = function () {
  console.log('Hello!')
}


//Object.create() — это метод в JavaScript, который позволяет создавать объект с указанным прототипом. Он создает объект, который наследуется непосредственно от переданного объекта-прототипа.
//С помощью глобального метода Object.create мы можем задать прототип объекту и внести его в новую переменную, таким образом, в данном примере мы задали person как прототип для нового объекта Ksusha, т.е. объект 'Ksusha' будет иметь унаследованные методы от прототипа 'person'. В итоге, person стал прототипом для объекта 'Ksusha'
const Ksusha = Object.create(person)
//Наш новый объект на данный момент пуст и при вызове name браузер перейдёт к прототипу, найдет значение 'Timur' и выдаст его. Но мы хотим создать собственное имя для объекта 'Ksusha'. Сделаем это:
Ksusha.name = 'Ksusha' //так мы можем внести параметры в объект

//const str = 'I am string' //так всё выглядит снаружи
const str = new String('I am string') //вот что происходит "за кулисами JS". C помощью глобального метода создаётся новая строка (которая, как и всё в JS является объектом со своими свойствами)


//Ещё немного про прототипы из chatGPT: 
//const prototypeObject = {
//  sayHello: function() {
//    console.log("Hello");
//  }
//};

//const newObject = Object.create(prototypeObject);

//newObject.sayHello(); // outputs "Hello"

/*In this example, we have created a prototype object with a sayHello method, and then used Object.create to create a new object that inherits from the prototype object. The newly created object has access to the sayHello method, and can call it as if it were defined on the object itself.
Object.create is a useful tool for implementing inheritance and object-oriented programming concepts in JavaScript.*/

//Practice: 
const human = new Object ({
  name: 'Timur',
  age: 26,
  greet: function () {
    console.log('Hi there, dude!')
  }
})


const Ksusha = Object.create(human) 

Ksusha.name = 'Ksusha'

Ksusha.greet() //outputs 'Hi there, dude!'

console.log(Ksusha) //outputs an object with name property 'Ksusha'



