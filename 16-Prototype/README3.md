# instaneof 연산자

```jsx
객체 instanceof 생성자 함수
```

- 우변의 `생성자 함수의 prototype 에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하는지 체크`
  - 존재하면 → `true`
  - 존재하지 않으면 → `false`
- 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니다.

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("WI");

// 프로토타입으로 교체할 객체
const parent = {};

Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩
Person.prototype = parent;

// Person.prototype 이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Person); // true
// Object.prototype 이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Object); // true
```

<br />
<br />

# 직접 상속

### Object.create 에 의한 직접 상속

> 명시적으로 프로토타입을 지정하여 새로운 객체를 생성

- 다른 객체 생성 방식과 마찬가지로 `OrdinaryObjectCreate를 호출하는 것은 동일`
- 다른 점은 `객체를 생성하면서 직접적으로 상속을 구현한다는 점`
  - `new 연산자 없이도 객체를 생성 가능`
  - `프로토타입을 지정하면서 객체를 생성할 수 있다.`
  - `객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.`

```jsx
// obj -> null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true

// obj -> Object.prototype -> null
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj -> Objrct.prototype -> null
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);
console.log(Object.getPrototypeOf(obj) === myProto); // true

function Person(name) {
  this.name = name;
}
// obj -> Perosn.prototype -> Object.prototype -> null
obj = Object.create(Person.prototype);
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

- `ESLint 에서는 Object.create의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다.`
  - `Object.create 메서드`를 통해 `프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문`
  - 모든 객체에 종점에는 언제나 `Object.prototype` 이 존재한다는 점을 고려했을 때, 직접 프로토타입 체인의 종점에 위치하는 객체를 생성하는 것은 바람직하지 않다.
  - 그러므로, `Object.prototype 의 빌트인 메서드는 간접적으로 호출하는 것이 바람직하다.`

```jsx
// 프로토타입이 null 인 객체를 생성
const obj = Object.create(null);
obj.a = 1;

// console.log(obj.hasOwnProperty("a"));   // TypeError: obj.hasOwnProperty is not a function
console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
```

<br />

### 객체 리터럴 내부에서 **proto** 에 의한 직접 상속

> `Object.create` 로 객체를 생성할 때, 두 번째 파라미터로 `프로퍼티를 정의하는 것에 번거로움을 해소하는 방법`

```jsx
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서, 프로토타입을 지정하여 직접 상속을 구현할 수 있다.
const obj = {
  y: 20,
  // obj -> myProto -> Object.prototype -> null
  __proto__: myProto,
};
/*
위 obj 정의는 다음과 같다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
})
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

<br />
<br />

# 정적 프로퍼티/메서드

> 생성자 함수로 `인스턴스를 생성하지 않아도 참조/호출 가능한` 프로퍼티/메서드

- 생성자 함수도 `객체` 다.
- 그러므로, 생성자 함수도 `프로퍼티나 메서드를 소유할 수 있다.`
- 즉, `생성자 함수가 소유한 프로퍼티나 메서드를 정적 프로퍼티/메서드` 라고 한다.
  - 생성자 함수가 소유하고 있는 정적 프로퍼티/메서드는 `인스턴스에서 직접 참조/호출할 수 없다.`

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`HI, My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "인간 생성자 함수의 정적 프로퍼티 !";

// 정적 메서드
Person.staticMethod = function () {
  console.log("인간 생성자 함수의 정적 메서드 호출 !");
};

const me = new Person("WI");

Person.staticMethod(); // 인간 생성자 함수의 정적 메서드 호출 !
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

<br />
<br />

# 프로퍼티 존재 확인

### in 연산자

> 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인 → `boolean`

```jsx
key in object;
```

- `in 연산자` 는 확인 대상 객체의 프로퍼티뿐만 아니라, `확인 대상 객체가 상속받은 모든 프로토타입의 프로토타입의 프로퍼티를 확인하는 것에 주의할 것`

