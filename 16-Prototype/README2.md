# 리터럴 표기법으로 생성된 객체의 생성자 함수와 프로토타입

> 리터럴 표기법( `{ }` ) 으로 생성된 객체의 프로토타입의 경우, `constructor 프로퍼티` 가 가리키는 생성자 함수가 `반드시 객체를 생성한 생성자 함수가 아닐 수 있다.`

```jsx
// 객체 리터럴로 obj 객체 생성
const obj = {};

// obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

<br />

### ECMAScript의 OrdinaryObjectCreate 추상연산 호출에 의한 객체 생성

> `추상연산` : ECMAScript 내부 동작의 구현 알고리즘을 의미

- `OrdinaryObjectCreate` 를 호출하면, 기본적으로 `Object.prototype` 을 프로토타입으로 갖는 `빈 객체를 생성`
- Object 생성자 함수 호출과 객체 리터럴의 평가는 `OrdinaryObjectCreate를 호출` 해서 `빈 객체를 생성`하는다는 점은 동일
  - 다만, `new.target 의 확인`, `프로퍼티 추가하는 처리` 등 세부 처리에서 차이가 있다.
  - 따라서, `객체 리터럴에 의해 생성된 객체 != Object 생성자 함수가 생성한 객체`

> `프로토타입`과 `생성자 함수` 는 언제나 `쌍(pair)으로 존재`

- 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |

<br />
<br />

# 프로토타입의 생성 시점

> 프로토타입은 `생성자 함수가 생성되는 시점에 더불어 생성된다.`

- 생성자 함수는 `사용자 정의 생성자 함수` 와 자바스크립트가 기본 제공하는 `빌트인 생성자 함수` 로 구분된다.

<br />

### 사용자 정의 생성자 함수와 프로토타입 생성 시점

> 함수 정의가 `평가` 되어 `함수 객체를 생성하는 시점` 에 프로토타입도 더불어 생성

```jsx
// 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입 더불어 생성
// 함수 호이스팅 적용
console.log(Person.prototype); // { constructor: f }

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

- 생성된 프로토타입은 `오직 constructor 프로퍼티` 만을 갖는 객체이다.
- 프로토타입도 객체이며, 모든 객체는 프로토타입을 가진다.
- 그러므로, 프로토타입도 자신의 프로토타입을 가진다.
  - 생성된 프로토타입의 프로토타입은 `Object.prototype`

<br />

### 빌트인 생성자 함수와 프로토타입 생성 시점

> 빌트인 생성자 함수는 `빌트인 생성자 함수가 생성되는 시점`에 프로토타입이 생성

- 모든 빌트인 생성자 함수는 `전역 객체가 생성되는 시점에 생성`
- 생성된 프로토타입은 빌트인 생성자 함수의 `prototype 프로퍼티에 바인딩`

<br />
<br />

# 객체 생성 방식과 프로토타입 결정

1. `객체 리터럴`
2. `Object 생성자 함수`
3. `생성자 함수`
4. `Object.create 메서드`
5. `클래스(ES6)`

> 다양한 방식의 차이가 있는 객체 생성방식이지만, `추상 연산 OrdinaryObjectCreate` 호출에 의해 객체가 생성된다는 것은 동일

- `OrdinaryObjectCreate` 호출로 `빈 객체를 생성` 하고
- 객체에 추가할 프로퍼티 목록이 인수로 전달될 경우 `프로퍼티를 객체에 추가`
- 인수로 전달받은 프로토타입을 자신이 생성한 객체의 `[[Prototype]] 내부 슬롯` 에 할당한 다음, `생성한 객체를 반환`

<br />

### 객체 리터럴에 의해 생성된 객체의 프로토타입

> 객체 리터럴에 의해 생성되는 객체의 프로토타입은 `Object.prototype`

```jsx
// 객체 리터럴로 생성된 obj 객체
const obj = { x: 1 };

// obj 객체에는 constructor 프로퍼티와 hasOwnProperty 메서드를 소유하지 않는다.
// 사용가능한 것은 Object.prototype 에 있는 프로퍼티를 상속받았기 때문이다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

<br />

### Object 생성자 함수에 의해 생성된 객체의 프로토타입

> Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 `Object.prototype`

```jsx
// Object 생성자 함수로 생성된 obj 객체
const obj = new Object();
obj.x = 1;

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

<br />

### 생성자 함수에 의해 생성된 객체의 프로토타입

> 생성자 함수에 의해 생성되는 객체의 프로토타입은 `생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체`

- 앞선 Object 생성자 함수와 객체 리터럴로 생성된 객체의 프로토타입인 `Object.prototype` 과 달리, 오로지 `constructor 프로퍼티만 존재한다.`

```jsx
// 사용자 정의 생성자 함수
function Person(name) {
  this.name = name;
}

// Person.prototype 에 프로퍼티를 동적으로 추가/삭제 가능
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 사용자 정의 생성자 함수로 생성된 인스턴스
const me = new Person("WI");
const you = new Person("KIM");

me.sayHello(); // Hi! My name is WI
you.sayHello(); // Hi! My name is KIM

console.log(me.constructor === Person); // true
console.log(you.constructor === Person); // true
```

<br />
<br />

# 프로토타입 체인

> 프로토타입의 프로토타입은 언제나 `Object.prototype` 이다.

