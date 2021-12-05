console.log(person); // undefined

person = "YOUNG MIN";
var person;

console.log(person); // YOUNG MIN

/**
 * 1번 째 console.log(person)은 런타임 이전 "변수 선언"까지만 실행된 이후 출력 -> undefined
 * 2번 째 console.log(person)은 런타임 이전 "변수 선언" 이후, 런타임 시점에 "값의 할당"까지 실행된 이후 출력 -> "YOUGN MIN"
 */
