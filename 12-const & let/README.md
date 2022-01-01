# var 키워드 문제점

### 1. 변수 중복 선언 허용

- 동일한 이름의 변수가 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수 값이 변경되는 부작용 발생

```jsx
var x = 1; // x변수 선언 & 초기화 동시에
var y = 1; // y변수 선언 & 초기화 동시에

var x = 100; // 선언 문 O, 초기화 문도 X
var y; // 선언 문은 O, 초기화 문이 X (암묵적 무시)

console.log(x); // 100
console.log(y); // 1
```

### 2. 함수 레벨 스코프

- 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다. → 함수 레벨 스코프
- 함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다. → 의도치 않게 전역 변수가 중복 선언되는 경우가 발생

```jsx
var x = 1;

// 코드 블록(블록 레벨), 하지만 var 는 함수 레벨 스코프
// 고로, 블록 내 x변수는 전역 변수 처럼 스코프가 적용
{
  var x = 10;
}

console.log(x); // 10
```

### 3. 변수 호이스팅

[변수호이스팅](https://github.com/youngminss/Docs-modernJS__deepDive/tree/master/1-Variable#%EB%B3%80%EC%88%98-%EC%84%A0%EC%96%B8%EC%9D%98-%EC%8B%A4%ED%96%89-%EC%8B%9C%EC%A0%90%EA%B3%BC-%EB%B3%80%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)

- 변수 호이스팅이 에러를 발생시키지는 않지만 프로그램의 흐름상 맞지 않을뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

```jsx
console.log(foo); // undefined << foo 변수 암묵적 선언 & 초기화 (호이스팅)

foo = 123; // foo변수 값 할당

console.log(foo); // 123

var foo;
```

<br />
<br />

# let 키워드

> `let 키워드` 는 `ES6` 에 도입되어 `var 키워드의 단점을 보완`하기 위해 등장

### 1. 변수 중복 선언 금지

- `let 키워드`로 이름이 같은 변수를 `중복 선언하면 문법 에러(SyntaxError)가 발생`

```jsx
// var 변수 = 중복 선언 허용 O
var foo = 123;
var foo = 456;
console.log(foo);

// let 변수 = 중복 선언 허용 X
let bar = 123;
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
console.log(bar);

// 선언 단계 에서 체크하므로 → 위에서 var 변수인 foo에 대한 출력문 실행이 진행 안됨
```

### 2. 블록 레벨 스코프

- `let 키워드`는 `모든 코드 블록(함수, if문, for문, while문, try - catch문 등)을 지역 스코프로 인정`하는 `블록 레벨 스코프(block-level scope)` 를 따른다.

```jsx
let foo = 1;

{
  let foo = 2;
  let bar = 3;
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined

/**
 * 비록 블록 내에 let 키워드로 선언한 foo, bar 변수가 있지만
 * + 출력된 foo는 전역에 선언된 foo 변수가 되고
 * + 출력문이 있는 스코프내에는 bar 변수는 존재하지 않으므로 "참조에러(ReferenceError)" 발생
 */
```

- 블록 레벨 스코프 - 함수레벨 스코프 - 전역 스코프

![블록 레벨 스코프 - 함수레벨 스코프 - 전역 스코프](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fem1Pu9%2Fbtrm5zzw4w7%2FtHJApcOAXFRX3H5wWx56cK%2Fimg.png)

### 3. 변수 호이스팅

- `let 키워드`로 선언한 변수는 `변수 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생`한다.
- 이는 var 키워드와 변수의 선언 & 초기화 시점에 차이가 있으므로 비교해야 한다.

```jsx
// 1️⃣ 변수 호이스팅 - var 변수 💩
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1

// 2️⃣ 변수 호이스팅 - let 변수 👍
console.log(foo); // 일시적 사각지대(TDZ) - ReferenceError: Cannot access 'foo' before initialization ( 사실상, 여기서 프로그램 종료 )

let foo; // 변수 선언문에서 초기화 단계가 실행
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행
console.log(foo); // 1
```

![var 키워드 변수 생명 주기 예시](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2ZuPh%2Fbtrm9Dalmtp%2FBl5SG7gpk5KyhfkV5Y27w0%2Fimg.png)

![let 키워드 변수 생명 주기 예시](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLY81C%2Fbtrm83UpK2U%2FNor0U7JgfpUTRK4iXQDw61%2Fimg.png)

```jsx
[ 💡 전역 객체 ]

+ var 키워드로 선언한 전역 변수와 전역 함수, 선언하지 않은 변수에 값을 할당한 암묵적 전역은 "전역 객체 window이 프로퍼티"가 된다.
+ 전역 객체의 프로퍼티를 참조할 때 window를 생략 가능
+ 단, 전역 객체는 "브라우저 환경 내에서 참조 가능"
```

![var 키워드 전역 객체 (in window)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbAccs6%2Fbtrm3PikIEk%2FxtnnY3leUy6KhC9LKKZb00%2Fimg.png)

- `let 키워드` 로 선언한 전역 변수는 `전역 객체의 프로퍼티가 아니다.`
  - 즉, `window 객체에 접근 할 수 없다.`
  - 이는, let 전역 변수는 보이지 않는 개념적인 블록 내(전역 렉시컬 환경의 선언적 환경 레코드(DER))에 존재하기 때문

```jsx
// 브라우저 환경 가정
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 X
console.log(window.x); // undefinde
console.log(x); // 1
```

<br />
<br />

# const 키워드

> `const 키워드` 는 `상수(constant)` 를 선언하기 위해 사용 ( 단, 반드시 상수만을 위해 사용하는 것은 아님 )

- 일반적으로 `let 키워드` 와 대부분 성질이 동일
- 차이점은 다음과 같다.

<br />

### 1. 선언과 동시에 초기화

- `const 키워드` 변수는 `반드시 선언과 동시에 초기화를 해야 한다.`

```jsx
const foo;  // SyntaxError: Missing initializer in const declaration
```

### 2. 재할당 금지

- `const 키워드` 변수는 `재할당이 금지된다.`

```jsx
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

### 3. const로 상수

- `const 키워드` 로 선언한 변수에 `원시 값` 을 할당한 경우 `변수 값을 변경할 수 없다.`
- 원시 값은 `변경 불가능한 값(immutable value)` 이므로 재할당 없이 값을 변경할 수 있는 방법이 없기 때문

> `상수(constant)` : 재할당이 금지된 `변수`

- 상수도 곧 변수이며, 즉 상수도 메로리 공간을 가지며 값을 가진다.
- 단, 변수는 언제든지 재할당을 통해 변수 값을 변경 가능하지만, `상수는 재할당이 금지`될 뿐이다.
- 상수는 상태 유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용을 권장
- 일반적으로 상수의 이름은 `대문자로 선언` 하며, 여러 단어로 이뤄진 경우 `언더 스코어(_)` 로 구분하며 `스네이크 케이스(snakeCase)` 로 표현한다.

```jsx
// TAX_RATE 라는 상수(constant)를 적용하므로써, 코드의 가독성이 증가한다.
const TAX_RATE = 0.1;

let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;

console.log(afterTaxPrice); // 110
```

### 4. const로 객체

- `const 키워드` 로 선언한 변수에 `객체` 를 할당한 경우는 `변수 값을 변경할 수 있다.`
- 객체는 `재할당 없이도 직접 값을 변경이 가능하기 때문`
- `const 키워드` 는 재할당을 금지할 뿐 `불변` 을 의미하지는 않는다.
  - 새로운 값을 재할당하는 것은 `불가능`
  - 프로퍼티 동적 생성, 삭제, 프로퍼티 값 변경을 통한 `객체의 변경은 가능` → 객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않음

```jsx
const person = {
  name: "WI",
};

// 객체는 변경 가능한 값(mutable value) == 재할당 없이 변경 가능
person.name = "WIEEE";
console.log(person.name); // { name: "WIEEE" };
```
