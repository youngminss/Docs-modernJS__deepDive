> `디스트럭처링 할당(destructuring assignment, 구조 분해 할당)` : 이터러블 or 객체를 디스트럭처링하여 1개 이상의 변수에 `개별적으로 할당하는 것`

<br />
<br />

# 배열 디스트럭처링 할당

> `ES6`의 `배열 디스트럭처링 할당`은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당

- 배열 디스트럭처링 할당의 대상(우변) → `이터러블`
- 할당 기준은 `배열의 인덱스` ( 즉, `순서대로 할당` )

  ```jsx
  // 배열(= 이터러블)
  const arr = [1, 2, 3];

  // 배열 디스트럭처링
  const [one, two, three] = arr;

  console.log(one, two, three); // 1 2 3
  ```

- 배열 디스트럭처링 할당의 변수의 개수와 이터러블의 요소 개수가 `반드시 일치하지 않아도 된다.`

  ```jsx
  const arr = [1, 2, , 3];

  // 선언한 디스트럭처링 할당 변수보다 배열의 요소 개수가 더 많음 ( 상관없음 )
  const [one, two, three] = arr;

  console.log(one, two, three); // 1 2 undefined
  ```

- 배열 디스트럭처링 할당을 위해 `변수에 기본값을 설정할 수 있다.`

  ```jsx
  const arr = [1, 2, 4];

  // 디스트럭처링 할당 변수에 기본값 설정
  // 우선 순위 = 기본값 설정 < 디스트럭처링 할당
  const [one, two, three = 3] = arr;

  console.log(one, two, three); // 1 2 4
  ```

- 이터러블에서 `필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용하게 사용`

  ```jsx
  // URL 파싱 -> { protocol, host, path } 프로퍼티를 갖는 객체 생성 후 반환

  function parseURL(url = "") {
    const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
    console.log(parsedURL);
    // [
    //   'https://google.com/ko/javascript',
    //   'https',
    //   'google.com',
    //   'ko/javascript',
    //   index: 0,
    //   input: 'https://google.com/ko/javascript',
    //   groups: undefined
    // ]

    if (!parseURL) return {};

    const [, protocol, host, path] = parsedURL;
    return { protocol, host, path };
  }

  const parsedURL = parseURL("https://google.com/ko/javascript");
  console.log(parsedURL); // { protocol: 'https', host: 'google.com', path: 'ko/javascript' }
  ```

- 디스트럭처링 할당을 받을 변수에 `Rest 요소(Rest element)`를 사용 가능
  ```jsx
  const [x, ...y] = [1, 2, 3];
  console.log(x, y); // 1 [ 2, 3 ]
  ```

<br />
<br />

# 객체 디스트럭처링 할당

> `ES6`의 `객체 디스트럭처링 할당`은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당

- 객체 디스트럭처링 할당의 대상(우변) → `객체`
- 할당 기준은 `프로퍼티 키` ( 즉, 순서는 의미가 없으며, `선언된 변수 이름과 프로퍼티 키가 일치하면 할당` )

  ```jsx
  const user = {
    firstName: "YM",
    lastName: "W",
  };

  // 객체 디스트럭처링 할당 ( 순서 상관 X, 단지 변수 이름 === 객체 프로퍼티 키 이름 )
  const { lastName, firstName } = user;
  console.log(lastName, firstName); // W YM
  ```

- 할당받을 변수이름을 디스트럭처링 대상 객체의 프로퍼티 이름과 다르게 하려면 다음과 같이 변수를 선언

  ```jsx
  const user = {
    firstName: "YM",
    lastName: "W",
  };

  // 객체 디스트럭처링 할당 변수의 이름과 객체 프로퍼티 키 이름을 다르게 할당받고 싶을 경우
  const { lastName: ln, firstName: fn } = user;
  console.log(ln, fn); // W YM
  console.log(lastName, firstName); // ReferenceError: lastName is not defined
  ```

- 객체 디스트럭처링 할당을 위해 `변수에 기본값을 설정할 수 있다.`

  ```jsx
  // 객체 디스트럭처링 할당 기본값 설정
  const { firstName = "YM", lastName } = { lastName: "W" };

  console.log(lastName, firstName); // W YM
  ```

- `객체의 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 때 유용하게 사용`

  - 객체를 인수로 전달받는 `함수의 매개변수에도 사용할 수 있다.`
  - 좀 더 간단하고 가독성 좋게 표현 가능

  ```jsx
  function printFruit({ id, name }) {
    console.log(`상품코드 : ${id}, 상품명 : ${name}`);
  }

  printFruit({ id: 1, name: "사과" }); // 상품코드 : 1, 상품명 : 사과
  ```

- 객체 디스트럭처링 할당을 위한 변수에 `Rest 요소를 사용 가능`

  ```jsx
  // 객체 디스트럭처링 Rest 요소 적용
  const { x, ...rest } = { x: 1, y: 2, z: 3 };

  console.log(x, rest); // 1 { y: 2, z: 3 }
  ```
