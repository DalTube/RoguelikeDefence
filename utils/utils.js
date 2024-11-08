export function logsPush(logs, row) {
   //logs의 10개 이상일 경우 첫 로그 삭제 후 추가
   if (logs.length >= 20) {
      logs.shift();
      logs.push(row);
   } else {
      logs.push(row);
   }
}
