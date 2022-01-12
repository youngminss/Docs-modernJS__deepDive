> `제너레이터(generator)` : `ES6`에 도입, 코드 블록의 실행을 `일시 중지`했다가 `필요한 시점에 재개`할 수 있는 특수한 `함수`

- 일반 함수와 제너레이터 함수는 다음과 같은 차이점이 존재
  1. 제너레이터 함수는 `함수 호출자(caller)`에게 함수 실행의 제어권을 `양도(yield)할 수 있다.`
     1. 일반 함수는 한 번 호출하면 제어권이 함수에게 넘어간다. 즉, 함수 코드를 일괄 실행한다.
     2. 반면, 제너레이터 함수는 함수 호출자가 함수 실행을 일시 중지시키거나 특정 시점에서 재개시킬 수 있다.
     3. 이는 함수 제어권을 함수가 독점하는 것이 아닌, 함수 호출자에게 양도(yield)할 수 있음을 의미
  2. 제너레이터 함수는 `함수 호출자와 함수의 상태를 주고받을 수 있다.`
     1. 일반 함수는 함수가 호출되어 실행되는 동안 함수 외부에서(매개변수를 통해) 함순 내부로 값을 전달하여 함수의 상태를 변경할 수 없다. ( 단방향 )
     2. 반면, 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
     3. 즉, 제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수 있다.
  3. 제너레이터 함수는 함수를 호출하면 `제너레이터 객체를 반환한다.`
     1. 일반 함수를 함수를 호출하여 실행하면 코드를 일괄 실행하고 값을 반환
     2. 반면, 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아닌, 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환

<br />
<br />

# 제너레이터 함수 정의

> 제너레이터 함수는 `function* 키워드로 선언, 하나 이상의 yield 표현식을 포함`

```jsx
// 함수 선언문으로 제너레이터 함수 정의
function* generatorFunc() {
  yield 1;
}

// 함수 표현식으로 제너레이터 함수 정의
const generatorFunc = function* () {
  yield 1;
};

// 메서드로 제너레이터 함수 정의
const obj = {
  *generatorFunc() {
    yield 1;
  },
};

// 클래스의 메서드로 제너레이터 함수 정의
class MyClass {
  *generatorFunc() {
    yield 1;
  }
}
```

- `에스터리스크(*)의 위치`는 `function 키워드와 함수 이름 사이라면 어디든 상관없다.`

  - 다만, `일관성을 위해 function 키워드 바로 뒤에 붙이는 것을 권장`

  ```jsx
  // 이 형식을 권장 👍
  function* generatorFunc() {
    yield 1;
  }

  // 💩
  function* generatorFunc() {
    yield 1;
  }

  // 💩
  function* generatorFunc() {
    yield 1;
  }

  // 💩
  function* generatorFunc() {
    yield 1;
  }
  ```

- 제너레이터 함수는 `화살표 함수로 정의 불가`

```jsx
// 💩
const generatorFunc = * () => {
  yield 1;
}

// SyntaxError: Unexpected token '*'
```

- 제너레이터 함수는 `생성자 함수로 호출 불가`

```jsx
// 💩
function* generatorFunc() {
  yield 1;
}

new generatorFunc();
// TypeError: generatorFunc is not a constructor
```

<br />
<br />

# 제너레이터 객체

> `제너레이터 함수를 호출하면` 함수 코드 블록의 실행이 아닌, `제너레이터 객체를 반환한다.`

- `제너레이터 객체 = 이터러블(iterable) & 이터레이터(iterator)`

  - 즉, Symbol.iterator 메서드를 상속받는 이터러블인 동시에
  - { value, done } 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유한 이터레이터

  ```jsx
  function* generatorFunc() {
    yield 1;
    yield 2;
    yield 3;
  }

  // 제너레이터 호출 -> 제너레이터 객체 반환
  const generator = generatorFunc();

  console.log(generator); // Object [Generator] {}
  console.log(Symbol.iterator in generator); // true
  console.log("next" in generator); // true
  ```

- 제너레이터 객체는 추가적으로 이터레이터에는 없는 `return, throw 메서드를 갖는다.`

  - `next 메서드 호출`
    - 제너레이터 함수의 yield 표현식까지 코드 블록을 실행
    - yield 된 값을 value 프로퍼티 값으로
    - false 를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환
  - `return 메서드 호출`
    - 인수로 전달받은 값을 value 프로퍼티 값으로
    - true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환
  - `throw 메서드 호출`
    - 인수로 전달받은 에러를 발생시키고
    - undefined 를 value 프로퍼티 값으로
    - true 를 done 프로퍼티 값으로 갖는 이터레이터 갖는 이터레이터 리절트 객체를 반환

  ```jsx
  function* generatorFunc() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } catch (e) {
      console.log(e);
    }
  }

  const generator = generatorFunc();

  console.log(generator.next()); // { value: 1, done: false }
  console.log(generator.return()); // { value: undefined, done: true }
  ```

  ```jsx
  function* generatorFunc() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } catch (e) {
      console.log(e);
    }
  }

  const generator = generatorFunc();

  console.log(generator.next());
  // { value: 1, done: false }
  console.log(generator.throw("Error !"));
  // Error !
  // { value: undefined, done: true }
  ```

<br />
<br />

