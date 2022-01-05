> `정규표현식(Regular Expression, RegExp)` 은 문자열을 대상을 패턴 매칭 기능을 제공

- 특정 패턴과 일치하는 문자열을 `검색, 추출, 치환`할 수 있는 기능을 의미
- 정규표현식을 사용하면 반복문과 조건문 없이 패턴을 정의하고 테스트하는 것으로 간단히 체크 가능
- 단, `주석이나 공백을 허용하지 않고, 여러가지 기호를 사용함으로써 가독성이 좋지 않다는 단점도 존재`

<br />
<br />

# 정규 표현식 생성

![https://media.vlpt.us/images/ek615/post/101ab900-b1f4-476c-83c5-61d39987f82b/image.png](https://media.vlpt.us/images/ek615/post/101ab900-b1f4-476c-83c5-61d39987f82b/image.png)

- `정규 표현식 리터럴`과 `RegExp 생성자 함수`를 사용하는 방법 2가지가 존재
- 일반적으로 정규 표현식 리터럴을 사용한다.
  - 정규 표현식 리터럴은 `패턴`과 `플래그`로 구성

<br />
<br />

# RegExp 메서드

### RegExp.prototype.exec 메서드

- 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 `매칭 결과를 배열로 반환`
  - 매칭 결과가 없는 경우 `null 반환`
  - `g 플래그를 지정해도 첫 번째 매칭 결과만 반환`하므로 주의 필요

```jsx
const target = "Is this all there is?";
const regExp = /is/;

console.log(regExp.exec(target)); // [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

<br />

### RegExp.prototype.test 메서드

- 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 `매칭 결과를 불리언 값으로 반환`

```jsx
const target = "Is this all there is?";
const regExp = /is/;

console.log(regExp.test(target)); // true
```

<br />

### String.prototype.match 메서드

- `String 표준 빌트인 객체에서 제공하는 메서드`
- 대상 문자열과 인수로 전달받은 정규 표현식 패턴과의 `매칭 결과를 배열로 반환`
  - exec 메서드와 달리, `g 플래그를 지정하면 모든 매칭 결과가 배열로 반환`

```jsx
const target = "Is this all there is?";
const regExp = /is/;

console.log(target.match(regExp)); // [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

<br />
<br />

# 플래그

- 정규 표현식 검색 방식을 설정하기 위해 사용
- 총 6개가 존재한다. 그 중 자주쓰는 플래그는 다음과 같다.
  | 플래그 | 의미 | 설명 |
  | ------ | ----------- | ---------------------------------------------------------- |
  | i | Ignore case | 대소문자를 구분하지 않고 패턴을 검사 |
  | g | Global | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색 |
  | m | Multi line | 문자열이 행이 바뀌더라도 패턴 검색을 계속한다. |

<br />
<br />

# 패턴

> 패턴은 특별한 의미를 가지는 `메타문자 또는 기호로 표현한다.`

<br />

### 문자열 검색

- 정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색
  - 대소문자를 구분하지 않고 검색하려면 → `i 플래그 사용`
  - 검색 대상 문자열 내에서 패턴과 매치되는 모든 문자열을 전역 검색하려면 → `g 플래그 사용`

```jsx
const target = "Is this all there is?";

// 문자열 검색 + i 플래그
console.log(target.match(/is/i).l); // [ 'Is', index: 0, input: 'Is this all there is?', groups: undefined ]

// 문자열 검색 + g 플래그
console.log(target.match(/is/g)); // [ 'is', 'is' ]

// 문자열 검색 + i 플래그 + g 플래그
console.log(target.match(/is/gi)); // [ 'Is', 'is', 'is' ]
```

<br />

### 임의의 문자열 검색

- `마침표(.)`는 임의의 문자 한 개를 의미
- 문자의 내용은 무엇이 오든 상관없다. ( `공백 포함` )

```jsx
const target = "Is this all there is?";
const regExp = /.../g; // ... 즉, . 하나당 문자 하나를 의미하므로 총 3개의 문자열을 하나로 패턴으로 모든 문자열 반환

console.log(target.match(regExp)); // ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"];
```

<br />

### 반복 검색

- `{m.n}`은 앞선 패턴이 `최소 m번, 최대 n번 반복되는 문자열을 의미`
  - `{n}` : 앞선 패턴이 `n번 반복되는 문자열을 의미` ( = `{n,n}` )
  - `{n,}` : 앞선 패턴이 `최소 n번 반복되는 문자열을 의미`
  - `+` : 앞선 패턴이 `최소 한번 이상 반복되는 문자열을 의미` ( = `{1,n}` )
  - `?` : 앞선 패턴이 `최대 한 번(0번 포함) 이상 반복되는 문자열을 의미` ( = `{0,1}` )
- `콤마(,)뒤에 공백이 있으면 정상 작동하지 않으니 주의할 것`

```jsx
const target = "A AA B BB Aa Bb AAA";

// A로 최소 1개 ~ 최대 2개 반복되는 문자열 모두를 반환
console.log(target.match(/A{1,2}/g)); // [ 'A', 'AA', 'A', 'AA', 'A' ]

// A로 최소 1개 ~ 최대 1개 반복되는 문자열
console.log(target.match(/A{1}/g)); // ["A", "A", "A", "A", "A", "A", "A"]

// A로 최소 2개 ~ 반복되는 문자열
console.log(target.match(/A{2,}/g)); //  [ 'AA', 'AAA' ]

// A가 최소 한 번 이상 반복되는 문자열을 반환
console.log(target.match(/A+/g)); // [ 'A', 'AA', 'A', 'AAA' ]

const otherTarget = "color colour";
// u가 최대 한 번(0번 포함) 반복되는 문자열을 반환
console.log(otherTarget.match(/colou?r/g)); //  [ 'color', 'colour' ]
```

<br />

### OR 검색

- `|` : `or 의 의미를 갖는다.`
  - `+` 와 함께 사용하면 분해되지 않은 `단어 레벨로 검색`
  - `[ ] 내의 문자는 or로 동작`
    - 뒤에 + 까지 붙이면 앞선 패턴을 한 번 이상 반복
  - [ ] 내에 `-`를 사용하면 `범위를 지정하는 의미`
  - `\d` : 숫자를 의미
  - `\D` : \d와 정반대, 즉 숫자를 제외한 모든 문자를 의미
  - `\w` : 알파벳, 숫자, 언더스코어를 의미
  - `\W` : \w와 정반대, 즉 알파벳, 숫자, 언더스코어를 제외한 모든 문자를 의미

```jsx
const target = "A AA B BB Aa 12,345 Bb AAA _#!$";

// A 또는 B를 전역 검색
console.log(target.match(/A|B/g)); // ["A", "A", "A", "B", "B", "B", "A", "B", "A", "A", "A"]

// A 또는 B로 시작하는 문자열을 단어 레벨로 전역 검색
console.log(target.match(/A+|B+/g)); // ["A", "AA", "B", "BB", "A", "B", "AAA"]

// 위의 예제와 같은 의미
console.log(target.match(/[AB]+/g)); // ["A", "AA", "B", "BB", "A", "B", "AAA"]

// 범위 지정
console.log(target.match(/[A-Z]+/g)); // ["A", "AA", "B", "BB", "A", "B", "AAA"]

// 대소문자 구별하지 않고 알파벳 검사
console.log(target.match(/[A-Za-z]+/g)); // ["A", "AA", "B", "BB", "Aa", "Bb", "AAA"]

// 숫자를 검색
console.log(target.match(/[0-9]+/g)); // [ '12', '345' ]

// 숫자를 검색
console.log(target.match(/[\d]+/g)); // [ '12', '345' ]

// 숫자를 제외하고 블록 단위로 검색
console.log(target.match(/[\D]+/g)); // [ 'A AA B BB Aa ', ',', ' Bb AAA _#!$' ]

// 알파벳, 숫자, 언더스코어 검색
console.log(target.match(/[\w]+/g)); // ["A", "AA", "B", "BB", "Aa", "12", "345", "Bb", "AAA", "_"]

// 알파벳, 숫자, 언더스코어 제외하고 검색
console.log(target.match(/[\W]+/g)); // [" ", " ", " ", " ", " ", ",", " ", " ", " ", "#!$"]
```

<br />

### NOT 검색

- `[ ] 내의 ^은 not을 의미`

```jsx
const target = "AA BB 12 Aa Bb";

console.log(target.match(/[^0-9]+/g)); // [ 'AA BB ', ' Aa Bb' ]
```

<br />

### 시작 위치로 검색

- `[ ] 바깥의 ^는 문자열의 시작을 의미`

```jsx
const target = "http://google.com";

console.log(/^https/.test(target)); // false
console.log(/^http/.test(target)); // true
```

<br />

### 마지막 위치 검색

- `$는 문자열의 마지막을 의미`

```jsx
const target = "http://google.com";

console.log(/com$/.test(target)); // true
console.log(/org$/.test(target)); // false
```

<br />
<br />

# 자주 사용하는 정규표현식

### 특정 단어로 시작하는지 검사

```jsx
// url 프로토콜 검사
const http = "http://example.com";
const https = "https://example.com";
const testUrl = "httpss://example.com";

const regExp = /^https?:\/\//;

console.log(regExp.test(http)); // true
console.log(regExp.test(https)); // true
console.log(regExp.test(testUrl)); // false
```

<br />

### 특정 단어로 끝나는지 검사

```jsx
const fileName1 = "index.html";
const fileName2 = "index.js";

const regExp = /html$/;

console.log(regExp.test(fileName1)); // true
console.log(regExp.test(fileName2)); // false
```

<br />

### 숫자로만 이루워진 문자열인지 검사

```jsx
const target = "12345";
const regExp = /^\d+$/;

console.log(regExp.test(target)); // true
```

<br />

### 하나 이상의 공백으로 시작하는지 검사

```jsx
const targets = [" Hi!", "Hi! ", "Hi!"];
const regExp = /^[\s]+/;

targets.forEach((target) => console.log(regExp.test(target)));
// " Hi!" => true
// "Hi! " => false
// "Hi!"  => false
```

<br />

### 아이디로 사용 가능한지 검사

```jsx
const userIds = ["id123", "id123$", "id_123", "id1234123400"];
const regExp = /^[A-Za-z0-9]{4,10}$/;

userIds.forEach((userId) => console.log(regExp.test(userId)));
// id123        => true
// id123$       => false
// id_123       => false
// id1234123400 => false
```

<br />

### 메일 주소 형식에 맞는지 검사

```jsx
const emails = ["email@email.com", "email#email.com", "email@email.hack", "em<sricpt>@email.com"];
const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-z]{2,3}$/;

emails.forEach((email) => console.log(regExp.test(email)));
// email@email.com      => true
// email#email.com      => false
// email@email.hack     => false
// em<sricpt>@email.com => false
```

- 인터넷 메시지 형식(internet message format) 규약인 `RFC 5322`에 맞는 정교한 패턴 매칭이 필요할 경우, 더욱 복잡한 패턴 사용이 필요
  ```jsx
  const regExp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  ```

<br />

### 핸드폰 번호 형식에 맞는지 검사

- 전화번호 or 핸드폰의 자리수와 형식은 맞아도, 말도 안되는 지번 ( 예를들어, 87-XXXX-XXX )은 필터링하는 방법이 필요할 듯

```jsx
const phoneNumbers = ["010-1234-5678", "02-1234-5678", "032-123-4567", "02-123-4567", "010:1234:5678"];

phoneNumbers.forEach((phoneNumber) => {
  console.log(/^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber));
});
// 010-1234-5678 => true
// 02-1234-5678  => true
// 032-123-4567  => true
// 02-123-4567   => true
// 010:1234:5678 => false
```

<br />

### 특수 문자 포함 여부 검사

```jsx
const target1 = "abc<123";

console.log(/[^A-Za-z0-9]/gi.test(target1)); // true

// 특수 문자 확인 시 제거하기 ( accessor method, 원본 데이터 변경 X )
console.log(target1.replace(/[^A-Za-z0-9]/gi, "")); // abc123
console.log(target1); // true
```
