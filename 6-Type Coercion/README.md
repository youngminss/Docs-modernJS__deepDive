# 타입 변환

> `명시적 타입변환(explict coercion)` or `타입 캐스팅(type casting)` 은 개발자가 **의도적으로 값의 타입을 변환**하는 것

> `암묵적 타입변환(implicit coercion)` or `타입 강제 변환(type coercion)` 은 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 **자바스크립트 엔진에 의해 암묵적으로 타입이 변환**되는 것

- 명시적 타입변환이나 암묵적 타입변환이 원시 값(primitive value)을 직접 변경하는 것은 아니다. → `변경 불가능한 값(immutable value)`
- 단지, 기존 원시 값을 사용해 다른 타입의 `새로운 원시 값을 생성` 하는 것

<br>
<br>

# 암묵적 타입변환

> 자바스크립트 엔진이 표현식을 평가할 때 개발자의 의도와는 상관없이 `코드의 문맥을 고려해 암묵적으로` 데이터 타입을 강제 변환(암묵적 타입 변환)하는 것

- 암묵적 타입 변환이 발생하면 → `문자열(string), 숫자(number), 불리언(boolean)` 과 같은 `원시 타입(primitive type)` 중 하나로 타입을 자동 변환

<br>

### 문자열 타입으로 변환

```jsx
// 🎯 주의할 것 중심

// 숫자 타입
NaN + '';             // "NaN"
Infinity + ''         // "Infinity"

// null 타입
null + '';            // "null"

// undefined 타입
undefined + '';       // "undefined"

// 심벌 타입
(Symbol()) + '';      // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + '';            // "[object Object]"
Math + '';            // "[object Math]"
[] + '';              // ""
[10, 20] + '';        // "10,20"
(function(){}_ + '';  // "function(){}"
Array + '';           // "function Array() { [native code] }"
```

<br>

### 숫자 타입으로 변환

```jsx
// 문자열 타입
+""; // 0
+"0"; // 0
+"1"; // 1
+"string" + // NaN
  // 불리언 타입
  true; // 1
+false; // 0

// null 타입
+null; // 0

// undefined 타입
+undefined; // NaN

// 심벌 타입
+Symbol(); // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}; // NaN
+[]; // 0
+[10, 20]; // NaN
+function () {}; // NaN
```

- `빈 문자열(''), 빈 배열([]), null, false` → `0`
- `true` → `1`
- `객체, 빈 배열이 아닌 배열(= 값이 있는 배열), undefined` → `NaN` ( 주의 ! )

<br>

### 불리언 타입으로 변환

> 자바스크립트 엔진은 불리언 타입이 아닌 값을 `Truthy 값(참으로 평가되는 값)` or `Falsy 값(거짓으로 평가되는 값)` 으로 구분한다.

```jsx
// 💡 자바스크립트 엔진이 Falsy 값으로 판단하는 값

+ false
+ undefined
+ null
+ 0, -0
+ NaN
+ ''(빈 문자열)
```

- `Falsy 값` 을 제외한 모든 값은 `Truthy 값`

<br>
<br>

# 명시적 타입 변환

> 개발자의 의도에 따라 명시적으로 타입을 변경하는 방법에는 대표적으로 다음과 같다.

- `표준 빌트인(built-in) 생성자 함수` → `String(), Number(), Boolean()` 을 `new 키워드` 없이 호출하는 방법
- `빌트인(built-in) 메서드 사용하는 방법`
- 암묵적 타입변환

<br>

### 문자열 타입으로 변환

1. `String 생성자 함수를 new 키워드 없이 호출하는 방법`
2. `Object.prototype.toString 메서드를 사용하는 방법`
3. 문자열 연결 연산자를 이용하는 방법

```jsx
// 1. String 생성자 함수를  new 키워드 없이 호출하는 방법
String(1);              // "1"
String(NaN);            // "NaN"
String(Infinity);       // "Infinity"

String(true);           // "true"
String(false);          // "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
(1).toString();         // "1"
(NaN).toString();       // "NaN";
(Infinity).toString();  // "Infinity"

(true).toString();      // "true"
(false).toString();     // "false"

// 3. 문자열 연결 연산자를 이용하는 방법
1 + '';                 // "1"
...
```

<br>

### 숫자 타입으로 변환

1. `Number 생성자 함수를 new 키워드 없이 호출하는 방법`
2. `parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)`
3. 산술 연산자를 사용하는 방법

```jsx
// 1. Number 생성자 함수를 new 키워드 없이 호출하는 방법
Number("0"); // 0
Number("-1"); // -1
Number("10.53"); // 10.53

Number(true); // 1
Number(false); // 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
parseInt("0"); // 0
parseInt("-1"); // -1
parseInt("10.53"); // 10
parseFloat("10.53"); // 10.53

// 산술 연산자를 사용하는 방법
+"0"; // 0
```

<br>

### 불리언 타입으로 변환

