> `생성자 함수(constructor)` : `new 연산자` 와 함께 호출하여 객체(인스턴스)를 생성하는 함수

- `인스턴스(instance)` : 생성자 함수에 의해 생성된 객체
- 자바스크립트에서는 `Object` 생성자 함수 이외에도 `String, Number, Boolean, Function, Array, Date, RegExp, Promise` 등의 `빌드인(built-in)` 생성자 함수를 제공

<br />
<br />

# 객체 리터럴({ })에 의한 객체 생성 방식의 문제점

- 자바스크립트에서 객체를 생성하는 방법 중, `객체 리터럴({ ... })` 에 의한 객체 생성 방식은 직관적이고 간편하다.
- 단, 객체 리터럴에 의한 객체 생성 방식은 `단 하나의 객체만 생성`

```jsx
const person1 = {
  name: "WI",
  getPersonName() {
    return `Hi, My Name is ${this.name}`;
  },
};

console.log(person1.getPersonName()); // Hi, My Name is WI

const person2 = {
  name: "YOUNGMIN",
  getPersonName() {
    return `Hi, My Name is ${this.name}`;
  },
};

console.log(person2.getPersonName()); // Hi, My Name is YOUNGMIN
```

- 객체는 다음 2가지로 표현할 수 있다.
  - 프로퍼티를 통해 → 객체 고유의 `상태(state)`
  - 메서드를 통해 프로퍼티를 참조하고 조작하는 → 객체의 `동작(behavior)`
- 상태(state)의 경우는 객체마다 각기 다른 값을 가질 수 있으나
- 메서드(behavior)의 경우는 내용이 동일한 경우가 일반적이다. → `재활용성이 필요`
- 하지만, 객체 리터럴로 객체를 표현하는 경우, 프로퍼티의 구조가 동일함에도 불구하고, 매번 같은 프로퍼티와 메서드를 기술해야한다.

<br />

# 생성자 함수에 의한 객체 생성 방식의 장점

- 객체(인스턴스)를 생성하기 위한 `템플릿(클래스)` 처럼 생성자 함수를 사용해서 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// new 연산자와 함께 Person 객체(인스턴스) 생성
const person1 = new Person("WI");
const person2 = new Person("YOUNGMIN");

// 각 Person 객체의 메서드 호출
console.log(person1.getPersonName()); // Hi, My Name is WI
console.log(person2.getPersonName()); // Hi, My Name is YOUNGMIN
```

<br />

### 자바스크립트에서 생성자 함수

- 일반적인 클래스 기반 객체지향언어에서 생성자와는 다르게, 자바스크립트에서 생성자는 형식이 정해져 있지 않다.
  - `일반 함수와 동일한 방법으로 생성자 함수를 정의하고`
  - `new 연산자와 함께 호출하면`
  - 해당 함수는 생성자 함수로 동작하는 것
- 만약, `new 연산자` 와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라, `일반 함수로 동작`한다.

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 생성자 함수 Person 이지만, new 연산자와 함께 호출되지 않았으므로, Person 생성자함수는 일반함수로 호출된다.
// 일반 함수 관점에서 봤을 때, 함수 몸체 내부에서 반환하는 값은 없으므로, 암묵적으로 undefined 를 반환
const person1 = Person("WI");

console.log(person1); // undefined
console.log(name); // WI << 🔍
```

- 위에 예제에서 `name` 프로퍼티는, `전역 객체의 프로퍼티로 등록`된다.

<br />
<br />

# 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 몸체에서 수행하는 과정은 다음과 같다.
  - `인스턴스를 생성 → 필수 작업`
  - `생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당) → 옵션 작업`

> `new 연산자` 와 함께 `생성자 함수를 호출하면`, 자바스크립트 엔진은 다음과 같은 과정을 거쳐 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

<br />

### 1. 인스턴스 생성과 this 바인딩

