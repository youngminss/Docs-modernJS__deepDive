> 표준 빌트인 객체 `String 객체는 생성자 함수 객체다.`

- `new 연산자` 와 함께 호출하여 String 인스턴스를 생성 가능
  - 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 `[[StringData]] 내부 슬롯`에 빈 문자열을 할당한 `String 래퍼 객체를 생성`
  - String 래퍼 객체는 `length 프로퍼티를 가지며 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 유사 배열 객체이면서 이터러블이다.`
- `문자열은 원시값이므로 변경할 수 없다. ( immutable )`
- new 연산자 없이 String 생성자 함수를 호출하면, 인스턴스가 아닌 문자열 원시값을 반환

<br />
<br />

# String 메서드

> 문자열은 `변경 불가능한(immutable) 원시 값`이기 때문에, `String 래퍼 객체도 읽기 전용(readonly) 객체로 제공`

- String 객체에는 `원본 String 래퍼 객체를 직접 변경하는 메서드는 제공하지 않는다.`
  - `String 래퍼 객체의 각 프로퍼티 값들은 전부 writable 이 false`
- 즉, mutator mehtod는 없고 `accessor mehtod 만 존재한다.`
  - `언제나 새로운 문자열을 생성하여 반환`

```jsx
const strObj = new String("YOUNG");
console.log(Object.getOwnPropertyDescriptors(strObj));
// {
//   '0': { value: 'Y', writable: false, enumerable: true, configurable: false },
//   '1': { value: 'O', writable: false, enumerable: true, configurable: false },
//   '2': { value: 'U', writable: false, enumerable: true, configurable: false },
//   '3': { value: 'N', writable: false, enumerable: true, configurable: false },
//   '4': { value: 'G', writable: false, enumerable: true, configurable: false },
//   length: { value: 5, writable: false, enumerable: false, configurable: false }
// }
```

<br />

### String.prototype.indexOf 메서드

- 대상 문자열에서 인수로 전달받은 문자열을 검색하여 `첫 번째 인덱스를 반환`
  - `검색 실패시 -1 반환`
- `두 번째 인수로 검색 시작 인덱스를 전달 가능`
- 특정 문자열이 존재하는지 검사할 때 유용
  - ES6에 도입된 `String.prototype.includes 메서드 사용시 가독성에 더 좋다.`

```jsx
const str = "Hello World";

console.log(str.indexOf("l")); // 2

// 2개 이상 문자열 검색 가능
console.log(str.indexOf("or")); // 7

// 존재하지 않는 문자열 검색
console.log(str.indexOf("z")); // -1

// 6번째 인덱스부터 검색
console.log(str.indexOf("l", 6)); // 9

// ES6 includes 메서드 => 가독성 증가
console.log(str.includes("l")); // true
```

<br />

### [String.prototype.search](http://String.prototype.search) 메서드

- 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 `일치하는 문자열의 인덱스를 반환`
  - `검색 실패 시 -1을 반환`

```jsx
const str = "Hello World";

console.log(str.search(/o/)); // 4
console.log(str.search(/z/)); // -1
```

<br />

### String.prototype.includes 메서드

- `ES6에 도입`, 대상 문자열에 인수로 전달받은 문자열이 포함되어 있는지 검사하고 `결과를 boolean 으로 반환`
- `두 번째 인수로 검사 시작 인덱스를 전달 가능`

```jsx
const str = "Hello World";

console.log(str.includes("World")); // true
console.log(str.includes("")); // true
console.log(str.includes("z")); // false
console.log(str.includes()); // false
```

<br />

### String.prototype.startsWith 메서드

- `ES6에 도입`, 대상 문자열이 인수로 `전달받은 문자열로 시작하는지 확인하고 결과를 boolean 으로 반환`
- `두 번째 인수로 검색 시작 인덱스를 전달 가능`

```jsx
const str = "Hello World";

console.log(str.startsWith("Hell")); // true
console.log(str.startsWith("")); // true
console.log(str.startsWith("z")); // false
console.log(str.startsWith()); // false
```

<br />

### String.prototype.endsWith 메서드

- `ES6에 도입`, 대상 문자열이 인수로 `전달받은 문자열로 끝나는지 확인하고 결과를 boolean 으로 반환`
- `두 번째 인수로 검색 시작 인덱스를 전달 가능`

```jsx
const str = "Hello World";

console.log(str.endsWith("rld")); // true
console.log(str.endsWith("")); // true
console.log(str.endsWith("z")); // false
console.log(str.endsWith()); // false
```

<br />

### String.prototype.charAt 메서드

- 대상 문자열에서 인수로 `전달받은 인덱스에 위치하는 문자를 검색하여 반환`
  - 범위를 벗어난 인덱스를 전달시 → `빈 문자열을 반환`
- `String.prototype.charCodeAt 메서드, String.prototype.codePointAt 메서드도 존재`

```jsx
const str = "Hello World";

console.log(str.charAt(4)); // o
console.log(str.charAt(0)); // H
console.log(str.charAt(-1)); //
console.log(str.charAt(1000)); //
```

<br />

### String.prototype.substring 메서드

- 대상 문자열에서 `첫 번째 인수로 전달받은 인덱스부터 두 번째 인수로 전달받은 인덱스 이전까지의 부분 문자열을 반환`
  - 두 번째 인수는 생략 가능 → 첫 번째 인수 인덱스부터 문자열 끝까지의 부분 문자열 반환
