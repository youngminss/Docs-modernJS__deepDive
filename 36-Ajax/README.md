> `Ajax(Asynchronous Javascript and XML)` : 자바스크립트를 사용하여 브라우저가 서버에게 `비동기 방식으로 데이터를 요청`하고, 서버가 응답한 데이터를 수신하여 웹페이지를 `동적으로 갱신`하는 프로그래밍 방식

- 브라우저에서 제공하는 Web API인 `XMLHttpRequest 객체를 기반으로 동작`
- XMLHttpRequest 객체는 `HTTP 비동기 통신을 위한 프로퍼티와 메서드를 제공`

![전통적인 웹 페이지 생명 주기](https://poiemaweb.com/img/traditional-webpage-lifecycle.png)

전통적인 웹 페이지 생명 주기

- Ajax 등장 이전 웹 페이지는 `완전한 HTML을 서버로부터 전송받아 웹 페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작`
  - `화면이 전환되면 서버로부터 새로운 HTML을 전송받아 웹 페이지 전체를 리렌더링했다.`
- 이러한 방식은 다음과 같은 단점이 존재
  1. 이전 웹 페이지와 차이가 없어서 변경할 필요가 없는 부분까지도 새로 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생
  2. 변경할 필요가 없는 부분까지 처음부터 리렌더링하기 때문에 화면 전환이 일어나면 화면의 순간적인 깜박임 현상이 발생
  3. 클라이언트 - 서버간의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 이후 작업은 블로킹(blocking)

![Ajax](https://poiemaweb.com/img/ajax-webpage-lifecycle.png)

Ajax

- `Ajax는 전통적인 방식과 비교했을 때 다음과 같은 장점이 존재`
  1. 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
  2. 변경할 필요가 없는 부분은 리렌더링하지 않는다. 즉 화면의 깜박임 현상이 없다.
  3. 클라이언트 - 서버간의 통신이 비동기 방식으로 작동, 따라서 서버에게 요청을 보낸 후 블로킹(blocking)이 발생하지 않는다.

<br />

# JSON

> `JSON(Javascript Ojbect Notation)` : 클라이언트 - 서버 간의 HTTP 통신을 위한 `텍스트 데이터 포맷`

- 언어에 종속 받지 않는, 언어 독립형 데이터 포맷

### JSON 표기 방식

> `키와 값으로 구성된 순수 텍스트`

- JSON `키는 반드시 쌍따옴표(””)`로 묶어야 한다.

```json
{
  "name": "WI",
  "age": 100,
  "alive": true
}
```

<br />
<br />

### JSON.stringify 메서드

> `객체 → JSON 포맷의 문자열로 변환`

- 클라이언트가 서버로 객체를 전송하려면 객체 → 문자열화 필요
- 이를, `직렬화(serializing)` 라 한다.

```jsx
const obj = {
  name: "WI",
  age: 100,
  alive: true,
  hobby: ["programming", "music"],
};

// 객체 -> JSON (serializing)
const json = JSON.stringify(obj);
console.log(json);
// {"name":"WI","age":100,"alive":true,"hobby":["programming","music"]}

const prettyJSON = JSON.stringify(obj, null, 2);
console.log(typeof prettyJSON, prettyJSON);
// string {
//   "name": "WI",
//   "age": 100,
//   "alive": true,
//   "hobby": [
//     "programming",
//     "music"
//   ]
// }

// JSON.stringify(obj, replacer, space) 에서 replacer 메서드 정의
function filter(key, value) {
  // undefined 는 반환 X
  return typeof value === "number" ? undefined : value;
}

const strFilteredJSON = JSON.stringify(obj, filter, 2);
console.log(typeof strFilteredJSON, strFilteredJSON);
// string {
//   "name": "WI",
//   "alive": true,
//   "hobby": [
//     "programming",
//     "music"
//   ]
// }
```

<br />
<br />

### JSON.parse 메서드

> `JSON 포맷의 문자열 → 객체로 변환`

- 서버로부터 클라이언트에게 전송된 JSON 문자열 데이터 → 객체화 필요
- 이를, `역직렬화(deserializing)` 라 한다.

```jsx
const obj = {
  name: "WI",
  age: 100,
  alive: true,
  hobby: ["programming", "music"],
};

// 객체 -> JSON (serializing)
const json = JSON.stringify(obj);

// JSON -> 객체 (deserializing)
const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
// object {
//   name: 'WI',
//   age: 100,
//   alive: true,
//   hobby: [ 'programming', 'music' ]
// }
```

<br />
<br />

# XMLHttpRequest 객체

> `XMLHttpRequest` : 자바스크립트를 사용하여 HTTP 요청을 전송시 사용

- 브라우저는 주소창이나 HTML의 form 태그 or a 태그를 통해 HTTP 요청 전송 기능을 기본 제공
- XMLHttpRequest 객체는 `HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 프로퍼티와 메서드를 제공`

<br />

### XMLHttpRequest 객체 생성

> XMLHttpRequest 객체는 `XMLHttpRequest 생성자 함수를 호출하여 생성`

- XMLHttpRequest 객체는 브라우저에서 제공하는 Web API이므로 `브라우저 환경에서만 정상 작동한다.`

```jsx
const xhr = new XMLHttpRequest();
```

<br />

### XMLHttpRequest 객체 - 프로토타입 프로퍼티

| 프로토타입 프로퍼티 | 설명                                  |
| ------------------- | ------------------------------------- |
| readyState          | HTTP 요청의 현재 상태를 나타내는 정수 |

XMLHttpRequest 의 정적 프로퍼티를 값으로 갖는다.

- UNSENT : 0
- OPENED : 1
- HEADERS_RECEIVED : 2
- LOADING : 3
- DONE : 4 |
  | status | HTTP 요청에 대한 응답 상태(HTTP 상태코드)를 나타내는 정수

예) 200 |
| statusText | HTTP 요청에 대한 응답 메시지를 나타내는 문자열

예) “OK” |
| responseType | HTTP 응답 타입

