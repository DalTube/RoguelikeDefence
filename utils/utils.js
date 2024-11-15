export function logsPush(logs, row) {
   const maxRow = 52;
   if (logs.length >= maxRow) logs.shift();
   logs.push(row);
}