- 암묵적으로 `빈 객체가 생성`
- 이 빈 객체가 아직은 미완성된 `생성자 함수가 생성한 인스턴스`
- 이 빈 객체(인스턴스)는 `this에 바인딩된다.`
  - [바인딩(binding)](<[https://ko.wikipedia.org/wiki/네임_바인딩](https://ko.wikipedia.org/wiki/%EB%84%A4%EC%9E%84_%EB%B0%94%EC%9D%B8%EB%94%A9)>) : `식별자(identifier)` 와 `값(value)` 을 연결하는 과정
  - `this 바인딩` 은 `this` 와 `this가 가리킬 객체`를 바인딩하는 것

> 위에 처리과정은 함수 몸체의 코드가 한 줄씩 실행되는 `런타임` 이전에 실행

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩
  console.log(this); // Person {}

  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}
```

<br />

### 2. 인스턴스 초기화

- 생성자 함수 몸체에 기술되어 있는 코드가 한 줄씩 실행되면서 `this에 바인딩되어 있는 인스턴스를 초기화`
- 인스턴스에 `프로퍼티나 메서드를 추가`하고 생성자 함수가 `인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당`

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}
```

<br />

### 3. 인스턴스 반환

- 생성자 함수 몸체의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this(= 생성자 함수에 의해 생성된 인스턴스)가 `암묵적으로 반환`

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  // 3. 완성된 인스턴스가 바인딩된 this(= 인스턴스)가 암묵적으로 반환된다.
}

// 인스턴스를 생성, Person 생성자 함수는 암묵적으로 this(Person 인스턴스)를 반환한다.
const person = new Person("WI");
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

- 여기서, 바인딩 된 `this를 암묵적으로 반환하는 것 대신`, 다른 객체를 명시적으로 반환할 경우, `return 문에 명시한 객체가 반환된다.`
  - 또한, 명시적으로 `원시값(primitive values)` 을 반환할 경우, `원시 값은 무시`되고, `암묵적으로 this 가 반환된다.`

> 결론적으로, 생성자 함수 내부에서 명시적으로 `this 가 아닌 다른 값을 반환` 하는 것은, 생성자 함수의 기본 동작을 훼손하는 것이므로, 반드시 `생성자 함수 내부에서는 return 문을 생략할 것`

```jsx
// case 3-1 : 생성자 함수 내부에서, 명시적인 다른 객체를 반환할 경우
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  return {};
}

const person = new Person("WI");
console.log(person); // {}

// =============== 절취선 ==================

// case 3-2 : 생성자 함수 내부에서, 명시적인 원시값을 반환할 경우
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  return 10000;
}

const person = new Person("WI");
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

<br />
<br />

# 내부 메서드 [[call]] 과 [[construct]]

> 자바스크립트에서 함수는 객체이지만 일반 객체와는 다르다.

- 일반 객체는 `호출할 수 없다.`
- 함수는 `호출할 수 있다.`
- 이와 같은 차이점은
  - 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론
  - 함수 객체만을 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 `[[ Call ]], [[ Construct ]] 같은 내부 메서드`를 추가로 가지고 있기 때문이다.

<br />

### [[Call]] 과 [[Construct]]

> 함수가 일반 함수로 호출되면 → 함수 객체 내부 메서드 `[[ Call ]]` 이 호출
> 함수가 생성자 함수로 호출되면 → 함수 객체 내부 메서드 `[[ Construct ]]` 이 호출

- 내부 메서드 `[[ Call ]]` 을 갖는 함수 객체 → `callable`
- 내부 메서드 `[[ Construct ]]` 을 갖는 함수 객체 → `constructor`
  - 내부 메서드 `[[ Construct ]]` 을 갖지 않는 함수 객체 → `non-constructor`

<br />

### constructor 와 non-constructor

> 생성자 함수로 호출한다는 것 == `new 연산자와 함께 호출하여 객체를 생성한다는 것`

- `constructor` == 생성자 함수로 호출할 수 있는 형태 : `함수 선언문` , `함수 표현식`
- `non-constructor` == 생성자 함수로 호출할 수 없는 형태 : `화살표 함수` , `메서드(ES6 메서드 축약 표현)`

![https://poiemaweb.com/assets/fs-images/17-1.png](https://poiemaweb.com/assets/fs-images/17-1.png)

- 모든 함수 객체는 반드시 내부 메서드 `[[ Call ]]` 을 가지고 있다.
- 모든 함수 객체가 `[[ Construct ]]` 을 가지고 있는 것은 아니다.

> 즉, 함수 객체는 `callable` 이면서 `constructor` 이거나, `callable` 이면서 `non-constructor` 다.
> 모든 함수 객체는 호출할 수 있지만, 모든 함수 객체가 생성자 함수로써 호출할 수 있는 것은 아니다.

<br />
<br />

# new 연산자

> `new 연산자와 함께` 함수를 호출하면 해당 함수가 `생성자 함수로 동작`

- 즉, 함수 객체의 내부 메서드 중 `[[ Construct ]]` 가 호출된다는 것
- 단, 이 때 호출되는 함수는 `non-constructor` 가 아닌 `constructor` 여야한다는 것

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 일반 함수가 new 연산자와 함께, 생성자 함수로 호출
const person = new Person("WI");
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

> 반대로 `new 연산자 없이` , 생성자 함수를 호출하면 `일반 함수로 동작`

- 즉, 함수 객체 내부 메서드 중 `[[ Call ]]` 가 호출된다는 것

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 생성자 함수가 new 연산자 없이, 일반 함수로 호출
const person = Person("WI");
console.log(person); // undefined << 🔍 반환 값이 없으므로 결과는 undefined
```

