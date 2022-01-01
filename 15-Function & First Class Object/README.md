# 일급 객체

다음 조건을 만족하는 객체는 `일급 객체` 라고 한다.

- 무명의 리터럴로 생성할 수 있다. 즉, `런타임에 생성이 가능하다.`
- `변수나 자료구조(객체, 배열 등)에 저장할 수 있다.`
- `함수의 매객변수에 전달할 수 있다.`
- `함수의 반환값으로 사용할 수 있다.`

```jsx
// 함수는 무명 리터럴로 생성가능
// 함수는 변수에 저장 가능
// 런타임 시점에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당 된다.(정확히는 함수 객체의 참조값이 할당 된다.)
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 함수는 객체에 저장할 수 있다.
const predicate = { increase, decrease };

// 함수는 매개변수(= 파라미터, parameter)에 전달할 수 있다.
// 함수는 함수의 반환 값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 함수는 인수로 함수를 전달할 수 있다.
const increaser = makeCounter(predicate.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(predicate.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

일급 객체로써 함수가 가지는 가장 큰 특징

- 일반 객체와 같이 `함수를 함수의 매개변수에 전달`할 수 있다.
- 함수의 `반환값으로 함수를 사용`할 수 있다.
- 다음 2가지가 자바스크립트의 함수형 프로그래밍을 가능케하는 장점 중 하나
- 추가적으로, 일반 객체는 호출할 수 없지만 함수 객체는 호출이 가능하며, 함수 객체는 고유의 프로퍼티를 소유한다.

<br />
<br />

# 함수 객체의 프로퍼티

> `함수도 객체(object)다`. 따라서 `함수도 프로퍼티를 가질 수 있다.`

<br />

### arguments 프로퍼티

> `arguments 객체` 는 함수 호출 시 `전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체`이다.

- 함수 내부에서 지역 변수처럼 사용할 수 있는 `arguments 객체를 참조`
- 자바스크립트에서는 함수의 매개변수(parameter)와 인수(argument)의 개수가 일치하는지 확인하지 않는다.
  - 따라서, 함수 호출 시 매개변수 수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.
  - 이는, 함수를 정의할 때 선언한 매개변수는 함수가 호출되면 함수 몸체 내에서 암묵적으로 선언되고 `undefined` 로 초기화된 후, 인수가 할당되기 때문
- 매개변수보다 인수(argument)를 많이 전달했을 경우, 초과된 인수는 무시되지 않고, `arguments 객체의 프로퍼티에 보관`
  - `arguments 객체`는 기본적으로 `length` 프로퍼티를 지원한다.
  - 여기서 `length는 인수(argument)의 개수이다.`
  - `length 프로퍼티` 를 사용할 수 있는 이유는 `arguments 객체` 가 `유사 배열 객체(array-like object)` 이기 때문이다.
    - 유사 배열 객체란 `length 프로퍼티` 를 가지는 객체로, `for 문` 같은 반복문으로 순회가능하다.
- `arguments 객체` 는 매개변수 개수를 확정할 수 없는 `가변 인자 함수` 를 구현할 때 유용하다.

```jsx
function multiply(x, y) {
  console.log(arguments);
  console.log(`length : ${arguments.length}`);
  return x + y;
}

console.log(multiply());
/*
[Arguments] {}
length : 0
NaN
*/

console.log(multiply(1));
/*
[Arguments] { '0': 1 }
length : 1
NaN
*/

console.log(multiply(1, 2));
/*
[Arguments] { '0': 1, '1': 2 }
length : 2
3
*/

console.log(multiply(1, 2, 3, 4, 5));
/*
[Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
length : 5
3 
*/
```

- `arguments 객체` 는 유사 배열 객체이지, 배열 그 자체는 아니다.
  - 따라서, 배열 메서드를 사용할 경우 에러가 발생한다.
  - 이것을 보완할 방법으로 `ES6` 부터 `Rest 파라미터` 가 도입되었다.
  - Rest 파라미터를 통해 `배열 메서드를 적용할 수 있다.`

```jsx
// ES6 Rest Parameter
// argument 객체를 실제 "배열"처럼 사용할 수 있다.
function sum(...args) {
  console.log(args, Array.isArray(args));
  return args.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum());
