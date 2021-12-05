# 제어문 개요

> `제어문(control flow statement` 은 조건에 따라 `코드 블록` 을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.

- 제어문은 코드의 실행 흐름을 인위적으로 제어할 수 있다. → 순자적으로 진행하는 직관적인 코드의 흐름을 혼란스럽게 만든다.
- 즉, 제어문은 코드의 흐름을 이해하기 어렵게 만들어 `가독성을 해치는 단점` 이 있다. → 가독성이 좋지 않은 코드는 `오류를 발생시키는 원인`

```jsx
뒤에 살펴볼
+ forEach()
+ map()
+ filter()
+ reduce()

같은 "고차 함수"를 사용한 "함수형 프로그래밍 기법"에서는 제어문의 사용을 억제하여 복잡성을 해결하려고 노력한다.
```

<br>
<br>

# switch문

> `swtich 문` 은 주어진 표현식을 평가하여 그 `값과 일치하는 표현식`을 갖는 `case 문` 으로 실행 흐름을 옮긴다.

```jsx
swtich (표현식) {
	case 표현식1:
		실행문1;
		break;
	case 표현식2:
		실행문2;
		break;
	...
	default:
		default시 실행문;
}
```

```jsx
 // 💡 윤년(leaf year) 판별시 switch 문

var year = 2000;  // 2000년은 윤년 -> 2월은 29일까지
var month = 2;
var days = 0;

swtich (month) {
	case 1: case 3: case 5: case 7: case 8: case 10: case 12:
		days = 31;
		break;
	case 4: case 6: case 9: case 11:
		days = 30;
		break;
	case 2:
		days = ((year % 4 === 0 || year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
		break;
	default:
		console.log("Invaild month");
}
```

- 만약 `if - else` 문으로 해결할 수 있다면 → `switch` 문보다 `if - else` 문을 사용하는 편이 좋다.
- 조건식이 너무 많아서 `if - else` 문보다 `switch` 문을 사용했을 때 `가독성이 더 좋다면` → `switch` 문을 사용하는 편이 좋다.

<br>
<br>

# 반복문

```jsx
// 💡 반목문을 대체할 수 있는 다양한 Javascript 기능이 있다. ( 일단은 인지정도만 할 것 )

자바스크립트는 "배열 순회 시" 사용하는 = forEach() 메서드
"객체의 프로퍼티를 열거 시" 사용하는 = for - in 문
"ES6에서 도입된 이터러블을 순회 시" 사용하는 = for - of 문
```

```jsx
while 문 = 반복 횟수가 "불명확"할 때 주로 사용
for 문 = 반복 횟수가 "명확"할 때 주로 사용
```

```jsx
// 💡 for 문 무한루프
// 초기식 | 조건식 | 증감식 을 아무것도 작성하지 않을 경우 -> while(true) 와 같다.

for( ; ; ) { ... }
```

<br>
<br>

# break 문

> `break` 문은 `코드 블록` 을 탈출하는 것

- 더 정확히는 `레이블 문` , `반목문(for, for - in, for - of, while, do - while)` 또는 `switch 문`

```jsx
/*
💡 레이블 문(label statement) = "식별자"가 붙은 문을 말한다.

+ 레이블 문은 프로그램 실행 순서를 제어하는 데 사용
+ switch 문의 case 문과 default 문도 사실 "레이블 문"
+ 레이블 문을 탈출 시 -> break 문에 식별자를 지정 필요

*/

// 1️⃣ foo 라는 레이블 식별자가 붙은 문
foo: console.log("foo");

// 2️⃣ foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; //  foo 레이블 블록문을 탈출한다.
  console.log(2);
}
```

- 레이블 문은 중첩된 for 문 `외부로 탈출` 할 때 유용하지만 그 외에는 `일반적으로 권장하지 않는다.`
- 레이블 문 사용시 → 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문 ( 존재 정도만 인지할 것 )

<br>
<br>

# Continue 문

> `continue 문` 은 반복문의 코드 블록 실행을 `현 시점에서 중단하고` , `반복문의 증감식으로 실행 흐름을 이동시킨다.` ( break 문처럼 반복문을 탈출하지는 않는다. )

- `if 문` 내에서 `실행해야 할 코드가 한줄` 이라면 → 반복문 내에서 `continue 문`을 사용할 필요는 없다.
- 하지만, `if 문` 내에서 `실행햐야 할 코드가 길다면` → `들여쓰기가 한 단계 더 깊어지므로` , `continue 문`을 사용하는 편이 가독성이 더 좋을 수 있다.

```jsx
// if문 내에서 여러 코드 작성해야 할 경우 -> continue 문을 사용하지 않았을 경우
var arr = [1, 2, 3, 4, 5];
var target = 3;
var count = 0;

for (var i = 0; i < arr.length; i++) {
  // arr[i] 가 target 이하라면 count 증감
  if (arr[i] <= target) {
    count++;
    // code...
    // code...
    // code...
  }
}

// if문 내에서 여러 코드 작성해야 할 경우 -> continue 문을 사용한 경우 -> depth가 하나 줄어들었다.
var arr = [1, 2, 3, 4, 5];
var target = 3;
var count = 0;

for (var i = 0; i < arr.length; i++) {
  // arr[i] 가 target 초과이면 count 증감하지 않는다.
  if (arr[i] > target) continue;

  count++;
  // code...
  // code...
  // code...
}
```
