# 배열 고차 함수

> `고차 함수(Higher-Order Function, HOF)` : 함수를 인수로 전달받거나 함수를 반환하는 함수를 의미

- 자바스크립트에서 함수는 `객체`다.
  - 정확히는 `일급 객체`다.
  - 따라서, 함수를 값처럼 인수로 전달할 수 있으며 반환할 수도 있는 것이다.
- 고차 함수는 외부 상태의 변경이나 `가변 데이터(mutable data)를 피하고 불변성(immutability)을 지향하는 함수형 프로그래밍에 기반을 둔다.`
  - 함수형 프로그래밍은 `순수 함수(pure function)`와 `보조 함수의 조합`을 통해 로직 내에 존재하는 `조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제`하여 상태 변경을 피하려는 `프로그래밍 패러타임을 의미`
- 자바스크립트 배열은 매우 유용한 고차 함수를 제공

<br />

### Array.prototype.sort 메서드

- `배열의 요소를 정렬, 정렬된 배열을 반환`

  - default 로는 오름차순 정렬이다.

  ```jsx
  const fruits = ["Banana", "Orange", "Apple"];

  fruits.sort();
  console.log(fruits); // [ 'Apple', 'Banana', 'Orange' ]
  ```

- `mutator method`
- 기본적인 정렬 순서는 `유니코드 코드 포인트의 순서를 따른다.`

  - 배열의 요소들을 정렬 시, `숫자 타입이어도 암묵적으로 문자열 타입으로 변환 후 유니코드 코드 포인트 순서에 따라 정렬`
  - 따라서, 숫자 요소를 정렬 시에는 정렬 순서를 정의하고 `비교 함수(compare function)를 인수로 전달해야 한다.`
  - 비교 함수는 `양수 or 음수 or 0을 반환해야 한다.`
    - `양수` : 비교 함수의 두 번째 인수를 우선 정렬
    - `음수` : 비교 함수의 첫 번째 인수를 우선 정렬
    - `0` : 정렬하지 않음

  ```jsx
  const numbers = [40, 100, 1, 5, 2, 25, 10];

  numbers.sort();
  console.log(numbers); // [1, 10, 100, 2, 25, 40, 5] << 제대로 된 오름차순 정렬이 아님

  numbers.sort((a, b) => a - b);
  console.log(numbers); // [1, 2, 5, 10, 25, 40, 100]
  ```

- 초기에 sort 메서드는 quicksort 알고리즘을 기반으로 구현되었지만, ES10 이후부터는 `timsort 알고리즘 기반으로 변경`되었다고 한다.

<br />

### Array.prototype.forEach 메서드

- `for문을 대체할 수 있는 고차 함수`
  ```jsx
  [1, 2, 3].forEach((item, idx, arr) => {
    console.log(`요소 값 : ${item}, 인덱스 : ${idx}, this : ${arr}`);
  });
  // 요소 값 : 1, 인덱스 : 0, this : 1,2,3
  // 요소 값 : 2, 인덱스 : 1, this : 1,2,3
  // 요소 값 : 3, 인덱스 : 2, this : 1,2,3
  ```
- 자신의 내부에서 반복문을 실행

  - 즉, 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 `자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다.`
  - `각 배열의 요소에 대해 한 번씩 콜백 함수가 호출된다.`
  - `콜백 함수는 일반 함수로 적용`되기 때문에, `this의 참조는 undefined가 바인딩된다.` ( 고차함수에서는 strict mode 가 반영되기 때문, 아닐 경우 전역 객체를 가리킨다. )

  ```jsx
  class Numbers {
    numberArray = [];

    mul(arr) {
      arr.forEach(function (item) {
        // forEach 의 인수로 전달하는 콜백함수가 "일반함수"인 경우, this 참조는 undefined 를 바인딩
        // TypeError: Cannot read property 'numberArray' of undefined
        this.numberArray.push(item * item);
      });
    }
  }

  const numbers = new Numbers();
  numbers.mul([1, 2, 3]);
  ```

  - 콜백 함수 내부의 this와 호출한 메서드 내부의 this를 일치시키려면 `화살표 함수나, this로 사용할 객체를 바인딩해야 한다.`

  ```jsx
  class Numbers {
    numberArray = [];

    mul(arr) {
      arr.forEach((item) => {
        // forEach 의 인수로 전달하는 콜백함수가 "화살표 함수"인 경우, this 참조는 Lexical this 참조를 따른다. 즉 this 호출의 상위 스코프를 참조한다.
        this.numberArray.push(item * item);
      });
    }
  }

  const numbers = new Numbers();
  numbers.mul([1, 2, 3]);
  console.log(numbers.numberArray); // [ 1, 4, 9 ]
  ```

