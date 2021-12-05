# 원시 타입과 객체 타입의 대표적 차이점

> 1️⃣ `원시 타입의 값 === 원시 값` 은 `변경 불가능한 값(immutable value)` 이다.
> `객체 타입의 값 === 객체` 는 `변경 가능한 값(mutable value)` 이다.

> 2️⃣ 원시 값을 변수에 할당하면 `변수에는 실제 값이 저장`된다.
> 객체를 변수에 할당하면 `변수에는 참조 값이 저장`돤다.

> 3️⃣ 원시 값을 갖는 변수를 다른 변수에 할당하면 원시 값이 복사되어 전달 → `값에 의한 전달(pass by value)`
> 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달 → `참조에 의한 전달(pass by reference)`

<br>
<br>

# 원시 값

> 원시 값은 `변경 불가능한 값(immutable value)` == `읽기 전용(read only) 값`

- `변경 불가능하다.`
  - `변수`는 하나의 값을 저장하기 위해 확보한 메모리 공간 or 메모리 공간을 식별하기 위해 붙인 이름
  - `값`은 변수에 저장된 데이터
  - 변경 불가능하다는 것은 변수가 아니라 `값에 대한 진술` 이다.
  - 즉, "원시 값은 변경 불가능하다."
    - `원시 값 자체를 변경할 수 없다. → O`
    - `변수 값을 변경할 수 없다. → X`

```jsx
// 💡 변수 vs 상수

변수(variable)
+ 변수는 언제든지 "재할당"을 통해 변수 값을 변경(= 정확히는 "교체")할 수 있다. 그래서 "변수"다.

상수(constant)
+ 상수도 값을 저장하기 위한 메모리 공간이 필요하므로 "변수"라고 할 수 있다.
+ 하지만, 상수는 단 한 번만 할당이 허용하므로 변수 값을 변경(= 정확히는 "교체")할 수 없다.
```

<br>

### 불변성

> `불변성(immutability)` = 변수 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경하는 것

- 불변성을 갖는 원시 값을 할당한 변수의 값을 변경하는 유일한 방법 = `재할당`

```jsx
// 'string' 에서 첫 번째 's' 를 'S' 로 변경하려 하지만 str 변수는 "문자열, 즉 원시 값"
// 원시 값은 변경 불가능한 값(immutable value) -> 값이 업데이트 되지 않는다.
var str = "string";
str[0] = "S";

console.log(str); // "string"

// 재할당으로 값을 변경하는 것은 가능
var str = "Hello";
str = "World";

console.log(str); // "World"
```

```jsx
💡 유사 배열 객체

+ 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있으며, length 프로퍼티를 갖는 객체
+ length 프로퍼티를 갖기 때문에 "유사 배열 개체" 이며, for 문으로 순회도 가능
```

<br>

### 값에 의한 전달

> `값에 의한 전달(pass by value)` : 변수에 원시 값을 갖는 변수를 할당하면 할당받은 변수에는 할당되는 `변수의 원시 값이 복사되어 전달되는 것`

```jsx
var score = 80;
var copy = score;

score = 100;

console.log(score); // 100 (원본 값)
console.log(copy); // 80  (복사한 값)
```

