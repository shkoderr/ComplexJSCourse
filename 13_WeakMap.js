/*WeakMap избавляет нас от необходимости вручную удалять вспомогательные данные, когда удалён основной объект.
У WeakMap есть ряд ограничений:
1. Только объекты в качестве ключей.
2. Нет свойства size.
3. Нельзя перебрать элементы итератором или forEach.
4. Нет метода clear() */

let obj = {
  name: 'weakmap'
}

//const arr = [obj]
//obj = null   //обнуляем наш объект, но...

//console.log(arr[0])  //несмотря на это, он сохранён в памяти массива


const map = new WeakMap([
  [obj, 'obj data']
])

//get, set, delete, has - это все методы weakmap
obj = null //если обнулим объект, то weakmap потеряет данные 

console.log(map.has(obj))  //false
console.log(map.get(obj))  //undefined


//=================================
//ПРАКТИКА: 
//Создадим функцию, которая пробивает пользователей по кэшу, если пользователь есть в кеше, то возвращаем его значение, а если нет, то добавим пользователя в кэш, добавлять ему значение и потом возвращать его:
const cache = new WeakMap()  //наш объект кэша

function cacheUser(user) {
  if(!cache.has(user)) {        //если в кэше нет юзера, то...
    cache.set(user, Date.now()) //с помощью set добавляем юзера, а в кач-ве его данных зададим таймштамп
  }
  return cache.get(user)       //возвращаем с помощью get нашего юзера из кэша
}

//создадим наших юзеров: 
let ksusha = {name: 'Ksusha'}  
let kolya = {name: 'Kolya'}
//закэшируем их
cacheUser(ksusha)
cacheUser(kolya)

ksusha = null

console.log(cache.has(ksusha))   //false, т.к. из weakmap был удалён юзер и память была очищена
console.log(cache.has(kolya))    //true