```jsx
const person = {
  name: "WI",
  age: 100,
};

console.log("name" in person); // true
console.log("age" in person); // true
console.log("address" in person); // false << 🔍 address 프로퍼티는 person 객체에 정의되어 있지 않으므로 false

// toString 메서드는 person 객체의 프로퍼티에는 존재하지 않는다.
// 하지만, person 객체의 프로토타입인 Object.prototype 에 toString 메서드가 존재하기 때문에 true
// 이처럼, in 연산자는 조사할 객체의 상속받은 프로토타입의 프로퍼티까지 조사를 한다.
console.log("toString" in person); // true 🔍
```

<br />

### Object.prototype.hasOwnProperty 메서드

> in 연산자와 동일하게 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인

- 단, `객체 고유의 프로퍼티 키 인 경우에만 true 를 반환`
- `상속받은 프로토타입의 프로퍼티 키인 경우는 false 를 반환`

```jsx
const person = {
  name: "WI",
  age: 100,
};

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // true

// toString 메서드는 person 객체의 프로퍼티에 존재하지 않는다.
// 객체의 고유 프로퍼티일 때만 true 를 반환하는 Object.prototype.hasOwnProperty 메서드는 false 를 반환
// toString 은 person 객체에 존재하는 것이 아닌, 그에 상속된 Object.prototype 에 메서드이기 때문이다.
console.log(person.hasOwnProperty("toString")); // false 🔍
```

<br />
<br />

# 프로퍼티 열거

### for - in 문

> 객체의 모든 프로퍼티를 순회하며 열거(enumeration)할 필요가 있을 때 사용

```jsx
for (변수선언문 in 객체) { ... }
```

- 정확히는, 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서
  - 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 값이 `true` 인 프로퍼티를 순회하며 열거한다.
- 프로퍼티 키가 `심벌(Symbol)` 인 프로퍼티는 열거하지 않는다.
- `for - in` 문은 `순서를 보장하지 않는다.`

```jsx
const person = {
  name: "WI",
  age: 100,

  __proto__: {
    address: "Incheon",
  },
};

// in 연산자로 person 객체에 toString 프로퍼티(메서드)가 존재하는지 확인 -> 존재(true)
console.log("toString" in person); // true

// 그럼에도 불구하고, toString 메서드는 for - in 문에서 key 에 할당되지 않았다.
// 이는 toString 의 프로퍼티 어트리뷰트에서 [[Enumerable]] 값이 false 로 설정되어 있기 때문이다.
// 추가적으로, __proto__ 로 person 객체의 프로토타입에 프로퍼티로 address 프로퍼티를 추가했다. 이 또한 for - in문에 key로 할당
for (const key in person) {
  console.log(`${key} : ${person[key]}`);
}
/*
name : WI
age : 100
address : Incheon
*/
```

- 오로지 해당 객체의 프로퍼티 키들로만 for - in 문을 순회하고 싶을 때는 `Object.prototype.hasOwnProperty` 메서드를 호출하며 검사한다.

```jsx
const person = {
  name: "WI",
  age: 100,

  __proto__: {
    address: "Incheon",
  },
};

for (const key in person) {
  // person 객체의 고유 프로퍼티일 경우에만 정보를 출력
  if (person.hasOwnProperty(key)) {
    console.log(`${key} : ${person[key]}`);
  }
}
/*
name : WI
age : 100
*/
```

<br />

### 객체 고유 프로퍼티만으로 구성된 열거하고 싶을 경우

- `Object.keys()` : 객체 자신의 열거 가능한 `프로퍼티 키를 배열로 반환` ( ES6+ )
- `Object.values()` : 객체 자신의 열거 가능한 `프로퍼티 값을 배열로 반환` ( ES8 )
- `Object.entries()` : 객체 자신의 열거 가능한 `프로퍼티 키,값을 배열로 반환` ( ES8 )

```jsx
const person = {
  name: "WI",
  age: 100,

  __proto__: {
    address: "Incheon",
  },
};

console.log(Object.keys(person)); // [ 'name', 'age' ]
console.log(Object.values(person)); // [ 'WI', 100 ]
console.log(Object.entries(person)); // [ [ 'name', 'WI' ], [ 'age', 100 ] ]
```
