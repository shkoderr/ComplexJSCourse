//Promises: youtube.com/watch?v=1idOY3C1gYU&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=5
//console.log('Data requested...')

//setTimeout(() => {
//  console.log('Data is processing...')

//const backendData = {
//  server: 'aws',
//  port: 2000,
//  status: 'working'
//}

//  setTimeout(() => {
//    console.log('Data has been recieved', backendData)
//  }, 2000);
//}, 2000);

//Проблема, в том, что более сложный код увеличит уровень вложенности, что в свою очередь усложнит поддержание кода
//Теперь реализуем данный функционал с применением promise
//Создаём instance класса promise, в конструктор класса 'promise' мы должны передать callback функцию, которая в свои параметры принимает два аргумента resolve and reject, которые тоже являются функциями
//Функция resolve выполняется когда успешно закочена асинхронная операция

//const p = new Promise(function(resolve, reject) {
//  setTimeout(() => {
//    console.log('Data is processing...') //На данном этапе всё как в прошлый раз, но теперь начинается самое интересное

//    const backendData = { //чтобы получить доступ до объекта 'backendData', укажем его в 'resolve'
//      server: 'aws',
//      port: 2000,
//      status: 'working'
//    }
//    resolve(backendData) //здесь мы 'говорим' нашему промису, что он завершил своё выполнение, указанный в параметре объект будет получен в методе 'then'
//  }, 2000)
//})

////then хранит в себе callback функцию, которая выполнится когда закончится асинхронная операция, т.е. будет выполнен метод 'resolve'
//p.then(data => {                         //параметр 'backendData', внесённый в 'resolve' мы внесём в наш 'then' как 'data'
//  console.log('Promise resolved', data)
//})

//Теперь усложним, написав ещё одну асинхронную операцию:
//const p = new Promise ((resolve, reject) => {
//  setTimeout(() => {
//    console.log('Data is processing...')
//    const backendData = {
//      server: 'aws',
//      port: 2000,
//      status: 'working'
//    }
//    resolve(backendData)
//  }, 2000);
//})

//p.then(data => {
//  const p2 = new Promise ((resolve, reject) => {
//    setTimeout(() => {
//      data.modified = true
//      resolve(data)
//    }, 2000);
//  })

//  p2.then(clientData => {
//    console.log('Data has been recieved', clientData)
//  })
//})

//Всё круто, но у нас опять появилось много уровней вложенности, поэтому сделаем по-другому
//const p = new Promise((resolve, reject) => {
//  setTimeout(() => {
//    console.log('Data is processing...')
//    const backendData = {
//      server: 'aws',
//      port: 2000,
//      status: 'working',
//    }
//    resolve(backendData)
//  }, 2000)
//})

//p
//  .then((data) => {
//    return (p2 = new Promise((resolve, reject) => {
//      //возвращаем новый promise
//      setTimeout(() => {
//        data.modified = true
//        resolve(data)
//      }, 2000)
//    }))
//    //Так как мы в нашем 'then' возвращаем новый промис, мы можем у нашего 'then' вызвать ещё один 'then'
//  })
//  .then((clientData) => {
//    //Также с помощью 'chaining' мы можем передавать модификации в наших данных
//    clientData.fromPromise = true
//    return clientData //необязательно возвращать промисы в then, можно возвращать обычные данные и последовательно их модифицировать
//  })
//  .then(data => {
//    console.log('Modified Data has been recieved', data)
//  })

//p
//  .then((data) => {
//    return (p2 = new Promise((resolve, reject) => {
//      //возвращаем новый promise
//      setTimeout(() => {
//        data.modified = true
//        resolve(data)
//        //reject(data) //меняем 'resolve' на 'reject', в данном случае в консоль будет выведена ошибка с данным объекта, переданного в параметр 'reject'
//      }, 2000)
//    }))
//    //Так как мы в нашем 'then' возвращаем новый промис, мы можем у нашего 'then' вызвать ещё один 'then'
//  })
//  .then((clientData) => {
//    //Также с помощью 'chaining' мы можем передавать модификации в наших данных
//    clientData.fromPromise = true
//    return clientData //необязательно возвращать промисы в then, можно возвращать обычные данные и последовательно их модифицировать
//  })
//  .then(data => {
//    console.log('Modified Data has been recieved', data)
//  }) //Промисы удобны в обработке ошибок, для этого мы используем метод 'catch'
//    .catch(err => console.error('Error: ', err)) //'catch' сработает, если мы передадим в промис 'reject'
//    .finally(() => console.log('End of the code')) //'finally' выполнится в любом случае в конце кода


//Возможности промисов, создадим функцию 'sleep', которая добавляет определённую задержку: 
const sleep = ms => { //наша функция принимает в себя параметр 'ms'
  return new Promise(resolve => { //возращает новый промис, принимающий 'resolve'
    setTimeout(() => resolve(), ms) //добавим задержку с помощью 'setTimeout', которая вызывает метод 'resolve' через указанное кол-во времени
  })
}
//Так как функция 'sleep' возращает нам промис, мы можем использовать метод 'then' чтобы выполнить какое-то действие
//sleep(2000).then(() => console.log('After 2 seconds')) 
//sleep(4000).then(() => console.log('After 4 seconds')) 

//У глобального объекта Promise есть метод 'all', который принимает в кач-ве параметров массив, содержащий промисы. И как у всех промисов у Promise.all есть метод 'then', который выполнится только тогда, когда выполнятся все промисы, указанные в массиве параметра
Promise.all([sleep(2000), sleep(5000)]). then(() => {
  console.log('All promises have been fulfilled') //outputs a message after 5 seconds
})

//Также у promise существует другой метод 'race', который также принимает в кач-ве параметров массив, однако метод 'then' отработает после выполнения первого промиса, в нашем случае через 2 секунды
Promise.race([sleep(2000), sleep(5000)]). then(() => {
  console.log('First promise have been fulfilled')  //outputs a message after 2 seconds
})