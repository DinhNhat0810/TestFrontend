////////////////////////////////// Object
// var adu="zai";

// var inforMe = {
//     name:'Dinh nhat',
//     firstName:'Pham',
//     phone:'0314546',
//     age:18,
//     [adu]:'18cm',
//     fullName: function() {
//         return this.firstName+' '+this.name;
//     }
// }

// inforMe.lin='zaizaizai';
// delete inforMe.fullName();

// console.log(inforMe.fullName());


//    Object contructor
// function User(firstName, lastName, Age) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.Age = Age;
//     this.getName =  function () {
//         return `${this.firstName} ${this.lastName} ${this.Age}`;
//     }
// }

// var author = new User('Pham', 'Nhat', '21');
// var user = new User('Pham1', 'Nhat1', '20');

// author.title='Pham dinh nhat 123';
// user.comment='Pham dinh nhat 123456';

// //  Object Prototype
// User.prototype.className = 'Adu';
// User.prototype.getClassName = function() {
//     return this.className;
// }

// console.log(author);
// console.log(user);


// Date Object
// var date = new Date();
// console.log(date.getHours());






////////////////////////////String
//        Template
// var commentText=08102000;
// var authorName='Dinh Nhat:';
// var fullCommentText = `Pham ${authorName} ${commentText}`;

// console.log(fullCommentText);

//       Method
// var fullName='Dinh Nhat';

// Length
// console.log(fullName.length);

// Slice
// console.log(fullName.slice(5));
// console.log(fullName.slice(-4));

// Substring 
// substring() is similar to slice()
// The difference is that substring() cannot accept negative indexes
// console.log(fullName.substring(1,6));

// Substr
// The difference with slice() is the second parameter specifies the length of the extracted part.
// console.log(fullName.substr(0,3));

// Replace
// console.log(fullName.replace('Dinh','Pham'));
// console.log(fullName.replace(/h/g,'n'));

//  Converting to Upper and Lower Case
// console.log(fullName.toLocaleUpperCase());
// console.log(fullName.toLocaleLowerCase());

// Concat
// console.log(fullName.concat(' Pham'));

// Trim
// console.log("        dinhnhat   ".trim());

// // CharAt
// //The charAt() method returns the character at a specified index (position) in a string
// console.log(fullName.charAt(0));

// // CharCodeAt
// //The charCodeAt() method returns the unicode of the character at a specified index in a string
// // The method returns a UTF-16 code (an integer between 0 and 65535).
// console.log(fullName.charCodeAt(0));

// // Converting a String to an Array
// console.log(fullName.split(' '));






//////////////////////////////////Array
// Array method
// var animals = [
//     {
//         id:1,
//         ten:'Mouse',
//         phone:01234567,
//         Age: 30
//     },
//     {
//         id:2,
//         ten:'Cat',
//         phone:01654545,
//         Age: 31

//     },
//     {
//         id:3,
//         ten:'Dog',
//         phone:045457,
//         Age: 40

//     },
//     {
//         id:4,
//         ten:'Rat',
//         phone:07657265657,
//         Age: 39

//     },
//     {
//         id:5,
//         ten:'Dog',
//         phone:01,
//         Age: 35

//     }
// ];

////////////////////Foreach
// Calls a function for each array element
// var check = animals.forEach(function(animal, index) {
//     console.log(index);
//     console.log(animal);
// });

//////////////////////Every
// Checks if every element in an array pass a test
// var check = animals.every(function(animal, index) {
//     return animal.name === 'Rat';
// });
// console.log(check);

// Some
// Checks if any of the elements in an array pass a test
// var check = animals.some(function(animal, index) {
//     return animal.phone === 07657265657;
// });
// console.log(check);

//////////////////////Find
//Returns the value of the first element in an array that pass a test
// var check = animals.find(function(animal, index) {
//     return animal.ten === "Dog";
// });
// console.log(check);

//////////////////////Filter
// Creates a new array with every element in an array that pass a test
// var check = animals.filter(function(animal, index) {
//     return animal.name === "Dog";
// });
// console.log(check);

//////////////////////Map
// var newAnimals = animals.map(function(animal, index) {
//     return {
//         id: animal.id,
//         ten: `Day la con : ${animal.ten}`,
//         kg: '26kg',
//         index:index
//     }

