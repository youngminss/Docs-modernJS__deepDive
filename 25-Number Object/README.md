# Number 생성자 함수

> 표준 빌트인 객체인 `Number 객체` 는 `생성자 함수 객체다.`

- `new 연산자` 와 함께 호출하여 `Number 인스턴스를 생성할 수 있다.`
  - 인수를 전달하지 않고 `new 연산자` 와 함께 호출하면 `[[NumberData]] 내부 슬롯` 에 `0` 을 할당한 `Number 래퍼 객체를 생성`
  ```jsx
  [ 💡 [[ NumberData ]] 내부 슬롯 ]

  + ES5에서는 [[ PrimitiveValue ]] 내부 슬롯이라 불렀다.
  ```
  - 인수로 문자열 숫자 값을 전달 → 인수를 숫자로 강제 타입 변환 후, `[[NumberData]] 내부 슬롯` 에 변환된 숫자를 할당한 `Number 래퍼 객체를 생성`
  - 인수로 숫자가 아닌 값을 전달 → `NaN` 이 `[[NumberData]] 내부 슬롯` 에 할당한 `Number 래퍼 객체를 생성`
  ```jsx
  console.log(typeof new Number(1), new Number(1)); // object Number { [[PrimitiveValue]]: 1 } << 🔍 브라우저에서 확인 시
  console.log(new Number("1")); // Number { [[PrimitiveValue]]: 1 }
  console.log(new Number()); // Number { [[PrimitiveValue]]: 0 }
  console.log(new Number("Hello")); // Number { [[PrimitiveValue]]: NaN }
  ```

<br />
<br />

# Number 프로퍼티

### Number.EPSILON

- `1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.`
- 약 `2.2204460492503130808472633361816 * 10^-16`
- 이 프로퍼티는 `부동소수점 산술의 오차 문제에 의한 정확한 계산` 을 위해 사용한다.
  ```jsx
  function exactIsEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
  }

  console.log(exactIsEqual(0.1 + 0.2, 0.3)); // true
  console.log(0.1 + 0.2 === 0.3); // false
  ```

<br />

### Number.MAX_VALUE

- 자바스크립트에서 표현할 수 있는 `가장 큰 양수 값(1.7976931348623157 * 10^308)`
- `Infinity > Number.MAX_VALUE`
  ```jsx
  console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
  console.log(Infinity > Number.MAX_VALUE); // true
  ```

<br />

### Number.MIN_VALUE

- 자바스크립트에서 표현할 수 있는 `가장 작은 양수(5 * 10^-324)`
- `0 < Number.MIN_VALUE`
  ```jsx
  console.log(Number.MIN_VALUE); // 5e-324
  console.log(0 < Number.MIN_VALUE); // true
  ```

<br />

### Number.MAX_SAFE_INTEGER

- 자바스크립트에서 `안전하게 표현할 수 있는 가장 큰 정수값(9007199254740991)`
  ```jsx
  console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
  ```

<br />

### Number.MIN_SAFE_INTEGER

- 자바스크립트에서 `안전하게 표현할 수 있는 가장 작은 정수값(-9007199254740991)`
  ```jsx
  console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
  ```

<br />

### Number.POSITIVE_INFINITY

- `양의 무한대를 나타내는 Infinity와 같다.`
  ```jsx
  console.log(Number.POSITIVE_INFINITY); // Infinity
  console.log(Number.POSITIVE_INFINITY === Infinity); // true
  ```

<br />

### Number.NEGATIVE_INFINITY

- `음의 무한대를 나타내는 -Infinity와 같다.`
  ```jsx
  console.log(Number.NEGATIVE_INFINITY); // -Infinity
  console.log(Number.NEGATIVE_INFINITY === -Infinity); // true
  ```

<br />

### Number.NaN

- `숫자가 아님(Not-a-Number)을 나타내는 숫자 값 NaN`
- `Number.NaN == window.NaN`
  ```jsx
  console.log(Number.NaN); // NaN
  ```

<br />
<br />

# Number 메서드

### Number.isFinite 메서드

- `ES6에 도입`
- 인수로 전달된 숫자값이 `정상적인 유한수, 즉 Infinity 또는 -Infinity 가 아닌지 검사, 결과 값으로 boolean 반환`
- 빌트인 전역 함수 `isFinite 와의 차이점은 전달받은 인수를 숫자로 암묵적 타입 변환하지 않는다.`
  - 숫자값이 아닌 인수를 전달시, 항상 `false 반환`

```jsx
console.log(Number.isFinite(0)); // true
console.log(Number.isFinite(Number.MAX_VALUE)); // true
console.log(Number.isFinite(Number.MIN_VALUE)); // true

console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(-Infinity)); // false

console.log(Number.isFinite(NaN)); // false

console.log(Number.isFinite(null)); // false

console.log(isFinite(null)); // true
```