```
[ 💡 PascalCase ]

+ 자바스크립트에서 일반 함수와 생성자 함수같이 형식적으로 차이가 없는 것에 구분을 짖기 위해 사용된다.
+ 자바스크립트에서 일반적으로 생성자 함수는 PascalCase로 선언하여 일반 함수와 구분한다.
+ 즉, 함수명의 첫 문자를 대문자로 표현한다.
```

<br />
<br />

# new.target

> `new.target` : ES6에 도입되어, `new 연산자` 와 함께 생성자 함수로서 호출되었는지 확인할 수 있는 문법

- `new 연산자와 함께` 생성자 함수로서 호출되면 함수 내부의 `new.target` 은 `함수 자신`을 가리킨다.
- `new 연산자 없이` 일반 함수로서 호출된 함수 내부의 `new.target` 은 `undefined` 를 가리킨다.

```jsx
// 생성자 함수 Person 선언
function Person(name) {
  // Person 생성자 함수가 호출되면, 가장 먼저 new 연산자와 함께 호출된 것인지 확인
  if (!new.target) {
    // new 키워드와 함께 호출된 것이 아니면, 함수 내부에서 재귀로 new 연산자와 함께 Person 생성자 함수를 호출
    return new Person(name);
  }

  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// new 연산자 없이 생성자 함수를 호출
const person = Person("WI");

// 그럼에도 불구하고, Person 인스터스가 정상적으로 생성되었고, 내부 메서드 호출됨
console.log(person.getPersonName()); // Hi, My Name is WI
```

- 단, `IE` 에서는 이 기능을 지원하지 않는다.

<br />
<br />

# 스코프 세이프 생성자 패턴

> `IE` 같은 `new.target` 을 지원하지 않는 브라우저 환경에서, `생성자 함수를 보장하는 방법`

```jsx
// Scope-Safe Constructor Pattern
function Person(name) {
  // Person 생성자 함수가 new 연산자와 함께 호출되지 않는 경우, this 는 전역 객체 window 를 가리킨다.
  // 즉, this 는 Person 과 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Person)) {
    // new 연산자와 함께 호출된 Person 인스턴스를 반환하도록 재귀호출 한다.
    return new Person(name);
  }

  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// new 연산자 없이 생성자 함수를 호출
const person = Person("WI");

// 그럼에도 불구하고, Person 인스터스가 정상적으로 생성되었고, 내부 메서드 호출됨
console.log(person.getPersonName()); // Hi, My Name is WI
```

- 스코프 세이프 생성자 패턴은 대부분의 빌트인 생성자 함수에 대해서도 적용되어, `new 연산자와 함께 호출되었는지를 확인 후 적절한 값을 반환시킨다.`
  - 단, 원시타입의 빌트인 생성자 함수( `Number, String, boolean` ) 에 대해서는 이를 보장하지 않고, 원시 값을 반환하기도 한다.

```jsx
const num = Number("123");
console.log(num, typeof num); // 123 number

const str = String(123);
console.log(str, typeof str); // 123 string

const bool = Boolean("true");
console.log(bool, typeof bool); // true boolean
```