![값에 의한 전달](https://publizm.github.io/static/26d07019c1d783aa33e89e4e9569378e/867c0/memory_change.jpg)

```
[ 💡 값이 아닌 메모리 주소를 전달 ]

+ 변수에는 값이 전달되는 것이 아니라 "메모리 주소가 전달"되기 때문
+ 같은 말로, 변수와 같은 "식별자"는 값이 아닌 "메모리 주소를 기억"하고 있다.
```

> 한 변수에 원시 값을 갖는 변수를 할당하면, 두 변수의 원시 값은 `서로 다른 메모리 공간에 저장된 별개의 값이 되어, 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다는 것`

<br>
<br>

# 객체

[자바스크립트 객체의 관리 방식](<[https://codeburst.io/objects-and-hash-tables-in-javascript-a472ad1940d9](https://codeburst.io/objects-and-hash-tables-in-javascript-a472ad1940d9)>)

[자바스크립트 V8 엔진 - 히든 클래스(hidden class)](<[https://meetup.toast.com/posts/78](https://meetup.toast.com/posts/78)>)

> `객체(참조) 타입의 값` == `변경 가능한 값(mutable value)`

- `변경 가능하다`
  - 객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 `원시 `값이 아닌`, `참조 값(reference value)` 에 접근한다.
    - `참조 값(reference value)` = 생성된 객체가 저장된 메모리 공간의 주소, 그 자체
  - 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다.
  - 즉, 재할당 없이 `프로퍼티를 동적으로 추가`, `프로퍼티 값을 갱신`, `프로퍼티 자체를 삭제도 가능`

```jsx
var person = {
  name: "WI",
};

// 프로퍼티 값 갱신
person.name = "Kim";

// 프로퍼티 값 동적 추가
person.address = "Seoul";

console.log(person); // { name: 'Kim', address: 'Seoul' }
```

![Untitled](https://publizm.github.io/static/01d4e5c59a62aa8d5f44a2b9a8879da6/867c0/memory_add.jpg)

> 자바스크립트 객체가 `변경가능한 값` 이어야하는 이유는 `메모리의 효율적 소비가 어렵고 성능이 나빠지는 것을 최소화 하기 위해서다.`

- 객체를 원시 값처럼 `이전 값을 복사해서 새롭게 생성` 한다면 → 명확하고 신뢰성이 확보
- 하지만, 객체는 `크기가 매우 클 수 있고`, `원시 값처럼 크기가 일정하지도 않고`, `프로퍼티 값이 객체일 수도 있어서 복사(deep copy)해서 생성하는 비용이 많이 든다.`
- 따라서, 객체를 복사해 생성하는 비용을 절약하여 성능을 향상시키기 위해 객체는 변경 가능한 값으로 설계한 것이다.

```
[ 💡 단점 ]

+ 여러 개의 "식별자"가 하나의 객체를 "공유"할 수 있다는 점
```

<br>

### 참조에 의한 전달

> `참조에 의한 전달(pass by reference)` : 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 `참조 값이 복사되어 전달되는 것`

```jsx
var person = {
  name: "WI",
};

// "참조 값"을 복사, copy와 person이 동일한 객체를 참조한다.
var copy = person;
console.log(copy === person); // true

// copy를 통해 객체의 name 프로퍼티를 변경
copy.name = "Kim";

// person을 통해 객체의 address 프로퍼티를 동적 생성
person.address = "Seoul";

console.log(person); // { name: 'Kim', address: 'Seoul' }
console.log(copy); // { name: 'Kim', address: 'Seoul' }
```

![참조에 의한 전달](https://publizm.github.io/static/06e7e7bcae8c1794c5af8a552873311d/867c0/memory_reference.jpg)

<br>

### 얕은 복사 & 깊은 복사

> [얕은 복사 vs 깊은 복사](<[https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d](https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d)>)

- `얕은 복사(shallow copy)` : depth 가 `1 까지만 복사`하는 것, `객체의 중첩된 객체는 참조 값을 복사`
- `깊은 복사(deep copy)` : depth 가 `2이상도 전부 복사`하는 것, `객체의 중첩된 객체까지 원시 값처럼 완전히 복사`

```
[ 💡 "값의 의한 전달만 있다." ]

+ "값에 의한 전달"과 "참조에 의한 전달" 모두 식별자가 기억하는 "메모리 공간에 저장되어 있는 값을 복사해서 전달한다"는 공통점
+ 단지, 전달하는 값이 "원시 값" 이냐 "참조 값" 이냐의 차이일 뿐이다. (전자 -> 원시타입, 후자 -> 객체타입)
```
