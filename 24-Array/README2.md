# 배열 메서드

> 자바스크립트 배열은 다양한 `빌트인 메서드를 제공`

- 배열 생성자 함수는 다양한 `배열 정적 메서드를 제공`
- 배열 객체의 Array.prototype 은 `프로토타입 메서드를 제공`

> 결과물을 반환하는 패턴은 두 가지다.

- 원본 배열을 직접 변경하는 메서드 ( `mutator method` )
  - 원본 배열을 직접 변경하는 메서드는 `외부 상태를 직접 변경하는 부수 효과(side effect)`가 있으므로 주의할 것
- 원본 배열을 직접 변경하지 않고, 새로운 배열을 생성하여 반환하는 메서드 ( `accessor method` )
  - 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋다.

<br />

### Array.isArray 메서드

> Array 생성자 함수의 정적 메서드

- 전달된 인수가 배열이면 `true` , 배열이 아니면 `false` 를 반환

  ```jsx
  console.log(Array.isArray([])); // true
  console.log(Array.isArray([1, 2])); // true
  console.log(Array.isArray(new Array())); // true

  console.log(Array.isArray(null)); // false
  console.log(Array.isArray(1)); // false
  console.log(Array.isArray("string")); // false
  console.log(Array.isArray(undefined)); // false
  console.log(Array.isArray(true)); // false
  console.log(Array.isArray({})); // false
  ```

<br />

### Array.prototype.indexOf 메서드

- 원본 배열에서 인수로 전달한 `요소를 검색하여 인덱스를 반환`

  - 검색되는 요소가 중복되어 여러 개일 경우 `첫 번째 검색된 요소의 인덱스를 반환`
  - 원본 배열에 검색할 요소가 존재하지 않으면 `-1 반환`
  - `배열에 특정 요소가 존재하는지 확인할 때 유용`

  ```jsx
  const arr = [1, 2, 2, 3];

  console.log(arr.indexOf(2)); // 1  ( 2를 검색 )
  console.log(arr.indexOf(2, 2)); // 2  ( 2번 째 인덱스 2를 검색)
  console.log(arr.indexOf(-1)); // -1 ( 존재하지 않는 요소 검색 )
  ```

<br />

### Array.prototype.push 메서드

- 인수로 전달받은 `모든 값을 원본 배열 마지막 요소로 추가` , `변경된 length 프로퍼티 값을 반환`
- `mutator method`
  - 부수 효과가 있으므로, `ES6의 스프레드 문법을 사용하는 편이 좋다.`
- 성능 측면에서 배열에 추가할 요소가 하나라면 마지막 배열 요소를 직접 추가하는 방법이 더 빠르다.

  ```jsx
  const arr = [1, 2];

  arr.push([3, 4]);
  console.log(arr); // [ 1, 2, [ 3, 4 ] ]

  arr.push("a", "b");
  console.log(arr); // [ 1, 2, [ 3, 4 ], 'a', 'b' ]

  const arr2 = [...arr, true];
  console.log(arr2); // [ 1, 2, [ 3, 4 ], 'a', 'b', true ]
  ```

<br />

### Array.prototype.pop 메서드

- 원본 배열에서 `마지막 요소를 제거하고 제거한 요소를 반환`
  - 원본 배열이 `빈 배열이면 undefined 반환`
- `mutator method`

  ```jsx
  const arr = [1, 2];

  let pop = arr.pop();
  console.log(arr); // [ 1 ]
  console.log(pop); // 2
  ```

