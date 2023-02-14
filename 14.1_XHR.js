//Асинхронные запросы на сервер (XHR and Fetch) 
//https://www.youtube.com/watch?v=eKCD9djJQKc&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=14&t=9s

const requestUrl = 'https://jsonplaceholder.typicode.com/users'

//XMLHttpRequest – это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.
//const xhr = new XMLHttpRequest()  //конструктор XHR

//xhr.open('GET', requestUrl)  //откроет новое соединение

////xhr.responseType = 'json'  //....задаём тип нашего ответа json

//xhr.onload = () => {        //при загрузке страницы в консоль будет выведен ответ нашего xhr запроса в формате строки
//  if (xhr.status >= 400) {   //всё что выше 400, это ошибки, т.е. обрабатываем возможную ошибку
//    console.error(xhr.response)
//  } else {
//    console.log(JSON.parse(xhr.response)) //чтобы получить объект используем метод parse глобального объекта JSON, либо...
//  }
//}

//xhr.onerror = () => {               //обработка возможной ошибки сети
//  console.log(xhr.response)
//}
//xhr.send()                  //отправляем зарос

//Используем промисы: 

//function sendRequest(method, url) {
//  return new Promise((resolve, reject) => {
//    const xhr = new XMLHttpRequest()

//    xhr.open(method, url)   //открыли новое соединение

//    xhr.responseType = 'json'   //задали тип получаемого ответа

//    xhr.onload = () => {       //при загрузке страницы...
//      if (xhr.status >= 400) {
//        reject(xhr.response)      //reject - вызываем так как ошибка
//      } else {
//        resolve(xhr.response)  //resolve - вызываем, т.к. нет ошибки
//      }
//    }
  
//    xhr.onerror = () => {
//      reject(xhr.response)      //reject - вызываем так как ошибка сети
//    }
//    xhr.send()                   //отправляем зарос
//  })
  
//}

//Вызовем нашу функцию, вызовем метод then промиса и выведем в консоль полученные данные, т.е. наши данные с сервера: 
//sendRequest('GET', requestUrl)
//  .then(data => console.log(data))
//  .catch(err => console.log(err))



//Method POST: 
function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)   //открыли новое соединение

    xhr.responseType = 'json'   //задали тип получаемого ответа
    xhr.setRequestHeader('Content-Type', 'application/json') 

    xhr.onload = () => {       //при загрузке страницы...
      if (xhr.status >= 400) {
        reject(xhr.response)      //reject - вызываем так как ошибка
      } else {
        resolve(xhr.response)  //resolve - вызываем, т.к. нет ошибки
      }
    }
  
    xhr.onerror = () => {
      reject(xhr.response)      //reject - вызываем так как ошибка сети
    }
    xhr.send(JSON.stringify(body))                   //отправляем зарос
  })
  
}

//Создадим переменную body - тело запроса
const body = {
  name: 'Timur',
  age: 26
}

sendRequest('POST', requestUrl, body)
  .then(data => console.log(data))
  .catch(err => console.log(err))