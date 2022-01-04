> 표준 빌트인 객체 `Date` 는 `빌트인 객체`이면서 `생성자 함수`

- `UTC 국제 표준시(1970년 1월 1일 00:00:00)를 기준으로 작동한다.`
  - KST 한국 표준시는 UTC + 9시간이다.
  - 현재 날짜와 시간을 자바스크립트 코드가 실행된 시스템에 시계에 의해 결정

<br />
<br />

# Date 생성자 함수

- `모든 시간 시점을 UTC 국제 표준시(1970년 1월 1일 00:00:00)를 기준으로 한다.`
  - 하루는 `86,400,000(24h * 60m * 60s * 1000ms)ms`을 갖는다.
- Date 생성자 함수로 객체를 생성하는 4가지가 존재

<br />

### new Date( )

- `인수 없이, new 연산자와 함께 호출` → 현재 날짜와 시간을 가지는 Date 객체를 반환
- `인수 없이, new 연산자 없이 생성자 함수 호출` → 날짜와 시간 정보를 나타내는 문자열만 반환
- 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 Date 객체를 콘솔에 출력하면 날짜와 정보 string 정보 출력

```jsx
console.log(new Date(), typeof new Date()); // Tue Jan 04 2022 22:43:51 GMT+0900 (한국 표준시) object
console.log(Date(), typeof Date()); // Tue Jan 04 2022 22:44:45 GMT+0900 (대한민국 표준시) string
```

<br />

### new Date(milliseconds)

- Date 생성자 함수에 `숫자 타입의 밀리초를 인수로 전달` → UTC를 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체 반환

```jsx
console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
console.log(new Date(86400000)); // Thu Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

<br />

### new Date(dataString)

- Date 생성자 함수에 `날짜와 시간을 나타내는 문자열을 인수로 전달` → 지정된 날짜와 시간을 나타내는 Date 객체를 반환
  - 전달하는 문자열은 `Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.`

```jsx
console.log(new Date("Jan 01, 2022 13:00:00")); // Sat Jan 01 2022 13:00:00 GMT+0900 (한국 표준시)
console.log(new Date("2022/01/01/13:00:00")); // Sat Jan 01 2022 13:00:00 GMT+0900 (한국 표준시)
```

<br />

### new Date(year, month[,day, hour, minute, second, milliseconds])

- Date 생성자 함수에 `연,일,시,분,초,밀리초를 의미하는 숫자를 인수로 전달` → 지정된 날짜와 시간을 나타내는 Date 객체를 반환
  - `연, 월 → 필수`
  - 나머지 → 옵션 ( 명시하지 않을 경우 0 또는 1로 초기화 됨 )

```jsx
console.log(new Date(2022, 1)); // Tue Feb 01 2022 00:00:00 GMT+0900 (한국 표준시)
console.log(new Date(2022, 1, 4, 22, 0, 0)); // Fri Feb 04 2022 22:00:00 GMT+0900 (한국 표준시)
```

<br />
<br />

# Date 정적 메서드

### Date.now 메서드

- UTC(1970년 1월 1일 00:00:00)를 기점으로 `현재 시간까지 경과한 밀리초를 숫자로 반환`

```jsx
console.log(Date.now()); // 1641304225966
```

<br />

### Date.parse 메서드

- `UTC를 기점으로 인수로 전달된 지정 시간까지 밀리초를 숫자로 반환`

```jsx
console.log(Date.parse("Jan 2, 1970 00:00:00 UTC")); // 8640000 (UTC 기준)
console.log(Date.parse("Jan 2, 1970 09:00:00")); // 8640000 (KST 기준)
console.log(Date.parse("1970/01/02/09:00:00")); // 8640000 (KST 기준)
```

<br />

### Date.UTC 메서드

- `UTC를 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환`
- 인수는 `new Date(year, month[, day, hour, minute, second, millisecond])와 같은 형식이어야 한다.`

```jsx
console.log(Date.UTC(1970, 0, 2)); // 86400000
console.log(Date.UTC("1970/1/2")); // NaN
```

<br />
<br />

# Date 프로토타입 메서드

### Date.prototype.getFullYear 메서드

- `Date 객체에 연도를 나타내는 정수를 반환`

```jsx
console.log(new Date("2022/01/04").getFullYear()); // 2022
```

<br />

### Date.prototype.setFullYear 메서드

- `Date 객체에 연도를 나타내는 정수를 설정`
- 연도 이외에 옵션으로 `월,일도 설정 가능`

```jsx
const today = new Date();