예) document, json, text, blob, arraybuffer 등 |
| response | HTTP 요청에 대한 응답 몸체(response body)
responseType 에 따라 타입이 다르다. |
| responseText | 서버가 전송한 HTTP 요청에 대한 응답 문자열 |

<br />

### XMLHttpRequest 객체 - 정적 프로퍼티

| 정적 프로퍼티    | 값  | 설명                                  |
| ---------------- | --- | ------------------------------------- |
| UNSENT           | 0   | open 메서드 호출 이전                 |
| OPENED           | 1   | open 메서드 호출 이후                 |
| HEADERS_RECEIVED | 2   | send 메서드 호출 이후                 |
| LOADING          | 3   | 서버 응답 중(응답 데이터 미완성 상태) |
| DONE             | 4   | 서버 응답 완료                        |

<br />

### XMLHttpRequest 객체 - 메서드

| 메서드            | 설명                                     |
| ----------------- | ---------------------------------------- |
| open              | HTTP 요청 초기화                         |
| send              | HTTP 요청 전송                           |
| abort             | 이미 전송된 HTTP 요청 중단               |
| setRequestHeader  | 특정 HTTP 요청 헤더의 값 설정            |
| getResponseHeader | 특정 HTTP 요청 헤더의 값을 문자열로 반환 |

<br />

### XMLHttpRequest 객체 - 이벤트 핸들러 프로퍼티

| 이벤트 핸들러 프로퍼티 | 설명                                              |
| ---------------------- | ------------------------------------------------- |
| onreadystatechange     | readyState 프로퍼티 값이 변경된 경우              |
| onerror                | HTTP 요청에 에러가 발생한 경우                    |
| onload                 | HTTP 요청이 성공적으로 완료한 경우                |
| onloadstart            | HTTP 요청에 대한 응답을 받기 시작한 경우          |
| onloadend              | HTTP 요청이 완료한 경우 ( 성공 or 실패하면 발생 ) |
| onabort                | abort 메서드에 의해 HTTP 요청이 중단된 경우       |
| onprogress             | HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생 |
| ontimeout              | HTTP 요청 시간이 초과한 경우                      |

<br />
<br />

# HTTP 요청 전송

> HTTP 요청을 전송하는 과정은 다음 순서를 따른다.

1. `XMLHttpRequest.prototype.open 메서드 → HTTP 요청을 초기화`
2. (필요에 따라) XMLHttpRequest.prototype.setRequestHeader 메서드 → 특정 HTTP 요청의 헤더 값을 설정
3. `XMLHttpRequest.prototype.send 메서드 → HTTP 요청을 전송`

```jsx
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open("GET", "/user");

// HTTP 요청 헤더 설정
// 클라이언트 -> 서버로 전송할 데이터의 MIME 타입 지정 : JSON
xhr.setRequestHeader("content-type", "application/json");

// HTTP 요청 전송
xhr.send();
```

