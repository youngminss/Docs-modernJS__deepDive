# 함수의 구분

> `ES6 이전` 에는 모든 함수는 `일반 함수로써 호출` 할 수 이쓴 것은 물론 `생성자 함수로서 호출` 할 수도 있었다.
> 즉, `callable & constructor` 였다.

- `ES6 이후` 에는 함수를 사용 목적에 따라 명확히 세 가지 종류로 구분했다.
  | ES6 함수의 구분 | constructor | prototype | super | arguments |
  | --------------- | ----------- | --------- | ----- | --------- |
  | 일반 함수       | O           | O         | X     | O         |
  | 메서드          | X           | X         | O     | O         |
  | 화살표 함수     | X           | X         | X     | X         |

<br />
<br />

# 메서드

> `ES6 이후` , 메서드는 `메서드 축약 표현으로 정의된 함수만을 의미`

```jsx
const obj = {
  x: 1,
  // foo는 ES6 기준, 메서드다.
  foo() {
    return this.x;
  },
  // bar는 ES6 기준, 메서드가 아니다.
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

- `ES6 메서드` 는 `인스턴스를 생성할 수 없는 non-constructor 다.` 즉, `생성자 함수로서 호출할 수 없다.`
  - 생성자 함수로 호출할 수 없기 때문에, `인스턴스 생성이 불가능`
  - `prototype 프로퍼티가 없고, 프로토타입을 생성하지도 않는다.`
- `ES6 메서드` 는 자신을 바인딩한 객체를 가리키는 `[[ HomeObject ]] 내부 슬롯을 갖는다.`
  - `super 참조` 는 `[[ HomeObject ]]` 를 참조하여 수퍼클래스의 메서드를 참조하므로, `ES6 메서드는 super 키워드를 사용할 수 있다.`
- 이로써, `본연의 기능(super)을 추가`하고 `의미적으로 맞지 않는 기능(constructor)은 제거`할 수 있게 되었다.

<br />
<br />

# 화살표 함수

> `ES6` 의 `화살표 함수(arrow function` 는 `function 키워드 대신, 화살표(=>)` 를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의하는 방식이다.

- 실제 내부 동작도 기존 함수보다 간략하다.
- 또한, `콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안`으로 사용된다.

<br />

### 화살표 함수 정의

- `함수 표현식으로만 정의해야 한다.`
  ```jsx
  const arrowFunc = () => {};
  ```

<br />

### 매개변수 선언

- 매개변수가 여러 개 → `소괄호() 안에 매개변수 선언`
- 매개변수가 한 개 → `소괄호 생략 가능`
- 매개변수가 없는 경우 → `소괄호 명시`
  ```jsx
  // 매개변수가 여러 개
  const arrowFunc = (x, y) => { ... };

  // 매개변수가 한 개
  const arrowFunc = x => { ... };

  // 매개변수가 없음
  const arrowFunc = () => { ... };
  ```

<br />

### 함수 몸체 정의

- 함수 몸체 내부의 문(statement)이 하나
  - `중괄호({}) 생략 가능`
  - `값으로 평가될 수 있는 표현식인 경우 -> 암묵적으로 반환`
- 함수 몸체 내부의 문이 여러 개
  - `중괄호 명시`
  - `반환 값이 존재할 경우, return 문을 명시`
  - `객체 리터럴을 반환 시 -> 소괄호로 감싸줄 것`
- 화살표 함수는 `즉시 실행 함수` 로 사용가능
- 화살표 함수도 `일급 객체` 이므로, `고차 함수(함수를 인자로 받을 수 있는 함수)에 인수로 전달 가능`
  - 이 때, 간결한 화살표 함수를 인수로 전달하는 것이 가독성에 좋음
  - 즉, `콜백 함수로서 정의할 때 유용`

```jsx
// 함수 몸체가 한 줄이면, 중괄호 생략 가능
const increase = (x) => ++x;

// 객체 리터럴 반환 시, 소괄호 명시
const create = (id, content) => ({ id, content });
// == const create = (id, content) => { return { id, content }; };

// 함수 몸체가 여러 줄이면, 중괄호 명시
const sum = (a, b) => {
  const result = a + b;
  return result;
};

// 화살표 함수 즉시 실행 함수로 사용 가능
const person = ((name) => ({
  sayHi() {
    return `My name is ${name}.`;
  },
}))("WI");

console.log(person.sayHi()); // My name is WI.

// 화살표 함수는 일급 객체로 사용 가능 -> 고참함수의 콜백함수로 사용하기 적절
console.log([1, 2, 3].map((v) => v * 2)); // [ 2, 4, 6 ]
```

<br />

### 일반 함수 vs 화살표 함수

- 화살표 함수는 `인스턴스를 생성할 수 없는 non-constructor 다.`
  ```jsx
  // 화살표 함수는 인스턴스 생성이 불가
  const Foo = () => {};
  new Foo(); // TypeError: Foo is not a constructor
  ```
- `중복된 매개변수 이름을 선언할 수 없다.` ( 단, strict mode 에서 )
  ```jsx
  // 화살표 함수는 매개변수 중복을 허용하지 않음
  "use strict";
  function normal(a, a) {
    return a + a;
  }

  // SyntaxError: Duplicate parameter name not allowed in this context
  ```
- `화살표 함수는 함수 자체의 this, arguments, super, [new.target](http://new.target) 바인딩을 갖지 않는다.`
  - 따라서, 스코프 체인을 통해 상위 스코프의 this, arguments super, [new.target](http://new.target) 을 참조
  - 화살표 함수가 중첩되어 있어도, 화살표 함수들은 자체적으로 바인딩하지 않으므로, 외부에 가장 가까운 상위 스코프 함수의 바인딩
  ```jsx
  // 💡 화살표 함수는 this, arguments, super, new.target 바인딩을 갖지 않는다.
  class Prefixer {
    constructor(prefix) {
      this.prefix = prefix;
    }

    add(arr) {
      // 1️⃣ 이 시점에서 this는 Prefixer 객체를 바인딩한다.

      return arr.map(function (item) {
        return this.prefix + item; // 2️⃣ 일반함수로 전달한 콜백함수 내에서 this는 undefined 를 바인딩 ( class 에선 암묵적으로 strict mode 적용 )
        // TypeError: Cannot read property 'prefix' of undefined
      });
    }
  }

  const prefixer = new Prefixer("pre-");
  console.log(prefixer.add(["AAA", "BBB"]));
  ```

<br />

### 화살표 함수의 this

> 화살표 함수는 다른 함수의 인수로 전달되어 `콜백 함수` 로 사용되는 경우가 많다.
> 이 때, 화살표 함수의 `this` 는 일반 함수에서와 다르게 동작한다.

- 이는, `콜백 함수 내부의 this 문제` 를 해결하기 위해 설계된 것
- 일반함수 내부에서 `this`는 일반적으로, `함수가 누구에 의해 호출되었는지, 즉 동적으로 결정한다.`
- 고차함수의 인수로 전달된 콜백함수가 일반 함수인 경우 → 내부에서 this를 참조시 undefined
  - 일반 함수로 정의된 콜백 함수의 경우, 기본적으로는 전역 객체에 바인딩되머, strict mode 에서는 undefined에 바인딩되기 때문
  - 이것이, 일반 함수로 콜백 함수를 전달할 경우의 `콜백 함수 내부의 this 문제` 이다.
  - 콜백 함수의 this 와 외부 함수의 this가 서로 다른 값을 가리키고 있기 때문에 TypeError가 발생하는 것
- `ES6 이전`, 이 문제를 해결하기 위한 방법은 다음과 같다.
  1. 참조할 this를 콜백 함수 외부에서 변수에 저장한 뒤, 콜백 함수 내부에서 사용
  2. 고차함수의 두 번째 인수로 사용할 this를 전달
  3. Function.prototype.bind 메서드로 사용할 this를 바인딩하기

> 화살표 함수는 `함수 자체의 this 바인딩을 갖지 않는다.`

- 따라서, 함수 내부에서 this를 참조하면 `상위 스코프의 this를 참조한다.`
- 이를 `Lexical this` 라 한다.
  - 마치, 렉시컬 스코프와 같이 함수가 정의된 위치에 의해 결정되는 것처럼 보이기 때문
- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 Function.prototype 에 apply, call, bind 메서드를 사용해도 `화살표 함수 내부의 this를 교체할 수 없다.`

```jsx
// 💡 화살표 함수는 this, arguments, super, new.target 바인딩을 갖지 않는다.
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  // 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
  // 화살표 함수 내부에서 this를 참조하면 상위 스코프(현 시점에는 Prefixer 객체)의 this를 그대로 참조
  // = 렉시컬 this
  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("pre-");
console.log(prefixer.add(["AAA", "BBB"])); // [ 'pre-AAA', 'pre-BBB' ]
```

<br />

### super

> 화살표 함수는 `함수 자체의 super 바인딩도 갖지 않는다.`

- 함수 내부에서 super를 참조하면 this와 마찬가지로 `상위 스코프의 super를 참조`

```jsx
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `My name is ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super
  // 왜냐하면 Derived의 sayHi는 화살표 함수고, super 바인딩을 갖지 않으므로, constructor의 super를 참조하는 것
  // constructor는 생략되었지만, 암묵적으로 constructor가 생성된다.
  sayHi = () => `${super.sayHi()}`;
}

const derived = new Derived("WI");
console.log(derived.sayHi()); // My name is WI
```

<br />

### arguments

> 화살표 함수는 `함수 자체의 arugments 바인딩도 갖지 않는다.`

- 화살표 함수 내부에서 arguments 객체를 참조하면 this와 마찬가지로 `상위 스코프의 arguments를 참조`
- `arguments 객체의 경우`, 매개변수의 개수를 확정할 수 없는 `가변 인자 함수` 를 구현할 때 유용하다.
  - 하지만, 화살표 함수는 arguments 객체를 사용할 수 없기 때문에, 자신에게 전달된 인수 목록을 확인할 수 없고, 상위 함수의 인수 목록만 참조하므로 쓸모가 없다.
  - 딸서, 화살표 함수로 가변 인자 함수를 구현해야 할 때는 `반드시 Rest 파라미터` 를 사용해야 한다.

```jsx
// 화살표 함수는 자체적으로 arguments 객체를 생성하지 않는다.
const foo = () => console.log(arguments);

foo(1, 2); // ReferenceError: arguments is not defined
```

<br />
<br />

# Rest 파라미터

> 함수의 매개변수 이름 앞에 `세 개의 점(...)` 을 붙여서 정의한 매개변수를 의미

- Rest 파라미터는 함수에 전달된 인수들의 목록을 `배열로 전달`받는다.
- 일반 매개변수와 Rest 파라미터는 혼용해서 사용 가능하다.
  - 단, 혼용해서 사용할 경우, `Rest 파라미터는 항상 매개변수 마지막에 위치할 것`
- Rest 파라미터는 단 하나만 선언 가능
- Rest 파라미터는 선언한 매개변수 개수를 나타내는 `length 프로퍼티에 영향을 주지 않는다.`

```jsx
// Rest 파라미터
function foo(a, b, ...rest) {
  console.log(a, b, rest, `함수 객체의 length 프로퍼티 : ${foo.length}`);
}

foo(1, 2, 3, 4, 5); // 1 2 [ 3, 4, 5 ] 함수 객체의 length 프로퍼티 : 2
```

<br />
<br />

# 매개변수 기본값

> 자바스크립트 함수에서 인수가 전달되지 않은 매개변수는 `undefined` 다.

- 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다.
- 때문에, `매개변수의 기본값을 할당할 필요가 있다. ( = 일종의 방어 코드 )`
- `ES6` 에서 도입된 `매개변수 기본값` 을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화 할 수 있다.
  - `Rest 파라미터` 에는 기본값 지정을 할 수 없다.
  - 매개변수 기본값은 `length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.`

```jsx
// ES6 매개변수 초기화
function sum(a = 0, b = 0) {
  return a + b;
}

console.log(sum()); // 0
console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3
```
