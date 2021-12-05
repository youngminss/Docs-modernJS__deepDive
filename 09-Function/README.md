# 함수를 사용하는 이유

- `코드의 재사용`
  - 동일한 작업을 반복적으로 수행하는 코드를 함수로 만들어 사용하는 것이 효율적이다.
- `유지보수 편의성 & 코드의 신뢰성`
  - 같은 코드의 중복으로 인한 수정에 걸리는 시간과 사람의 실수를 억제하고 재사용성을 높일 수 있다.
- `코드의 가독성`
  - 함수는 `객체 타입의 값` 이다.
  - 적절한 함수 이름은 함수 내부 코드를 이해하지 않고도 함수의 역할을 파악할 수 있게 돕고, 이는 코드의 가독성을 향상시킨다.

<br />

> 함수도 `객체(object)` 다.

```jsx
// 변수에 "함수 리터럴"을 할당
var f = function add(x, y) {
  return x + y;
};
```

- 앞에서 `리터럴(literal)` 은 문자 or 약속된 기호를 사용해 `값을 생성`하는 표기 방식이라 했다.
- 위에 코드는 `함수 리터럴` 을 변수에 할당 한 것이다.
  - 즉, 함수 리터럴도 `평가되어 값을 생성` 하며, 이 값은 `객체(object)` 다.
  - 즉, `함수는 객체다.`
  - 단, 함수는 `일반 객체` 와는 다르다. ( `일급객체` )
    - 일반 객체 → 호출 X
    - 함수 → 호출 O

<br />

<br />

# 함수 정의

> 자바스크립트에서 함수를 정의하는 방법에는 `4가지`가 있다.

- 정의된 함수는 자바스크립트 엔진에 의해 평가되어 `함수 객체가 된다.`

1. `함수 선언문`

```jsx
function add(x, y) {
  return x + y;
}
```

1. `함수 표현식`

```jsx
var add = function (x, y) {
  return x + y;
};
```

1. `화살표 함수(ES6)`

```jsx
var add = (x, y) => x + y;
```

1. `Function 생성자 함수`

```jsx
var add = new Function("x", "y", "return x + y");
```

```
+ "변수" -> 선언(declaration)한다.
+ "함수" -> 정의(definition)한다.
```

<br />

### 코드의 문맥에 따른 자바스크립트 엔진의 함수 해석

> 자바스크립트 엔진은 `코드의 문맥` 에 따라 동일한 함수 리터럴을 함수 표현식 or 함수 선언문으로 해석하는 경우가 있다.

- `{ }` 은 `코드 블록` 일 수도 있고, `객체 리터럴` 일 수도 있다. → `{ }은 중의적 표현`
  - `{ }` 이 `단독`으로 존재 → 자바스크립트 엔진은 `{ } 을 블록문으로 해석`
  - `{ }` 이 `값으로 평가`되어야 할 문맥에서 `피연산자` 로 사용될 경우 → 자바스크립트 엔진은 `{ }을 객체 리터럴로 해석`
- 함수도 이와 같다.
  - `함수 리터럴` 이 단독으로 사용된다. → `함수 선언문`으로 해석
  - `함수 리터럴` 이 값으로 평가되어야 하는(변수에 할당 or 피연산자로..) 문맥 → `함수 리터럴 표현식` 으로 해석

# 함수 선언문과 함수 리터럴 표현식

> 이 둘은 함수가 생성되는 것은 동일, 다만 `호출에서 차이가 있다.`

```jsx
// 1️⃣ 함수 선언문으로 함수 호출
function foo() {
  console.log("foo"); // foo
}
foo();

// 2️⃣ 함수 리터럴 표현식으로 함수 호출
(function bar() {
  console.log("bar"); // ReferenceError: bar is not defined
});
bar();
```

### 함수 리터럴

> 함수 이름은 `함수 몸체 내에서만 참조할 수 있는 식별자다.`

- 함수 몸체 외부에서는 함수 이름으로 `함수를 참조할 수 없다.` = 함수 몸체 외부에서는 함수 이름으로 `함수를 호출할 수 없다.`
- 즉, 함수를 가리키는 `식별자가 없다는 것과 같은 의미`

1️⃣ 함수 리터럴 표현식으로 함수 호출 시 메모리 구조

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fs0kP8%2FbtrmFokNtjQ%2FhAcXV05B1iZKuTkFCv1uwk%2Fimg.png)

2️⃣ 함수 선언문으로 함수 호출 시 메모리 구조

