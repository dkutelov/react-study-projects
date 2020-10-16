var nameVar = 'Andrew';
var nameVar = 'Mathew';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);

var fullName = 'Andrew Mead';
let firstName;
if (fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}
console.log(firstName);