1. `Boolean 생성자 함수를 new 키워드 없이 호출하는 방법`
2. !(부정 논리 연산자를 두 번 사용하는 방법

```jsx
// 1. Boolean 생성자 함수를 new 키워드 없이 호출하는 방법
Boolean('x');       // true
Boolean('');        // false
Boolean('false');   // true

Boolean(0);         // false
Boolean(1);         // true
Boolean(NaN);       // false
Boolean(Infinity);  // true

Boolean(null);      // false

Boolean(undefined); // false

Boolean({});        // true
Boolean([]);        // true

// 2. !(부정 논리 연산자를 두 번 사용하는 방법
!!'x';  // true ( !(!'x') === !(false) -> true )
...
```

<br>
<br>

# 단축 평가 🔎

> `단축 평가(short-circuit evaluation)` : 논리 연산의 결과를 결정하는 피연산자를 `타입 변환하지 않고 그대로 반환`

- 단축 평가는 표현식을 평가하는 도중에 평가결과가 확정돈 경우 → 나머지 평가 과정을 생략한다.

| 단축 평가 표현식  | 평가 결과 |
| ----------------- | --------- |
| true ll anything  | true      |
| false ll anything | anything  |
| true && anything  | anything  |
| false && anything | false     |

<br>

### 논리 연산자를 사용한 단축 평가

> `논리곱(&&)` = 논리 연산의 결과를 결정하는 것은 `두 번째 피연산자`

```jsx
"Apple" && "Banana"; // Banana
```

- `논리곱(&&) 연산자` 는 두 개의 피연산자가 `모두 true로 평가될 때` → `true를 반환`
- `좌항 -> 우항으로 평가가 진행`

> `논리합(||)` = 논리 연산의 결과를 결정하는 것은 `첫 번째 피연산자`

```jsx
"Apple" && "Banana"; // Apple
```

- `논리합(||) 연산자` 는 두개의 피연산자 중 `하나만 true로 평가되어도` → `true를 반환`
- `좌항 -> 우항으로 평가가 진행`

```jsx
// 💡 논리 연산자 단축 평가 - 기본

// 논리합(||) 연산
"Cat" || "Dog"; // "Cat"
false || "Dog"; // "Dog"
"Cat" || false; // "Cat"

// 논리곱(&&) 연산
"Cat" && "Dog"; // "Dog"
false && "Dog"; // "false"
"Cat" && false; // "false"
```

```jsx
// 💡 논리 연산자 단축 평가 - if문 대체 -> 값 할당 시 깔끔함

var done = true;
var message = "";

// 💩 조건문으로 값 할당
if (done) message = "값";

// 👍 논리 연산자(논리곱)으로 값 할당
meessage = done && "값";
```

```jsx
// 💡 "객체"를 가리키기를 기대하는 변수가 null 또는 undefined 가 아닌지 확인하고 프로퍼티를 참조할 때
// 객체는 { 키 : 값 } 으로 구성된 프로퍼티(property)의 집합
// 객체를 가리키기를 기대하는 변수의 값이 객체가 아닌 null 이나 undefined 인 경우, 객체 참조시 TypeError가 발생 -> 프로그램 강제 종료

// 💩
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null

// 👍
// elem이 null 또는 undefined 같은 "Falsy 값"이면 elem 값으로 평가
// elem이 "Truthy 값"이면 elem.value 로 평가
var elem = null;
var elem = elem && elem.value; // null
```

```jsx
// 💡 함수 매개변수에 기본값을 설정할 때
// 함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined 가 할당

// 💩 인수를 전달하지 않을 경우
function getStringLength(str) {
  return str.length;
}
getStringLength(); // TypeError: Cannot read property 'length' of undefined

// 👍 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || "";
  return str.length;
}
getStringLength(); // 0

// 👍 Es6의 매개변수 default parameter 설정
function getStringLength(str = "") {
  return str.length;
}
getStringLength(); // 0
```

<br>

### 옵셔널 체이닝 연산자

> `?.` = `옵셔널 체이닝(optional chaining) 연산자`

- 좌항의 피연산자가 `null 또는 undefined` → `undefined 반환`
- 그렇지 않은 경우 → `우항의 프로퍼티를 참조`

```jsx
var elem = null;
var value = elem?.value; // undefined
```

- 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 안전하게 참조할 때 유용
- 옵셔널 체이닝 도입 이전에는
  - `논리곱(&&)을 사용한 단축 평가`를 통해 → 변수가 null 또는 undefined 인지 확인했음

```jsx
var elem = null;
var value = elem && elem.value; // null (elem의 null)
```

```jsx
// 💡 논리곱(&&) 연산자 vs 옵셔널 체이닝 연산자

// 💩 논리곱(&&) 연산자 = 좌항 피연산자가 Falsy값이면, 좌항 피연산자를 그대로 반환한다. (단, 0 또는 ''은 객체로 평가될 때도 있다.)
var str = ""; //
var length = str && str.length; // ''

// 👍 옵셔널 체이닝 = 좌항 피연산자가 Falsy값이라도 null 또는 undefined 만 아니면, 우항의 프로퍼티를 참조한다.
var str = "";
var length = str?.length; // 0
```

<br>

### null 병합 연산자

> `??` = `병합 연산자(nullish coalescing) 연산자`

- 좌항의 피연산자가 `null 또는 undefined` → `우항의 피연산자를 반환`
- 그렇지 않은 경우 → `좌항의 프로퍼티를 참조`

```jsx
var foo = null ?? "default string"; // "default string"
```

- `변수에 기본값을 설정할 때 유용 !`
- null 병합 연산자 도입 이전에는
  - `논리합(||)을 사용한 단축 평가` 를 통해 → 변수에 기본값을 설정했음

```jsx
// 💡 논리합(||) 연산자 vs null 병합 연산자

// 💩 논리합(||) 연산자 = 좌항의 피연산자가 Falsy값이면, 우항의 피연산자를 반환 (단, 0 이나 ''은 기본값으로서 유호하다면 예기치 않은 동작이 발생 !)
var foo = "" || "default string"; // "default string"

// 👍 null 병합 연산자 = 좌항의 피연산자가 Falsy값이라도 null 또는 undefined 가 아니면, 좌항의 피연산자를 그대로 반환한다.
var foo = "" ?? "default string"; // ''
```