today.setFullYear(2022);
console.log(today.getFullYear()); // 2022

today.setFullYear(2021, 1, 14);
console.log(today.getFullYear()); // 2021
```

<br />

### Date.prototype.getMonth 메서드

- `Date 객체에 월을 나타내는 0 ~ 11 의 정수를 반환`

```jsx
console.log(new Date("2022/01/04").getMonth()); // 0 (즉, 실제는 1월)
```

<br />

### Date.prototype.setMonth 메서드

- `Date 객체에 월을 나타내는 0 ~ 11의 정수를 설정`
- 월 이외의 `일도 옵션으로 설정 가능`

```jsx
const today = new Date();

today.setMonth(3);
console.log(today.getMonth()); // 3 (실제는 4월)

today.setMonth(5, 1);
console.log(today.getMonth()); // 5 (실제는 6월)
```

<br />

### Date.prototype.getDate 메서드

- `Date 객체에 날짜(1 ~ 31)를 나타내는 정수를 반환`

```jsx
console.log(new Date("2022/01/04").getDate()); // 4
```

<br />

### Date.prototype.setDate 메서드

- `Date 객체에 날짜(1 ~ 31)를 나타내는 정수를 설정`

```jsx
const today = new Date();

today.setDate(30);
console.log(today.getDate()); // 30
```

<br />

### Date.prototype.getDay 메서드

- `Date 객체에 요일(0 ~ 6)을 나타내는 정수를 반한`
- `일요일(0) ~ 토요일(6) 순으로 매핑`
  | 요일   | 반환값 |
  | ------ | ------ |
  | 일요일 | 0      |
  | 월요일 | 1      |
  | 화요일 | 2      |
  | 수요일 | 3      |
  | 목요일 | 4      |
  | 금요일 | 5      |
  | 토요일 | 6      |

```jsx
console.log(new Date("2022/01/04").getDay()); // 2 (화요일)
```

<br />

### Date.prototype.getHours 메서드

- `Date 객체에 시간(0 ~ 23)을 나타내는 정수를 반환`

```jsx
// 시간 명시하지 않을 경우 -> default 는 모두 0
console.log(new Date("2022/01/04").getHours()); // 0

// 시간 명시
console.log(new Date("2022/01/04/23:00").getHours()); // 23
```

<br />

### Date.prototype.setHours 메서드

- `Date 객체에 시간(0 ~ 23)을 나타내는 정수를 설정`
- 옵션으로 `분,초,밀리초도 설정할 수 있다.`

```jsx
const today = new Date();

today.setHours(23);
console.log(today.getHours()); // 23

today.setHours(0, 0, 0, 0); // 시,분,초,밀리초 순
console.log(today.getHours()); // 0
```

<br />

### Date.prototype.getMinutes 메서드

- `Date 객체의 분(0 ~ 59)을 나타내는 정수를 반환`

```jsx
console.log(new Date("2022/01/04/12:34:56").getMinutes()); // 34
```

<br />

### Date.prototype.setMinutes 메서드

- `Date 객체의 분(0 ~ 59)을 나타내는 정수를 설정`
- 옵션으로 `초, 밀리초도 설정 가능`

```jsx
const today = new Date();

today.setMinutes(34);
console.log(today.getMinutes()); // 34

today.setMinutes(34, 0); // 분,초,밀리초 순
console.log(today.getMinutes()); // 34
```

<br />

### Date.prototype.getSeconds 메서드

- `Date 객체의 초(0 ~ 59)를 나타내는 정수를 반환`

```jsx
console.log(new Date("2022/01/04/12:34:56").getSeconds()); // 56
```

<br />

### Date.prototype.setSeconds 메서드

- `Date 객체의 초(0 ~ 59)를 나타내는 정수를 설정`

```jsx
const today = new Date();

today.setSeconds(56);
console.log(today.getSeconds()); // 56

today.setSeconds(56, 0); // 초,밀리초 순
console.log(today.getSeconds()); // 56
```

<br />

### Date.prototype.getMilliseconds 메서드

- `Date 객체의 밀리초(0 ~ 999)를 나타내는 정수를 반환`

```jsx
console.log(new Date("2022/01/04/12:34:56:789").getMilliseconds()); // 789
```

<br />

### Date.prototype.setMilliseconds 메서드

- `Date 객체의 밀리초(0 ~ 999)를 나타내는 정수를 설정`

```jsx
const today = new Date();