// })
// console.log(newAnimals);

///////////////////////////////////Reduce
// var i=0;
// var totalAge = animals.reduce(function(accumulator, currentValue) {
//     // i++;
//     var total = accumulator + currentValue.Age;

//     // console.table({
//     //     'Luot chay: ': i,
//     //     'Bien tich tru: ': accumulator,
//     //     'So tuoi :': currentValue.Age,
//     //     'Tich tru duoc: ':total
//     // });
//     return total;
// }, 0);
// console.log(`Tong so tuoi cua animals la: ${totalAge}`);

// Reduce khong initial value
// accumulator l?? ph???n t??? ?????u ti??n c???a m???ng
// currentValue l?? ph???n t??? th??? 2

// Reduce c?? initial value
// accumulator l?? initial value
// currentValue l?? gi?? tr??? ?????u ti??n c???a m???ng

/////////////////////////Tu viet phuong thuc Reduce2
// Array.prototype.reduce2 = function(callback, initialValue) {
//     let i = 0;
//     if(arguments.length < 2 ) {
//         i=1;
//         initialValue = this[0];
//     }   
//     for(;i<this.length;i++) {
//         initialValue = callback(initialValue, this[i], i, this);
//     }
//     return initialValue;
// }

// var arr= [1,2,3,4,5];
// var totalArr = arr.reduce2(function(accumulator, currentValue) {
//     return accumulator + currentValue;
// });
// console.log(totalArr);




/////////////////////////Callback
// function myFunction(param){
//     if(typeof param === 'function'){
//         param('21')
//     }
// }  

// function callBack(age){
//     console.log('Age :' , age)
// }
// myFunction(callBack);
 
// var numbers=[1,54,6,4,6,87,4,[]];

////////////////////////Array.prototype.find
// Array.prototype.find2 = function (callback) {
//     for (var index in this) {
//       if (callback(this[index], index)) {
//         return i;
//       }
//     }
//     return undefined;
//   };
// var findNumber = numbers.find2(function(number,index) {
//     return number === 6;
// })
// console.log(findNumber);


//////////////////////Array.prototype.filter
// Array.prototype.find2 = function (callback) {
//     var output =[];
//     for (var index in this) {
//       if (this.hasOwnProperty(index)) {
//             var result = callback(this[index],index,this);
//             if(result){
//                 output.push(this[index],index);
//             }
//       }
//     }
//     return output;
//   };
// var findNumber = numbers.find2(function(number,index) {
//     return number > 50;
// })
// console.log(findNumber);



///////////////////////Array.prototype.foreach2
// Array.prototype.forEach2 = function (callback) {
//     for (var index in this) {
//       if(this.hasOwnProperty(index)){
//           callback(this[index],index,this)
//       }
//     }
//   };
// var findNumber = numbers.forEach2(function(number,index) {
//     console.log(number);
// })


///////////////////////Array.prototype.some2
// Array.prototype.some2 = function (callback) {
//     for (var index in this) {
//       if(this.hasOwnProperty(index)){
//           if(callback(this[index],index,this)){
//             return true;
//           }
//       }
//     }
//     return false;
//   };
// var findNumber = numbers.some2(function(number,index) {
//     return typeof number === 'object';
// })
// console.log(findNumber);

/////////////////////Array.prototype.every2
// Array.prototype.every2 = function (callback) {
//     for (var index in this) {
//       if(this.hasOwnProperty(index)){
//           if(callback(this[index],index,this)){
//             return false;
//           }
//       }
//     }
//     return true;
//   };
// var findNumber = numbers.every2(function(number,index) {
//     return typeof number === 'number';
// })
// console.log(findNumber);


// var courses = [
//     { id: 1, course: "HTML", coin: 0 },
//     { id: 2, course: "JavaScript", coin: 200 },
//     { id: 3, course: "HTML", coin: 500 },
//     { id: 4, course: "HTML", coin: 250 }
// ]
//////////////////////Array.prototype.map2
// Array.prototype.map2 = function (callback) {
//     var output = [];
//     let arrayLength = this.length;
//     for (var index in this) {
//       var result = callback(this[index],index);
//       output.push(result);
//     }
//     return output;
//   };
// var newCourses = courses.map2(function(course,index) {
//     return {
//         id: course.id,
//         course : `${course.course} sieu dinh`,
//         coin: course.coin,
//         language: 'English'
//     };
// })
// console.log(newCourses);


