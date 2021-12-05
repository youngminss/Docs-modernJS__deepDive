> 자바스크립트는 `객체(object)` 기반의 프로그래밍 언어

- [원시값(primitive value)](https://developer.mozilla.org/ko/docs/Glossary/Primitive) 을 제외한 나머지 값( `함수`, `배열`, `정규 표현식` 등 )은 모두 객체
- 원시 타입은 하나의 값만 나타내지만 `객체 타입(object / reference type)` 은 `다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성`
- 원시값은 `변경 불가(immutable)` 한 값이지만, 객체는 `변경 가능(mutable)` 한 값
- 객체는 0개 이상의 `프로퍼티(property)` 로 구성된 집합이며, 프로퍼티는 `키(key) : 값(value)` 로 구성
- 자바스크립트에서 `함수(function)` 도 프로퍼티의 값으로 설정가능 → `메서드(method)`

```jsx
var myObj = {
	num: 0,  // 프로퍼티
  increase: function () { ... )  // 메서드
}
```

```jsx
[ 💡 NOTE ]

프로퍼티(property) = 객체의 상태를 나타내는 값(data)
메서드(method) = 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)
```

<br>

> 자바스크립트는 `프로토타입(prototype)` 기반 객체지향 언어

- 자바(Java) 와 같은 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원

1. `객체 리터럴`
2. `object 생성자 함수`
3. `생성자 함수`
4. `Object.create 메서드`
5. `클래스(ES6)`

<br>

### 객체 리터럴을 사용한 객체 생성

- 중괄호( `{ ... }` ) 내에 0개 이상의 프로퍼티를 정의
- `변수에 할당되는 시점`에 자바스크립트 엔진은 `객체 리터럴을 해석해 객체를 생성`

```jsx
var person = {
  name: "Wi",
  sayHello: function () {
    console.log(`Hello My name is ${this.name}`);
  },
};

console.log(typeof person); // object
console.log(person); // { name: 'Wi', sayHello: [Function: sayHello] }
```

<br>
<br>

# 프로퍼티

> 객체는 `프로퍼티의 집합`, 프로퍼티는 `키와 값` 으로 구성

- `프로퍼티 키(key)` : 빈 문자열( `''` ) 을 포함하는 모든 `문자열(string)` 또는 `심벌(symbol) 값`
- `프로퍼티 값(value)` : 자바스크립트에서 사용할 수 있는 모든 값

```jsx
var person = {
  name: "WI", // 프로퍼티 키는 name, 프로퍼티 값은 "WI"
  age: 100, // 프로퍼티 키는 age, 프로퍼티 값은 100
};
```

<br>

> 프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 `식별자 역할`

- 하지만 반드시 [식별자 네이밍 규칙](https://javascript.plainenglish.io/rules-to-follow-when-naming-an-identifier-in-javascript-a992c103bc8c) 을 따라야 하는 것은 아니다.
- 자바스크립트에서 `사용 가능한 유요한 이름인 경우`, `따옴표( '' or "")` 를 생략할 수 있다.
- 반대로 말하면 식별자 네이밍 규칙을 따르지 않는 이름에는 `반드시 따옴표를 사용해야 한다.`

```jsx
var person = {
	firstName: 'Young-min',  // 식별자 네이밍 규칙을 준수한 프로퍼티 키
	'last-name': 'WI',       // 식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키 ( 따옴표를 사용해 문자열 형태 유지 )
  last-name: 'WI'          // SyntaxError: Unexpected token ( 식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키 ( 따옴표를 사용하지 않을 경우 - 표현식으로 해석 ) )
};
```

<br>

- 프로퍼티에 문자열이나 심벌 값 외의 값을 사용하면 `암묵적 타입 변환` 을 통해 문자열이 된다.

```jsx
var foo = {
  0: 1,
  1: 2,
  2: 3,
};

console.log(foo); // { '0': 1, '1': 2, '2': 3 } << 키값이 문자열 형태로 암묵적 타입 변환
```

<br>

- 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다. ( 에러 발생하지 않음 )

```jsx
var foo = {
  name: "WIEEEE",
  name: "WI",
};

console.log(foo); // { name: 'WI' }
```

<br>
<br>

# 메서드

> 자바스크립트에서 `함수는 값으로 취급 가능` → 프로퍼티 값이 함수일 경우 `일반 함수` 와 구분하기 위해 `메서드(method)` 라 한다.

```jsx
var person = {
  // 프로퍼티
  name: "WI",

  // 메서드
  sayHello: function () {
    console.log(`Hello My name is ${this.name}`);
  },
};

person.sayHello(); // Hello My name is WI
```

<br>
<br>

# 프로퍼티 접근 방법

- `마침표(.)` 프로퍼티 접근 연산자를 사용하는 방법 → `마침표 표기법(dot notation)`
- `대괄호([...])` 프로퍼티 접근 연산자를 사용하는 방법 → `대괄호 표기법(bracket notation)`

```jsx
var person = {
  name: "WI",
};

console.log(person.name); // "WI" ( 마침표 표기법 )
console.log(person["name"]); // "WI" ( 대괄호 표기법 )

// 💩 대괄호 프로퍼티 접근 연산자 내에 문자열 형태가 아닌 프로퍼티 키로 사용하면 자바스크립트 엔진은 "식별자"로 해석
console.log(person[name]); // ReferenceError: name is not defined

// 💩 객체에 존재하지 않는 프로퍼티에 접근시 -> undefined
console.log(person.age); // undefined
```

<br>
<br>

# 프로퍼티 동적 생성 & 삭제

```jsx
var person = {
  name: "WI",
};

person.age = 100; // { age: 100 } 프로퍼티 동적 생성
console.log(person); // { name: 'WI', age: 100 }

delete person.age; // age 라는 프로퍼티 키가 있고 -> 해당 프로퍼티 삭제
delete person.job; // job 이라는 프로퍼티 키는 없음 -> 그럼에도 delete 연산시 에러 발생 X

console.log(person); // { name: 'WI' }
```

<br>
<br>

# ES6에서 추가된 객체 리터럴 확장 기능

### 객체 리터럴 내부에서 계산된 프로퍼티 이름

- `ES5`

```jsx
var prefix = "prop";
var i = 0;

var obj = {};

// "계산된 프로퍼티 이름"으로 프로퍼티 키 동적 생성
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }
```

- `ES6`

```jsx
const prefix = "prop";
let i = 0;

// "객체 리터럴 내부"에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // { 'prop-1': 1, 'prop-2': 2, 'prop-3': 3 }
```

<br>

### 메서드 축약 표현

- `ES5`

```jsx
var obj = {
  name: "WI",

  // 프로퍼티 값으로 "함수를 할당"
  sayHi: function () {
    console.log(`Hi! ${this.name}`);
  },
};

obj.sayHi(); // Hi! WI
```

- `ES6`
  - 단, `메서드 축약 표현` 으로 정의한 메서드는 `프로퍼티에 할당한 함수(ES5)` 와 다르게 동작한다.

```jsx
const obj = {
  name: "WI",

  // 메서드 축약 표현 ( 함수 선언식 필요 X )
  sayHi() {
    console.log(`Hi! ${this.name}`);
  },
};

obj.sayHi(); // Hi! WI
```