- `accessor method`
- 반환값은 undefined 다.
- `forEach 문 내부에서는 break, continue 문을 사용할 수 없다.` 즉, 중간에 순회를 중단할 수 없다.

  ```jsx
  [1,2,3].forEach((item, idx) => {
    console.log(item);
    if(idx > 0) break;
    // SyntaxError: Illegal break statement
  })

  [1,2,3].forEach((item, idx) => {
    console.log(item);
    if(idx > 0) continue;
    // SyntaxError: Illegal continue statement: no surrounding iteration statement
  })
  ```

- for 문에 비해 기본적인 성능은 좋지 않지만 `가독성은 좋다.`
  - 따라서, 대용량 데이터를 순회하거나 시간이 많이 걸리는 작업이 아니라면 for문 보단 forEach문을 사용하는 것을 권장

<br />

### [Array.prototype.map](http://Array.prototype.map) 메서드

- `콜백 함수의 반환값들로 구성된 새로운 배열을 반환`
- `accessor method`
- 원본 배열의 요소값을 다른 값으로 `매핑(mapping)`한 `새로운 배열을 생성하기 위한 고차 함수`

  ```jsx
  const arr = [1, 2, 3];
  const mappingArr = arr.map((item) => Math.pow(item, 2));

  console.log(arr); // [ 1, 2, 3 ]
  console.log(mappingArr); // [ 1, 4, 9 ]
  ```

<br />

### Array.prototype.filter 메서드

- `콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환`
- `accessor mehtod`
- `특정 조건에 맞는 배열의 요소들을 추출할 때 유용하게 사용된다.`

  ```jsx
  const arr = [1, 2, 3, 4, 5];
  const filteredArr = arr.filter((item) => item < 4);

  console.log(arr); // [ 1, 2, 3, 4, 5 ]
  console.log(filteredArr); // [ 1, 2, 3 ]
  ```

<br />

### Array.prototype.reduce 메서드

- 콜백 함수를 호출하여 `하나의 결과값을 만들어 반환`
  - 매 차례마다, 콜백 함수의 반환값과 두 번째 요소값을 콜백 함수의 인수로 전달하면서 호출한다.
- `accessor method`
- 4개의 매개변수를 가진다.

  - `accumulator` : 누적될 값
  - `currentValue` : 현재 조회하는 값
  - `index` : 현재 조회하는 값의 인덱스
  - `array` : 원본 배열 참조(this)

  ```jsx
  const arr = [1, 2, 3, 4, 5];

  arr.reduce((acc, cur, idx, arr) => {
    console.log(acc, cur, idx, arr);
    return acc + cur;
  }, 0);
  // 0 1 0 [ 1, 2, 3, 4, 5 ]
  // 1 2 1 [ 1, 2, 3, 4, 5 ]
  // 3 3 2 [ 1, 2, 3, 4, 5 ]
  // 6 4 3 [ 1, 2, 3, 4, 5 ]
  // 10 5 4 [ 1, 2, 3, 4, 5 ]
  ```

- 여러 용도로 사용한다.

  - `평균 구하기`

  ```jsx
  const arr = [1, 2, 3, 4, 5];

  const average = arr.reduce((acc, cur, idx, { length }) => {
    // 마지막 index 원소라면 마지막 원소까지 누적한 수의 arr 길이만큼 나눠서 평균을 반환, 그게 아니라면 누적한 수에 현재 요소를 더한 값을 다음 콜백함수의 사용할 반환값으로 반환
    return idx === length - 1 ? (acc + cur) / length : acc + cur;
  }, 0);

  console.log(average); // 3  = (1+2+3+4+5) / 5
  ```

  - `최대값 구하기`

  ```jsx
  const arr = [1, 2, 3, 4, 5];

  const max = arr.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
  console.log(max); // 5

  // const max = Math.max(...arr);  // Math.max 를 사용하는 것이 사실 훨씬 더 직관적
  // console.log(max);              // 5
  ```

  - `요소의 중복 횟수 구하기`

  ```jsx
  const arr = ["banana", "apple", "apple", "orange", "apple"];

  const dupArr = arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  console.log(dupArr); // { banana: 1, apple: 3, orange: 1 }
  ```

  - `중복 요소 제거`

  ```jsx
  const arr = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

  const removeDupArr = arr.reduce((acc, cur, idx, arr) => {
    if (arr.indexOf(cur) === idx) acc.push(cur);
    return acc;
  }, []);

  console.log(removeDupArr); // [ 1, 2, 3, 5, 4 ]

  // 사실, 배열 내 중복된 요소를 제거한 배열을 추출하는 것은 Array.prototype.from 메서드와 Set 자료형을 활용하면 쉽게 구할 수 있다.
  // const removeDupArr = Array.from(new Set(arr));
  // console.log(removeDupArr1);   // [ 1, 2, 3, 5, 4 ]
  ```

