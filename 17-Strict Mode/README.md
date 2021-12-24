### 암묵적 전역

- 다음은 `use strict` 모드를 반영하지 않았을 경우, 우리가 아는 일반적인 자바스크립트 작동 방식이다. → `암묵적 전역 현상`
- 이는, 개발자의 의도와는 상관없는 다양한 오류를 발생시키는 원인이 될 가능성이 크다.
  - 따라서, 반드시 `ES6 에 도입된 const, let 키워드를 사용하여 변수를 선언한 다음 사용하는 것이 일반적`

```jsx
function foo() {
  x = 10;
}
foo();
console.log(x); // 10

/*
- foo 함수가 실행
- foo 함수 내부에서 x를 선언한 것은 없기 때문에, 스코프 체인에 의해 변수 x를 검색한다.
- 전역 스코프까지와 왔지만, x는 존재하지 않는다. -> 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다.
- 생성된 전역 객체에 x 프로퍼티에 10을 할당한다.
- foo 함수의 실행이 끝나고, console 에 암묵적으로 생성된 x를 참조하여 10이 출력된다.
*/
```

<br />
<br />

# strict mode

> 자바스크립트 언어의 문법을 좀 더 `엄격히` 적용하여 오류를 발생시킬 가능성이 높거나, 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

- 참고로, `ESLint` 같은 `린트 도구` 를 사용해도 `strict mode` 와 유사한 효과를 얻을 수 있다.
  - 뿐만 아니라, 린트 도구는 `정적 분석(static analysis)` 기능을 통해 소스코드를 실행하기 이전(즉, 런타임이전)에 소스코드를 검사해준다.
  - 문법적 오류만이 아니라, 잠재적 오류까지 찾아내고 오류의 원인을 알려주는 기능까지 해준다.
  - 또한, 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 협업에 필요한 강력한 효과를 얻을 수 있다.

<br />

### strict mode 적용

> 전역의 선두 or 함수 몸체의 선두에 `use strict` 를 추가한다.

- 코드의 선두에 위치시키지 않으면 `strict mode가 정상적으로 동작하지 않는다.`

```jsx
// 전역에 strict mode 선언
'use strict'
...
```

```jsx
function foo() {
	// 함수 몸체 선두에 strict mode 선언
  'use strict'
	...
}
```

<br />

### 전역에 strict mode 는 피하자.

> 전역에 적용한 `strict mode` 는 `스크립트 단위로 적용된다.`

- 여러 스크립트가 통합되어 사용되는 프로그램이 일반적이며, 그러한 프로그램 안에서 `strict mode` 는 각 스크립트 단위로 적용된다.
- 어떤 스크립트는 `non-strict mode` 인데, 이 둘을 혼용하는 것은 오류를 발생시킬 수 있다.
  - 특히, 외부 서드파티 라이브러리르 사용하는 경우가 `non-strict mode` 일 경우가 있다.
- 그래서, `strict mode` 를 사용시, `즉시 실행 함수` 로 `스크립트를 감싸서 스코프를 구분해서, 다른 스크립트 파일에 영향이 받질 않도록 사용하는 것`이 바람직하다.

```jsx
// 즉시 실행함수 내부에서 use strict 적용
(function () {
  "use strict";

  // code ...
})();
```

<br />

### 함수 단위로 strict mode 사용하는 것도 피하자.

> 모든 함수에 `strict mode` 를 적용하는 것도 번거로우며, 어떤 함수는 `strict mode를 사용` , 어떤 함수는 `strict mode를 사용하지 않는 것` 은 바람직하지 않다.

- 따라서, 앞서 언급했듯이 `strict mode` 는 `즉시 실행 함수` 로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

<br />

### strict mode가 발생시키는 에러

- `암묵적 전역` → `ReferenceError`
  - 선언하지 않은 변수를 참조할 경우 에러 발생시킨다.
  ```jsx
  (function () {
    ("use strict");

    x = 1;
    console.log(x); // ReferenceError: x is not defined
  })();
  ```
- `변수, 함수, 매개변수의 삭제` → `SyntaxError`
  - `delete 연산자` 로 변수, 함수, 매개변수를 삭제하려고 할 경우 에러 발생시킨다.
- `매개변수 이름의 중복` → `SyntaxError`
  - 중복된 매개변수 이름을 사용할 경우 에러 발생시킨다.
- `with 문의 사용` → `SyntaxError`
  - 사용할 경우 그냥 에러 발생시킨다.
  - [with 문](<[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/with](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/with)>) 은 성능과 가독성 측면에서 모두 안좋으므로 그냥 사용하지 않는다.

<br />
<br />

# strict mode 적용에 대한 변화

### 일반 함수의 this

> `strict mode` 에서 함수를 일반 함수로서 호출하면 `this에 undefined가 바인딩 된다.`

- 생성자 함수가 아닌 일반 함수 내부에서는 `this` 를 사용할 필요가 없기 때문이다.

```jsx
(function () {
  ("use strict");

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

<br />

### arguments 객체

> `strict mode` 에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments 객체에 반영되지 않는다.`

```jsx
(function (a) {
  ("use strict");

  a = 2;

  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
