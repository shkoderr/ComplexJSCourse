//Классы https://www.youtube.com/watch?v=uLY9GXGMXaA&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=7&t=29s
////const animal = {
////  name: 'animal',
////  age: 5,
////  hasTail: 'true'
////}

////Теперь создадим наш объект через класс, названия классов всегда пишутся с заглавной буквы
//class Animal {
//  static type = 'ANIMAL'

//  constructor(options) {
//    this.name = options.name
//    this.age = options.age
//    this.hasTail = options.hasTail
//  }

//  voice() {
//    console.log('I am animal')
//  }
//}

////const animal = new Animal({
////  name: 'animal',
////  age: 5,
////  hasTail: 'true'
////})

////Благодаря классам мы можем создавать полноценное наследование 
 
//class Cat extends Animal {
//  static type = 'CAT'

//  constructor(options) {        //Чтобы добавить новые свойства для конкретног класса, создаём новый конструктор
//    super(options)              //Метод 'super' вызывает родительский конструктор (от 'Animal')
//    this.color = options.color
//  }

//  voice() {
//    super.voice()               //Чтобы вызвать метод родительского класса используем метод 'super' с названием нужного метода 
//    console.log('Meeooow')      //Также мы можем 'перезаписывать' методы от родительского класса
//  }
//  //Также в классах мы можем реализовывать гетеры и сэтеры
//  get ageInfo () {
//    return this.age * 7
//  }

//  set ageInfo (newAge) {
//    this.age = newAge
//  }
//}

//const cat = new Cat({
//  name: 'Markiz',
//  age: 11,
//  isAwesome: 'true',
//  color: 'black-white'         //Теперь при вызове объекта cat у него появится новое поле 'color'
//})




//ТЕПЕРЬ К ПРАКТИЧЕСКОМУ ПРИМЕНЕНИЮ КЛАССОВ:
class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }

  hide() {
    this.$el.style.display = 'none'
  }

  show() {
    this.$el.style.display = 'block'
  }
}

class Box extends Component {
  constructor(options) {
    super(options.selector)

    this.$el.style.width = this.$el.style.height = options.size + 'px'
    this.$el.style.background = options.color 
  }
}

const box1 = new Box({
  selector: '#box1',
  size: 100,
  color: 'red'
})

const box2 = new Box({
  selector: '#box2',
  size: 150,
  color:'green'
})


class Circle extends Box {
  constructor(options) {
    super(options)
    
    this.$el.style.borderRadius = '50%'
  }
}

//Создадим новый объект 'circle' с такими же параметрами, как у наших квадратов. Однако, благодаря логике, заложенной нами в классе 'Circle' наш объект станет кругом

const circle = new Circle({    
  selector: '#circle',
  size: 200,
  color: 'yellow'
})

//Классы - это удобный синтаксис в JS, который позволяет создавать объекты с нужным нам наследованием. 