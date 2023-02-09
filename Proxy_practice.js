//PROXY PRACTICE ASPECTS
//Поговорим о 3-ёх вариантах применения Proxy
//1. WRAPPER
//создадим функцию, которая будет оборачивать входящий объект в наш proxy для добавления нового функционала, данная функция будет добавлять значение по умолчанию ключам, если они не определены:
const withDefaultValue = (target, defaultValue = 0) => {  //стрелочная ф-ия, возвращающая proxy 
  return new Proxy(target, {                              //в proxy оборачиваем target
    get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)  //реализуем handler (get)
  })
}

const position = withDefaultValue({
  x: 24,
  y: 42
 }, 
 0
)

console.log(position) 

//2. HIDDEN PROPERTIES - создаём функцию, в которую будем оборачивать нужный объект, а с помощью этой функции будем прятать значения необходимых полей (создание приватности): 
const withHiddenProps = (target, prefix = '_') => { //св-ва, начинающиеся с '_' будем секьюрить
  return new Proxy(target, {       //проксируем target, реализуем несколько методов ниже..
    has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix)), //если поле не начинается с '_', то возвращаем 'true'
    ownKeys: obj => Reflect.ownKeys(obj)     //получаем массив из ключей объекта и фильтруем
      .filter(p => !p.startsWith(prefix)),  //метод Reflect.ownKeys вернёт массив из ключей объекта, далее фильтруем по массиву (чтобы ключ не начинался с '_')
    get: (obj, prop, receiver) => (prop in receiver) //Receiver - прокси, который мы возвращаем, если prop есть в нашем прокси объекта..
     ? obj [prop]   //то возвращаем объект по его ключу prop
     : void 0       //иначе возвращаем undefined (=== void 0)
  })
}

const data = withHiddenProps({     //создадим объект через нашу функцию, 1-ым параметром вернём таргет, т.е. поля нашего объекта
  name: 'Timur',
  age: 26, 
  _uid: '05041996'                 //поле, начатое с '_' будет скрыто
})


//3. OPTIMIZATION - ищем элемент по его id
//создадим массив, который содержит в себе, в качестве элементов, объекты с собственными полями:
//const userData = [
//  {id: 1, name: 'Timur', job: 'FrontEnd', age: 26},
//  {id: 2, name: 'Sokol', job: 'BackEnd', age: 27},
//  {id: 3, name: 'Kolyan', job: 'Mobile', age: 27},
//  {id: 4, name: 'Ksusha', job: 'Analyst', age: 26}
//]

//создадим объект, который будет сохранять индекс ключа и выдавать нам объект по этому ключу:
//const index = {}
//userData.forEach(i => (index[i.id] = i)) //обращаемся к массиву 'userData', вызываем у него метод forEach, на каждой итерации получаем элемент, заносим в объект индекс по ключу i.id значение самого элемента 'i'

//Теперь реализуем данный функционал через Proxy:

const IndexedArray = new Proxy(Array, {   //в кач-ве target мы проксируем целый класс Array
  construct(target, [args]) {             //ставим ловушку с помощью construct на момент обращения к прокси через слово 'new'
    const index = {}
    args.forEach(item => (index[item.id] = item)) //пробегаемся по массиву (один раз!), на каждой итерации получаем item и в переменную 'index' по ключу item.id заносим значение item
    return new Proxy (new target(...args), {  //оборачиваем результирующий массив в proxy и ниже передадим handlers
      get(arr, prop) {                   //поставили ловушку на метод get, т.е. когда обращаемся к свойствам массива (users)
        switch (prop) {                  //реализуем switch по свойствам 
          case 'push':                   //если мы обращаемся к методу 'push', то мы возвращаем ту же ф-ю с раширенным функционалом
            return item => {
              index[item.id] = item     //обращаемся к карте массива и пополняем её - расширенный функционал
              arr[prop].call(arr, item) //у массива 'arr' по свойству вызываем метод call
            }
          case 'findById':              //реализуем метод для поиска элемента по массиву
            return id =>  index[id]
          default: return arr[prop]
            
        }
      }
    })
  }
})

const users = new IndexedArray([
  {id: 1, name: 'Timur', job: 'FrontEnd', age: 26},
  {id: 2, name: 'Sokol', job: 'BackEnd', age: 27},
  {id: 3, name: 'Kolyan', job: 'Mobile', age: 27},
  {id: 4, name: 'Ksusha', job: 'Analyst', age: 26}
])

