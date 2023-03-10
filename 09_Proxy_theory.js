//Proxy - это класс в JS, позволяющий создавать ловушки для объектов, функций, классов и т.д. 
//https://www.youtube.com/watch?v=np08WdS9OXg&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=9
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

/*ОСНОВНАЯ ТЕОРИЯ: 
- Объект Proxy позволяет создать прокси для другого объекта, может перехватывать и переопределить основные операции для данного объекта.
- Прокси используются программистами для объявления расширенной семантики JavaScript объектов. Стандартная семантика реализована в движке JavaScript, который обычно написан на низкоуровневом языке программирования, например C++. Прокси позволяют программисту определить поведение объекта при помощи JavaScript. Другими словами они являются инструментом метапрограммирования.
- Proxy - это объект, оборачивающий исходный объект.
- target — исходный объект, который виртуализируется proxy (может быть объектом любого типа, включая массив, функцию и даже другой прокси объект).
- обработчик (handler) - объект-заменитель, содержащий ловушки. Определяет, какие операции будут перехвачены, также переопределяет перехваченные операции.
- ловушки (traps) - методы, которые предоставляют доступ к свойствам. Это аналогично концепции ловушек в операционных системах.
- N.B. Все ловушки опциональны. В случае, если ловушка не задана, то стандартным поведением будет перенаправление операции к объекту-цели.
*/

//OBJECTS:
//Создадим простой объект 'person'
const person = {
  name: 'Timur',
  age: 26,
  job: 'FrontEnd'
}

//Чтобы запроксировать наш объект, для начала создадим переменную 'op'
/*Конструктор класса 'Proxy' принимает 2 параметра, 
1-ый параметр - это target (та цель, на которую мы хотим "повесить" наш Proxy), в нашем случае это объект 'person';
2-ой параметр - набор хэндлеров (hadler) - это те методы, которые позволяют сделать наши ловушки, в данном случае для объекта 'person'*/
//const op = new Proxy(person, {
//  get(target, prop) {          //метод 'get' принимает 2 параметра: target and prop, таким образом мы поставили ловушку на метод 'get'
//    console.log('Target', target)  //'target' это объект, который мы проксируем 
//    console.log('Prop', prop)      //'prop' - название поля (объекта), к которому мы обращаемся
//    return target[prop] 
//  }
//})

//С помощью прокси мы можем реализовывать "ловушки" и внутри них переписывать базовый функционал

const op = new Proxy(person, {
  get(target, prop) { 
    console.log(`Getting prop ${prop}`)
    if(!(prop in target)) {         //если желаемого поля нет в объекте, то...
      return prop                   //обратимся к введённому prop и вызовем метод 'split' - возвращает массив
      .split('_')
      .map(p => target[p])          //пробежимся по массиву с помощью метода 'map', где на каждой итерации получаем строку p
      .join(' ')                    //обращаемся к target (объекту) по ключу 'p' и методом 'join' соединю всё через пробел
    }
    return target[prop] 
  },
  set(target, prop, value) {      //с помощью 'set' задаём свойству прокси новое значение
    if (prop in target) {         //проверка на наличие данного поля у объекта и валидация
      target[prop] = value        //задаём выбранному полю запроксированного объекта нужное значение
    } else {
      throw new Error(`No ${prop} field in target`)   //выдаёт ошибку, если введённое поле отсутствует у объекта
    }
  },
  has(target, prop) {             //вернёт значения 'true' or 'false' в зав-ти от того есть ли указанное поле в объекте (валидация)
    return ['age', 'name', 'job'].includes(prop) 
  },
  deleteProperty(target, prop) {  //данный метод удаляет выбранное свойство (prop) из выбранного объекта (target)
    console.log('Deleting...', prop)
    delete target[prop] 
    return true
  }
})


//FUNCTIONS
//создадим простую функцию, которая будет принимать некоторый текст и возвращать лог с нашим текстом
const log = text => `Log: ${text}`
//создадим переменную function proxy - запроксируем нашу функцию
const fp = new Proxy (log, {   //1 параметр-target (наша ф-я), 2-й-хэндлер, который отследит вызов ф-ии, используем метод apply для этого
  apply (target, thisArg, args) {    /*'applу' принимает 3 параметра (1-target - наша функция, 2 - контекст (thisArg), если был передан 
                                                                            3 - все параметры, которые мы передаём в нашу функцию)*/
    console.log('Calling fn...')

    return target.apply(thisArg, args).toUpperCase()  //привязываем контекст к нашему target (ф-ии 'log'), передаём контекст (в нашем случае он не задан) и массив параметров (у нас один параметр - текст), теперь мы можем работать с нашим результатом, например, приведём результат нашей фунции к верхнему регистру
  }
})
//Смысл в том, что мы можем как угодно преобразовывать нашу функцию 'log'


//CLASSES
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
//Проксируем наш класс
const PersonProxy = new Proxy(Person, { // 1 параметр - это target - название нужного класса ('Person'), 2 - хэндлеры
  construct(target, args) {             //чтобы отследить инициализацию нового класса используем trap - construct, который принимает  2 параметра: 1 - target, 2 - массив аргументов
    console.log('Construct...')

    return new Proxy (new target(...args), {   //new target - по сути new Person, в которы мы передаём поля (в нашем случае name, age), мы оборачиваем наш объект в ещё один Proxy, в который передаём хэндлеры (getter)
      get(t, prop) {
        console.log(`Getting prop '${prop}'`)  //выводит в консоль сообщение с переменной выбранног поля
        return t[prop]                         //а затем возвращает поле (prop) выбранного объекта ('t')
      }
    })
  }
})


const p = new PersonProxy('Maxim', 29)