- 전달하는 인수에 대해 다음과 같은 특징이 존재
  - `첫 번째 인수 > 두 번째 인수` → `두 인수는 교환`
  - `인수 < 0 or NaN` → `0으로 취급`
  - `인수 > 전체 문자열 길이` → `인수는 전체 문자열 길이로 취급`

```jsx
const str = "Hello World";

console.log(str.substring(0)); // Hello World
console.log(str.substring(1, 5)); // ello
console.log(str.substring(1, 100)); // ello World
console.log(str.substring(-2)); //  Hello World
```

<br />

### String.prototype.slice 메서드

- String.prototype.substring 메서드와 동일한 기능을 한다.
- 다만, `인수를 음수로 전달할 수 있다.`

```jsx
const str = "Hello World";

console.log(str.slice(0)); // Hello World
console.log(str.slice(1, 5)); // ello
console.log(str.slice(1, 100)); // ello World
console.log(str.slice(-2)); //  ld
```

<br />

### String.prototype.toUpperCase 메서드

- 대상 문자열을 `모두 대문자로 변경한 문자열을 반환`

```jsx
const str = "Hello World";

console.log(str.toUpperCase()); // HELLO WORLD
```

<br />

### String.prototype.toLowerCase 메서드

- 대상 문자열을 `모두 소문자로 변경한 문자열을 반환`

```jsx
const str = "Hello World";

console.log(str.toLowerCase()); // hello world
```

<br />

### String.prototype.trim 메서드

- 대상 문자열 `앞뒤에 공백을 제거한 문자열을 반환`
- `String.prototype.trimStart, String.prototype.trimEnd 메서드도 존재`

```jsx
const str = "   Hello World          ";

console.log(str.trim()); // Hello World
console.log(str.trimRight()); //    Hello World
console.log(str.trimLeft()); // Hello World
console.log(str.trimStart()); // Hello World
console.log(str.trimEnd()); //   Hello World
```

<br />

### String.prototype.repeat 메서드

- `ES6에 도입`, 대상 문자열을 `전달받은 인수만큼 반복해 연결한 새로운 문자열을 반환`
  - `인수가 0` → `빈 문자열 반환`
  - `인수가 음수` → `RangeError 발생`
  - `인수 생략 시` → `default = 0`

```jsx
const str = "Hello ";

console.log(str.repeat()); //
console.log(str.repeat(2)); // Hello Hello
console.log(str.repeat(0)); //
console.log(str.repeat(2.5)); // Hello Hello
console.log(str.repeat(-2)); // RangeError: Invalid count value
```

<br />

### String.prototype.replace 메서드

- 대상 문자열에서 `첫 번째 인수로 전달받은 문자열 or 정규 표현식을 검색하여 두 번재 인수로 전달한 문자열로 치환한 문자열을 반환`
  - `기본적으로, 검색된 문자열이 여러 개일 경우 첫 번째로 검색된 문자열만 치환`
- `정규 표현식을 첫 번째 인수로 전달 가능`

```jsx
const str = "Hello World";

console.log(str.replace("World", "word")); // Hello word
console.log(str.replace(/^hello/i, "Hell")); // Hell World
```

- `두 번째 인수로 치환 함수를 전달 가능`
  - 매치되어 치환된 결과를 두 번째 인수로 전달한 치환 함수의 인수로 전달하면서 호출하고 치환 함수가 반환한 결과와 매치 결과를 치환
  ```jsx
  // String.prototype.replace 치환 함수 적용 예

  // 카멜 케이스 -> 스네이크 케이스로
  function camelToSnake(camelCase) {
    return camelCase.replace(/.[A-Z]/g, (match) => {
      console.log(match); // oW
      return match[0] + "_" + match[1].toLowerCase();
    });
  }

  const camelCase = "helloWorld";
  console.log(camelToSnake(camelCase)); // helloWorld

  // 스네이크 케이스 -> 카멜 케이스로
  function snakeToCamel(snakeCase) {
    return snakeCase.replace(/_[a-z]/g, (match) => {
      console.log(match); // _w
      return match[1].toUpperCase();
    });
  }

  const snakeCase = "hello_world";
  console.log(snakeToCamel(snakeCase)); // hello_world
  ```

<br />

### String.prototype.split 메서드

- 대상 문자열에서 첫 번째 인수로 전달한 문자열 or 정규 표현식을 검색하여 문자열을 구분한 후, `분리된 각 문자열로 이뤄진 배열을 반환`
  - 인수로 빈 문자열 전달 시 → 각 문자를 모두 분리한 배열을 반환
  - 인수를 생략 시 → 대상 문자열 전체를 단일 요소로 갖는 배열을 반환
- `두 번째 인수로 배열의 길이를 전달 가능`
  - 전달한 배열의 길이보다, 결과 배열의 길이가 길면 `자동 잘림`

```jsx
const str = "How are you doing?";

console.log(str.split(" ")); // [ 'How', 'are', 'you', 'doing?' ]
console.log(str.split(/\s/)); // [ 'How', 'are', 'you', 'doing?' ]
console.log(str.split("")); // ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", "?"]
console.log(str.split()); // [ 'How are you doing?' ]
```
