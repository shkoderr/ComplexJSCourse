//GENERATORS https://www.youtube.com/watch?v=7wtbNNiOh30&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=11&t=2s
/*ТЕОРИЯ: https://learn.javascript.ru/generators
- Генераторы могут порождать (yield) множество значений одно за другим, по мере необходимости. 
- Генераторы отлично работают с перебираемыми объектами и позволяют легко создавать потоки данных.*/

//function* strGenerator() {           //для создания генератора используется '*'
//  yield 'H'              //ключевое слово 'yield' порционно выдаёт необходимый результат функции-генератора
//  yield 'e'
//  yield 'l'
//  yield 'l'
//  yield '0'
//}

//const str = strGenerator()


//function* numberGen(n = 10) {
//  for (let i = 0; i < n; i++) {
//    yield i  
//  }
//}

////В отличие от обычной функции, генератор будет выдавать по одному значению порционно (для этого используем метод 'next()')
//const number = numberGen(7)


//СОЗДАНИЕ СОБСТВЕННОГО ГЕНЕРАТОРА: 
//const iterator = {
//  gen(n = 10) {
//    let i = 0
//    return {
//      next() {
//        if(i < n) {
//          return {
//            value: ++i, 
//            done: false
//          }
//        } 
//        return {value: undefined, done: 'true'}
//      }
//    }
//  }
//}


//FOR OF LOOPS:
//Цикл 'for...of' работает с символами (объекты, которые имеют в прототипе итератор, по умолчанию в JS это строки и масссивы), однако, мы можем задать любому объекту поле итератор [Symbol.iterator], мы сможем работать с этим объектом циклом for...of
//const iterator = {
//  [Symbol.iterator](n = 10) {         //заменим gen на [Symbol.iterator]
//    let i = 0
//    return {
//      next() {
//        if(i < n) {
//          return {
//            value: ++i, 
//            done: false
//          }
//        } 
//        return {value: undefined, done: 'true'}
//      }
//    }
//  }
//}


function* iter(n = 10) {
  for (let i = 0; i < n; i++) {
    yield i
  }
}

for (let k of iter(7)) {   
  console.log(k)
}