- 자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티가 있는지 확인한다.
- 없다면 `[[Prototype]] 내부 슬롯의 참조값` 을 따라, 자신의 부모 역할을 하는 `프로토타입의 프로퍼티` 를 `순차적으로 검색`
- 이를 `프로토타입 체인` 이라 한다.
- 이는, 자바스크립트가 객체지향 프로그래밍의 `상속` 을 구현하는 메커니즘이 된다.

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("WI");

console.log(me.hasOwnProperty("name")); // true
// 1. hasOwnProperty 메서드가 me 객체에 프로퍼티에 존재하는지 검색한다.
// 2. 없기 때문에, me 객체의 [[Prototype]] 내부 슬롯의 참조값을 통해, Person.prototype 객체의 프로퍼티를 검색
// 3. Person.prototype 에도 hasOwnProperty 메서드가 없으므로, [[Prototype]] 내부 슬롯의 참조값을 통해 Object.prototype 프로퍼티를 검색
// 4. Object.prototype 에는 hasOwnProperty 메서드가 있으므로, 자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출
// (이 때 this 에는 me 객체가 바인딩된다.)
```

- 프로토타입 체인의 최상위에는 언제나 `Object.prototype` 이다.
- 따라서, 모든 객체는 `Object.prototype을 상속 받는다.`
  - `Object.prototype` 을 `프로토타입 체인의 종점(end of prototype chain)` 이라 한다.
  - `Object.prototype` 의 프로토타입은 없다. 즉 `null` 이다.
  - `Object.prototype` 에도 없는 프로퍼티를 조회할 경우, `undefined` 를 반환

<br />

### 프로토타입 체인 / 스코프 체인

- `프로토타입 체인`
  - 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티 & 메서드를 검색
  - 객체 간의 상속 관계로 이뤄진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색
  - 따라서, 프로토타입 체인은 `상속과 프로퍼티 검색을 위한 메커니즘`
- `스코프 체인`
  - 자바스크립트 엔진은 함수의 중첩 관계로 이뤄진 스코프의 계층적 구조에서 식별자를 검색
  - 따라서, 스코프 체인은 `식별자 검색을 위한 메커니즘`

> 스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아닌, `서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용`

- `스코프 체인` → `프로토타입 체인` 순

<br />
<br />

# 오버라이딩 / 프로퍼티 섀도잉

- 프로토타입이 소유한 프로퍼티 → `프로토타입 프로퍼티`
- 인스턴스가 소유한 프로퍼티 → `인스턴스 프로퍼티`

```jsx
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi, My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("WI");
// Person.prototype 에 정의한 sayHello 메서드 호출
console.log(me.sayHello()); // Hi, My name is WI

// me 객체(인스턴스)에 메서드 정의
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
// 인스턴스 메서드 정의 이후에는 Person.prototype 에 sayHello가 아닌, 인스턴스에 정의한 sayHello를 호출
console.log(me.sayHello()); // Hey! My name is WI
```

- 동일한 이름의 프로퍼티에 대해
  - 인스턴스 메서드가 프로토타입의 메서드를 → `오버라이딩(overriding)`
  - 프로토타입 메서드는 인스턴스 메서드로 인해 프로퍼티가 가려짐 → `프로퍼티 섀도잉(property shadowing)`

```jsx
오버라이딩(overriding)
+ 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

오버로딩(overloading)
+ 함수의 이름은 동일하나, 매개변수의 타입 또는 개수가 다른 메서드를 구현하고, 매개변수에 의해 메서드를 구별하여 호출하는 방식
+ 자바스크립트에서는 오버로딩을 지원하지 않는다. ( 다만, arguments 객체를 사용하여 구현할 수는 있다. )
```

> 프로퍼티의 오버라이딩 개념을 통해, 프로토타입에 `프로퍼티를 추가(get 엑세스)` 는 가능하나, `프로퍼티를 변경/삭제(set 엑세스)` 는 불가

```jsx
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi, My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("WI");

// me 객체(인스턴스)에 메서드 정의(추가)
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 프로토타입에 직접 접근하여 sayHello 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // Hey! My name is WI
me.prototype.sayHello(); // TypeError: Cannot read property 'sayHello' of undefined
```

<br />
<br />

# 프로토타입 교체

> 프로토타입은 다른 객체로 변경할 수 있다. 즉, `부모 객체인 프로토타입을 동적으로 변경할 수 있다.`

- 근데, 결론 먼저 말하면 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 번거로우며, 직접 프로토타입을 교체하는 것은 바람직하지 않다.
- 따라서, `직접 상속` 이나 `ES6+ 의 클래스` 를 사용하면 간편하고 직관적으로 상속 관계를 구현할 수 있다.

<br />

### 생성자 함수에 의한 프로토타입 교체

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정하면 파괴를 매꿀 수 있다.
    // constructor: Person,
    sayHello() {
      console.log(`Hi, My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("WI");
// 생성자 함수에 프로퍼티로 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype 의 constructor 프로퍼티가 검색
console.log(me.constructor === Object); // true << 🔍
```

<br />

### 인스턴스에 의한 프로토타입 교체

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("WI");

const parent = {
  // 생성자 함수에 의한 프로토타입 재정의 때와 같이 constructor가 파괴되는 것을 constructor 를 해당 생성자 함수로 재설정하면 매꿀 수 있다.
  // constructor: Person,
  sayHello() {
    console.log(`Hi, My name is ${this.name}`);
  },
};

Object.setPrototypeOf(me, parent);
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

---

- [프로토타입-1](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/16-Prototype/README.md)
- [프로토타입-3](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/16-Prototype/README3.md)
