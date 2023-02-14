//LOCAL STORAGE https://www.youtube.com/watch?v=3-bZ7gLVSzo&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=17
/*Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в браузере.
Что в них важно – данные, которые в них записаны, сохраняются после обновления страницы (в случае sessionStorage) и даже после перезапуска браузера (при использовании localStorage). Скоро мы это увидим.*/
//https://learn.javascript.ru/localstorage

/*Объекты хранилища localStorage и sessionStorage предоставляют одинаковые методы и свойства:

setItem(key, value) – сохранить пару ключ/значение.
getItem(key) – получить данные по ключу key.
removeItem(key) – удалить данные с ключом key.
clear() – удалить всё.
key(index) – получить ключ на заданной позиции.
length – количество элементов в хранилище. */

//const myNumber = 42

//localStorage.removeItem('number')
//console.log(localStorage.getItem('number')) //получим null
//localStorage.setItem('number', myNumber)
//console.log(localStorage.getItem('number'))  //теперь получим 42


//=====================
const object = {
  name: 'Timur',
  age: 26
}
//Сохраним объект в локальное хранилище
//localStorage.setItem('person', object) //в кач-ве значения получим object Object, т.к. браузерное хранилище приводит все данные к строке
/*Как записать его нормально?
Используем JSON.stringify, который берёт объект и преобразует его в строку.
Полученная строка json называется JSON-форматированным или сериализованным объектом. Мы можем отправить его по сети или поместить в обычное хранилище данных.*/

localStorage.setItem('person', JSON.stringify(object)) 
//Теперь получим наш объект из хранилища: 
//const raw = localStorage.getItem('person')
//raw.name = 'Kolyan'

////console.log(raw.name)  //получим undefined, т.к. работаем со строкой JSON, чтобы получить наш объект, используем JSON.parse
//console.log(JSON.parse(raw)) //здесь получим наш объект

//Сделаем всё правильно: 
const raw = localStorage.getItem('person')
const person = JSON.parse(raw)  //парсим наш raw и переводим его снова в объект
person.name = 'Kolyan'          //теперь можем изменять значения ключей
console.log(person)             //получим наш объект с изменённым именем


//======================
//window.addEventListener('storage', event => {
//  console.log(event)
//})
//С помощью этого метода можем работать с другими вкладками браузера