<br />

### Number.isInteger 메서드

- `ES6에 도입`
- 인수로 전달된 숫자값이 `정수(integer)인지 검사, 결과 값으로 boolean 반환`
- `검사 전, 암묵적 타입 변환은 하지 않는다.`

```jsx
console.log(Number.isInteger(0)); // true
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(-123)); // true

console.log(Number.isInteger(0.1)); // false

console.log(Number.isInteger("123")); // false

console.log(Number.isInteger(false)); // false

console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(Number.MAX_SAFE_INTEGER)); // true
```

<br />

### Number.isNaN 메서드

- `ES6에 도입`
- 인수로 전달된 숫자값이 `NaN인지 검사, 결과 값으로 boolean 반환`
- `검사 전, 암묵적 타입 변환은 하지 않는다.`
  - 숫자가 아닌 값을 전달 시, 항상 `false 를 반환`

```jsx
console.log(Number.isNaN(NaN)); // true

console.log(Number.isNaN(undefined)); // false

console.log(isNaN(undefined)); // true
```

<br />

### Number.isSafeInteger 메서드

- `ES6에 도입`
- 인수로 전달된 숫자값이 `안전한 정수인지 검사, 결과 값으로 boolean 반환`
- `검사 전, 암묵적 타입 변환은 하지 않는다.`

```jsx
console.log(Number.isSafeInteger(0)); // true

console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

console.log(Number.isSafeInteger(1.1)); // false

console.log(Number.isSafeInteger("123")); // false

console.log(Number.isSafeInteger(false)); // false

console.log(Number.isSafeInteger(Infinity)); // false
```

<br />

### Number.prototype.toExponential 메서드

- `숫자를 지수 표기법으로 변환하여 문자열로 반환`
  - 정수를 기준으로 호출할 경우 → 에러 발생
  - 정수 뒤에 마침표(.)연산이 부동소수점의 마침표인지 메서드 호출의 필요한 마침표인지, 자바스크립트 엔진 입장에서는 애매모호해서 발생하는 에러
  - 따라서, 정수 기준으로 toExponential 메서드 호출시 `그룹 연산자(())를 사용할 것`

```jsx
// console.log(77.toExponential());       // SyntaxError: Invalid or unexpected token
console.log((77).toExponential()); // 7.7e+1

console.log((77.1234).toExponential(3)); // 7.712e+1
console.log((77.1234).toExponential(1)); // 7.7e+1
```

<br />

### Number.prototype.toFixed 메서드

- `숫자를 반올림하여 문자열로 반환`
- 반올림할 `소수점 자리수(0~20까지의 정수)를 인수로 전달`
  - 인수를 생략할 경우, `default = 0`

```jsx
console.log((12345.6789).toFixed()); // 12346
console.log((12345.6789).toFixed(1)); // 12345.7
console.log((12345.6789).toFixed(2)); // 12345.68
console.log((12345.6789).toFixed(3)); // 12345.679
```

<br />

### Number.prototype.toPrecision 메서드

- 인수로 전달받은 `전체 자리수까지 유효하도록 나머지 자리수를 반올림하여 문자열로 반환`
- 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우, `지수 표기법으로 결과를 반환`
  - `전체 자리수를 나타내는 수(0~21 사이의 정수값)를 인수로 전달`
  - 인수를 생략할 경우, `default = 0`

```jsx
console.log((12345.6789).toPrecision()); // 12345.6789
console.log((12345.6789).toPrecision(1)); // 1e+4
console.log((12345.6789).toPrecision(2)); // 1.2e+4
console.log((12345.6789).toPrecision(6)); // 12345.7
```

<br />

### Number.prototype.toString 메서드

- `숫자를 문자열로 변환하여 반환`
- `진법을 나타내는 정수(2~36 사이의 정수)인 기수(radix)를 인수로 전달가능`
  - 인수를 생략할 경우, `default = 10 ( 10진법 )`
- 참고로, `전역 함수인 parseInt 로는 n진수 문자열을 n진수 정수로 변환 가능`
  - 인수를 생략할 겨우, `default = 10 ( 10진법 )`

```jsx
console.log((16).toString()); // '16'    << 십진수 정수 16 -> 10진수 16 문자열로 변환
console.log((16).toString(2)); // '10000' << 십진수 정수 16 -> 2진수 10000 문자열로 변환
console.log((16).toString(8)); // '20'    << 십진수 정수 16 -> 8진수 20 문자열로 변환
console.log((16).toString(16)); // '10'    << 십진수 정수 16 -> 16진수 10 문자열로 변환
```