- 자바스크립트 엔진은 `함수 선언문을 해석해 함수 객체를 생성`
- 생성된 함수 객체를 가리키는 `유효한 식별자가 필요`
- 따라서, 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 `암묵적으로 생성하고, 거기에 함수 객체를 할당한다.`

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmPSbv%2FbtrmCDb8XWF%2FxG62C25YGR06nK0q64sIt0%2Fimg.png)

> 결국, 함수는 함수 이름으로 호출하는 것이 아니라, `함수 객체를 가리키는 식별자로 호출하는 것이다.`

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrJRks%2FbtrmCCK4o7a%2FwpRrPGMlpdm7kxBnk96uUK%2Fimg.png)

- 위 코드는 `함수 표현식` 이다.

```jsx
💡 결론적으로, 자바스크립트 엔진은 "함수 선언문"을 "함수 표현식으로 변환" → "함수 객체를 생성"
```

<br />
<br />

# 함수 호출 & 반환문

- 함수의 `매개변수(parameter)` 는 함수 몸체 내부에서만 참조할 수 있다. 즉, `매개변수의 스코프(유효 범위)는 함수 내부다.`
- 함수는 매겨변수의 개수와 인수(argument)의 개수가 일치하지 않아도 된다.
  - 인수가 매개변수보다 부족하면, 나머지 매개변수에 대해서는 `암묵적으로 undefined`
  - 인수가 매개변수보다 많으면, 모든 인수는 `암묵적으로 arguments 객체에 프로퍼티로 보관`

```jsx
function add(x, y) {
  console.log(x, y); // 1 2
  return x + y;
}

add(1, 2);
console.log(x, y); // 💩 ReferenceError: x is not defined

// 매개변수의 개수 > 인수의 개수 = 나머지 매개변수 undefined
function mul(x, y) {
  console.log(x, y); // 1 undefined
}
mul(1);

// 매개변수의 개수 < 인수의 개수 = arguments 에 보관
function sub(x, y) {
  console.log(arguments); // [Arguments] { '0': 3, '1': 2, '2': 1 }
  return x - y;
}
sub(3, 2, 1); // 1
```

<br />

### 자바스크립트 문법상의 문제

```
1️⃣ 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
2️⃣ 자바스크립트는 "동적 타입 언어"다. 따라서 자바스크립트 함수는 매개변수의 "타입을 사전에 지정할 수 없다."
```

- 따라서, 자바스크립트의 경우 `함수를 정의할 때, 인수가 전달되었는지 확인할 필요가 있다.`
  1. `typeof 연산자` 를 사용하는 방법
  2. 인수가 전달되지 않은 경우 `단축 평가` 를 사용하는 방법
  3. `매개변수에 기본값(default value)` 을 할당하는 방법
  4. `정적 타입 선언` 이 가능한 `Typescript` 사용하는 방법

```jsx
// 1️⃣ typeof 연산자로 arguments 문제 방지
function add(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("인수는 모두 숫자(number)값 이어야 합니다.");
  }

  return x + y;
}
console.log(add(1, 2)); // 3
console.log(add(2)); // TypeError: 인수는 모두 숫자(number)값 이어야 합니다.
console.log(add("a", "b")); // TypeError: 인수는 모두 숫자(number)값 이어야 합니다.

// 2️⃣ "단축 평가"로 arguments 문제 방지
function mul(a, b, c) {
  a = a || 1;
  b = b || 1;
  c = c || 1;

  return a * b * c;
}
console.log(mul(1, 2, 3)); // 6
console.log(mul(1, 2)); // 2
console.log(mul(1)); // 1
console.log(mul()); // 1

// 3️⃣ parameter default value 설정으로 argument 문제 방지
function sub(a = 0, b = 0) {
  return a - b;
}
console.log(sub(10, 9)); // 1
console.log(sub(10)); // 10
console.log(sub()); // 0
```

<br />
<br />

# 값에 의한 호출 vs 참조에 의한 호출

- `값에 의한 호출(call by value)` : 함수 호출시 매개변수에 `원시 값(primitive value)을 전달`
- `참조에 의한 호출(call by reference)` : 함수 호출시 매개변수에 `객체(object) 를 전달`

<br />

### 값에 의한 호출

- 원시 값은 `변경 불가능한 값(immutable value)` 성질
- 즉, 원시 타입의 argument 는 `값 자체가 복사되어 매개변수에 전달`
- 이 값을 변경(재할당을 통한 변경)해도 `원본은 훼손되지 않는다. ( side effect X )`

<br />

### 참조에 의한 호출

