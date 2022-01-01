> `스코프(scope)` = `식별자(identifier)가 유요한 범위` = 자바스크립트 엔진이 `식별자를 검색할 때 사용하는 규칙`

- `모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)`는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정된다.

```jsx
var var1 = 1; // 코드의 가장 바깥 영역에서 선언한 변수

if (true) {
  var var2 = 2; // 코드 블록 내에서 선언한 변수
  if (true) {
    var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
  }
}

function foo() {
  var var4 = 4; // 함수 내에서 선언한 변수

  function bar() {
    var var5 = 5; // 중첩된 함수 내에서 선언한 변수
  }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var4 is not defined
```

<br />

### 식별자 결정

> `식별자 결정(identifier resolution)` = 자바스크립트 엔진이 이름이 같은 두 식별자 중에 어떤 식별자를 참조해야 할 것인지를 결정하는 것

- 자바스크립트 엔진은 코드를 실행할 때 `코드의 문맥(context)을 고려`
- 코드가 어디서 실행되며 주변에 어떤 코드가 있는지에 따라, 동일한 코드도 다른 결과를 만든다.

```jsx
var x = "global";

function foo() {
  var x = "local";
  console.log(x); // local
}

foo();
console.log(x); // global
```

![전역 스코프 지역 스코프](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcn0zjT%2FbtqZoydJdrc%2FvHquKk6Vb0mf4PaExIsZX1%2Fimg.png)

- `스코프` 라는 개념이 없다면, 위에 코드 상황에서는 `x` 라는 변수가 `전역` , `foo` 함수 모두 존재해서 `충돌` 할 것이다.
- 식별자는 어떤 값을 구별할 수 있어야 하므로 `유일(unique)`해야 한다.
- 따라서 식별자인 변수 이름은 `중복될 수 없다.` → 하나의 값은 유일한 식별자에 연결되어야 한다.

```jsx
PC에서 "동일한 파일 이름" 이 스코프를 통한 식별자 결정 가능의 예시 중 하나이다.
= "다른 폴더" 간에 "동일한 파일 이름"은 다른 파일로 식별하고 생성 가능
```

<br />
<br />

# 스코프의 종류

> 변수는 `자신이 선언된 위치에 의해` 자신이 유요한 범위인 스코프가 결정된다.

| 구분 | 설명                  | 스코프      | 변수      |
| ---- | --------------------- | ----------- | --------- |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역 변수 |
| 지역 | 함수 몸체 내부        | 지역 스코프 | 지역 변수 |

- 전역 변수 : `어디서든지 참조 가능`
- 지역 변수 : `자신의 지역 스코프와 하위 지역 스코프에서 참조 가능`

<br />
<br />

# 스코프 체인

```jsx
[ 💡 그전에 ]

+ "중첩함수(nested function)" = 함수 몸체 내부에서 함수가 정의된 것
+ "외부함수(outer function)" = 중첩 함수를 포함하는 함수
```

> `스코프체인(scope chain)` = 스코프는 함수의 중첩에 의해 `계층적 구조를 갖는다.`

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRWXKo%2FbtrmoqxGHIm%2FcyK2AY7KBpFPGWjKgAtlR0%2Fimg.png)

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKB61b%2FbtrmtfvZhjZ%2FEBV5IMeUh1oeDHUAOgtC7K%2Fimg.png)

- 변수 참조 시, 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 `상위 스코프 방향으로 이동하며` 선언된 `변수(= 식별자)를 검색(= 결정, identifier resolution)한다.`

<br />

### 스코프 체인에 의한 함수 검색

```jsx
// 전역 함수
function foo() {
  console.log("global function foo");
}

function bar() {
  // 중첩 함수
  function foo() {
    console.log("local function foo");
  }

  foo(); // local function foo
}

bar();
```

- `함수 선언문` 으로 함수를 정의 → `런타임 이전에 함수 객체가 먼저 생성`

> 자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 `암묵적으로 선언하고 생성된 함수 객체를 할당` 한다고 했다.

- 함수도 `식별자에 할당되기 때문에` , 스코프를 갖는다.
- 따라서 스코프를 `"식별자를 검색하는 규칙"` 이라고 표현하는 것이 적합한 표현이라는 것이다.

<br />
<br />

# 함수 레벨 스코프

- `블록 레벨 스코프(block level scope)`
  - 함수 몸체만이 아니라 모든 코드 블록( `if, for, while, try - catch 등` )이 지역 스코프를 만든다.
- `함수 레벨 스코프(function level scope)`
  - 자바스크립트에서 `var 키워드로 선언된 변수` 는 `오로지 함수의 코드블록(함수 몸체)만`을 지역 스코프로 인정한다.

```jsx
var x = 1;

if (true) {
  // if문 블록 내부에서 선언한 변수 x는 지역 스코프가 적용되지 않는다.
  // 그로 인해, 변수 x는 전역에 있는 것과 if문 내부에 있는 것은 현재 중복 선언 된 것이라 볼 수 있다.
  var x = 10;
}

console.log(x); // 10
```

<br />
<br />

# 렉시컬 스코프

- 상위 스코프를 결정하는 방식
  - `동적 스코프(dynamic scope)`
    - `함수가 호출되는 시점에 동적으로` 상위 스코프를 결정
  - `정적 스코프(static scope) 또는 렉시컬 스코프(lexical scope)`
    - `함수를 어디서 정의했는지`에 따라 상위 스코프를 결정
    - `Javascirpt 를 비롯한 대부분의 프로그래밍 언어가 렉시컬 스코프를 따른다.`
