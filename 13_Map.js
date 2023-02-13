//MAP, SET, WEAKMAP, WEAKSET https://www.youtube.com/watch?v=mbcP3Oc0PjU&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=13
//https://learn.javascript.ru/set-map
//MAP

//Создадим простой объект 'obj'
const obj = {
  name: 'Timur',
  age: 26,
  job: 'FrontEnd'
}

//Теперь создадим тот же объект в виде массива:
const entries = [
  ['name', 'Timur'],
  ['age', 26],
  ['job', 'FrontEnd']
]

//В JS есть методы, которые позволяют трансформировать объекты в массивы и наоборот:
//console.log(Object.entries(obj))         //Метод 'entries' позволяет перевести объект в массив
//console.log(Object.fromEntries(entries)) //Обратный метод


/*Map – коллекция для хранения записей вида ключ:значение. В отличие от объектов, в которых ключами могут быть только строки, в Map ключом может быть произвольное значение.
Map очень похожи на объекты, однако у них есть ряд ключевых особенностей: 
1. в качестве ключей можем использовать не только строки, но абсолютно любые типы данных;
2. */

const map = new Map(entries)  //создали map и внесли в конструктор существующую переменную

//console.log(map.get('job'))  //для получения ключей используем метод 'get'
//console.log(obj.job)         //то же самое

//С помощью метода 'set' мы создаём новый параметр со значением (1 параметр - ключ объекта, 2 - его значение): 
map
  .set('newField', 42)           //здесь всё как обычно в целом
  .set(obj, 'Value of object')   //а теперь мы задали в кач-ве ключа объект
  .set(NaN, 'NaN')               //Nan то же можно

//'Delete' method is used to delete parametres, returns boolean value
//map.delete('job')
//console.log(map.has('job'))  //outputs 'false' as we have deleted the key
//console.log(map.size)        //показывает кол-во ключей карты
//map.clear //deletes all keys of the map


//Additional methods of map: 
//Так как для map определён цикл итератор мы можем работать с циклом 'for of':
//for (const entry of map.entries()) {   //using entries method in order to перевести карту в массив
//  console.log(entry)                   //получаем массивы состоящие из 2 э-ов (ключ - значение)
//}

//for (const [key, value] of map) {       //по умолчанию у map есть метод entries, так что не пишем его
//  console.log(key, value)               //пишем key and value чтобы получить данные из массива
//}


//Метод values позволяет получать значения ключей карты: 
//for (const val of map.values()) {
//  console.log(val)                       //выведет значения ключей
//}

//То же самое с ключами: 
//for (const key of map.keys()) {
//  console.log(key)
//}


//For each метод принимает 3 параметра (значение, ключ и карта):
//map.forEach ((val, key, m) => {
//  console.log(val, key)
//})


//Сделаем массив из карты, создадим массив и с помощью оператора spread развернём карту: 
//const array = [...map]
//Или можем использовать другой способ: 
//const array = Array.from(map)  //the same result
//console.log(array)

//Создадим объект из карты:
const mapObj = Object.fromEntries(map.entries())

console.log(mapObj)  //получим объект


//======================================
//ПРИМЕР ПРАКТИЧЕСКОГО ИСПОЛЬЗОВАНИЯ КАРТ: 
const users = [
  {name: 'Elena'},
  {name: 'Alex'}, 
  {name: 'Irina'}
]

const visits = new Map()

visits
  .set(users[0], new Date())
  .set(users[1], new Date(new Date().getTime() + 1000 * 60))
  .set(users[1], new Date(new Date().getTime() + 5000 * 60))

function lastVisit(user) {
  return visits.get(user)          //получили ключ, т.е. дату посещения сайта
}

console.log(lastVisit(users[1]))