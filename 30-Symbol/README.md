> `심벌(Symbol)` : ES6에 도입된 7번째 데이터 타입

- 변경 불가능한 원시 타입의 값
- 다른 값과 중복되지 않은 유일무이한 값
  - 따라서, 이름 충돌 위험이 없는 프로퍼티 키를 만들기 위해 주로 사용

<br />
<br />

# Symbol 값의 생성

### Symbol 함수

> 심벌 값은 `Symbol 함수를 호출하여 생성`

- 기존 다른 원시값들 ( Number, String, Boolean .. ) 처럼 리터럴 표기법을 통해 값을 생성할 순 없다.
  - 오로지 Symbol 함수를 호출하여 생성한다.
  - 생성한 심벌 값은 외부로 노출되지 않는다.
  - 또한 `다른 값과 절대 중복되지 않는 유일무이한 값이다.`
  ```jsx
  // 심벌 값 생성 - Symbol 함수
  const symbol = Symbol();
  console.log(typeof symbol); // symbol

  // 심벌 값은 외부로 노출되지 않아 확인 불가
  console.log(symbol); // Symbol()
  ```
- 생성자 함수가 아니기 때문에 `new 연산자와 함께 호출되지 않는다.`
  - new 연산자와 함께 호출 시 `TypeError 발생`
  ```jsx
  console.log(new Symbol()); // TypeError: Symbol is not a constructor
  ```
- 선택적으로 `문자열을 인수로 전달 가능`
  - 이 때 문자열은 `심벌 값에 대한 설명(description)으로 디버깅 용도로만 사용`
  - `심벌 값 생성에 어떠한 영향도 주지 않는다.`
  - 즉, 심벌 값에 대한 설명이 같더라도 생성된 심벌 값은 유일무이하다.
  ```jsx
  const symbol1 = Symbol("symbol1");
  const symbol2 = Symbol("symbol1");

  console.log(symbol1 === symbol2); // false
  console.log(symbol1.description === symbol2.description); // true
  console.log(symbol1, symbol2); // Symbol(symbol1) Symbol(symbol1)
  ```
- 심벌 값도 객체처럼 접근하면 암묵적으로 `래퍼 객체를 생성`
  ```jsx
  const mySymbol = Symbol("mySymbol");

  // 심벌 값도 객체처럼 사용 시 래퍼 객체를 생성
  console.log(mySymbol.description); // mySymbol
  console.log(mySymbol.toString()); // Symbol(mySymbol)
  ```
- 암묵적으로 타입 변환이 되지 않는다.
  - 단, `불리언 타입으로는 암묵적으로 타입 변환된다.`
  ```jsx
  const mySymbol = Symbol();

  console.log(!!mySymbol); // true
  console.log(mySymbol + ""); // TypeError: Cannot convert a Symbol value to a string
  ```

<br />

### Symbol.for 메서드

> 인수로 전달받은 `문자열을 키로 사용`하여 { 키 : 심벌 값 }의 쌍들이 저장되어 있는 `전역 심벌 레지스트리(global symbol registry)`에서 `해당 키와 일치하는 심벌 값을 검색`

- 검색에 `성공` → `검색된 심벌 값을 반환`
- 검색에 `실패` → `새로운 심벌 값을 생성`하여 Symbol.for 메서드의 인수로 전달된 키로 `전역 심벌 레지스트리에 저장`된 후, `생성된 심벌 값을 반환`
- 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 `전역 심벌 레지스트리를 통해 공유`

```jsx
const symbol1 = Symbol.for("symbol");
const symbol2 = Symbol.for("symbol");

// 상단에서 symbol 이름의 심벌 값을 symbol1 생성시 이미 전역 심벌 레지스트리에 등록했다.
// symbol2 에서 Symbol.for 호출할 경우, 이미 전역 심벌 레지스트리에는 symbol 이라는 이름을 키로 가지는 심벌 값이 존재한다.
// 따라서, symbol1 과 symbol2 에 할당된 심벌 값은 같은 심벌 값이다.
console.log(symbol1 === symbol2); // true
```

<br />

### Symbol.keyFor 메서드

> 전역 심벌 레지스트리에 저장된 `심벌 값의 키를 추출 가능`

```jsx
// Symbol.for 메서드롤 생성된 심벌 값은 전역 심벌 레지스트리에 존재하지 않을 경우 생성 후 등록되어 관리된다.
const symbol1 = Symbol.for("symbol1");
console.log(Symbol.keyFor(symbol1)); // symbol1

// Symbol 함수로 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const symbol2 = Symbol("symbol2");
console.log(Symbol.keyFor(symbol2)); // undefined
```

