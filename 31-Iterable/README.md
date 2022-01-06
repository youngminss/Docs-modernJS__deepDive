# 이터레이션 프로토콜

> `ES6에 도입`, `이터레이션 프로토콜(iteration protocol)`은 `순회 가능한(iterable) 데이터 콜렉션(자료구조)`을 만들기 위해 ECMAScript 사양에 정의하여 약속한 `규약`

- `ES6에서는 순회 가능한 데이터 컬렉션을` 이터레이션 프로토콜을 준수하는 `이터러블로 통일`
- `for - of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상`으로 사용할 수 있도록 일원화했다.
- 이터레이션 프로토콜에는 `이터러블 프로토콜`과 `이터레이션 프로토콜`이 존재

<br />

### 이터러블 프로토콜(iterable protocol)

- Well-known Symbol 인 `Symbol.iterator 를 프로퍼티 키로 사용한 메서드를 직접 구현`
- 또는, `프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 호출`하면 이터레이터 프로토콜을 준수한 `이터레이터를 반환하는 것`
- `이터러블 프로토콜을 준수한 객체를 이터러블이라한다.`
- 이터러블은 `for - of문, 스프트레드 문법, 배열 디스트럭처링 할당 문법을 사용할 수 있다.`

<br />

### 이터레이션 프로토콜(iteration protocol)

- 이터레이터는 `next 메서드를 소유`
  - next 메서드를 호출하면 `이터러블을 순회`하며 `value 와 done 프로퍼티`를 갖는 `이터레이터 리절트 객체를 반환`
- `이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다.`
- 이터레이터는 이터러블의 요소를 탐색하기 위한 `포인터 역할을 한다.`

<br />
<br />

# 이터러블

> `Symbol.iterator` 를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체

- 이터러블인지 확인하는 함수
  ```jsx
  // 이터러블 확인 함수
  // v가 비어있지 않고 Symbol.iterator 메서드 프로퍼티를 가지고 있는 이터러블이냐 ?
  const isIterable = (v) => v !== null && typeof v[Symbol.iterator] === "function";

  console.log(isIterable([])); // true
  console.log(isIterable("")); // true
  console.log(isIterable(new Map())); // true
  console.log(isIterable(new Set())); // true
  console.log(isIterable({})); // false (일반 객체는 기본적으로 이터러블 X)
  ```
- `일반 객체는` Symbol.iterator 메서드를 직접 구현하지 않거나 상속 받지 않기 때문에 `이터러블이 아니다.`
  - 즉, `for - of 문 같은 이터러블이 제공하는 기능을 사용하지 못한다.`
  ```jsx
  const obj = { a: 1, b: 2 };

  console.log(Symbol.iterator in obj); // false

  for (const iter of obj) {
    console.log(iter); // TypeError: obj is not iterable
  }
  ```
  - `(2021년 기준) 일반 객체에서도 스프레드 문법의 사용은 가능해졌다.`
  ```jsx
  const obj = { a: 1, b: 2 };

  // 객체 디스트럭처링
  const { a, b } = { ...obj };
  console.log(a, b); // 1 2
  ```

<br />
<br />

# 이터레이터

> 이터러블의 Symbol.iterator 메서드가 반환한 `이터레이터는 next메서드를 갖는다.`

- `next 메서드`는 이터러블의 각 요소를 순회하기 위한 `포인터 역할을 한다.`
  - 즉, `next 메서드를 호출`하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 `이터레이터 리절트 객체(iterator result object)를 반환`
  - 이터레이터 리절트 객체의 `value 프로퍼티는 현재 순회 중인 이터러블의 값`, `done 프로퍼티는 이터러블의 순회 완료 여부`를 나타낸다.

```jsx
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log("next" in iterator); // true

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

<br />
<br />

# 빌트인 이터러블

> 자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공

| 빌트인 이터러블                           | Symbol.iterator 메서드                |
| ----------------------------------------- | ------------------------------------- |
| Array                                     | Array.prototype[Symbol.iterator]      |
| String                                    | String.prototype[Symbol.iterator]     |
| Map                                       | Map.prototype[Symbol.iterator]        |
| Set                                       | Set.prototype[Symbol.iterator]        |
| TypedArray                                | TypedArray.prototype[Symbol.iterator] |
| arguments                                 | arguments.prototype[Symbol.iterator]  |
| DOM 컬렉션                                | NodeList.prototype[Symbol.iterator]   |
| HTMLCollection.prototype[Symbol.iterator] |

<br />
<br />

# for - of 문

> 이터러블을 순회하면서 이터러블의 요소를 변수에 할당

```jsx
for (변수선언문 of 이터러블) { ... }
```

- 내부적으로는 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next 메서드가 반환한 이터레이터 객체의 done 프로퍼티 값을 확인하며 순회
  - false 이면 → 이터러블 순회를 계속 진행
  - true 이면 → 이터러블 순회를 중단

```jsx
for (const iter of [1, 2, 3]) {
  console.log(iter); // 1 2 3
}
```

```jsx
// for문으로 구현한 for - of문
// 이터러블
const iterable = [1, 2, 3];

// 이터러블[Symbol.iterator] 메서드 호출 -> 이터레이터 생성
const iterator = iterable[Symbol.iterator]();

