# 변수(Variable)

> `변수(Variable)` 는 하나의 값을 저장하기 위해 확보한 `메모리 공간 자체` or 그 메모리 공간을 `식별하기 위해 붙인 이름` (= 값의 위치를 가리키는 상징적인 이름)

```jsx
// 예제 : 10 + 20 은 30을 result 라는 변수에 대입한 것
var result = 10 + 20;
```

- 여기서 `result` 는 메모리 공간에 저장된 값을 식별할 수 있는 고유한 이름 = `변수이름`
- 변수에 저장된 값(위 예제에서 30) = `변수값`
- 변수에 값을 저장하는 행위 = `할당(Assignment, 대입, 저장)`
- 변수에 저장된 값을 읽어 들이는 것 = `참조(Reference)`

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbb5job%2FbtrlyrbOF7F%2FPSQkjJo4Ckwy19cbEcqjdK%2Fimg.png" width="500" height="400">

```
[ 💡 Note ]
사람이 이해할 수 있는 언어로 명명한 변수 이름을 통해 변수에 저장된 값의 의미를 명확히 할 수 있다.
즉, "변수에 저장된 값의 의미를 파악할 수 있는 변수 이름은 가독성을 높이는 부수적인 효과도 있다."
코드는 컴퓨터에게 내리는 명령이지만 개발자를 위한 문서이기도 하다.
의도가 명확한 네이밍은 코드를 이해하기 쉽게 만들며, 이는 협업과 품질 향상에 도움을 준다.
```

<br>
<br>

# 식별자(Identifier)

> `식별자(Identifier)` 는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.

