# 동기 처리 & 비동기 처리

> 자바스크립트에서 `함수를 호출하면` 함수 코드가 `평가되어` `함수 실행 컨텍스트가 생성`

- 생성된 실행 컨텍스트는 `실행 컨텍스트 스택(= 콜스택, callStack )에 push` 되고 함수 코드가 실행
- 종료된 함수 실행 컨텍스트는 `실행 컨텍스트 스택에서 pop 되어 제거`

```jsx
const foo = () => {};
const bar = () => {};

foo();
bar();
```

![실행 컨텍스트 스택](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoMkiZ%2Fbtrp6Qe4ebj%2Fueir83IzdBBB4mPUjPIP3k%2Fimg.png)

<br />

> `자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖는다.`

- 함수를 실행할 수 있는 창구가 단 하나이며, 동시에 2개 이상의 함수를 실행할 수 없음을 의미
- 실행 컨텍스트의 최상위인 실행 중인 실행 컨텍스트를 제외한 모든 실행 컨텍스트는 → 모두 실행 `대기 중인 태스크(task)`
- 대기 중인 태스크들은 현재 실행 중인 함수로 종료되면 비로소 실행되기 시작

<br />

> 이처럼 자바스크립트 엔진은 한 번에 하나의 태스크만 실행할 수 있는 `싱글 스레드(single thread)방식`으로 동작

- 한 번에 하나의 태스크만 실행할 수 있기 때문에 처리에 `시간이 걸리는 태스크가 앞에 있는 경우`, 이후에 태스크들이 `블로킹(blocking, 작업 중단)이 발생`
- 이처럼, 현재 실행 중인 태스크가 종료할 때까지, 다음 실행될 태스크가 대기하는 방식 → `동기처리(synchronous) 방식`

```jsx
function sleep(func, delay) {
  const delayUntill = Date.now() + delay;

  // delay 시간동안 반복문 실행 작업
  while (Date.now() < delayUntill);

  // 전달한 func 함수 delay 시간 이후 호출
  func();
}

function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

// 3초 이상 sleep 함수 실행
sleep(foo, 3000);

// bar 함수는 sleep 함수 실행이 종료되어야, 비로소 실행(= 3초 동안 블로킹)
bar();

/*
실행 결과
(약 3초 뒤) 
foo 
bar
*/
```

![https://media.vlpt.us/images/niyu/post/38643062-3c5a-42f8-a67e-fc3dedafc03a/image.png](https://media.vlpt.us/images/niyu/post/38643062-3c5a-42f8-a67e-fc3dedafc03a/image.png)

- 싱글 스레드의 반대 개념으로, 현재 실행 중인 태스크가 종료되지 않은 상태여도 다음 태스크를 곧바로 실행하는 방식 → `비동기처리(asynchronous) 방식`
  - `setTimeout, setInterval, HTTP요청, 이벤트 핸들러`는 대표적인 비동기 함수의 예시

```jsx
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

// setTimeout 타이머 비동기 함수 호출
setTimeout(foo, 3000);
bar();

/*
실행결과
bar
(약 3초뒤)
foo
*/
```

![https://media.vlpt.us/images/niyu/post/15441884-84a6-42af-a513-ab1e51dec7b3/image.png](https://media.vlpt.us/images/niyu/post/15441884-84a6-42af-a513-ab1e51dec7b3/image.png)

|                               | 실행 순서 보장 | 블로킹 여부 |
| ----------------------------- | -------------- | ----------- |
| 동기처리 방식(synchronous)    | O              | O           |
| 비동기처리 방식(asynchronous) | X              | X           |

<br />
<br />

# 브라우저 구성 환경

![자바스크립트 브라우저 구성 환경 ](https://poiemaweb.com/img/event-loop.png)

자바스크립트 브라우저 구성 환경

> 자바스크립트는 기본적으로 싱글 스레드 방식이다. 그럼에도 불구하고 브라우저가 동작하는 것을 보면 많은 태스크(task)가 `동시에 처리되는 것처럼 보인다.`

- 예를 들어, HTTP요청을 통해 서버에 데이터를 받아오면서 동시에 렌더링을 하거나 HTML요소가 애니메이션 효과를 통해 움직이면서 이벤트를 처리하기도 하는 것
- 이처럼 `자바스크립트의 동시성(concurrency)을 지원하는 것` → `이벤트 루프(event loop)`의 역할

<br />

### 자바스크립트 엔진 구성 영역

- `콜 스택(call stack, = 실행 컨텍스트 스택)`
  - 소스코드 평가 과정에서 함수의 실행 컨텍스트가 추가되고 제거되는 스택 자료구조
  - 자바스크립트는 단 하나의 콜 스택을 가진 싱글 스레드 방식이기 때문에 현재 실행 중인 실행 컨텍스트가 종료되어 콜 스택에서 제거되기 전까지 다른 어떤 태스크도 실행되지 못하는 블로킹 문제가 있다.
- `힙(heap)`
  - `객체가 저장되는 메모리 공간`, `콜 스택의 실행 컨텍스트는 힙에 저장된 객체를 참조`
  - 메모리가 값을 저장하려면 먼저 메모리의 크기를 결정해야한다.
  - 객체는 원시 값과 달리 크기가 정해져 있지 않고, `런타임 시점에 할당(= 동적 할당)된다.`
  - 따라서, `객체가 저장되는 메모리 공간인 힙은 구조화되어 있지 않다는 특징이 존재`

<br />

### 이벤트 큐와 이벤트 루프

- `이벤트 큐(event queue, = 태스크 큐)`
  - setTimeout, setInterval 과 같은 `비동기 함수의 콜백 함수 or 이벤트 핸들러가 일시적으로 보관되는 영역`
- `이벤트 루프(event loop)`
  - `콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지, 그리고 이벤트 큐에 대기 중인 함수(콜백함수 or 이벤트 핸들러 등)가 있는지 반복해서 확인`
    - 만약, 콜 스택이 비어 있고 이벤트 큐에 대기 중인 함수가 있다면 이벤트 루프는 순차적으로(FIFO, First In First Out)으로 이벤트 큐에 대기 중인 함수를 콜 스택으로 이동시킨다.
    - 콜 스택으로 이동한 함수는 실행된다. 즉 이벤트 큐에 일시 보관된 함수들은 비동기 처리 방식으로 동작

```jsx
function cb1() {
  console.log("cb1");
}

console.log("Hi");
setTimeout(cb1, 0); // cb1 콜백 함수는 setTimout 비동기 함수가 실행되면 이벤트 큐에 보관되었다가 콜 스택에 실행 컨텍스트가 더 이상 없으면 콜 스택으로 이동되어 실행된다.
console.log("Bye");
```

![https://miro.medium.com/max/700/1*TozSrkk92l8ho6d8JxqF_w.gif](https://miro.medium.com/max/700/1*TozSrkk92l8ho6d8JxqF_w.gif)