- 객체는 `변경 가능한 값(mutable value)` 성질
- 즉, 객체 argument 는 `참조 값이 복사되어 매개변수에 전달`
- 참조 값을 통해 전달한 객체를 변경할 경우 `원본이 훼손된다. ( side effect O )`

```
[ 💩 참조에 의한 호출의 문제점 ]

= 객체가 변경될 수 있기 때문에 "상태 변화 추적"이 어렵다.
```

```jsx
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = "WIEEE";
}

// 외부 상태
var num = 100; // 원시 값
var person = { name: "WI" }; // 객체

console.log(num); // 100
console.log(person); // { name: 'WI' }

changeVal(num, person);

console.log(num); // 100
console.log(person); // { name: 'WIEEE' } 💩
```

![원시 값 전달과 참조 값 전달](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgAgqP%2FbtrmEi0ScBA%2FwrhIYb7DMZRfh5wWQqoKMK%2Fimg.png)

- 해결 방법 중
  - 객체를 `불변 객체(immutable object)` 로 만들어 사용하는 것
    - 객체의 복사본을 새롭게 생성하는 것은 비용(cost)이 원본 객체 규모에 따라 커질 수 있다.
    - 하지만, 객체를 마치 원시 값처럼 변경 불가능한 값으로 동작하게 만들 수 있다.
    - 방법으로는 `깊은 복사(deep copy)` 를 통해 새로운 객체를 생성하고 재할당한다. → `side effect X`

```jsx
[ 💡 순수 함수 ]

+ 외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 "순수 함수"
+ 순수 함수를 통해 부수효과(side effect)를 최대한 억제하고 오류를 피해 프로그램 안정성을 높인다. = "함수형 프로그래밍"
```

<br />
<br />

# 여러가지 함수

- `즉시 실행 함수(IIFE, Immediately Invoked Function Expression)`
  > 함수 정의와 동시에 즉시 호출되는 함수
  - 즉시 실행 함수는 `반드시 그룹 연산자( ... )로 감싸야 한다.`
  - 즉시 실행 함수는 `함수 이름이 없는 익명 함수를 사용하는 것이 일반적`
  ```jsx
  // 즉시 실행 함수 - 일반적인 방식
  (function () {
    /// ...
  })();
  ```
- `재귀 함수(recursive function)`
- `중첩 함수(nested function) == 내부 함수(inner function)`

  > 함수 내부에 정의된 함수 ( 중첩 함수를 포함하는 함수 = 외부 함수(outer function) )

  - 중첩 함수는 외부 함수 내부에서만 호출할 수 있다.
  - 중첩 함수는 자신을 포함하는 외부 함수를 돕는 `헬퍼 함수(helper function)` 역할을 한다.

  ```jsx
  function outer() {
    var x = 1;

    // 중첩 함수 == 내부 함수
    function inner() {
      var y = 2;

      // 외부 함수의 변수 참조
      console.log(x + y); // 3
    }

    inner();
  }

  outer();
  ```

- `콜백 함수(callback function)`

  > 함수의 매개변수(parameter)를 통해 다른 함수의 내부로 전달되는 함수

  - 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 `고차 함수(Higher-Order Function, HOF)` 라고 한다.
  - 콜백 함수는 고차 함수에 의해 호출된다.
  - 고차 함수는 필요에 따라 콜백 함수에 인수(argument)를 전달할 수 있다. → 그렇기 때문에 고차함수에 콜백함수 전달 시 `콜백 함수를 호출하지 않고 함수 자체를 전달해야 함`
  - 함수는 `일급 객체` 이므로 함수의 매개변수를 통해 함수를 전달 가능
  - 그로인해, `함수는 더 이상 내부로직에 강력히 의존하지 않고 외부에서 로직의 일부분을 함수로 전달받아 수행하므로 유연한 구조를 갖는다.`

  ```jsx
  // 외부에서 전달받은 func 를 n 만큼 반복 호출 - 고차 함수 repeat
  function repeat(n, f) {
    for (var i = 0; i < n; i++) {
      f(i);
    }
  }

  // 콜백 함수 정의 - logAll
  var logAll = function (i) {
    console.log(i);
  };

  // 반복 호출할 함수를 인수로 전달
  repeat(5, logAll); // 0 1 2 3 4

  // 콜백 함수 정의 - logOdd
  var logOdd = function (i) {
    if (i % 2) console.log(i);
  };

  // 반복 호출할 함수를 인수로 전달
  repeat(5, logOdd); // 1 3
  ```
