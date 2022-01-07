> `ES6`에 도입, `스프레드 문법(spread syntax)`은 하나로 뭉쳐 있는 `여러 값들의 집합을 전개해서 개별적인 값들의 목록으로 만든다.`

- 스프레드 문법은 `이터러블에 한정`
  - 즉, `Array, String, Map, Set, DOM 컬렉션, arguments` 이 스프레드 문법 가능

<br />

> 스프레드 문법은 `개별적인 값들의 목록을 반환`

- 즉, 스프레드 문법의 결과는 `값이 아니다.`
  - 따라서, `스프레드 문법의 결과를 변수에 할당할 순 없다.`
- `쉼표(,)`로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능하다.
  - `함수 호출문의 인수 목록`
  - `배열 리터럴의 요소 목록`
  - `객체 리터럴의 프로퍼티 목록`

<br />
<br />

# 함수 호출문의 인수 목록에서 스프레드 문법

- 가변 인자 함수는 매개변수 개수를 확정할 수 없다.
  - 대표적인 예시 중 Math.max 메서드
    - 배열 자체를 인수로 넘기면 최대값을 구할 수 없어 NaN 반환
      ```jsx
      const arr = [1, 2, 3];

      // Math.max 메서드 -> 배열을 인수로 전달
      console.log(Math.max(arr)); // NaN
      ```
    - 배열을 펼쳐서 요소들의 목록을 넘겨야 한다.
      ```jsx
      const arr = [1, 2, 3];

      // Math.max 메서드 -> 배열의 각 요소를 펼쳐서 전달 (by. 스프레드 문법)
      console.log(Math.max(...arr)); // 3
      ```
- 스프레드 문법 이전에는 Function.prototype.apply 메서드로 해결했었다.
  ```jsx
  const arr = [1, 2, 3];

  // 스프레드 문법 이전에 가변 인자 함수를 사용하는 법 (by. Function.prototype.apply 메서드)
  console.log(Math.max.apply(null, arr)); // 3
  ```
- 스프레드 문법은 Rest 파라미터와 정반대의 개념이다.
  - 스프레드 문법 → 여러 개의 값이 하나의 뭉쳐 있는 이터러블을 펼쳐서 개별적인 값들의 목록을 반환하기 위해 사용하는 것
  - Rest 파라미터 → 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 사용하는 것
  ```jsx
  const arr = [1, 2, 3];

  // 함수에서 매개변수로 전달 받을 시 -> Rest 파라미터
  function foo(...rest) {
    console.log(rest); // [ 1, 2, 3 ] << 배열
  }

  // 인수 전달 시 -> 스프레드 문법
  foo(...[1, 2, 3]);
  ```

<br />
<br />

# 배열 리터럴의 요소 목록에서 스프레드 문법

> 스프레드 문법을 배열 리터럴에서 사용하면 ES5에서 사용하던 기존 방식보다 더욱 간결하고 가독성 좋게 표현 가능

<br />

### 두 개의 배열을 결합

- ES5 → concat 메서드를 사용
- ES6 → 스프레드 문법

```jsx
const arr1 = [1, 2];
const arr2 = [3, 4];

// ES5 배열 결합 방식 (by. concat 메서드)
let merge = arr1.concat(arr2);
console.log(merge); // [ 1, 2, 3, 4 ]

// ES6부터 배열 결합 방식 (by. 스프레드 문법)
merge = [...arr1, ...arr2];
console.log(merge); // [ 1, 2, 3, 4 ]
```

<br />

### 배열의 중간에 다른 배열의 요소들을 추가하거나 제거

- ES5 → splice 메서드 + Function.prototype.applay 메서드
- ES6 → splice 메서드 + 스프레드 문법

```jsx
const arr1 = [1, 4];
const arr2 = [2, 3];

// ES5 배열 삭제 후 추가 (by. splice + apply + concat 메서드)
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [ 1, 2, 3, 4 ]

// ES6부터 삭제 후 추가 (by. splice 메서드 + 스프레드 문법)
arr1.splice(1, 0, ...arr2);
console.log(arr1); // [ 1, 2, 3, 4 ]
```

<br />

### 배열을 복사

- ES5 → slice 메서드
- ES6 → 스프레드 문법
- 단, 두 방식 모두 복사는 얕은 복사(shallow copy)를 따른다.

```jsx
const arr = [1, 2, 3, 4];

// ES5 배열 복사 (by. slice 메서드)
let dup = arr.slice();
console.log(dup); // [ 1, 2, 3, 4 ]

// ES6 배열 복사 (by. 스프레드 문법)
dup = [...arr];
console.log(dup); // [ 1, 2, 3, 4 ]
console.log(dup === arr); // false
```

<br />

### 이터러블을 배열로 변환

- ES5 → Function.prototype.apply 또는 [Function.prototype.call](http://Function.prototype.call) 메서드 + slice 메서드
- ES6 → 스프레드 문법 or Rest 파라미터
  - 단, 이터러블 한정에서 가능할 뿐

```jsx
function sum() {
  // ES5에서 이터러블 -> 배열로 변환
  const args = Array.prototype.slice.call(arguments);

  return args.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

```jsx
function sum() {
  // arguments 객체는 이터러블이면서 유사 배열 객체 -> 스프레드 문법 가능
  return [...arguments].reduce((acc, cur) => acc + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

```jsx
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

// 유사 배열 객체 -> 스프레드 문법 불가능
const arr = [...arrayLike]; // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```

- 유사 배열 객체나 이터러블에 상관없이 배열로 변경하고 싶다면 ES6에 Array.from 메서드를 사용

```jsx
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = Array.from(arrayLike);

console.log(arr); // [1, 2, 3]
console.log(Array.isArray(arr)); // true
```

<br />
<br />

# 객체 리터럴의 프로퍼티 목록에서 스프레드 문법

> 스프레드 문법은 원래는 일반 객체에서 사용하는 것은 허용하지 않았다.

- ( 2021년 기준 ) 일반 객체에서도 스프레드 문법의 사용을 허용했다.

```jsx
const obj = { x: 1, y: 2 };

// 객체 복사 (얕은 복사)
const copy = { ...obj };
console.log(copy); // { x: 1, y: 2 }
console.log(obj === copy); // false

// 객체 병합
const merged = { ...obj, ...{ a: 3, b: 4 } };
console.log(merged); // { x: 1, y: 2, a: 3, b: 4 }
```

- 스프레드 문법 허용 이전에는 ES6에 도입된 Object.assign 메서드를 사용하여 여러 개의 객체를 병합하거나 프로퍼티를 추가했다.

```jsx
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 });
console.log(merged); // { x: 1, y: 10, z: 3 }

// 객체 프로퍼티 변경
const changed = Object.assign({}, { x: 1, y: 2 }, { y: 100 });
console.log(changed); // { x: 1, y: 100 }

// 객체 프로퍼티 추가
const added = Object.assign({}, { x: 1, y: 2 }, { z: 3 });
console.log(added); // { x: 1, y: 2, z: 3 }
```