/*
[] true
0
*/

console.log(sum(1, 2));
/*
[ 1, 2 ] true
3
*/

console.log(sum(1, 2, 3, 4, 5));
/*
[ 1, 2, 3, 4, 5 ] true
15
*/
```

<br />

### length 프로퍼티

> 함수 객체의 `length 프로퍼티` 는 함수를 정의할 때 `선언한 매개변수의 개수` 를 가리킨다.

- 주의할 점은 `arguments 객체` 의 `length 프로퍼티` ≠ 함수 객체의 `length 프로퍼티`
  - `argument 객체의 length 프로퍼티` = `인수(argument)의 개수`
  - `함수 객체의 length 프로퍼티` = `매개변수(parameter)의 개수`

```jsx
function add(x, y) {
  console.log(`add 함수 객체의 length : ${add.length}, arguments 객체의 length : ${arguments.length}`);
  return x + y;
}

console.log(add());
/*
add 함수 객체의 length : 2, arguments 객체의 length : 0
NaN
*/
console.log(add(1, 2));
/*
add 함수 객체의 length : 2, arguments 객체의 length : 2
3
*/
console.log(add(1, 2, 3, 4, 5));
/*
add 함수 객체의 length : 2, arguments 객체의 length : 5
3
*/
```

<br />

### name 프로퍼티

> 함수 객체의 `name 프로퍼티` 는 `함수 이름` 을 나타낸다.

- 익명 함수의 경우
  - `ES5` 에서는 → `빈 문자열('')`
  - `ES6` 에서는 → `함수 객체를 가리키는 식별자` 를 나타낸다.

```jsx
// 함수 객체 name 프로퍼티 - 기명 함수 표현식
const namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 함수 객체 name 프로퍼티 - 무명 함수 표현식 🔍
// - ES5 에서는 빈 문자열('')
// - ES6 에서는 함수 객체를 가리키는 식별자
const anonymousFunc = function () {};
console.log(anonymousFunc.name); // anonymousFunc

function bar() {}
console.log(bar.name); // bar
```

<br />

### **proto** 접근자 프로퍼티

- 모든 객체는 `[[ Prototype ]]` 이라는 내부 슬롯을 갖는다.
- `[[ Prototype ]]` 내부 슬롯은 `Prototype 객체를 가리킨다.`

> `__proto__` 프로퍼티는 `[[ Prototype ]]` 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 `접근자 프로퍼티`

- 즉, 이 프로퍼티에 직접 접근할 수는 없고, 간접적인 방법으로 프로토타입에 접근할 수 있다.

```jsx
const obj = { a: 1 };

console.log(obj.__proto__ === Object.prototype); // true  (객체 리터럴 형태로 생성한 객체의 프로토타입 객체는 Object.prototype)

console.log(obj.hasOwnProperty("a")); // true  (obj 객체에는 a 프로퍼티가 있으니깐 true)
console.log(obj.hasOwnProperty("__proto__")); // false (__proto__ 접근자 프로퍼티는 직접 접근할 수 있는 프로퍼티가 아니므로 false)
```

<br />

### prototype 프로퍼티

> `prototype` 프로퍼티는 `생성자 함수로 호출할 수 있는 함수 객체` , 즉 `constructor` 만이 소유하는 프로퍼티

- 일반 객체나 `non-constructor` 에는 `prototype 프로퍼티가 없다.`

```jsx
console.log(function () {}.hasOwnProperty("prototype")); // true  (함수 객체는 prototype 프로퍼티를 소유)
console.log({}.hasOwnProperty("prototype")); // false (일반 객체는 prototype 프로퍼티를 소유하지 X)
```
