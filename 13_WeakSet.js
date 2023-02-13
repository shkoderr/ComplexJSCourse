//WeakSet - значение должны быть объектами, есть только метод has
const users = [
  {name: 'Elena'},
  {name: 'Alex'}, 
  {name: 'Irina'}
]

const visits = new WeakSet()

visits.add(users[0]).add(users[1])

users.splice(1, 1)  //Removes elements from an array (1 - index, 2 - amount of deleted elements)

console.log(visits.has(users[0]))  //true
console.log(visits.has(users[1]))  //false - автоматически был удалён из weakset
