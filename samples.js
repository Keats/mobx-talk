import {
  observable, autorun, asMap, transaction, computed, action,
  useStrict,
} from "mobx";

// Examples inspired from MobX docs + mobx-example repos

// Example 1: Observing primitives

// becomes an ObservableArray (same API as normal array)
const numbers = observable([1,2,3]);
// becomes an ObservableMap (same API as Map)
const users = observable(asMap({"bob": "bob"}));
console.log(numbers, users);
// `autorun` always run once on setup, https://github.com/mobxjs/mobx/issues/207
autorun(() => {
  console.log("Initial call or something changed!");
  console.log(numbers.toJS());
  console.log(users.toJS());
});
numbers.push(4);
users.set("jane", "jane");

// ==============================================================


// Example 2: Observing class properties and transactions

// class Meetup {
//   @observable name;
//   @observable numberPeople;
//
//   constructor(name, numberPeople) {
//     this.name = name;
//     this.numberPeople = numberPeople;
//   }
// }
//
//
// const thisMeetup = new Meetup("Osaka Web designers and developers", 0);
// console.log(thisMeetup);
// autorun(() => {
//   console.log(thisMeetup.numberPeople + " people");
// });
// thisMeetup.numberPeople = 1;
// // Won't react, adding a new property requires using the extendObservable method
// // Like Object.assign but for MobX objects
// thisMeetup.date = new Date();
// // Won't react too, `name` is not referenced in `autorun`
// thisMeetup.name = "Hello";
// // autorun will only run once, at the end of the transaction
// transaction(() => {
//   thisMeetup.numberPeople = 2;
//   thisMeetup.numberPeople = 3;
//   thisMeetup.numberPeople = 4;
// });


// ==============================================================


// Example 3: Computed

// class TableRow {
//   @observable quantity = 0;
//   @observable price = 0;
//
//   constructor(price) {
//     this.price = price
//   }
//
//   // a getter
//   @computed get total() {
//     return this.price * this.quantity;
//   }
// }
//
// const row = new TableRow(10);
// console.log(row.total);
// row.quantity = 10;
// // Only computed on the call
// console.log(row.total);
// // Not recomputed if the observables used didn't change
// console.log(row.total);


// ==============================================================


// Example 4: Actions

// useStrict(true);
//
// class TableRow {
//   @observable quantity = 0;
//   price = 0;
//
//   constructor(price) {
//     this.price = price
//   }
//
//   // a getter
//   @computed get total() {
//     return this.price * this.quantity;
//   }
//
//   @action setQuantity(quantity) {
//     this.quantity = quantity;
//   }
// }
//
// const row = new TableRow(10);
// console.log(row.total);
// row.setQuantity(10);
// // Only computed on the call
// console.log(row.total);
// // Not recomputed if the observables used didn't change
// console.log(row.total);
// // Nothing changed...?
//
// // Actually wraps the function in a transaction and provide debugging info.
// // The devtools will use the fn name or the given name to signature
// // action(name: string, fn: Fn), used for async cb for example
//
// // Use `useStrict` to force state to only be modified in `action` fns
// row.quantity = 10; // will error
