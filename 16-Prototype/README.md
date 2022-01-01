> 자바스크립트는 객체 기반의 프로그래밍 언어다.
> 자바스크립트를 이루고 있는 거의 모든 것이 객체다.

- `원시 타입(primitive)` 의 값을 제외한 나머지 값들( `함수, 배열, 정규표현식 등` )은 모두 객체다.
- 자바스크립트만의 `프로토타입 기반의 객체지향 프로그래밍` 이 존재한다.

<br />
<br />

# 객체지향 프로그래밍

> 여러 개의 독립적 단위, 즉 `객체(object)의 집합` 으로 프로그램을 표현하는 것
> 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 반영한 것

- 실체는 특징이나 성질을 나타나는 `속성(property)` 을 가진다.
- 이를 통해 실체를 `인식하거나 구별` 한다.

<br />

### 추상화

> `추상화(abstraction)` : 객체의 다양한 속성 중에서 `프로그램에 필요한 속성만 간추려 내여 표현하는 것`

- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 `객체` 라고 표현할 수 있다.
  - 객체에는 크게 2가지 요소로 구성
    - `상태(state)` 를 나타내는 `프로퍼티(property)`
    - 상태를 조작하는 `행동(behavior)` 을 표현하는 `메서드(method)`
- 즉, 객체는 다른 말로 `상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조`

```jsx
// person 이라는 객체
// "name(이름)", "address(주소)"라는 속성(property)으로 표현하도록 가정
const person = {
  name: "WI",
  address: "Incheon",
};

// circle 이라는 객체
const circle = {
  // 원의 반지름 프로퍼티(상태)
  radius: 5,

  // 원의 지름을 구하는 메서드(행위)
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레를 구하는 메서드(행위)
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이를 구하는 메서드(행위)
  getArea() {
    return Math.PI * this.radius ** 2;
  },
};
```

<br />
<br />

# 상속과 프로토타입

> `상속(inheritance)` : 어떤 객체의 프로퍼티 or 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것

- 자바스크립트는 `프로토타입을 기반으로` 상속을 구현하여 `불필요한 중복을 제거` → 즉, `코드를 재사용`

다음 예시를 보자.

- `'원' 이란 객체` 에 대해, 각각의 원은 각기 `다른 반지름` 을 가질 수 있다.
- 하지만, 원의 반지름이 달라도 `원의 지름, 원주율, 원의 넓이` 를 구하는 방법은, 반지름 정보만 있으면 수학적으로 계산이 동일하다.
- 따라서, 각각의 원이란 객체에 대해, `반지름은 독립적으로` , `원의 반지름을 통해 구할 수 있는 정보는 공유` 하는 것이 효율적이다.

