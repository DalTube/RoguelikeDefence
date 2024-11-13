export function logsPush(logs, row) {
   //logs의 10개 이상일 경우 첫 로그 삭제 후 추가
   // let text = `│ ` + row;
   // const maxRow = 8;

   // if (logs.length >= maxRow) logs.shift();
   // logs.push(text);

   // if (logs.length < maxRow) {
   //    for (let i = logs.length; i < maxRow; i++) {
   //       logs.push(`│` + ' '.repeat(118) + `│`);
   //    }
   // }

   const maxRow = 10;
   if (logs.length >= maxRow) logs.shift();
   logs.push(row);
}
