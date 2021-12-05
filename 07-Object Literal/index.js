// var person = {
//   "last-name": "WI",
//   1: 10,
// };

// person.'last-name';     // SyntaxError: Unexpected string
// person.last-name;       // 브라우저 환경: NaN 👉 undefined - ''(전역 객체 window 프로퍼티에 name 전역변수 == 빈 문자열)
//                         // Node.js 환경: ReferenceError: name is not defined 👉 undefined - name(식별자 name)

// person[last-name];      // ReferenceError: last is not defined
// person['last-name'];    // Lee

// person.1;               // SyntaxError: Unexpected number
// person.'1';             // SyntaxError: Unexpected string
// person[1];              // 10 : person[1] -> person['1']
// person['1'];            // 10