for (;;) {
  const res = iterator.next();

  if (res.done) break;

  const item = res.value;
  console.log(item); // 1 2 3
}
```

<br />
<br />

# 이터러블 유사 배열 객체

> `유사 배열 객체`는 이터러블이 아닌 `일반 객체다.`

- 즉, Symbol.iterator 메서드가 없기 때문에 `for - of 문 같은 이터러블 기능을 사용할 수 없다.`
  - 단, `arguments 객체`와 `HTMLCollection 객체`는 유사 배열 객체이면서 이터러블이다.
- 유사 배열 객체나 이터러블은 배열이 아니다.
  - `ES6`에 도입된 `Array.from 메서드`로 간단히 `배열로 변환 가능`
  - 인수로 유사 배열 객체나 이터러블을 전달하면 배열로 변환하여 반환한다.

```jsx
// 임의의 유사 배열 객체
let arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

// for (const item of arrayLike) {
//   console.log(arrayLike[item]);    // TypeError: arrayLike is not iterable
// }

arrayLike = Array.from(arrayLike);
console.log(arrayLike); // [1, 2, 3]
for (const el of arrayLike) {
  console.log(el); // 1, 2, 3
}
```

<br />
<br />

# 이터레이션 프로토콜의 필요성

> 이터레이션은 `데이터 소비자`와 `데이터 공급자`를 `연결하는 인터페이스의 역할`을 한다.

- 이터러블은 for - of 문, 스프레드 문법, 배열 디스트럭처링 할당과 같은 데이터 소비자(data consumer)에 의해 사용되므로 데이터 공급자(data provider)의 역할을 한다고 할 수 있다.
- 다양한 데이터 공급자가 각자의 순회 방식을 갖는다면 데이터 소비자 입장에서는 다양한 데이터 공급자의 순회 방식을 모두 지원해야 한다.
- 하지만, 데이터 공급자가 `이터레이션 프로토콜을 준수하도록 규정하면` 데이터 소비자는 `이터레이션 프로토콜만 지원하도록 구현하면 된다.`
  - 데이터 소비자는 Symbol.iterator 메서드를 호출해 이터레이터를 생성
  - next 메서드를 호출하여 이터러블 순회하며, 이터레이터 리절트 객체를 반환
  - 이터레이터 리절트 객체의 value/done 프로퍼티 값을 취득하는 프로세스

![https://poiemaweb.com/img/iteration-protocol-interface.png](https://poiemaweb.com/img/iteration-protocol-interface.png)

<br />
<br />

# 사용자 정의 이터러블

### 사용자 정의 이터러블 구현

- `일반 객체`도 `이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다.`
  - Symbol.iterator 메서드를 구현하고 Symbol.iterator 메서드가 next 메서드를 갖는 이터레이터를 반환하도록 한다.
  - next 메서드는 done 과 value 프로퍼티를 가지는 이터레이터 리절트 객체를 반환

```jsx
// "피보나치 수열"을 통한 이터러블 예제
// 사용자 정의 이터러블 구현
const fibo = {
  // Symbol.iterator 메서드를 직접 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 한다.
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        // 이터레이터 리절트 객체를 반환
        return { value: cur, done: cur >= max };
      },
    };
  },
};

for (const num of fibo) {
  console.log(num); // 1 2 3 5 8
}
```

<br />

### 이터러블을 생성하는 함수

```jsx
// "피보나치 수열"을 통한 이터러블 예제
// 사용자 정의 이터러블 -> 이터러블을 생성하는 함수
const fibo = (max) => {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드를 구현한 이터러블 반환
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

for (const num of fibo(15)) {
  console.log(num); // 1 2 3 5 8 13
}
```

<br />

### 이터러블이면서 이터레이터인 객체를 생성하는 함수

```jsx
const fibo = (max) => {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드를 구현한 이터러블 반환
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

const iterable = fibo(5); // 이터러블 반환
const iterator = iterable[Symbol.iterator](); // 이터레이터 반환

while (true) {
  let next = iterator.next();

  if (next.done) break;

  console.log(next.value); // 1 2 3
}
```

- `이터러블이면서 이터레이터인 객체를 생성`하면 `Symbol.iterator 메서드를 호출하지 않아도 된다.`

```jsx
const fibo = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터인 객체를 반환
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

let iter = fibo(10); // 이터러블이면서 이터레이터

for (const num of iter) {
  console.log(num); // 1 2 3 5 8
}

iter = fibo(10); // 이터러블 재할당으로 초기화 됨
while (true) {
  let next = iter.next();

  if (next.done) break;

  console.log(next.value); // 1 2 3 5 8
}
```

<br />

### 무한 이터러블과 지연 평가

- `배열`이나 `문자열 등`은 모든 데이터를 `메모리에 미리 확보한 다음 데이터를 공급`한다.

> 반면, `이터러블`은 `지연 평가(lazy evaluation)를 통해 데이터를 생성한다.`

- 지연 평가란 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 `데이터가 필요한 시점이 되면 그때야 비로소 데이터를 생성하는 기법`
  - 즉, 평가 결과가 필요할 때까지 평가를 늦추는 기법을 의미
- 지연 평가를 사용하면 `불필요한 데이터를 미리 생성하지 않고 필요한 데이터를 필요한 순간에 생성`하므로
  - `빠른 실행 속도`를 기대할 수 있고 `불필요한 메모리를 소비하지 않으며 무한도 표현할 수 있다는 장점`이 있다.

```jsx
const fibo = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur }; // done 프로퍼티를 제거하므로써 무한 이터러블 구현 ( done 생략 시, default = false )
    },
  };
};

for (const num of fibo()) {
  if (num > 100) break;
  console.log(num); // 1 2 3 5 8 13 21 ... 89
}

const [f1, f2, f3] = fibo();
console.log(f1, f2, f3); // 1 2 3
```