<br />

### XMLHttpRequest.prototype.open 메서드

> 서버에 전송할 HTTP 요청을 초기화

```jsx
xhr.open(mehtod, url[, async])
```

| 매개변수 | 설명                                                          |
| -------- | ------------------------------------------------------------- |
| method   | HTTP 요청 메서드(”GET”, “POST”, “PUT”, “PATCH”, “DELETE” 등 ) |
| url      | HTTP 요청을 전송할 URL                                        |
| async    | ( 옵션 ) 비동기 요청 여부, default = true                     |

- HTTP 요청 메서드 → `CRUD를 구현`

| HTTP 요청 메서드 | 종류           | 목적                  | 페이로드 |
| ---------------- | -------------- | --------------------- | -------- |
| GET              | index/retrieve | 모든/특정 리소스 취득 | X        |
| POST             | create         | 리소스 생성           | O        |
| PUT              | replace        | 리소스의 전체 교체    | O        |
| PATCH            | modify         | 리소스의 일부 수정    | O        |
| DELETE           | delete         | 모든/특정 리소스 삭제 | X        |

<br />

### XMLHttpRequest.prototype.send 메서드

> open 메서드로 초기화된 HTTP 요청을 서버에 전송

- 요청 메서드가 GET, POST 냐에 따라 전송 방식의 차이가 있다.
  - `GET 요청 메서드` → 데이터를 URL의 일부분인 `쿼리 문자열(query string)로 서버에 전송`
    - 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.
  - `POST 요청 메서드` → 데이터(페이로드,payload)를 `요청 몸체(request body)에 담아 전송`
    - 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다.
      - `페이로드가 객체인 경우 → 반드시 JSON.stringify 메서드로 직렬화한 다음 전송할 것`
      ```jsx
      xhr.send(JSON.stringify(obj));
      ```

<br />

### XMLHttpRequest.prototype.setRequestHeader 메서드

> 특정 HTTP 요청 헤더 값을 설정

- `반드시, open 메서드 호출 이후에 호출할 것`
- 자주 사용하는 HTTP 요청 헤더에는 `Content-type` 과 `Accept` 가 있다.

  - Content-type은 request body에 담아 전송할 데이터의 [MIME](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 타입의 정보를 표현
    | MIME 타입 | 서브타입 |
    | ----------- | -------------------------------------------------- |
    | text | text/plain, text/html/, text/css, text/javascript |
    | application | application/json, application/x-www-form-urlencode |
    | multipart | multipart/formed-date |
  - HTTP 클라이너트가 서버에 요청할 때 `서버가 응답할 데이터의 MIME 타입을 Accept 로 설정 가능`

    ```jsx
    xhr.setRequestHeader("accept", "application/json");
    ```

    - Accept 헤더를 설정하지 않으면 send 메서드가 호출될 때 → Accept 헤더 `*/*` 으로 전송

      \*\*

<br />
<br />

# HTTP 응답 처리

> `서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.`

- XMLHttpRequest 이벤트 핸들러 프로퍼티가 많았지만, 이 중

  - HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 → readystatechange 이벤트 캐치
    - send 메서드로 HTTP 요청을 서버에 전송하면 서버는 응답을 반환해야 한다.
    - 하지만, 언제 응답이 클라이언트에 도달하는지 알 수 없기 때문에 사용

  ```jsx
   const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

  xhr.send();

  xhr.onreadystatechange = () => {
  	  // 서버 응답이 아직 완료되지 않았으면 아무런 처리하지 않는다.
      if(xhr.readyState !== XMLHttpRequest.DONE) return;

      if(xhr.status === 200) {
  				// 정상적으로 응답된 상태면 parsing 한 데이터 출력
          console.log(JSON.parse(xhr.response));
      } else {
  				// 정상적인 응답을 받지 못하고 에러면 에러상태코드와 메시지 출력
          console..error('Error', xhr.status, xhr.statusText);
      }
  };
  ```

  - readystatechange 이벤트 대신 → load 이벤트를 캐치할 수도 있다.
    - 이 경우, HTTP 요청이 성공적으로 완료된 경우만 발생하므로, readyState 가 XMLHttpRequest.DONE 인지 확인할 필요가 없다.

  ```jsx
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");

  xhr.send();

  // onload 메서드는 요청이 성공한다는 전체하에 실행되는 이벤트 핸들러
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
    } else {
      console.log("Error", xhr.status, xhr.statusText);
    }
  };
  ```
