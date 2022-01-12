# 모듈의 일반적 의미

> `모듈(module)` : 애플리케이션을 구성하는 개별적 요소로, 재사용 가능한 코드 조각을 의미

- 일반적으로 모듈은 기능을 기준으로, `파일 단위로 분리`
- 또한, 모듈이 성립되려면 `파일 스코프(= 모듈 스코프)를 가질 수 있어야 한다.`
  - 파일 스코프를 갖는 모듈의 자산(모듈 내 변수, 함수, 객체 등)은 기본적으로 `비공개 상태`
  - 즉, `캡슐화되어 다른 모듈에서 접근할 수 없다.`
  - 모듈은 `개별적 존재로서 애플리케이션과 분리되어 존재한다.`

![https://poiemaweb.com/img/module-pattern.png](https://poiemaweb.com/img/module-pattern.png)

> `export` : 모듈이 `공개가 필요한 자산에 한정`하여 명시적으로 `선택적 공개가 가능한 것`

> `import` : 모듈 사용자가 다른 모듈이 공개(export)한 자산 중 `일부 or 전체를 선택해 자신의 스코프 내로 불러들여 재사용할 수 있는 것`

- 모듈이 애플리케이션과 완전히 분리되어 개별적으로만 존재하고 재사용이 불가능하다면 존재의 의미가 없다.
- 공개(export)된 모듈의 자산은 다른 모듈에서 `재사용`할 수 있다.
  - 이때 공개된 모듈의 자산을 사용하는 모듈을 `모듈 사용자(module consumer)`라 한다.
- 모듈을 통해 코드의 단위를 명확히 분리하여 애플리케이션을 구성 가능
- `재사용성이 좋아, 개발 효율성과 유지보수성을 높인다.`

<br />
<br />

# 자바스크립트 모듈

> 자바스크립트 런타임 환경인 `Node.js` 는 모듈 시스템의 표준인 `CommonJS 를 채택`

- 현재는 100% 동일하진 않지만 기본적으로 CommonJS 사양을 따른다.
- 즉, Node.js 는 ECMAScript 표준 사양은 아니지만 모듈 시스템을 지원한다.
- 따라서 `Node.js 환경에서는 파일별로 독립적인 파일 스코프(모듈 스코프)를 가진다.`

<br />
<br />

# ES6 모듈(ESM)

> `ES6`에서 `클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가`

- IE를 제외한 대부분의 브라우저(크롬, 파이어폭스, 사파리, 엣지)에서 `ES6 모듈(ESM) 사용 가능`
- 사용법은 `script 태그에 type=”module” 어트리뷰트를 추가`하면 로드된 `자바스크립트 파일은 모듈로서 동작한다.`
- ESM임을 명확히하기 위해 `ESM의 파일 확장자`는 `.mjs` 를 사용할 것을 권장
- ESM은 기본적으로 `strict mode 가 적용`

<br />

### export 키워드

> `export` : 모듈 내부에서 선언한 식별자를 외부에 공개해서, 다른 모듈들이 재사용할 수 있게 하기 위해 사용

- export 키워드는 `선언문 앞에 사용`
- 변수, 함수, 클래스 등 `모든 식별자를 export 가능`
- 일일히 export 키워드 작성하기가 싫다면, export 할 대상을 `하나의 객체로 구성해서 한 번에 export 가능`

  ```jsx
  const sum = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;

  // 하나의 객체로 export 할 자산을 묶어서 공개한다.
  export { sum, sub, mul };
  ```

<br />

### import 키워드

> `import` : 다른 모듈에서 공개(export)한 식별자를 자신의 모듈 스코프 내부로 로드할 때 사용

- `다른 모듈이 export 한 식별자 이름으로 import 해야한다.`
- ESM의 경우 파일 확장자를 생략할 수 없다.
- 모듈이 export 한 식별자 이름을 일일히 지정하지 않고 `하나의 이름으로 한 번에 import 가능`

  - import 되는 식별자 뒤에 `as 키워드` 뒤에 작성한 이름의 객체에 프로퍼티로 할당됨

  ```jsx
  // *(에스터리스크) : 모든 자산을 의미
  // as 키워드 뒤에 lib 라는 다른 식별자 이름의 객체로 묶어서 사용하겠다는 것
  import * as lib from "/lib.mjs";

  console.log(lib.sum(1, 2));
  console.log(lib.sub(1, 2));
  console.log(lib.mul(1, 2));
  ```

- 모듈이 export 한 `식별자 이름을 변경해서 import 가능`

  ```jsx
  // 다른 모듈에서 sum 이라는 식별자 이름의 자산을 import 해오되
  // Add 라는 식별자 이름으로 변경해서 사용하겠다는 것
  import { sum as Add } from "/lib.mjs";

  console.log(Add(1, 2));
  ```

- 모듈에서 단 하나의 값만 export 한다면 `default 키워드` 사용 가능

  - default 키워드는 `var, let, const 키워드 사용 불가`

  ```jsx
  export default const foo = () => {};
  // SyntaxError: Unexpected token 'const'
  ```

  - default 키워드와 함께 export 한 모듈은 `중괄호({}) 없이` 임의의 이름으로 import

  ```jsx
  import exportedWithDefault from "./lib.mjs";

  console.log(exportedWithDefault());
  ```