- push 메서드와 혼합해서 `스택(stack) 자료구조` 를 구현할 수 있다.

  ```jsx
  // 클래스로 구현한 push와 pop 메서드를 활용한 "스택 자료구조"
  class Stack {
    #array;

    constructor(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array !`);
      }
      this.#array = array;
    }

    push(value) {
      return this.#array.push(value);
    }

    pop() {
      return this.#array.pop();
    }

    entries() {
      return [...this.#array];
    }
  }

  const stack = new Stack([1, 2]);
  console.log(stack.entries()); // [ 1, 2 ]

  stack.push(3);
  console.log(stack.entries()); // [ 1, 2, 3 ]

  let pop = stack.pop();
  console.log(stack.entries(), pop); // [ 1, 2 ] 3
  ```

<br />

### Array.prototype.unshift 메서드

- 인수로 전달 받은 `모든 값을 원본 배열의 선두에 추가`하고 `변경된 length 프로퍼티 값을 반환`
- `mutator mehtod`

  - 부수 효과가 있으므로, `ES6의 스프레드 문법을 사용하는 편이 좋다.`

  ```jsx
  const arr = [1, 2];

  let result = arr.unshift(3, 4);
  console.log(result); // 4
  console.log(arr); // [ 3, 4, 1, 2 ]

  const newArr = [100, ...arr];
  console.log(newArr); // [ 100, 3, 4, 1, 2 ]
  ```

<br />

### Array.prototype.shift 메서드

- 원본 배열에서 `첫 번째 요소를 제거하고 제거한 요소를 반환`
  - 원본 배열이 빈 배열이면 `undefined 반환`
- `mutator method`

  ```jsx
  const arr = [1, 2];

  let shift = arr.shift();
  console.log(shift); // 1
  console.log(arr); // [ 2 ]
  ```

- unshift 메서드와 혼합해서 `큐(queue) 자료구조` 를 구현할 수 있다.

  ```jsx
  class Queue {
    #array;

    constructor(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array !`);
      }
      this.#array = array;
    }

    enqueue(value) {
      return this.#array.push(value);
    }

    dequeue() {
      return this.#array.shift();
    }

    entries() {
      return [...this.#array];
    }
  }

  const queue = new Queue([1, 2]);
  console.log(queue.entries()); // [ 1, 2 ]

  queue.enqueue(3);
  console.log(queue.entries()); // [ 1, 2, 3 ]

  let dequeue = queue.dequeue();
  console.log(queue.entries(), dequeue); // [ 2, 3 ] 1
  ```

<br />

### Array.prototype.concat 메서드

- 인수로 전달된 값들(배열 or 원시값)을 `원본 배열의 마지막 요소로 추가한 새로운 배열을 반환`
  - 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가
- push 메서드와 unshift 메서드는 concat 메서드로 대체 가능
  - 다만, 차이점은 concat 메서드는 원본 배열을 직접 변경하지 않고, 새로운 배열을 반환하는 것
  - 따라서, push 와 unshift 메서드의 경우 원본 배열은 다른 변수에 복사해놓고 사용해야 안전
- `ES6의 스프레드 문법으로 대체 가능하다.`

  ```jsx
  const arr1 = [1, 2];
  const arr2 = [3, 4];

  const arr3 = arr1.concat(arr2);
  console.log(arr3); // [ 1, 2, 3, 4 ]
  console.log(arr1, arr2); // [ 1, 2 ] [ 3, 4 ]

  const arr4 = arr3.concat("a", true);
  console.log(arr4); // [ 1, 2, 3, 4, 'a', true ]
  ```

<br />

### Array.prototype.splice 메서드

- 원본 배열의 `중간에 요소를 추가`하거나 `중간에 있는 요소를 제거`하는 경우 사용
- 3개의 매개변수를 가진다.

  - `start` : 삭제 시작 인덱스
  - `deleteCount` : 시작 인덱스로부터 삭제할 요소의 개수
  - `items` : 요소를 삭제 후, 삭제한 인덱스로부터 추가할 데이터

  ```jsx
  const arr = [1, 2, 3, 4];

  const result = arr.splice(2, 1, 300);

  console.log(result); // [ 3 ]
  console.log(arr); // [ 1, 2, 300, 4 ]
  ```

- 배열에서 특정 요소를 제거하려면 Array.prototype.indexOf 와 혼합해서 구현할 수 있다.

  ```jsx
  const arr = [1, 2, 3, 1, 2];

  function remove(array, item) {
    const index = array.indexOf(item);

    if (index !== -1) array.splice(index, 1);

    return array;
  }

  console.log(remove(arr, 2)); // [ 1, 3, 1, 2 ] << 1번째 인덱스에 요소 2가 삭제된 후의 배열을 반환
  console.log(remove(arr, 100)); // [ 1, 3, 1, 2 ] << 100은 존재하지 않으므로 삭제된 요소는 없음
  ```

<br />

### Array.prototype.slice 메서드

- 인수로 전달된 `범위의 요소들을 복사하여 배열로 반환`
- `accessor method`
- 2개의 매개변수를 가진다.

  - `start` : 복사 시작할 인덱스
  - `end` : 복사 끝 인덱스

  ```jsx
  const arr = [1, 2, 3];

  console.log(arr.slice(1, 3)); // [ 2, 3 ]
  console.log(arr); // [ 1, 2, 3 ]
  ```

- `얕은 복사(shallow copy)를 통해 새로운 배열을 생성`

  ```jsx
  const arr = [1, 2, 3];
  const shallowCopy = arr.slice();

  shallowCopy.splice(0, 1); // 복사본 배열 첫 번째 요소 삭제
  console.log(shallowCopy); // [ 2, 3 ]
  console.log(arr); // [ 1, 2, 3 ]
  ```

<br />

### Array.prototype.join 메서드

- 원본 배열의 `모든 요소를 문자열로 변환한 후`, 인수로 전달받은 문자열, 즉 `구분자(separator)로 연결한 문자열을 반환`

  - 구분자는 `생략 가능`하며 `default separator 는 콤마(,)다.`

  ```jsx
  const arr = [1, 2, 3, 4];

  console.log(arr.join()); // 1,2,3,4
  console.log(arr.join(":")); // 1:2:3:4
  console.log(arr.join("")); // 1234
  ```

<br />

### Array.prototype.reverse 메서드

- `원본 배열의 순서를 반대로 뒤집는다.`
- `mutator method`
- 반환 값은 변경된 배열

  ```jsx
  const arr = [1, 2, 3];
  const reversed = arr.reverse();

  console.log(arr); // [ 3, 2, 1 ] << 원본 데이터 파괴 (mutator method)
  console.log(reversed); // [ 3, 2, 1 ]
  ```

<br />

### Array.prototype.fill 메서드

- `ES6에 도입`
- 인수로 전달받은 값을 `배열의 처음부터 끝까지 요소로 채운다.`
- `mutator method`
- 3개의 파라미터를 가진다.

  - `initialValue` : 초기화 시킬 값
  - `start` : 시작 인덱스 값
  - `end` : 끝 인덱스 값

  ```jsx
  const arr = new Array(3);
  console.log(arr); // [ <3 empty items> ]

  arr.fill(1);
  console.log(arr); // [ 1, 1, 1 ]

  arr.fill(100, 1, 2);
  console.log(arr); // [ 1, 100, 1 ] << 원본 데이터 파괴 (mutator method)
  ```

<br />

### Array.prototype.includes 메서드

- `ES7에 도입`
- 배열 내에 `특정 요소가 포함되어 있는지 확인하여 true OR false 를 반환`
- 2개의 매개변수를 가진다.

  - `serachValue` : 검색할 값
  - `start` : 시작 인덱스

  ```jsx
  const arr = [1, 2, 3];

  console.log(arr.includes(3)); // true
  console.log(arr.includes(100)); // false
  ```

- Array.prototype.indexOf 메서드와 차이점은 `indexOf 메서드는 없으면 -1 임을 확인해야하며, 배열에 NaN 이 있다면 판별할 수 없다.`
  ```jsx
  console.log([NaN].indexOf(NaN)); // -1 🔍
  console.log([NaN].includes(NaN)); // true
  ```

<br />

### Array.prototype.flat 메서드

- `ES10에 도입`
- 인수로 전달한 `깊이만큼 재귀적으로 배열을 평탄화(flat)한다.`
- defaultValue 는 1이다.

  - 인수를 `Infinity` 로 넘기면, `아무리 깊은 중첩 배열도 모두 평탄화한다.`

  ```jsx
  const dupArr = [1, [2, 3, 4, 5]];
  console.log(dupArr.flat()); // [ 1, 2, 3, 4, 5 ]

  const dupArr2 = [1, [2, [3, 4, 5]]];
  console.log(dupArr2.flat()); // [ 1, 2, [ 3, 4, 5 ] ] 🔍
  console.log(dupArr2.flat(Infinity)); // [1, 2, 3, 4, 5];
  ```

---

- [자바스크립트 배열](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/24-Array/README.md)
- [배열 고차 함수](https://github.com/youngminss/Docs-modernJS__deepDive/blob/master/24-Array/README3.md)