```jsx
// '원' 생성자 함수
function Circle(radius) {
  // 각각의 원 반지름 데이터(상태)는 독립접
  this.radius = radius;
}

// 원의 넓이를 구하는 메서드(행위)는 Circle 객체의 프로토타입에 등록하여 공유
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// '원' 객체(인스턴스) 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// 각기 다른 circle1 객체와 circle2 객체의 원의 넓이를 구하는 메서드 getArea는 이 둘의 동일한 Prototype 에 등록된 getArea
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

<br />

### 프로토타입

- 위에 예제에서 `프로토타입` 이라는 것을 언급했다.

> 자바스크립트는 `프로토타입(prototype)` 을 기반으로 상속을 구현한다.

- 위에 예제에서 `getArea 메서드` 는 `Circle 객체의 생성자 함수에 메서드로 등록한 것이 아닌, Circle 생성자 함수의 prototype 객체에 메서드로 등록한 것`
  - `생성자 함수에 메서드로 등록할 경우` → 각각의 객체에 `독립적인 동일한 기능을하는 메서드가 할당` → `메모리 소모`
  - `prototype 에 메서드로 등록할 경우` → 동일한 기능을 하는 `하나의 메서드를 여러 객체가 공유` , 각각의 객체는 `독립된 상태(state)만 관리할 수 있다.`

> 모든 객체(인스턴스)는 `자신의 프로토타입` , 즉 `상위(부모) 객체 역할을 하는 prototype 의 모든 프로퍼티와 메서드를 상속받는다.`

- 모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 가진다.
  - 이는 `프로토타입의 참조값`(null인 경우도 있음)
  - `[[Prototype]]` 에 저장되는 프로토타입은 `객체 생성 방식` 에 의해 결정
    - 예를 들어, 객체 리터럴( `{ }` ) 로 생성된 객체의 프로토타입 → `Object.prototype`
    - 생성자 함수에 의해 생성된 객체의 프로토타입 → `생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체`
  - 모든 객체는 `하나의 프로토타입을 갖는다.`
    - 모든 프로토타입은 생성자 함수와 `연결` 되어 있다.
    - 즉, `객체 - 프로토타입 - 생성자 함수`는 `연결`되어 있다.

![https://www.howdy-mj.me/static/a88859306abea59f9f7b0277f510fe8c/c1b63/connect.png](https://www.howdy-mj.me/static/a88859306abea59f9f7b0277f510fe8c/c1b63/connect.png)

<br />

### `__proto__` 접근자 프로퍼티

> 모든 객체는 `__proto__ 접근자 프로퍼티` 를 통해 자신의 프로토타입, 즉 `[[Prototype]] 내부 슬롯에 간접적으로 접근` 할수 있다.

`__proto__` 에 대해 다음 4가지를 주의하자.

1. `__proto__` 는 `접근자 프로퍼티다.`

   - 원래 내부슬롯과 내부 메서드는 직접적으로 접근 가능하지 않다고 했다.
   - 다만, `일부 내부 슬롯과 내부 메서드에 한하여` , 간접적으로 접근할 수 있는 수단을 제공한다고 했다.
     - `__proto__` 는 `접근자 프로퍼티` 이며, `[[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있다.`
     - `__proto__` 가 접근자 프로퍼티이므로, `getter/setter 접근자 함수` 를 통해, 프로토타입을 취득하거나 할당할 수 있는 것이다.

   ```jsx
   const obj = {};
   const parent = { x: 1 };

   // __proto__ 접근자 프로퍼티의 getter 접근자 함수로 obj 객체의 프로토타입 객체 취득
   console.log(obj.__proto__); // [Object: null prototype] {}

   // __proto__ 접근자 프로퍼티의 setter 접근자 함수로 obj 객체의 프로토타입에 값 할당
   obj.__proto__ = parent;
   console.log(obj.__proto__); // { x: 1 }
   ```

2. `__proto__ 접근자 프로퍼티` 는 `상속을 통해 사용된다.`

   - `__proto__ 접근자 프로퍼티` 는 객체가 직접 소유하고 있는 프로퍼티가 아닌, `Object.prototype 의 프로퍼티다.`
   - 즉, 모든 객체는 상속을 통해 `Object.prototype.__proto__ 접근자 프로퍼티` 를 사용할 수 있다.

   ```jsx
   const obj = {};

   // obj 객체는 __proto__ 접근자 프로퍼티를 직접 소유하지는 않는다.
   // Object.prototype 에 __proto__ 프로퍼티를 상속받아 사용하는 것이다.
   console.log(obj.hasOwnProperty("__proto__")); // false

   // __proto__ 접근자 프로퍼티는 모든 객체의 프로토타입 객체인 Object.protoype의 접근자 프로퍼티다.
   console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
   /*
   {
     get: [Function: get __proto__],
     set: [Function: set __proto__],
     enumerable: false,
     configurable: true
   }
   */

   // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용하는 것임을 증명
   console.log(obj.__proto__ === Object.prototype); // true
   ```

3. `__proto__ 접근자 프로퍼티` 를 통해 `프로토타입에 접근하는 이유`

   - `상호 참조` 에 의해 프로토타입 체인(참조 루프)이 생성되는 것을 방지하기 위해서이다.
     - 프로토타입 체인은 `단방향 연결 리스트로 구현` 되어야 한다.
     - 즉, 프로퍼티 식별자 검색 방향이 `한쪽 방향` 으로만 흘러야 한다.

   ```jsx
   const parent = {};
   const child = {};

   child.__proto__ = parent;
   parent.__proto__ = child; // TypeError: Cyclic __proto__ value
   ```

   ![https://media.vlpt.us/images/link717/post/4303840b-831a-407a-bd01-07992eaa7415/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-11-22%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.37.37.png](https://media.vlpt.us/images/link717/post/4303840b-831a-407a-bd01-07992eaa7415/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-11-22%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.37.37.png)

4. `__proto__ 접근자 프로퍼티` 를 `코드 내에서 직접 사용하는 것은 권장하는 않는다.`

   - 모든 객체가 `__proto__ 접근자 프로퍼티를 사용할 수 있는 것이 아니기 때문` → [직접 상속](...)
   - 따라서, `__proto__ 접근자 프로퍼티를 사용하는 대신`
     - 프로토타입 취득에 경우 → `Object.getPrototypeOf 메서드` 를
     - 프로토타입 교체에 경우 → `Object.setPrototypeOf 메서드` 를 사용하는 것을 권장

   ```jsx
   const obj = {};
   const parent = { x: 1 };

   // Object.getPropertyOf 메서드로 obj 객체의 프로토타입 취득
   console.log(Object.getPrototypeOf(obj)); // [Object: null prototype] {}

   // Object.setPrototypeOf 메서드롤 obj 객체의 프로토타입을 교체
   Object.setPrototypeOf(obj, parent);

   // obj 객체의 __proto__ 접근자 프로퍼티로 obj 객체의 프로토타입 변경사항을 조회
   console.log(obj.__proto__); // { x: 1 }
   ```

<br />

### 함수 객체의 prototype 프로퍼티

> 함수 객체만이 소유하는 prototype 프로퍼티는 `생성자 함수가 생성할 인스턴스(객체)의 프로토타입을 가리킨다.`

- 생성자 함수로서 호출할 수 없는 `non-constructor` 인 `화살표 함수, ES6 메서드 축약 표현으로 정의한 메서드` 는 prototype 프로퍼티를 소유하지 않고, 프로토타입도 생성하지 않는다.

```jsx
// 함수 객체는 protoype 프로퍼티를 가진다.
console.log(function () {}.hasOwnProperty("prototype")); // true

// 일반 객체는 prototype 프로퍼티를 가지지 않는다.
console.log({}.hasOwnProperty("prototype")); // false
```

> 모든 객체가 가지고 있는 `__proto__ 접근자 프로퍼티` 와 함수 객체만이 가지고 있는 `prototype 프로퍼티` 는 `동일한 프로토타입을 가리킨다.`

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("WI");

// Person 생성자 함수의 prototype 프로퍼티와 me 객체(인스턴스)의 __proto__ 접근자 프로퍼티가 가리키는 것은 동일한 프로토타입이다.
console.log(me.__proto__ === Person.prototype); // true
```

![https://media.vlpt.us/images/hangem422/post/5f078b80-9020-4ab4-9b28-42db98383620/javascript-prototype04.png](https://media.vlpt.us/images/hangem422/post/5f078b80-9020-4ab4-9b28-42db98383620/javascript-prototype04.png)

- 다만, 사용하는 주체가 다르다.

| 구분                      | 소유        | 값                  | 사용 주체   | 사용 목적                                                                    |
| ------------------------- | ----------- | ------------------- | ----------- | ---------------------------------------------------------------------------- |
| **proto** 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조값 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기위해 사용                       |
| prototype 프로퍼티        | constructor | 프로토타입의 참조값 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

<br />

### 프로토타입의 constructor 프로퍼티와 생성자 함수

- 모든 프로토타입은 `constructor 프로퍼티` 를 갖는다.
- 이는, `자신을 참조하고 있는 생성자 함수를 가리킨다.`
- 이 연결은 `생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.`

```jsx
function Person(name) {
  this.name = name;
}

const me = new Person("WI");

// me 객체의 생성자 함수는 Person
// me 객체의 constructor 프로퍼티(정확히는 me 객체의 프로토타입인 Person.prototype 에 constructor 프로퍼티)
console.log(me.constructor === Person); // true
```

---

- [프로토타입-2](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/16-Prototype/README2.md)
- [프로토타입-3](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/16-Prototype/README3.md)
