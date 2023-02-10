//Async and await https://www.youtube.com/watch?v=SHiUyM_fFME&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=8&t=2s

const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}

//Создадим функцию, которая получает данные с сервера, используем данные с сайта https://jsonplaceholder.typicode.com/

const url = 'https://jsonplaceholder.typicode.com/todos' //сервер, с которого будем получать данные

//function fetchTodos() {                                  //создадим нашу фетч-функцию, которая будет получать данные с сервера
//  console.log('Fetch todo started...')
//  return delay(2000)
//  .then(() => fetch(url))                                //fetch это аналог AJAX асинхронного запроса, который возвращает промис
//  .then(response => response.json())                     //json это API метода 'fetch', который возвращает данные с сервера
//}

//fetchTodos()
//  .then(data => {
//    console.log('Data:', data)
//  }).catch(e => console.error(e))


//Сделаем то же самое при помощи async/await операторов:

async function fetchAsyncTodos() {         //N.B. функция, в которой мы работаем с оператором 'await' должна быть асинхронной!
  //Чтобы обработать возможные ошибки оборачиваем наш код в метод try-catch:
  try {
    console.log('Fetch todo started...')
    await delay(2000)          //оператор 'await' блокирует выполнение дальнейшего кода до резолва функции 'delay', короче вместо 'then'
    const response = await fetch(url) //т.к. 'fetch' возвращает ответ, мы можем сразу записать его в переменную 'response'
    const data = await response.json()
    console.log('Data: ', data)
  } catch (e) {
    console.error(e)
  } finally {
    console.log('Finally')
  }

}

fetchAsyncTodos()