/////////////////////// DOM CSS

// var aduduElement = document.querySelector('h1');
// Object.assign(aduduElement.style, {

//     width: '100px',
//     height: '200px',
//     backgroundColor: 'red',

// })

// console.log(aduduElement.style);

///////////////////////Classlist property

// var aduduElement = document.querySelector('h1');
//add
// aduduElement.classList.add('black');

// //contains
// console.log(aduduElement.classList.contains('black'));

// //Remove
// aduduElement.classList.remove('black');

//Toggle
// setInterval(() =>{
//     aduduElement.classList.toggle('black');
// }, 1000)

////////////////////DOM event
// var aduduElement = document.querySelectorAll('h1');

// for(var i = 0; i<aduduElement.length;i++){
//     aduduElement[i].onclick = function(e){
//         console.log(e.target.innerText);
//     }
// }


//////////////////////////AddEventListener
// var clickH1 = document.querySelector('h1');
// function viec1(){
//     clickH1.style.color='green';
// }
// function viec2(){
//     clickH1.style.float='right';
// }

// clickH1.addEventListener('click',viec1);
// clickH1.addEventListener('click',viec2);

// setTimeout(function(){
//     clickH1.removeEventListener('click',viec2)
// },3000)

////////////////////////////Json
// L?? m???t ?????nh d???ng d??? li???u( chu???i)
// JSON: Number, Boolean, Null, Array, Object
//Stringify: T??? js types => JSON
//Parse: T??? JSON => JS types

// var json = '{"name":"nhat","age":21}';
// var object = JSON.parse(json);
// console.log(object)

////////////////////////////Promise
// Promise ??c sinh ra ????? x??? l?? c??c nguy??n t???c b???t ?????ng b???, tr?????c khi s??? d???ng promise ta s??? d???ng callback,
// v?? callback s??? x???y ra 1 v?? ???? l?? callback hell s??? b??? nested r???t kh?? nh??n code b??? r???i r???m. Do ????, promise dc sinh ra trong phi??n b???n ES6.
// ????? t???o ra 1 promise ta s??? d???ng keyword new trong constructor c???a n?? v?? truy???n v??o 1 
// Executor function g???m 2 tham s??? ?????u function l?? resolve v?? reject v?? g???i resolve khi x??? l?? logic th??nh c??ng , 
// reject khi th???t b???i, s??? d???ng qua .then ho???c .catch, c?? 3 tr???ng th??i trong promise l?? pending, fulfilled, rejected.

// Promise c?? 3 tr???ng th??i:
// + Pen??ing: Tr???ng th??i ch??? vi???c th??nh c??ng hay th???t b???i - tr???ng th??i r?? r?? b??? nh??? (Memory Leak).
// + Fulfilled: Tr???ng th??i th??nh c??ng -> Then (Resolve).
// + Rejected: Tr???ng th??i th???t b???i -> Catch (Reject).

// var promise = new Promise(
//     //Executor
//     function(resolve, reject){
//         //Logic
//         //Th??nh c??ng: resolve()
//         //Th???t b???i: reject()
//         // resolve([
//         //     {
//         //         id:1,
//         //         name:'nhat'
//         //     }
//         // ]);

//         reject('Co loi');
//     }
// )

// promise
//     .then(function(myName){
//         console.log(myName);
//     })

//     .catch(function(error){
//         console.log(error);
//     })

//     .finally(function(){
//         console.log("Done");
//     });




/////////////////////////Fetch
// API (URL) - Application programing interrface
// C???ng giao ti???p gi???a c??c ph???n m???m
    
// Backend -> API -> Fecth -> JSON/XML
//-> JSON.parse -> JS types
// -> Render ra giao di???n v???i HTML

// var fethApi = 'https://jsonplaceholder.typicode.com/users';

// fetch(fethApi)
//     .then(function(response){
//         return response.json();
//         // JSON.parse: JSON -> JS types
//     })
//     .then(function(users){
//          var htmls = users.map(function(user){
//              return `<li>
//                 <h2>Name: ${user.name}</h2>
//                 <p>Email: ${user.email}</p>
//                 <p>Address: ${user.address.city} City</p>
//              </li>`;
//          });
//          var html = htmls.join();
//          document.getElementById('block-list').innerHTML=html; 
//     })
//     .catch(function(err){
//         console.log("loi rui")
//     })