<br />
<br />

# Symbol 과 상수

- 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우 → 다른 변수 값과 `중복`될 수도 있다는 단점
  - `변경/중복될 가능성 있는 무의미한 상수` → `중복될 가능성이 없는 유일무이한 심벌 값을 사용 가능`

```jsx
// { 키: 값(상수) } 형태로 4방향을 의미하는 Direction 객체
// 1,2,3,4 라는 상수는 특별한 의미도 없고, 이후 다른 변수에 값과 중복될 가능성이 크다.
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

// { 키 : 값(심벌 값) } 형태로 변경한 Direction 객체
// 키의 값들이 심벌 값으로, 중복될 가능성이 없는 상수 값이 되었다.
const Direction = {
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};
```

```jsx
[ 💡 enum(enumerated type) ]

+ 명명된 숫자 상수(named numeric constant)의 집합, "열거형" 이라고 부른다.
+ 자바스크립트는 enum을 지원 X ( 타입스크립트에서는 enum을 지원 O )
+ 자바스크립트에서 enum을 흉내 내어 사용하려면 객체의 변경을 방지하기 위해 객체를 동결하는 Object.freeze 메서드와 심벌 값을 사용
```

<br />
<br />

# Symbol 과 프로퍼티 키

> 프로퍼티 키는 `빈 문자열을 포함하는 모든 문자열` 또는 `심벌 값`으로 만들 수 있으며, `동적으로 생성도 가능`

- 심벌 값으로 프로퍼티 키를 사용 → 프로퍼티 키로 사용할 심벌 값에 `대괄호([])를 사용`
- 프로퍼티 키에 접근 시에도 → `대괄호([])를 사용`
- 심벌 값은 유일무이한 값으로 심벌 값으로 프로퍼티 키를 만들면 `다른 프로퍼티 키와 절대 충돌하지 않는다.`
  - 기존 프로퍼티 & 미래에 추가될 프로퍼티 키와도 충돌되지 않음을 의미 → `호환성 보장`을 위해 사용됨

```jsx
const obj = {
  [Symbol.for("mySymbol")]: 1,
};

console.log(obj[Symbol.for("mySymbol")]); // 1
console.log(obj.mySymbol); // undefined
```

<br />
<br />

# Symbol 과 프로퍼티 은닉

> 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `외부로 노출되지 않는다.`

- `for - in문, Object.keys, Object.getOwnPropertyNames` 메서드 등으로는 찾을 수 없다.
  - 단, `ES6`에 도입된 `Object.getOwnPropetySymbols` 메서드를 사용하면 `심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.`

```jsx
const obj = {
  [Symbol.for("mySymbol")]: 1,
};

for (const key in obj) {
  console.log(key); //
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(mySymbol) ]
```

<br />
<br />

# Symbol 과 빌트인 객체 확장

> 일반적으로, 표준 빌트인 객체에 사용자 정의 메서드를 `직접 추가하는 것은 권장하지 않는 방식`

- 왜냐하면, 미래에 추가될 표준 사양 메서드의 이름과 `중복`될 수 있기 때문
- 하지만, `중복될 가능성이 없는 심벌 값`으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면, `기존 프로퍼티 키와 충돌되지 않는 것을 보장하기 때문에 문제없다.`

```jsx
// Array 표준 빌트인 객체에 메서드를 추가하여 확장하는 것 => 권장 X
Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
}[(1, 2, 3)].sum(); // 6

// 심벌 값으로 프로퍼티 키를 갖는 메서드로 확장하는 경우 => 호환성 측면에서 O
Array.prototype[Symbol.for("sum")] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
}[
  // 단, 호출 시에 어색한 상황이 연출
  (1, 2, 3)
][Symbol.for("sum")](); // 6
```

<br />
<br />

# Well-known Symbol

> 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 `Well-known Symbol` 이라 부른다.

- 이는, 자바스크립트 엔진 내부 알고리즘에 사용된다.
- for - of 문으로 순회 가능한 이터러블은 Well-known Symbol 인 `Symbol.iterator를 키로 갖는 메서드를 가진다.`
  - `Symbol.iterator 메서드를 호출` → `이터레이터를 반환 ( 이터레이션 프로토콜 )`
- 만약, 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다.
  - 즉, Symbol.iterator 를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면, 그 객체를 이터러블이 된다.

```jsx
const iterable = {
  // Symbol.itertor 메서드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 한다.
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) {
  console.log(num); // 1 2 3 4 5
}
```
