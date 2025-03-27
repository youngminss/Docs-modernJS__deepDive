# 클로저(Closure)

> `클로저(closure)` 는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

<br />
<br />

# 렉시컬 스코프

> `렉시컬 스코프(정적 스코프)` 는 함수를 어디서 호출했는지가 아니라 `어디에 정의했는지` 에 따라 상위 스코프를 결정하는 것이다.

```jsx
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

- 위 예제의 bar 함수는 전역에서 정의되었기 때문에 전역 스코프를 상위 스코프로 가진다.
- 따라서 bar 함수 내부에서 x 변수를 참조할 때 전역 변수 x를 참조한다.
- 이처럼 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않는다.

<br />
<br />

# 함수 객체의 내부 슬롯 [[Environment]]

> 함수는 자신의 내부 슬롯 `[[Environment]]` 에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

```jsx
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 전역에서 정의된 함수
function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

- 함수 객체의 내부 슬롯 `[[Environment]]` 에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프다.
- 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값이다.
- 함수 객체는 내부 슬롯 `[[Environment]]` 에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.

<br />
<br />

# 클로저와 렉시컬 환경

```jsx
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

- 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.
- 이러한 중첩 함수를 `클로저(closure)` 라고 부른다.
- 클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.

<br />
<br />

# 클로저의 활용

> 클로저는 상태(state)를 안전하게 변경하고 유지하기 위해 사용한다.

```jsx
// 카운트 상태 변경 함수
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    }
  };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

- 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.

<br />
<br />

# 캡슐화와 정보 은닉

> `캡슐화(encapsulation)` 는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.

```jsx
function Person(name, age) {
  this.name = name; // public
  let _age = age;   // private

  // 인스턴스 메서드
  this.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

- 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 `정보 은닉(information hiding)` 이라 한다.
- 자바스크립트는 접근 제한자를 제공하지 않지만 클로저를 사용하면 정보 은닉이 가능하다.

<br />
<br />

# 자주 발생하는 실수

> 클로저를 사용할 때 자주 발생할 수 있는 실수를 알아보자.

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () { return i; }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}
```

- 위 예제는 배열 funcs의 요소로 추가된 3개의 함수가 0, 1, 2를 반환할 것으로 기대하지만 결과는 3, 3, 3을 출력한다.
- 이는 `var` 키워드로 선언한 변수가 함수 레벨 스코프를 갖기 때문이다.
- 해결 방법은 다음과 같다:

1. `let` 키워드 사용
```jsx
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () { return i; };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2
}
```

2. 고차 함수 사용
```jsx
const funcs = Array.from(new Array(3), (_, i) => () => i);

funcs.forEach(f => console.log(f())); // 0 1 2
```