////Object.create https://www.youtube.com/watch?v=cS6nTVNzOPw&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT&index=7&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD
//const person = Object.create({}, {  //метод глобального объекта 'create' принимает в себя 2 параметра (оба объекты)
//  name: {                           //в отличие от обычного способа, в Object.create значения параметров - объекты
//    value: 'Timur'
//  },
//  birthYear: {
//    value: 1996
//  }
//})  

//PROPERTY DESCRIPTORS
//По умолчанию поля объекта, созданного таким образом, не будут входить в цикл при итерации по его ключам, для этого нам нужно модифицировать ключи объекта, добавив в нужные поля свойство enumerable со значением 'true' (по умолчанию данное свойство имеет значение 'false')
//Также по умолчанию у такого объекта нельзя изменять значения его полей, т.к. свойство 'writable' имеет значение 'false' и мы можем это изменить
//Есть ещё один дескриптор, который позволяет удалять поля объекта - 'configurable'

//const person = Object.create({}, {  
//  name: {  
//    value: 'Timur',
//    enumerable: true,          //добавили свойство enumerable
//    writable: true,            //добавили свойство writable
//    configurable: true         //добавили свойство configurable
//  },
//  birthYear: {
//    value: 1996,
//    enumerable: true,        //добавили свойство enumerable
//    writable: true,          //добавили свойство writable
//    configurable: true       //добавили свойство configurable
//  }
//})  

////теперь мы можем изменять или удалять наши поля
//person.name = 'Egor'          
//person.birthYear = 1995  
////delete person.name 

//for (let key in person) {
//  console.log('Key', key, person[key])
//}



//GETTERS AND SETTERS
const person = Object.create(
  {
    calculateAge() {
      console.log('Age:', new Date().getFullYear() - this.birthYear) //в данном объекте мы можем указывать прототип нашего объекта
    }                                         
}, 
  {  
    name: {  
      value: 'Timur',
      enumerable: true,
      writable: true,
      configurable: true
    },
    birthYear: {
      value: 1996,
      enumerable: true,
      writable: true,
      configurable: true
    },
    age: {
      get() {   //оператор 'get' связывает свойство объекта с функцией, которая будет вызываться при обращении к этому свойству.
        return new Date().getFullYear() - this.birthYear
      },
      set (value) {  //оператор 'set' связывает свойство объекта с функцией, которая будет вызвана при попытке установить это свойство.
        document.body.style.backgroundColor = 'blue'
        console.log('Set age', value)
      }
  }
})  

//Цикл for in пробегается по всем свойствам, в т.ч. и свойствам прототипа, чтобы этого избежать, нам необходимо создать проверку:
for (let key in person) {
  if(person.hasOwnProperty(key)) {
    console.log('Key', key, person[key])
  }
}