# 제너레이터의 일시 중지 & 재개

> 제너레이터는 `yield(양도) 키워드`와 `next 메서드`를 통해 `실행을 일시 중지(suspend)했다가 필요한 시점에 다시 재개(resume)할 수 있다.`

- `yield 키워드` : 제너레이터 함수의 실행을 일시 중지시키거나 `yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환`

  ```jsx
  function* generatorFunc() {
    yield 1;
    yield 2;
    yield 3;
  }

  // 제너레이터 객체 반환
  const generator = generatorFunc();

  console.log(generator.next()); // { value: 1, done: false }

  console.log(generator.next()); // { value: 2, done: false }

  console.log(generator.next()); // { value: 3, done: false }

  // 이 시점에서는 더 이상 제너레이터 함수 내부에 실행할 yield 표현식이 없다.
  // 제너레이터 함수는 종료
  console.log(generator.next()); // { value: undefined, done: true }
  ```

- 제너레이터 객체의 next 메서드를 호출 → `yield 표현식까지 실행되고 일시 중지된다.`
  - 이때 함수의 제어권은 함수 호출자(caller)에게 양도(yield)된다.
  - 이후, 필요한 시점에 호출자가 다시 next 메서드를 호출하면 일시 중지된 제너레이터 함수 코드부터 실행을 재개(resume)하기 시작
  - 다시, yield 표현식까지 실행되고 또 다시 일시 중지된다.
- `next 메서드의 결과는 { value, done } 프로퍼티를 갖는 이터레이터 리절트 객체를 반환`
  - value 프로퍼티 → yield 표현식에서 yield된 값이 할당
  - done 프로퍼티 → 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당
  ```jsx
  generator.next() -> yield -> generator.next() -> yield -> ... -> generator.next() -> return
  ```
- `제너레이터 객체의 next 메서드`는 이터레이터 next 메서드와 달리 `인수를 전달할 수 있다.`

  - next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당
  - `단, yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것에 주의할 것`

  ```jsx
  function* generatorFunc() {
    const x = yield 1;

    const y = yield x + 10;

    return x + y;
  }

  // 제너레이터 객체 반환
  const generator = generatorFunc();

  // next 메서드 1번 째 호출
  // 인수로 전달된 것 없고, 따라서 yield 된 이터레이터 리절트 객체만 반환
  let yieided = generator.next();
  console.log(yieided); // { value: 1, done: false }

  // next 메서드 2번 째 호출
  // 제너레이터 객체의 next 메서드의 인수로 값을 전달
  // 제너레이터 함수 내부에서 첫 번째 변수인 x 에 전달한 인수 값이 할당
  // 마지막으로 yield 된 x + 10의 결과 값을 value로 가지는 이터레이터 리절트 객체를 반환
  res = generator.next(10);
  console.log(res); // { value: 20, done: false }

  // next 메서드 3번 째 호출
  // next 메서드 인수로 값을 전달
  // 제너레이터 함수 내부의 두 번째 변수인 y 에 전달한 인수 값이 할당
  // 마지막으로 return 메서드를 실행하므로 x + y 의 결과 값을 value 로 가지고, done 프로퍼티는 true 인 이터레이터 리절트 객체를 반환
  res = generator.next(20);
  console.log(res); // { value: 30, done: true }
  ```

<br />
<br />

# 제너레이터 활용

### 이터러블 구현

> 제너레이터 함수를 활용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 것보다 `더욱 간단히 이터러블을 구현 가능`

- 기존 이터레이션 프로토콜을 준수하여 구현한 이터러블 예시

  ```jsx
  // 무한 이터러블 구현 - 이터레이션 프로토콜을 준수하여 구현한 방식
  const infiniteFibo = (function () {
    let [pre, cur] = [0, 1];

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        [pre, cur] = [cur, pre + cur];
        // 이터레이터 리절트 객체의 done 프로퍼티는 생략하므로써(default = false) 무한 이터러블 구현
        return { value: cur };
      },
    };
  })();

  for (const num of infiniteFibo) {
    if (num > 1000) break;
    console.log(num); // 1 2 3 5 8 13 21 ... 987
  }
  ```

- 제너레이터 함수를 활용하여 구현한 이터러블 예시

  ```jsx
  // 무한 이터러블 구현 - 제너레이터를 활용한 구현 방식
  const infiniteFibo = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
      [pre, cur] = [cur, pre + cur];
      yield cur;
    }
  })();

  for (const num of infiniteFibo) {
    if (num > 1000) break;
    console.log(num); // 1 2 3 5 8 13 21 ... 987
  }
  ```

<br />

### 비동기 처리

> 제너레이터 함수를 활용하면 프로미스를 사용한 비동기 처리를 `동기 처리처럼 구현 가능`

- 프로미스의 후속 처리 메서드인 `then, catch, finally 없이 비동기 처리 결과를 반환하도록 구현 가능하다는 의미`

```jsx
// 브라우저가 아닌 node 환경에서도 HTTP 전송을 가능토록 도와주는 라이브러리
const fetch = require("node-fetch");

// 제너레이터 실행기를 구현한 co 모듈
const co = require("co");

co(function* fetch() {
  const url = "yourURL";

  const response = yield fetch(url);
  const result = yield response.json();
  console.log(result);
});
```
