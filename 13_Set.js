/*Set – коллекция для хранения множества значений, причём каждое значение может встречаться лишь один раз.
Например, к нам приходят посетители, и мы хотели бы сохранять всех, кто пришёл. При этом повторные визиты не должны приводить к дубликатам, то есть каждого посетителя нужно «посчитать» ровно один раз. */

const set = new Set([1, 2, 3, 3, 3, 4, 5, 5, 6])
//console.log(set)   //получим коллекцию значений без дубликатов, 3 и 5 будут уникальны

//Методы set:
//add - добавляет значение
set.add(10).add(20).add(30).add(20)
//console.log(set)  

////has - проверяет, есть ли указанное значение: 
//console.log(set.has(30))   //true

////size: 
//console.log(set.size)   // 9

////delete:
//console.log(set.delete(1)) //true
//console.log(set.size) //8

////clear: 
//set.clear()
//console.log(set)  // 0


//Additional methods: 
//values and keys return the same result:
//console.log(set.values())
//console.log(set.keys())
//console.log(set.entries())  //keys and values will be the same



//=================================
//ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ SET:
//Напишем функцию, которая будет возвращать уникальные значения из массива:
function uniqValues(array) {
  //return [...new Set(array)]
  return Array.from(new Set(array)) //the same
}

console.log(uniqValues([1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7]))

