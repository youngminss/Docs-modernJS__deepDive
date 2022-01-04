> 표준 빌트인 객체 `Math`

- 생성자 함수가 아니다.
- 따라서, `정적 메서드` 와 `정적 프로퍼티`만 제공

<br />
<br />

# Math 프로퍼티

### Math.PI

- 원주율 PI값(약 3.1415926535...)을 반환

```jsx
console.log(Math.PI); // 3.141592653589793
```

<br />
<br />

# Math 메서드

### Math.abs 메서드

- 인수로 전달된 숫자의 절대값을 반환
- 절대값은 반드시 0 또는 양수여야 한다.

```jsx
console.log(Math.abs(-1)); // 1
console.log(Math.abs("-1")); // 1
console.log(Math.abs("")); // 0
console.log(Math.abs([])); // 0
console.log(Math.abs(null)); // 0
console.log(Math.abs(undefined)); // NaN
console.log(Math.abs({})); // NaN
console.log(Math.abs("string")); // NaN
console.log(Math.abs()); // NaN
```

<br />

### Math.round 메서드

- 인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환

```jsx
console.log(Math.round(1.4)); // 1
console.log(Math.round(1.5)); // 2
console.log(Math.round(-1.4)); // -1
console.log(Math.round(-1.5)); // -1
console.log(Math.round(-1.6)); // -2
console.log(Math.round()); // NaN
```

<br />

### Math.ceil 메서드

- 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환

```jsx
console.log(Math.ceil(1.4)); // 2
console.log(Math.ceil(1.5)); // 2
console.log(Math.ceil(-1.4)); // -1
console.log(Math.ceil(-1.5)); // -1
console.log(Math.ceil(-1.6)); // -1
console.log(Math.ceil()); // NaN
```

<br />

### Math.floor 메서드

- 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환

```jsx
console.log(Math.floor(1.9)); // 1
console.log(Math.floor(1.9999)); // 1
console.log(Math.floor(-1.1)); // -2
console.log(Math.floor(-1.9)); // -2
console.log(Math.floor()); // NaN
```

<br />

### Math.sqrt 메서드

- 인수로 전달된 숫자의 제곱근을 반환

```jsx
console.log(Math.sqrt(9)); // 3
console.log(Math.sqrt(4)); // 2
console.log(Math.sqrt(2)); // 1.4142135623730951
console.log(Math.sqrt(1)); // 1
console.log(Math.sqrt(0)); // 0
console.log(Math.sqrt()); // NaN
```

<br />

### Math.random 메서드

- 임의의 난수(랜덤 숫자)를 반환
- 난수의 범위는 0 ≤ Math.random < 1 의 실수다.

```jsx
// 0 ~ 1 사이의 랜덤 실수
console.log(Math.random());

// n ~ m 사이의 랜덤 정수 뽑는 로직 (ex. 1 ~ 10 사이의 랜덤 정수)
const random = Math.floor(Math.random() * 10 + 1);
console.log(random);
```

<br />

### Math.pow 메서드

- 인수로 전달한 숫자의 거듭제곱한 결과를 반환
- 인수는 2개를 전달받는다.
  - base : 밑
  - exponent : 지수
- ES7에 도입된 지수 연산자를 사용하면 가독성이 더 좋다.

```jsx
console.log(Math.pow(2, 1)); // 2
console.log(Math.pow(2, 4)); // 16
console.log(Math.pow(2, 6)); // 64
console.log(Math.pow(2, -1)); // 0.5
console.log(Math.pow(2)); // NaN

// ES7의 지수 연산자
console.log(2 ** 1); // 2
console.log(2 ** 4); // 16
console.log(2 ** 6); // 64
console.log(2 ** -1); // 0.5
console.log(2); // NaN
```

<br />

### Math.max 메서드

- 전달받은 인수 중에서 가장 큰 수를 반환
- 인수가 전달되지 않으면 -Infinity를 반환
- 배열의 요소들 중에서 최대값을 구하는 로직이 필요할 경우
  - Function.prototype.apply 메서드
  - 스프레드 문법을 사용

```jsx
console.log(Math.max(1)); // 1
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.max()); // -Infinity

// 배열 요소들 중 최대값 뽑는 로직
const arr = [1, 4, 2, 7, 5];
console.log(Math.max(...arr)); // 7
console.log(Math.max.apply(null, arr)); // 7
```

<br />

### Math.min 메서드

- 전달받은 인수 중에서 가장 작은 수를 반환
- 인수가 전달되지 않으면 Infinity를 반환
- 배열의 요소들 중에서 최소값을 구하는 로직이 필요한 경우
  - Function.prototype.apply 메서드
  - 스플레드 문법을 사용

```jsx
console.log(Math.min(1)); // 1
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.min()); // Infinity

// 배열 요소들 중 최대값 뽑는 로직
const arr = [1, 4, 2, 7, 5];
console.log(Math.min(...arr)); // 1
console.log(Math.min.apply(null, arr)); // 1
```