<br />

### Array.prototype.some 메서드

- 콜백 함수의 반환값이 `단 한 번이라도 참이면 true, 모두 거짓이면 false를 반환`
- 즉, `배열의 요소 중에 콜백 함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인`하여 그 결과를 boolean 타입으로 반환

  - 단, `빈 배열인 경우 언제나 false를 반환`

  ```jsx
  const odds = [1, 3, 5, 7];

  // odds 배열 내에는 조건인 짝수가 하나도 없으므로, false 반환
  console.log(
    odds.some((item) => {
      console.log(item);
      return item % 2 === 0;
    }),
  );
  // 1
  // 3
  // 5
  // 7
  // false

  // odds 배열 내에는 첫 요소 1부터 홀수 이므로, 하나라도 조건에 만족하는 요소가 있으니 true 반환
  console.log(
    odds.some((item) => {
      console.log(item);
      return item % 2 !== 0;
    }),
  );
  // 1
  // true
  ```

<br />

### Array.prototype.every 메서드

- 콜백 함수의 반환값이 `모두 참이면 true, 단 한 번이라도 거짓이면 false를 반환`
- 즉, `배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인`하여 그 결과를 boolean 타입으로 반환

  - 단, `빈 배열인 경우 언제나 true를 반환`

  ```jsx
  const odds = [1, 3, 5, 7];

  // odds 배열 내에는 조건인 짝수가 하나도 없으므로, false 반환
  console.log(
    odds.every((item) => {
      console.log(item);
      return item % 2 === 0;
    }),
  );
  // 1
  // false

  // odds 배열 내에는 첫 요소 1부터 홀수 이므로, 하나라도 조건에 만족하는 요소가 있으니 true 반환
  console.log(
    odds.every((item) => {
      console.log(item);
      return item % 2 !== 0;
    }),
  );
  // 1
  // 3
  // 5
  // 7
  // true
  ```

<br />

### Array.prototype.find 메서드

- `ES6에 도입`
- 자신을 호출한 `배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 true를 반환하는 첫 번째 요소를 반환`

  - true를 반환하는 요소가 존재하지 않는 경우 `undefined 를 반환`

  ```jsx
  const users = [
    {
      id: 1,
      name: "YI",
    },
    {
      id: 2,
      name: "KI",
    },
    {
      id: 3,
      name: "WI",
    },
    {
      id: 4,
      name: "MI",
    },
  ];

  console.log(users.find((item) => item.id === 3)); // { id: 3, name: 'WI' }
  console.log(users.find((item) => item.name === "YOUNG")); // undefined
  ```

<br />

### Array.prototype.findIndex 메서드

- `ES6에 도입`
- findIndex 메서드는 `콜백 함수에 정의한 조건에 대해 true를 반환하는 요소의 인덱스를 반환`

  - true를 반환하는 요소가 존재하지 않는 경우 `-1을 반환`

  ```jsx
  const users = [
    {
      id: 1,
      name: "YI",
    },
    {
      id: 2,
      name: "KI",
    },
    {
      id: 3,
      name: "WI",
    },
    {
      id: 4,
      name: "MI",
    },
  ];

  console.log(users.findIndex((item) => item.id === 3)); // 2;
  console.log(users.findIndex((item) => item.name === "YOUNG")); // -1
  ```

<br />

### Array.prototype.flatMap 메서드

- `ES10에 도입`
- [`Array.prototype.map](http://Array.prototype.map) 메서드를 통해 생성된 배열을 평탄화한다.`

  - 즉, map 함수 호출한 결과 → flat 메서드 호출한 결과와 같다.
  - 단, `flat 과정의 깊이를 1로만 적용할 수 있다.`

  ```jsx
  const arr = ["hello", "world"];

  console.log(arr.map((item) => item.split("")).flat()); // ["h", "e", "l", "l", "o", "w", "o", "r"]
  console.log(arr.flatMap((item) => item.split(""))); // ["h", "e", "l", "l", "o", "w", "o", "r"]
  ```

---

- [자바스크립트 배열](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/24-Array/README.md)
- [배열 메서드](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/24-Array/README2.md)
