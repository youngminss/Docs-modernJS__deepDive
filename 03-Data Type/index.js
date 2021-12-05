/**
 * 자바스크립트 숫자(number) 타입
 */
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

// 65라는 수를 2진법, 8진법, 16진법으로 표기한 것일 뿐, 모두 같은 값으로 판단
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true