today.setMilliseconds(789);
console.log(today.getMilliseconds()); // 789
```

<br />

### Date.prototype.getTime 메서드

- `UTC를 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환`

```jsx
console.log(new Date("2022/01/04/12:34:56:789").getTime()); // 1641267296789
console.log(new Date("2022/01/04/12:34:56:790").getTime()); // 1641267296790
```

<br />

### Date.prototype.setTime 메서드

- `UTC를 기점으로 경과된 밀리초를 설정`

```jsx
const today = new Date();

today.setTime(86400000);
console.log(today.getTime(), today); // 86400000 Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

<br />

### Date.prototype.getTimezoneOffset 메서드

- `UTC와 Date 객체에 지정된 로컬 시간과의 차이를 분 단위로 반환`
- UTC = KST - 9h

```jsx
const today = new Date();

console.log(today.getTimezoneOffset() / 60); // -9 (UTC = KST - 9h 를 의미)
```

<br />

### Date.prototype.toDateString 메서드

- 사람이 읽을 수 있는 형식의 문자열로 `Date 객체의 날짜를 반환`

```jsx
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (대한민국 표준시)
console.log(today.toDateString()); // Tue Jan 04 2022
```

<br />

### Date.prototype.toTimeString 메서드

- 사람이 읽을 수 있는 형식의 문자열로 `Date 객체의 시간을 반환`

```jsx
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (대한민국 표준시)
console.log(today.toTimeString()); // 23:12:00 GMT+0900 (대한민국 표준시)
```

<br />

### Date.prototype.toISOString 메서드

- `ISO형식(YYYY-MM-DDTHH:MM:SS.SSSZ)`으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환

```jsx
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (대한민국 표준시)
console.log(today.toISOString()); // 2022-01-04T14:12:00.000Z
```

<br />

### Date.prototype.toLocaleString 메서드

- 인수로 전달한 `로컬을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환`
- 인수를 생략한 경우, 브라우저가 동작 중인 시스템의 로컬을 적용

```jsx
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (대한민국 표준시)
console.log(today.toLocaleString()); // 2022. 1. 4. 오후 11:12:00
console.log(today.toLocaleString("ko-KR")); // 2022. 1. 4. 오후 11:12:00
console.log(today.toLocaleString("en-US")); // 1/4/2022, 11:12:00 PM
console.log(today.toLocaleString("ja-JP")); // 2022/1/4 23:12:00
```

<br />

### Date.prototype.toLocaleTimeString 메서드

- 인수로 전달한 `로컬을 기준으로 Date 객체의 시간을 표현한 문자열을 반환`
- 인수 생략시, 브라우저가 동작 중인 시스템의 로컬을 적용

```jsx
const today = new Date("2022/01/04/23:12");

console.log(today.toString()); // Tue Jan 04 2022 23:12:00 GMT+0900 (대한민국 표준시)
console.log(today.toLocaleTimeString()); // 오후 11:12:00
console.log(today.toLocaleTimeString("ko-KR")); // 오후 11:12:00
console.log(today.toLocaleTimeString("en-US")); // 11:12:00 PM
console.log(today.toLocaleTimeString("ja-JP")); // 23:12:00
```

<br />
<br />

# Date 빌트인 객체 시계

> 현재 날짜와 시간을 `초 단위로 반복 출력`

```jsx
// 시계 만들기
(function printNow() {
  // 시계 인스턴스 생성
  const today = new Date();

  const dayNames = ["(일요일)", "(월요일)", "(화요일)", "(수요일)", "(목요일)", "(금요일)", "(토요일)"];

  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  const ampm = hour >= 12 ? "PM" : "AM";

  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12; // hour 0인 경우 12를 재할당

  // 10 미만인 분,초 2자리로 변경
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  setTimeout(printNow, 1000); // 1초마다 타이머 함수 재귀호출
})();
```

```jsx
2022년 1월 4일 (화요일) 11:25:26 PM
2022년 1월 4일 (화요일) 11:25:27 PM
2022년 1월 4일 (화요일) 11:25:28 PM
2022년 1월 4일 (화요일) 11:25:29 PM
2022년 1월 4일 (화요일) 11:25:30 PM
2022년 1월 4일 (화요일) 11:25:31 PM
2022년 1월 4일 (화요일) 11:25:32 PM
...
```
