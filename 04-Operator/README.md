# 암묵적 타입변환(= 타입 강제 변환)

> 개발자의 의도와는 상관없이 `자바스크립트 엔진에 의해 암묵적으로 타입이 자동변환되는 현상`

```jsx
// ==== EX ====

// number + string 연산 경우
"1" + 2; // '12'
1 + "2"; // '12'

// boolean + number 연산 경우
1 + true; // 2
1 + false; // 1

// number + null 연산 경우
1 + null; // 1

// number + undefined 연산 경우
1 + undefined; // NaN ( 연산 불가능 )
```

- 이 외에도 자바스크립트 연산을 하다보면, 예측하지 못하고 넘어갈 수 있는 `암묵적 타입변환` 케이스가 많다.

<br>
<br>

# 동등비교 vs 일치비교

> `동등비교(loose equailty)` 와 `일치비교(strict equality)` 연산자는 엄현히 다르다 !

- `동등비교(loose equailty)`
  - `==`
  - `느슨한 비교` : 좌항과 우항의 피연산자를 비교할 때, `먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후` , `값이 같은지 비교`

```jsx
// EX) 동등비교
5 == 5; // true

// 타입은 number 와 string 으로 다르지만, "암묵적 타입 변환"을 통해 먼저 타입이 일치시키고 비교
5 == "5"; // true
```

- `일치비교(strict equality)`
  - `===`
  - `엄격한 비교` : 좌항과 우항의 피연산자가 `타입도 같고, 값도 같은지 비교` , `즉, 암묵적 타입 변환을 하지 않고 값을 비교`

```jsx
// EX) 일치비교
5 === 5; // true

// 값 & 타입을 비교하기 때문에, 암묵적 타입을 하지 않은 두 값은 같지 않다.
5 === "5"; // false
```

> 💡 이처럼, 동등비교(==) 연산자는 `예측하기 어려운 결과` 를 만들어낸다. 따라서 동등비교 연산자는 사용하지 않는 편이 좋다. 대신 `일치비교(===) 연산자를 사용해라.`

<br>
<br>

# NaN, +0 & -0, [Object.is](http://Object.is)( ) 함수

> 💡 일치 연산자(===)라 해도 `NaN` 에 대해서는 주의할 것

```jsx
// NaN은 자신과 일치하지 않는 유일한 값이다.
NaN === NaNl; // false

// NaN 인지 조사가 필요시 -> 빌트인 함수 "isNaN(value)"을 사용
isNaN(NaN); // true
isNaN(10); // false
isNaN(1 + undefined); // true (1 + undefined 결과는 NaN 이기 때문)
```

> 💡 `+0` 과 `-0` 이 존재한다. 다만 이 둘을 비교하면 `true 를 반환`한다.

```jsx
// 양의 0과 음의 0의 비교, 일치비교/동등비교 모두 결과는 true
0 === -0; // true
0 == -0; // true
```

```jsx
/*
[ 💡 Object.is 메서드 ]

ES6에서 도입된 Object.is 메서드는 "예측 가능한 정확한 비교 결과를 반환한다."
그 외에는 일치 비교 연산자(===)와 동일하게 동작한다.
*/

+0 === -0; // true
Object.is(-0, +0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```

<br>
<br>

# 삼항연산자와 조건문

- 조건에 따라 어떤 값을 결정해야 한다. → `삼항 연산자 표현식`을 사용하는 편이 유리
- 조건에 따라 수행해야 할 문이 하나가 아니라 여러개다. → `if ~ else 문` 이 더 가독성 측면에서 유리

```jsx
/*
[ 💡 NOTE - 암묵적 타입 변환으로인한 짝수, 홀수 판별 간단하게 작성법 ]
- 판별식이 0(== false, 암묵적 타입변환)이 되면 거짓일 경우로 판단한다.
*/
let number = 2;
let result = x % 2 ? "홀수" : "짝수";

console.log(result); // 짝수
```

<br>
<br>

# typeof 연산자

> typeof 연산자는 피연산자의 데이터 타입을 `문자열로 반환` 한다.

- 총 7가지 문자열 형태로 반환
  - `string`
  - `number`
  - `boolean`
  - `undefined`
  - `symbol`
  - `object`
  - `function`

> 💡 `null` 을 반환하는 경우는 없다 !

```jsx
// EX

typeof ""; // "string"
typeof 1; // "number"
typeof NaN; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof null; // "object" << 🔎
typeof []; // "object"
typeof {}; // "object"
typeof new Date(); // "object"
typeof /test/gi; // "object" << 🔎 ( 정규표현식 )
typeof function () {}; // "function"
```

```jsx
// 💡 null 타입인지 확인할 때는 "일치 연산자(===)" 를 사용할 것
const FOO = null;

typeof FOO === null; // false
FOO === null; // true
```

```jsx
// 💡 선언하지 않은(undeclared) 식별자(= 변수)에 대해서 typeof 연산시, ReferenceError가 아닌 "undefined 를 반환"한다.
typeof undeclared; // undefined
```

<br>
<br>

# 지수연산자

> `ES7` 에서 도입된 지수 연산자

```jsx
2 ** 2; // 4
2 ** 0; // 1
2 ** -2; // 0.25
```

- 지수 연산자 도입되기 이전에는 `Math.pow(x, y)` 메서드를 사용했다.

```jsx
Math.pow(2, 2); // 4
Math.pow(2, 0); // 1
Math.pow(2, -2); // 0.25
```

> `음수를 거듭제곱` 할 때는, 제곱할 수(= 밑)를 `괄호` 로 묶어야 한다.

```jsx
-5 ** 2;  // SyntaxError: Unary operator used immediately before exponentiation expression.
(-5) ** 2;  // 25
```

# 그외 연산자 간단 소개

| 연산자     | 개요                                                        |
| ---------- | ----------------------------------------------------------- |
| ?.         | 옵셔널 체이닝 연산자                                        |
| ??         | null 병합 연산자                                            |
| delete     | 프로퍼티 삭제                                               |
| new        | 생성자 함수를 호출할 때 사용하여 인스턴스 생성              |
| instanceof | 좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스인지 판별 |
| in         | 프로퍼티 존재 확인                                          |
|            |                                                             |