//////////////////////////Json server
// var animalsApi = 'http://localhost:3000/Animals';
// fetch(animalsApi)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(Animals){
//         var htmls = Animals.map(function(animal){
//             return `
//             <li>Name: ${animal.name}</li>
//             <li>Des: ${animal.description}</li>
//             `
//         }) 
//         var html = htmls.join();
//         document.getElementById('block-list').innerHTML=html;
//     })



//                 ES6 support

/////////////////////////Classes
// class Animals {
//     constructor (name, weight) {
//         this.name = name;
//         this.weight = weight;
//     }

//     getName () { 
//         return this.name;
//     }

//     getWeight () { 
//         return this.weight;
//     }
// }

// const Duck = new Animals('Duck','30kg');
// const Cat = new Animals('Cat','3kg');

// console.log(Cat.getWeight());


//   Default parameter values
// function Animals(log, type='log') {
//     console[type](log);
// } 

// Animals('Cat','warn');


////////////////////////Enhanced object literals
// var name = 'Cat';
// var weight = '36kg';

// var Animals = {
//     // 1 Dinh nghia key: Value cho Object
//     name,
//     weight,
//     //2 Dinh nghia method cho Object
//     getWeight() {
//         return weight;
//     }
// }

// console.log(Animals.getWeight());

    //3 Dinh nghia key cho object duoi dang bien

// var fieldName = 'name';
// var fieldWeight = 'weight';

// const Animals = {
//     [fieldName]: 'Duck',
//     [fieldWeight]: '100kg'
// }

// console.log(Animals)


/////////////////////Destructuring
// var array = [1,2,3,4,5];

// var [a,b,...rest] = array;

// console.log(a,b);
// //Rest parameter
// console.log(rest);


// var ob = {
//     name: 'dog',
//     age:30,
//     type: {
//         name: 'pitbull'
//     }
// }

// var {name:parentName, age, type:{name:childName}} = ob;
// var {name,...rest} = ob;
// console.log(parentName);
// console.log(rest);

////////////////////////Spread
// var arr1 = ['Dog','Cat'];
// var arr2 = ['Bird','Rat'];
// var arr3 = [...arr1,...arr2];
// console.log(arr3);

// var ob1 = {
//     name: 'Cat'
// }
// var ob2 = {
//     age:20
// }
// var ob3 = {
//     ...ob1,
//     ...ob2,
// }
// console.log(ob3);

// var animals = ['Cat','Mouse','Dog'];
// function logger(...rest) {
//     for(var i=0; i<rest.length; i++) {
//         console.log(`This is a ${rest[i]}`);
//     }
// }
// logger(...animals);

////////////////////Tagged template literals
// ?? t?????ng: H???c l???p tr??nh <span>js<span> t???i <span>f8<span>!
// function higlight([first, ...strings], ...values) {
//     // firt= ["h???c l???p tr??nh"]
//     // string=["t???i", "!"]
//     // value= [course:'javascript', brand:'F8'];

//     return values.reduce(
//         (acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()],
//         [first] //initial value
//     )
//     /*
//         b1. acc=first=H???c l???p tr??nh + curr= javascript 
//         =>H???c l???p tr??nh <span>Javascript</span>
//         => acc=['H???c l???p tr??nh','<span>Javascript</span>'] +strings.shift() = t???i
//         =>acc= ['H???c l???p tr??nh','<span>Javascript</span>','t???i'];
//         b2. acc + curr=<span>${curr}</span> = 'F8' + strings.shift()= !
//         b4. acc => [
//             "H???c l???p tr??nh ", 
//             "<span>Javascript</span>",
//             " t???i ", "<span>F8</span>", 
//             "!"
//         ]
//     */
// }


///////////////////////////Optional chaining (?.)
// const obj = {
//     name:'Perry',
//     cat:{
//         name:'Perry1',
//         cat2:{
//             name:'Perry2',
//             cat3:{
//                 name:'Perry3'
//             }
//         }
//     } 
// }

// if(obj.cat?.cat2?.cat3) {
//     console.log(obj.cat.cat2.cat3.name)
// }










