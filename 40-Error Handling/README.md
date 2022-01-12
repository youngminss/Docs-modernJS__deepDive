# 에러 처리 필요성

> 에러가 발생하지 않는 코드를 작성하는 것은 불가능

- 발생한 에러에 대해 대응하지 않고 방치하면 프로그램이 강제 종료된다.

```jsx
console.log("시작");

foo();
// ReferenceError: foo is not defined
// 강제 종료

console.log("끝");
```

> try - catch 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되는 것을 방지할 수 있다.

```jsx
console.log("시작");

try {
  foo();
} catch (err) {
  console.error(`에러 발생 : ${err}`);
}

console.log("끝");
// 시작
// 에러 발생 : ReferenceError: foo is not defined
// 끝
```

> 직접적인 에러를 발생하는 것이 아닌, 예외(exception)적인 상황이 발생할 수도 있다.

- 예외 상황은 에러를 발생시킬 가능성이 있는 종양같은 존재다.
- 대응하지 않으면, 에러로 이어질 가능성이 크다.
- 에러는 무척 다양하기 때문에 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전체하고 이에 대응하는 코드를 작성하는 것이 중요

<br />
<br />

# try - catch - finally 문

> 에러 처리를 구현하는 방법은 크게 2가지로 분류

1. 예외적인 상황이 발생하면 반환하는 값(null 또는 -1 같은)을 조건문이나 단축 평가, 옵셔널 체이닝 연산자를 통해 확인해서 처리하는 방법
2. 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 처리하는 방법

   1. try - catch -finally 의 경우는 이 경우에 해당

   ```jsx
   try {
     // 실행할 코드(에러 발생 여지가 있는 코드)
   } catch (err) {
     // try 블록에서 에러가 발생하면 이 블록의 코드가 실행
     // 매개변수(이름 자유)에는 try 코드 블록에서 발생한 Error 객체가 전달
   } finally {
     // 에러 발생과 상관없이 반드시 한 번 실행
   }
   ```

   - 실행 순서는 다음과 같다.
     1. try 코드 블록 실행
     2. try 코드 블록에서 에러가 발생하면 발생한 에러를 catch 문에 err 변수에 전달되어 catch 블록 실행
     3. (옵션) finally 코드 블록이 작성되어 있으면 에러 발생과 상관없이 반드시 한 번 실행

<br />
<br />

# Error 객체

> Error 생성자 함수는 에러 객체를 생성

- 인수로 해당 에러에 대한 설명을 의미하는 에러 메시지를 전달받을 수 있다.

```jsx
const error = new Error("Error !");
```

- Error 객체는 2가지 프로퍼티를 갖는다.
  - message 프로퍼티 : Error 생성자 함수 호출시 인수로 전달한 에러 메시지 값
  - stack 프로퍼티 : 에러를 발생시킨 콜 스택(= 실행 컨텍스트 스택)의 호출 정보를 나타내는 문자열, 디버깅 목적으로 사용
- 자바스크립트에선 Error 생성자 함수를 포함, 총 7가지 에러 객체를 생성할 수 있는 생성자 함수를 제공
  - 모두 Error.prototype 을 상속받음
    | 생성자 함수 | 인스턴스 |
    | -------------- | ------------------------------------------------------------------------------ |
    | Error | 일반적 에러 객체 |
    | SyntaxError | 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체 |
    | ReferenceError | 참조할 수 없는 식별자를 참조할 경우 발생하는 에러 객체 |
    | TypeError | 피연산자 or 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체 |
    | RangeError | 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체 |
    | URIError | encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체 |
    | EvalError | eval 함수에서 발생하는 에러 객체 |
  ```jsx
  // 1 @ 1;                     // SyntaxError: Invalid or unexpected token
  // foo();                     // ReferenceError: foo is not defined
  // null.foo;                  // TypeError: Cannot read property 'foo' of null
  // new Array(-1);             // RangeError: Invalid array length
  // decodeURIComponent("%");   // URIError: URI malformed
  ```

<br />
<br />

# throw 문

> Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니다.

- 즉, 에러 객체 생성과 에러 발생은 다른 의미다.
- 에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

  ```jsx
  try {
    // 에러 객체만 생성하면 catch 하지 못함
    new Error("Error !");
  } catch (err) {
    console.log(err);
  }

  //
  ```

  - throw 문의 표현식은 어떤 값이어도 상관없지만, 일반적으로 에러 객체를 지정
  - 에러를 던치면 catch 문의 에러 변수가 생성되고, 던져진 에러 객체가 할당된다.
  - 이후, catch 문이 실행된다.

  ```jsx
  try {
    // 에러 객체만 생성 후 -> 에러를 던짐(throw)
    throw new Error("Error !");
  } catch (err) {
    console.log("에러 발생 :", err); // 에러 발생 : Error: Error !
  }
  ```

<br />
<br />

# 에러의 전파

> 에러는 호출자(caller) 방향으로 전파된다.

- 즉, 콜 스택(실행 컨텍스트 스택)의 아래 방향으로 전파된다는 의미

  ```jsx
  const foo = () => {
    throw new Error("foo 함수에서 발생한 에러"); // 4️⃣
  };

  const bar = () => {
    foo(); // 3️⃣
  };

  const baz = () => {
    bar(); // 2️⃣
  };

  try {
    baz(); // 1️⃣
  } catch (err) {
    console.error(err);
  }

  // Error: foo 함수에서 발생한 에러
  ```

  ![https://media.vlpt.us/images/niyu/post/ff86054c-31b0-4440-b5f1-b312f0e20b61/image.png](https://media.vlpt.us/images/niyu/post/ff86054c-31b0-4440-b5f1-b312f0e20b61/image.png)

- throw 된 에러를 catch 하지 않으면 호출자 방향으로 전파된다.
  - 이 에러를 적절히 캐치하여 대응하면 프로그램 강제 종료를 방지하고, 코드의 실행 흐름을 복구할 수 있다.
  - throw 된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료
- 비동기 함수인 setTimout 이나 프로미스 후속 처리 메서드의 콜백 함수는 호출자(caller)가 없다.
  - setTimout 같은 타이머 함수의 콜백 함수나 이벤트 핸들러 → 태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택에 푸쉬되어 실행
  - 프로미스 후속 처리 메서드의 콜백 함수 → 마이크로태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택에 푸쉬되어 실행
  - 두 케이스 모두 콜 스택에 푸쉬되어 실행되는 시점에, 콜 스택 가장 하부에 존재한다.
    - 따라서, 에러를 전파할 호출자(caller)가 없을 수 밖에 없다.