![식별자](https://miro.medium.com/max/700/0*ilACYeYskIXzCETd.jpeg)

- `myNumber` 라는 식별자는 값 23을 식별할 수 있어야 한다.
- 이를 위해 myNumber 는 값 23이 저장되어 있는 `메모리 주소(0012CCGWH80)` 을 기억한다.
- 즉, 식별자는 `값이 저장되어 있는 메모리 주소와 매핑 관계를 맺으며, 매핑 정보도 메모리에 저장되어야 한다.`

```
이와 같이 식별자는 값이 아니라 "메모리 주소를 기억하고 있다."

식별자로 값을 구별해서 식별한다는 것 = 식별자가 기억하고 있는 메모리 주소를 통해 메모리 공간에 저장된 값에 접근할 수 있다는 것을 의미
즉, 식별자는 "메모리 주소에 붙인 이름"
```

- 변수, 함수, 클래스 등의 이름은 모두 식별자다.
  - 변수이름 → 메모리 상에 존재하는 변수 값을 식별
  - 함수이름 → 메모리 상에 존재하는 함수(자바스크립트에서 함수도 값이다 !)를 식별
- 즉, 메모리 상에 존재하는 어떤 값을 식별할 수 있는 이름은 모두 식별자라고 한다.

<br>
<br>

# 변수 선언(Variable Declaration)

> `변수 선언(Variable Declaration)` 은 값을 저장하기 위한 `메모리 공간을 확보`하고 `변수 이름과 확보된 메모리 공간의 주소를 연결`해서 값을 저장할 수 있게 `준비하는 과정`

- 변수를 사용하려면 반드시 선언이 필요
- 변수 선언시에는 `var`, `let`, `const` 키워드를 사용
- ES6 이전(즉, ES5까지)에는 `var 키워드` 만 사용해서 변수를 선언했다.

```
[ 🍧 맛보기 - var 키워드 단점 ]

블록 레벨 스코프(Block-Level Scope)를 지원하지 않고, 함수 레벨 스코프(Functional-Level Scope)를 지원했다.
이로 인해 의도치 않게 "전역 변수가 선언"되어 심각한 부작용이 발생할 수 있다.

이런 var 키워드의 단점을 보완하기위해 등장한 것들이 ES6에 도입된 let과 const 다.
이 둘은 블록 레벨 스코프를 지원한다.
```

```jsx
var person; // 변수 선언(= "변수 선언문")
```

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcAhZBK%2FbtrlDAHJEsp%2FnkwHPBPHVl9a2kZOOt3Igk%2Fimg.png" width="500" height="400">

- 변수 선언문은 `변수 이름을 등록`하고 `값을 저장할 메모리 공간을 확보`한다.
  - 변수 선언한 이후, 변수에 값은 아직 할당하지 않았다.
  - 따라서, 확보된 메모리 공간은 비어있을 것으로 생각할 수 있으나 확보된 메모리 공간에는 자바스크립트 엔진에 의해 `undefined` 값이 `암묵적으로 할당`되어 초기화된다.

```
[ 🍧 맛보기 - undefined ]

undefined 는 자바스크립트에서 제공하는 "원시타입 값(Primitive value)" 이다.
```

<br>

> 자바스크립트 엔진은 변수 선언을 2단계에 거쳐 수행한다.

1️⃣ `선언 단계` : 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.

2️⃣ `초기화 단계` : 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined 를 할당해 초기화한다.

- `var` `let` `const` 키워드를 사용한 변수 선언은 `선언단계와 초기화 단계가 동시에 진행` 된다.
- 예로 들어 `var person;` 에 대해
  - 선언 단계를 통해 변수 이름은 `person 으로 등록`하고
  - 초기화 단계를 통해 person 변수에 `암묵적으로 undefined를 할당` 해 초기화한다.
- 따라서, `var` 키워드로 선언한 변수는 어떠한 값도 할당하지 않아도 기본적으로 `undefined` 라는 값을 갖는다.

```
[ 💡 NOTE - Garbage value ]

초기화 단계를 거치지 않으면 확보된 메모리 공간에는 이전에 다른 애플리케이션이 사용했던 값이 남아 있을 수 있다.
이러한 값을 "쓰레기 값(Garbage value)" 라고 한다.
자바스크립트에서 var 키워드는 암묵적으로 undefined 값으로 초기화를 수행하기 때문에 이러한 위험으로부터 안전하다.
```

```
[ 🍧 맛보기 - 실행 컨텍스트(Excute Context) ]

변수 이름을 비롯한 모든 식별자는 "실행 컨텍스트에 등록된다."
실행 컨텍스트는 자바스크립트 엔진이 소스코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역
자바스크립트 엔진은 실행 컨텐스트를 통해 식별자와 스코프를 관리
```

> 변수뿐만 아니라 모든 식별자(함수, 클래스 등)를 사용하려면 반드시 `선언이 필요`하다.

![자바스크립트 ReferenceError](https://www.tutorialexample.com/wp-content/uploads/2020/05/fix-javascript-require-is-not-defined-error.png)

- 선언하지 않은 식별자에 접근하면 `ReferenceError(참조 에러)` 가 발생
- 이는, 식별자를 통해 값을 참조하려 했지만 자바스크립트 엔진이 등록된 식별자를 찾을 수 없을 때 발생하는 에러

<br>
<br>

# 변수 선언의 실행 시점과 변수 호이스팅

> `변수 호이스팅(Hosting)` : 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징

```jsx
// 변수 선언문보다 변수를 참조하는 코드가 앞에 있는 경우

console.log(person); // undefined
var person; // 변수 선언문
```

- 자바스크립트는 [인터프리터]에 의해 한 줄씩순차적으로 실행되므로 위에 코드는 ReferenceError가 발생할 것처럼 보이나 에러가 발생하지 않고 `undefind가 출력`된다.

```jsx
💡 "변수 선언(선언 단계 & 초기화 단계)"이 소스코드가 한 줄씩 순차적으로 실행되는 시점, 즉 런타임(Runtime)이 아니라 그 이전 단계에서 먼저 실행되기 때문
```

- 자바스크립트 엔진은 소스코드를 한 줄씩 순차적으로 실행하기에 앞서, 먼저 `소스코드의 평가(evaluation)` 과정을 거치면서 소스코드 실행을 위한 준비를 한다.
- 엔진은 변수 선언을 포함한 모든 선언문(변수 선언문, 함수 선언문 등)을 소스코드에서 찾아내 먼저 실행한다.
- 소스코드 평가 과정이 끝나면, 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 한 줄씩 순차적으로 실행한다.
- 즉, 엔진은 `변수 선언이 소스코드의 어디에 있든 상관없이 다른 코드보다 가장 먼저 실행` → `변수 선언이 어디에 위치하던 상관없이 어디서든 변수를 참조할 수 있다.` ( ReferenceError가 발생하지 않는 이유 )

<br>

> `변수 선언`과 `값의 할당(Assignment, 대입, 저장)` 은 실행시점이 다르다 !

```jsx
var person = "YOUNG MIN"; // 변수 선언과 값의 할당을 한 문장으로 표현 -> 내부적으로 실행시점은 각각 다름
```

- 변수 선언 : `런타임 이전에 먼저 실행`
- 값의 할당 : `런타임에 실행`

```jsx
// Example

console.log(person); // undefined

var person = "YOUNG MIN"; // 변수 선언 & 값의 할당

console.log(person); // YOUNG MIN
```

- `변수 선언` 과 `값의 할당` 전후 시점 메모리 구조

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFPUD1%2FbtrlJMs2NCd%2FGNYlW88TgoybgwQmMIFQI0%2Fimg.png" width="700" height="400">

<br>
<br>

# 값의 재할당

> 이미 값이 할당되어 있는 변수에 새로운 값을 또다시 할당하는 것을 `재할당` 이라고 한다.

```jsx
var person = "YOUNG MIN"; // 변수 선언 & 값의 할당 1️⃣
person = "YOUNG MAN"; // 값의 재할당 2️⃣
```

- 현재 변수에 저장된 값(= `YOUNG MIN`)을 버리고 새로운 값(= `YOUNG MAN`)을 저장했다.

<br>

> `var 키워드`로 선언한 변수는 `선언과 동시에 undefined 로 초기화`되므로, 엄밀히 말하자면 `변수에 처음 값을 할당하는 것도 사실은 재할당`

- 위 예제에서 1번 과정에서, 이미 `변수선언` 과정에서 `undefined` 로 초기화 되어있던 값에서 `값의 할당` 과정에서 `YOUNG MIN` 으로 `재할당` 되었다 볼 수 있다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbAxbWj%2FbtrlFJjxqx0%2F2MshuA483UYgzDZFH7Xi4K%2Fimg.png" width="700" height="400">

> `var 키워드`로 선언한 변수는 `선언과 동시에 undefined 로 초기화`되므로, 엄밀히 말하자면 `변수에 처음 값을 할당하는 것도 사실은 재할당`

- 위 예제에서 1번 과정에서, 이미 `변수선언` 과정에서 `undefined` 로 초기화 되어있던 값에서 `값의 할당` 과정에서 `YOUNG MIN` 으로 `재할당` 되었다 볼 수 있다.
- 결과적으로 값의 재할당까지 적용되었을 경우, 이전 값인 `undefined` 나 `YOUNG MIN` 은 어떤 변수도 값으로 갖고 있지 않게 된다.
- 즉, 어떠한 식별자와도 연결되어 있지 않다는 것이고, 더 이상 필요하지 않다는 것을 의미한다.
- 이러한 불필요한 값들은 [가비지 콜렉터(Garbage collector)](<https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)>) 에 의해 `메모리에서 자동 해제` 된다. ( 단, 언제 해제될지는 예측 불가능 )

```
[ 🍧 맛보기 - const ]

+ 재할당은 변수에 저장된 값을 다른 값으로 변경하는 것 -> 그래서 "변수"
+ 만약, 값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아닌 "상수(Constant)"라고 한다.

ES6에서 const 키워드 도입
+ 이 키워드로 선언한 변수는 재할당 금지, 즉 단 한번만 할당할 수 있는 변수 즉, "상수를 표현"
```

<br>
<br>

# 식별자 네이밍 규칙

- 식별자는 특수문자를 제외한 `문자, 숫자, 언더스코어(_), 달러 기호($)` 를 포함 할 수 있다.
- 단, 식별자는 특수문자를 제외한 `문자, 언더스코어(_), 달러 기호($)` 로 시작해야 한다. (`숫자 시작 X`)
- [예약어](http://www.w3bai.com/ko/js/js_reserved.html)는 식별자로 사용할 수 없다.

<br>

### 네이밍 컨벤션(Naming Convention)

> 하나 이상의 영단어로 구성된 식별자를 만들 때 `가독성 좋게 단어를 한눈에 구분하기 위해 규정한 명명 규칙`

- 주요 4가지 유형 네이밍 컨벤션

```jsx
// 카멜 케이스(camelCase)
var fistMan;

// 스네이크 케이스(snake_case)
var first_man;

// 파스칼 케이스(PascalCase)
var FirstMan;

// 헝가리언 케이스(typeHungarianCase)
var strFirstMan;
var $elem = document.getElementById("myId");
var observable$ = fromEvent(document, "click");
```

- 자바스크립트에서는 일반적으로
  - `변수` 나 `함수` 이름에는 `카멜 케이스(camelCase)`
  - `생성자 함수`, `클래스 이름` 에는 `파스칼 케이스(PascalCase)`
