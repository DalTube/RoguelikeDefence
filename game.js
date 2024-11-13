import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Castle } from './models/castle.js';
import { Monster } from './models/monster.js';
import { Unit } from './models/unit.js';
import { Item } from './models/item.js';
import * as Items from './constants/items.js';
import * as GameSystem from './constants/settings.js';
import { logsPush } from './utils/utils.js';
import * as Settings from './settings.js';

function displayStatus(stage, wave, turn, castle, unitStr, locUnits, displayMonsters) {
   let maxCol = 120;
   let statusText = `│ 난이도: 보통 | 스테이지: ${stage} | 웨이브: ${wave} | 다음 웨이브: ${turn}턴 | 성 체력: ${castle.hp}/${Settings.maxCastleHp}`;
   let blank = maxCol - statusText.length - 22; //왜 22를 빼야할까? byte 연관인 것 같은데...
   console.log(`┌` + '─'.repeat(118) + `┐`);
   console.log(`${statusText}` + ' '.repeat(blank) + `│`);
   console.log(`└` + '─'.repeat(118) + `┘`);

   let unitGradeStart = [`☆    `, `☆☆  `, `☆☆☆`];
   console.log(`┌─ ` + ` 유닛 정보 ` + '─'.repeat(45) + `┐` + `┌─ ` + ` 몬스터 정보 ` + '─'.repeat(43) + `┐`);
   console.log(`│` + ' '.repeat(58) + `│` + `│` + ' '.repeat(58) + `│`);
   console.log(`│` + ' '.repeat(2) + `번호` + ' '.repeat(2) + `종류` + ' '.repeat(3) + `등급` + ' '.repeat(2) + `공격력` + ' '.repeat(5) + `번호` + ' '.repeat(2) + `종류` + ' '.repeat(3) + `등급` + ' '.repeat(2) + `공격력` + ' '.repeat(1) + `│` + `│` + ' '.repeat(2) + `번호` + ' '.repeat(2) + `이름` + ' '.repeat(3) + `체력` + ' '.repeat(2) + `공격력` + ' '.repeat(5) + `번호` + ' '.repeat(2) + `이름` + ' '.repeat(3) + `체력` + ' '.repeat(2) + `공격력` + ' '.repeat(1) + `│`);

   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[0][0] ? 1 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[0][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[0][0] ? unitGradeStart[locUnits[0][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[0][0] ? (locUnits[0][0]['damage'].toString().length === 1 ? ' ' + locUnits[0][0]['damage'] : locUnits[0][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[0][1] ? 1 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[0][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[0][1] ? unitGradeStart[locUnits[0][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[0][1] ? (locUnits[0][1]['damage'].toString().length === 1 ? ' ' + locUnits[0][1]['damage'] : locUnits[0][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[0] ? 'A' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[0] ? (displayMonsters[0]['name'].toString().length === 1 ? '  ' + displayMonsters[0]['name'] + '  ' : displayMonsters[0]['name'].toString().length === 2 ? '  ' + displayMonsters[0]['name'] : displayMonsters[0]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[0] ? (displayMonsters[0]['hp'].toString().length === 1 ? '  ' + displayMonsters[0]['hp'] : displayMonsters[0]['hp'].toString().length === 2 ? ' ' + displayMonsters[0]['hp'] : displayMonsters[0]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[0] ? (displayMonsters[0]['damage'].toString().length === 1 ? '  ' + displayMonsters[0]['damage'] : displayMonsters[0]['damage'].toString().length === 2 ? ' ' + displayMonsters[0]['damage'] : displayMonsters[0]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[1] ? 'B' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[1] ? (displayMonsters[1]['name'].toString().length === 1 ? '  ' + displayMonsters[1]['name'] + '  ' : displayMonsters[1]['name'].toString().length === 2 ? '  ' + displayMonsters[1]['name'] : displayMonsters[1]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[1] ? (displayMonsters[1]['hp'].toString().length === 1 ? '  ' + displayMonsters[1]['hp'] : displayMonsters[1]['hp'].toString().length === 2 ? ' ' + displayMonsters[1]['hp'] : displayMonsters[1]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[1] ? (displayMonsters[1]['damage'].toString().length === 1 ? '  ' + displayMonsters[1]['damage'] : displayMonsters[1]['damage'].toString().length === 2 ? ' ' + displayMonsters[1]['damage'] : displayMonsters[1]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[1][0] ? 2 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[1][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[1][0] ? unitGradeStart[locUnits[1][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[1][0] ? (locUnits[1][0]['damage'].toString().length === 1 ? ' ' + locUnits[1][0]['damage'] : locUnits[1][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[1][1] ? 2 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[1][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[1][1] ? unitGradeStart[locUnits[1][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[1][1] ? (locUnits[1][1]['damage'].toString().length === 1 ? ' ' + locUnits[1][1]['damage'] : locUnits[1][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[2] ? 'C' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[2] ? (displayMonsters[2]['name'].toString().length === 1 ? '  ' + displayMonsters[2]['name'] + '  ' : displayMonsters[2]['name'].toString().length === 2 ? '  ' + displayMonsters[2]['name'] : displayMonsters[2]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[2] ? (displayMonsters[2]['hp'].toString().length === 1 ? '  ' + displayMonsters[2]['hp'] : displayMonsters[2]['hp'].toString().length === 2 ? ' ' + displayMonsters[2]['hp'] : displayMonsters[2]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[2] ? (displayMonsters[2]['damage'].toString().length === 1 ? '  ' + displayMonsters[2]['damage'] : displayMonsters[2]['damage'].toString().length === 2 ? ' ' + displayMonsters[2]['damage'] : displayMonsters[2]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[3] ? 'D' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[3] ? (displayMonsters[3]['name'].toString().length === 1 ? '  ' + displayMonsters[3]['name'] + '  ' : displayMonsters[3]['name'].toString().length === 2 ? '  ' + displayMonsters[3]['name'] : displayMonsters[3]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[3] ? (displayMonsters[3]['hp'].toString().length === 1 ? '  ' + displayMonsters[3]['hp'] : displayMonsters[3]['hp'].toString().length === 2 ? ' ' + displayMonsters[3]['hp'] : displayMonsters[3]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[3] ? (displayMonsters[3]['damage'].toString().length === 1 ? '  ' + displayMonsters[3]['damage'] : displayMonsters[3]['damage'].toString().length === 2 ? ' ' + displayMonsters[3]['damage'] : displayMonsters[3]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[2][0] ? 3 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[2][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[2][0] ? unitGradeStart[locUnits[2][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[2][0] ? (locUnits[2][0]['damage'].toString().length === 1 ? ' ' + locUnits[2][0]['damage'] : locUnits[2][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[2][1] ? 3 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[2][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[2][1] ? unitGradeStart[locUnits[2][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[2][1] ? (locUnits[2][1]['damage'].toString().length === 1 ? ' ' + locUnits[2][1]['damage'] : locUnits[2][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[4] ? 'E' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[4] ? (displayMonsters[4]['name'].toString().length === 1 ? '  ' + displayMonsters[4]['name'] + '  ' : displayMonsters[4]['name'].toString().length === 2 ? '  ' + displayMonsters[4]['name'] : displayMonsters[4]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[4] ? (displayMonsters[4]['hp'].toString().length === 1 ? '  ' + displayMonsters[4]['hp'] : displayMonsters[4]['hp'].toString().length === 2 ? ' ' + displayMonsters[4]['hp'] : displayMonsters[4]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[4] ? (displayMonsters[4]['damage'].toString().length === 1 ? '  ' + displayMonsters[4]['damage'] : displayMonsters[4]['damage'].toString().length === 2 ? ' ' + displayMonsters[4]['damage'] : displayMonsters[4]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[5] ? 'F' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[5] ? (displayMonsters[5]['name'].toString().length === 1 ? '  ' + displayMonsters[5]['name'] + '  ' : displayMonsters[5]['name'].toString().length === 2 ? '  ' + displayMonsters[5]['name'] : displayMonsters[5]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[5] ? (displayMonsters[5]['hp'].toString().length === 1 ? '  ' + displayMonsters[5]['hp'] : displayMonsters[5]['hp'].toString().length === 2 ? ' ' + displayMonsters[5]['hp'] : displayMonsters[5]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[5] ? (displayMonsters[5]['damage'].toString().length === 1 ? '  ' + displayMonsters[5]['damage'] : displayMonsters[5]['damage'].toString().length === 2 ? ' ' + displayMonsters[5]['damage'] : displayMonsters[5]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[3][0] ? 4 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[3][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[3][0] ? unitGradeStart[locUnits[3][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[3][0] ? (locUnits[3][0]['damage'].toString().length === 1 ? ' ' + locUnits[3][0]['damage'] : locUnits[3][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[3][1] ? 4 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[3][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[3][1] ? unitGradeStart[locUnits[3][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[3][1] ? (locUnits[3][1]['damage'].toString().length === 1 ? ' ' + locUnits[3][1]['damage'] : locUnits[3][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[6] ? 'G' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[6] ? (displayMonsters[6]['name'].toString().length === 1 ? '  ' + displayMonsters[6]['name'] + '  ' : displayMonsters[6]['name'].toString().length === 2 ? '  ' + displayMonsters[6]['name'] : displayMonsters[6]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[6] ? (displayMonsters[6]['hp'].toString().length === 1 ? '  ' + displayMonsters[6]['hp'] : displayMonsters[6]['hp'].toString().length === 2 ? ' ' + displayMonsters[6]['hp'] : displayMonsters[6]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[6] ? (displayMonsters[6]['damage'].toString().length === 1 ? '  ' + displayMonsters[6]['damage'] : displayMonsters[6]['damage'].toString().length === 2 ? ' ' + displayMonsters[6]['damage'] : displayMonsters[6]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[7] ? 'H' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[7] ? (displayMonsters[7]['name'].toString().length === 1 ? '  ' + displayMonsters[7]['name'] + '  ' : displayMonsters[7]['name'].toString().length === 2 ? '  ' + displayMonsters[7]['name'] : displayMonsters[7]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[7] ? (displayMonsters[7]['hp'].toString().length === 1 ? '  ' + displayMonsters[7]['hp'] : displayMonsters[7]['hp'].toString().length === 2 ? ' ' + displayMonsters[7]['hp'] : displayMonsters[7]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[7] ? (displayMonsters[7]['damage'].toString().length === 1 ? '  ' + displayMonsters[7]['damage'] : displayMonsters[7]['damage'].toString().length === 2 ? ' ' + displayMonsters[7]['damage'] : displayMonsters[7]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[4][0] ? 5 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[4][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[4][0] ? unitGradeStart[locUnits[4][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[4][0] ? (locUnits[4][0]['damage'].toString().length === 1 ? ' ' + locUnits[4][0]['damage'] : locUnits[4][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[4][1] ? 5 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[4][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[4][1] ? unitGradeStart[locUnits[4][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[4][1] ? (locUnits[4][1]['damage'].toString().length === 1 ? ' ' + locUnits[4][1]['damage'] : locUnits[4][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[8] ? 'I' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[8] ? (displayMonsters[8]['name'].toString().length === 1 ? '  ' + displayMonsters[8]['name'] + '  ' : displayMonsters[8]['name'].toString().length === 2 ? '  ' + displayMonsters[8]['name'] : displayMonsters[8]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[8] ? (displayMonsters[8]['hp'].toString().length === 1 ? '  ' + displayMonsters[8]['hp'] : displayMonsters[8]['hp'].toString().length === 2 ? ' ' + displayMonsters[8]['hp'] : displayMonsters[8]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[8] ? (displayMonsters[8]['damage'].toString().length === 1 ? '  ' + displayMonsters[8]['damage'] : displayMonsters[8]['damage'].toString().length === 2 ? ' ' + displayMonsters[8]['damage'] : displayMonsters[8]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[9] ? 'J' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[9] ? (displayMonsters[9]['name'].toString().length === 1 ? '  ' + displayMonsters[9]['name'] + '  ' : displayMonsters[9]['name'].toString().length === 2 ? '  ' + displayMonsters[9]['name'] : displayMonsters[9]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[9] ? (displayMonsters[9]['hp'].toString().length === 1 ? '  ' + displayMonsters[9]['hp'] : displayMonsters[9]['hp'].toString().length === 2 ? ' ' + displayMonsters[9]['hp'] : displayMonsters[9]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[9] ? (displayMonsters[9]['damage'].toString().length === 1 ? '  ' + displayMonsters[9]['damage'] : displayMonsters[9]['damage'].toString().length === 2 ? ' ' + displayMonsters[9]['damage'] : displayMonsters[9]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   console.log(
      `│` +
         ' '.repeat(4) +
         `${locUnits[5][0] ? 6 : ' '}` +
         ' '.repeat(3) +
         `${locUnits[5][0] ? unitStr[0] : '    '}` +
         ' '.repeat(2) +
         `${locUnits[5][0] ? unitGradeStart[locUnits[5][0]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[5][0] ? (locUnits[5][0]['damage'].toString().length === 1 ? ' ' + locUnits[5][0]['damage'] : locUnits[5][0]['damage']) : '  '}` +
         ' '.repeat(9) +
         `${locUnits[5][1] ? 6 : ' '}` +
         ' '.repeat(2) +
         `${locUnits[5][1] ? unitStr[1] : '      '}` +
         ' '.repeat(1) +
         `${locUnits[5][1] ? unitGradeStart[locUnits[5][1]['grade'] - 1] : '      '}` +
         ' '.repeat(3) +
         `${locUnits[5][1] ? (locUnits[5][1]['damage'].toString().length === 1 ? ' ' + locUnits[5][1]['damage'] : locUnits[5][1]['damage']) : '  '}` +
         ' '.repeat(3) +
         `│` +
         `│` +
         ' '.repeat(4) +
         `${displayMonsters[10] ? 'K' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[10] ? (displayMonsters[10]['name'].toString().length === 1 ? '  ' + displayMonsters[10]['name'] + '  ' : displayMonsters[10]['name'].toString().length === 2 ? '  ' + displayMonsters[10]['name'] : displayMonsters[10]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[10] ? (displayMonsters[10]['hp'].toString().length === 1 ? '  ' + displayMonsters[10]['hp'] : displayMonsters[10]['hp'].toString().length === 2 ? ' ' + displayMonsters[10]['hp'] : displayMonsters[10]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[10] ? (displayMonsters[10]['damage'].toString().length === 1 ? '  ' + displayMonsters[10]['damage'] : displayMonsters[10]['damage'].toString().length === 2 ? ' ' + displayMonsters[10]['damage'] : displayMonsters[10]['damage']) : '   '}` +
         ' '.repeat(9) +
         `${displayMonsters[11] ? 'L' : ' '}` +
         ' '.repeat(2) +
         `${displayMonsters[11] ? (displayMonsters[11]['name'].toString().length === 1 ? '  ' + displayMonsters[11]['name'] + '  ' : displayMonsters[11]['name'].toString().length === 2 ? '  ' + displayMonsters[11]['name'] : displayMonsters[11]['name']) : '      '}` +
         ' '.repeat(3) +
         `${displayMonsters[11] ? (displayMonsters[11]['hp'].toString().length === 1 ? '  ' + displayMonsters[11]['hp'] : displayMonsters[11]['hp'].toString().length === 2 ? ' ' + displayMonsters[11]['hp'] : displayMonsters[11]['hp']) : '   '}` +
         ' '.repeat(3) +
         `${displayMonsters[11] ? (displayMonsters[11]['damage'].toString().length === 1 ? '  ' + displayMonsters[11]['damage'] : displayMonsters[11]['damage'].toString().length === 2 ? ' ' + displayMonsters[11]['damage'] : displayMonsters[11]['damage']) : '   '}` +
         ' '.repeat(3) +
         `│`,
   );
   // console.log(`│` + ' '.repeat(58) + `│` + `│` + ' '.repeat(58) + `│`);
   console.log(`└` + '─'.repeat(58) + `┘` + `└` + '─'.repeat(58) + `┘`);

   // console.log(chalk.white(`─ │ ┌ ┐ ┘ └ ├ ┬ ┤ ┴ ┼ ━ ┃ ┏ ┓ ┛ ┗ ┣ ┳ ┫ ┻ ╋ ┠ ┯ ┨ ┷ ┿ ┝ ┰ ┥ ┸ ╂ ┒ ┑ ┚ ┙ ┖ ┕ ┎ ┍ ┞ ┟ ┡ ┢ ┦ ┧ ┩ ┪ ┭ ┮ ┱ ┲ ┵ ┶ ┹ ┺ ┽ ┾ ╀ ╁ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊`));
}

function displayMap(locUnits, locMonsters) {
   //백업용
   // console.log(line);
   // console.log(chalk.white('                   _____'));
   // console.log(chalk.white('                  <_____|'));
   // console.log(chalk.white('                        |'));
   // console.log(chalk.white('  ___                  .|'));
   // console.log(chalk.white(" <___|               .'/``."));
   // console.log(chalk.white("  _  |  _   _      .' / :`.`."));
   // console.log(chalk.white("_|;|_|_|;|_|;|__ .'  /  : .'|_"));
   // console.log(chalk.white("     |          --------.' .'|"));
   // console.log(chalk.white("   / ^\\         | |###| |.'  |"));
   // console.log(chalk.white(`  /  | \\     .\'        .\'    |`));
   // console.log(chalk.white(` /   |  \\  .\'        .\'      |`));
   // console.log(chalk.white("/____|___\\'        .'        |"));
   // console.log(chalk.white("|         |      .' ㅡ\\     .'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"));
   // console.log(chalk.white("|    _    |    .'  /+++|  .'🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|   |#|   |  .'   ㅣ+++|.'🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|  =====  |.'     ㅣ++.'🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|         |       ㅣ.'🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|         |      .' 🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|         |    .' 🐉  🐉  🐉     🐉     🐉     🐉     🐉"));
   // console.log(chalk.white("|         |  .'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __"));
   // console.log(chalk.white("|_________|.'                                                         \n"));
   // console.log(line);
   // console.log(``);
   // console.log(' '.repeat(11) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(11) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(11) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);
   // console.log(' '.repeat(9) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(9) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(9) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);
   // console.log(' '.repeat(7) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(7) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(7) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);
   // console.log(' '.repeat(5) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(5) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(5) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);
   // console.log(' '.repeat(3) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(3) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(3) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);
   // console.log(' '.repeat(1) + ` O ) ` + ' '.repeat(4) + `┃ O__`);
   // console.log(' '.repeat(1) + `<|[-]=> ` + ' '.repeat(1) + `╋/|)_)`);
   // console.log(' '.repeat(1) + `/ \\) ` + ' '.repeat(4) + ` / \\`);
   // console.log(``);

   // console.log(` O /`);
   // console.log(`<|\\|`);
   // console.log(`/ \\|)`);

   // console.log(' '.repeat(11) + `${locUnits[0][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[0][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(11) + `${locUnits[0][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[0][0] ? '╋/|)_)' : '      '}`);
   // console.log(' '.repeat(11) + `${locUnits[0][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[0][0] ? ' / \\' : '    '}`);
   // // console.log(``);
   // console.log(' '.repeat(9) + `${locUnits[1][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[1][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(9) + `${locUnits[1][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[1][0] ? '╋/|)_)' : '      '}`);
   // console.log(' '.repeat(9) + `${locUnits[1][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[1][0] ? ' / \\' : '    '}`);
   // // console.log(``);
   // console.log(' '.repeat(7) + `${locUnits[2][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[2][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(7) + `${locUnits[2][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[2][0] ? '╋/|)_)' : '      '}`);
   // console.log(`${locUnits[0][2] ? ' O / ' : '     '}` + ' '.repeat(2) + `${locUnits[2][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[2][0] ? ' / \\' : '    '}`);
   // console.log(`${locUnits[0][2] ? '<|\\| ' : '     '}`);
   // console.log(`${locUnits[0][2] ? '/ \\| ' : '     '}` + ' '.repeat(0) + `${locUnits[3][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[3][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(5) + `${locUnits[3][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[3][0] ? '╋/|)_)' : '      '}`);
   // console.log(' '.repeat(5) + `${locUnits[3][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[3][0] ? ' / \\' : '    '}`);
   // // console.log(``);
   // console.log(' '.repeat(3) + `${locUnits[4][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[4][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(3) + `${locUnits[4][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[4][0] ? '╋/|)_)' : '      '}`);
   // console.log(' '.repeat(3) + `${locUnits[4][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[4][0] ? ' / \\' : '    '}`);
   // // console.log(``);
   // console.log(' '.repeat(1) + `${locUnits[5][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[5][0] ? '┃ O__' : '     '}`);
   // console.log(' '.repeat(1) + `${locUnits[5][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[5][0] ? '╋/|)_)' : '      '}`);
   // console.log(' '.repeat(1) + `${locUnits[5][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[5][0] ? ' / \\' : '    '}`);
   // // console.log(``);
   console.log(' '.repeat(6) + '                    _____');
   console.log(' '.repeat(6) + '                   <_____|');
   console.log(' '.repeat(6) + '                         |');
   console.log(' '.repeat(6) + '  ___                   .|');
   console.log(' '.repeat(6) + " <___|                .'/``.");
   console.log(' '.repeat(6) + "  _  |  _   _       .' / :\\ `");
   console.log(' '.repeat(6) + "_|;|_|_|;|_|;|__  .'  /  : .'|");
   console.log(' '.repeat(6) + "     |           --------''.'|");
   console.log(' '.repeat(6) + "   / ^\\         | |###| |.'  |");
   console.log(' '.repeat(6) + '                             |');
   console.log(' '.repeat(17) + `${locUnits[0][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[0][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/|');
   console.log(' '.repeat(17) + `${locUnits[0][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[0][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(1) + '|');
   console.log(' '.repeat(17) + `${locUnits[0][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[0][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(2) + '|');
   // console.log(``);
   console.log(' '.repeat(14) + `${locUnits[1][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[1][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/' + ' '.repeat(3) + '|');
   console.log(' '.repeat(14) + `${locUnits[1][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[1][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(4) + '|');
   console.log(' '.repeat(14) + `${locUnits[1][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[1][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(5) + '|');
   // console.log(``);
   console.log(' '.repeat(11) + `${locUnits[2][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[2][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/' + ' '.repeat(6) + '|');
   console.log(' '.repeat(11) + `${locUnits[2][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[2][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(7) + '|');
   console.log(' '.repeat(1) + `${locUnits[0][2] ? ' O / ' : '     '}` + ' '.repeat(5) + `${locUnits[2][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[2][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(8) + '|' + ' '.repeat(4) + 'ㅡ'.repeat(39));
   console.log(' '.repeat(1) + `${locUnits[0][2] ? '<|\\| ' : '     '}` + ' '.repeat(20) + '/' + ' '.repeat(9) + '|');
   console.log(' '.repeat(1) + `${locUnits[0][2] ? '/ \\| ' : '     '}` + ' '.repeat(1) + `${locUnits[3][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[3][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/' + ' '.repeat(4) + 'ㅡ\\' + ' '.repeat(3) + '|');
   console.log(' '.repeat(7) + `${locUnits[3][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[3][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(4) + '/+++|' + ' '.repeat(2) + '|');
   console.log(' '.repeat(7) + `${locUnits[3][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[3][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(3) + '/+++++|');
   // console.log(``);
   console.log(' '.repeat(4) + `${locUnits[4][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[4][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/' + ' '.repeat(4) + '/+++++|');
   console.log(' '.repeat(4) + `${locUnits[4][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[4][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(3) + '/+++++++|');
   console.log(' '.repeat(4) + `${locUnits[4][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[4][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(4) + '/+++++++');
   // console.log(``);
   console.log(' '.repeat(1) + `${locUnits[5][1] ? ' O ) ' : '     '}` + ' '.repeat(4) + `${locUnits[5][0] ? '┃ O__' : '     '}` + ' '.repeat(4) + '/' + ' '.repeat(3) + '/++++++++');
   console.log(' '.repeat(1) + `${locUnits[5][1] ? '<|[-]=> ' : '        '}` + ' '.repeat(1) + `${locUnits[5][0] ? '╋/|)_)' : '      '}` + ' '.repeat(2) + '/' + ' '.repeat(4) + '/+++++++');
   console.log(' '.repeat(1) + `${locUnits[5][1] ? '/ \\) ' : '     '}` + ' '.repeat(4) + `${locUnits[5][0] ? ' / \\' : '    '}` + ' '.repeat(3) + '/' + ' '.repeat(3) + '/++++++++');
   console.log(' '.repeat(16) + '/' + ' '.repeat(4) + '/+++++++');
   console.log(' ' + 'ㅡ'.repeat(7) + '/' + ' '.repeat(4) + '|+++++++');
   console.log(' '.repeat(15) + '|' + ' '.repeat(4) + '|++++++');
   console.log(' '.repeat(4) + '|###|' + ' '.repeat(6) + '|' + ' '.repeat(4) + '|+++++');
   console.log(' '.repeat(4) + '|###|' + ' '.repeat(6) + '|' + ' '.repeat(4) + '|++++');
   console.log(' '.repeat(4) + '=====' + ' '.repeat(6) + '|' + ' '.repeat(4) + '|+++');
   console.log(' '.repeat(15) + '|' + ' '.repeat(4) + '|++');
   console.log(' '.repeat(15) + '|' + ' '.repeat(4) + '|+');
   // console.log(``);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   // console.log(` O ) ` + ' '.repeat(3) + `┃ O__`);
   // console.log(`<|[-]=> ` + ' '.repeat(0) + `╋/|)_)`);
   // console.log(`/ \\) ` + ' '.repeat(3) + ` / \\`);
   // console.log(``);
   //

   //---------------------------       버퍼                       원거리                        근접
   // console.log(chalk.white(`| ${locUnits[0][2]['name']} | ${locUnits[0][1]['name']} | ${locUnits[0][0]['name']} | || | ${locMonsters[0][0]['name']} | ${locMonsters[0][1]['name']} | ${locMonsters[0][2]['name']} | ${locMonsters[0][3]['name']} | ${locMonsters[0][4]['name']} | ${locMonsters[0][5]['name']} | ${locMonsters[0][6]['name']} |`));

   // console.log(chalk.white(`| ${locUnits[1][2]['name']} | ${locUnits[1][1]['name']} | ${locUnits[1][0]['name']} | || | ${locMonsters[1][0]['name']} | ${locMonsters[1][1]['name']} | ${locMonsters[1][2]['name']} | ${locMonsters[1][3]['name']} | ${locMonsters[1][4]['name']} | ${locMonsters[1][5]['name']} | ${locMonsters[1][6]['name']} |`));
   // console.log(chalk.white(`| ${locUnits[2][2]['name']} | ${locUnits[2][1]['name']} | ${locUnits[2][0]['name']} | || | ${locMonsters[2][0]['name']} | ${locMonsters[2][1]['name']} | ${locMonsters[2][2]['name']} | ${locMonsters[2][3]['name']} | ${locMonsters[2][4]['name']} | ${locMonsters[2][5]['name']} | ${locMonsters[2][6]['name']} |`));
   // console.log(chalk.white(`| ${locUnits[3][2]['name']} | ${locUnits[3][1]['name']} | ${locUnits[3][0]['name']} | || | ${locMonsters[3][0]['name']} | ${locMonsters[3][1]['name']} | ${locMonsters[3][2]['name']} | ${locMonsters[3][3]['name']} | ${locMonsters[3][4]['name']} | ${locMonsters[3][5]['name']} | ${locMonsters[3][6]['name']} |`));
   // console.log(chalk.white(`| ${locUnits[4][2]['name']} | ${locUnits[4][1]['name']} | ${locUnits[4][0]['name']} | || | ${locMonsters[4][0]['name']} | ${locMonsters[4][1]['name']} | ${locMonsters[4][2]['name']} | ${locMonsters[4][3]['name']} | ${locMonsters[4][4]['name']} | ${locMonsters[4][5]['name']} | ${locMonsters[4][6]['name']} |`));
   // console.log(chalk.white(`| ${locUnits[5][2]['name']} | ${locUnits[5][1]['name']} | ${locUnits[5][0]['name']} | || | ${locMonsters[5][0]['name']} | ${locMonsters[5][1]['name']} | ${locMonsters[5][2]['name']} | ${locMonsters[5][3]['name']} | ${locMonsters[5][4]['name']} | ${locMonsters[5][5]['name']} | ${locMonsters[5][6]['name']} |`));

   // console.log('');
   // console.log(chalk.white(`| ${locUnits[0][2]['name']} | ${locUnits[0][1]['name']} | ${locUnits[0][0]['name']} | || | ${locMonsters[0][0]['hp']} | ${locMonsters[0][1]['hp']} | ${locMonsters[0][2]['hp']} | ${locMonsters[0][3]['hp']} | ${locMonsters[0][4]['hp']} | ${locMonsters[0][5]['hp']} | ${locMonsters[0][6]['hp']} |`));

   // console.log(chalk.white(`| ${locUnits[1][2]['name']} | ${locUnits[1][1]['name']} | ${locUnits[1][0]['name']} | || | ${locMonsters[1][0]['hp']} | ${locMonsters[1][1]['hp']} | ${locMonsters[1][2]['hp']} | ${locMonsters[1][3]['hp']} | ${locMonsters[1][4]['hp']} | ${locMonsters[1][5]['hp']} | ${locMonsters[1][6]['hp']} |`));
   // console.log(chalk.white(`| ${locUnits[2][2]['name']} | ${locUnits[2][1]['name']} | ${locUnits[2][0]['name']} | || | ${locMonsters[2][0]['hp']} | ${locMonsters[2][1]['hp']} | ${locMonsters[2][2]['hp']} | ${locMonsters[2][3]['hp']} | ${locMonsters[2][4]['hp']} | ${locMonsters[2][5]['hp']} | ${locMonsters[2][6]['hp']} |`));
   // console.log(chalk.white(`| ${locUnits[3][2]['name']} | ${locUnits[3][1]['name']} | ${locUnits[3][0]['name']} | || | ${locMonsters[3][0]['hp']} | ${locMonsters[3][1]['hp']} | ${locMonsters[3][2]['hp']} | ${locMonsters[3][3]['hp']} | ${locMonsters[3][4]['hp']} | ${locMonsters[3][5]['hp']} | ${locMonsters[3][6]['hp']} |`));
   // console.log(chalk.white(`| ${locUnits[4][2]['name']} | ${locUnits[4][1]['name']} | ${locUnits[4][0]['name']} | || | ${locMonsters[4][0]['hp']} | ${locMonsters[4][1]['hp']} | ${locMonsters[4][2]['hp']} | ${locMonsters[4][3]['hp']} | ${locMonsters[4][4]['hp']} | ${locMonsters[4][5]['hp']} | ${locMonsters[4][6]['hp']} |`));
   // console.log(chalk.white(`| ${locUnits[5][2]['name']} | ${locUnits[5][1]['name']} | ${locUnits[5][0]['name']} | || | ${locMonsters[5][0]['hp']} | ${locMonsters[5][1]['hp']} | ${locMonsters[5][2]['hp']} | ${locMonsters[5][3]['hp']} | ${locMonsters[5][4]['hp']} | ${locMonsters[5][5]['hp']} | ${locMonsters[5][6]['hp']} |`));
   // console.log(`┌` + '─'.repeat(118) + `┐`);
}

const battle = async (stage, castle, isWin, locUnits, inventory, itemBuffTurn) => {
   let logs = [];
   let wave = 1;
   let turn = 5;
   let isStageClear = false;

   let monsters = []; //몬스터 생성
   let locMonsters = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
   ];

   let displayMonsters = [];
   // let locUnits = [6][2]; //줄/열
   // 근접,원거리, 버퍼
   // let locUnits = [
   //    [false, false, false],
   //    [false, false, false],
   //    [false, false, false],
   //    [false, false, false],
   //    [false, false, false],
   //    [false, false, false],
   // ];

   let choiseStr = ['유닛 소환', '유닛 조합(확률)', '아이템', `수리(${castle.repairCnt}회)`]; //기본 선택지
   let mixStr = ['근접 유닛 조합', '원거리 유닛 조합', '무작위 조합(근접,원거리)']; //조합 선택지
   let unitStr = ['근접', '원거리', '버퍼']; //유닛 종류
   let itemStr = [Items.ITEM_CODE01_NAME, Items.ITEM_CODE02_NAME, Items.ITEM_CODE03_NAME];

   //Stage 시작 시 몬스터 소환
   monsterSpawn(logs, locMonsters, displayMonsters, stage, wave);

   while (castle.hp > 0 && !isStageClear) {
      console.clear();

      //상단 Display출력
      displayStatus(stage, wave, turn, castle, unitStr, locUnits, displayMonsters);
      displayMap(locUnits, locMonsters);

      //Logs 출력
      // logs.forEach((log) => console.log(log));
      // console.log(`└` + '─'.repeat(118) + `┘`);

      //기본 선택문
      console.log(chalk.green(`\n1. ${choiseStr[0]} 2. ${choiseStr[1]} 3. ${choiseStr[2]} 4. ${choiseStr[3]}`));
      const choice = readlineSync.question('당신의 선택은? ');

      // 플레이어의 선택에 따라 다음 행동 처리
      switch (choice) {
         case '1':
            //소환
            console.log(chalk.green(`\n1. 근접 유닛 2. 원거리 유닛 3. 버퍼 4. 취소`));
            const choiceUnit = readlineSync.question('당신의 선택은? ');

            switch (choiceUnit) {
               case '1':
               case '2':
               case '3':
                  let isCreate = createUnit(locUnits, Number(choiceUnit), unitStr, 1);
                  if (isCreate) {
                     logsPush(logs, chalk.green(`[${choiseStr[choice - 1]}] ${unitStr[choiceUnit - 1]} 유닛을 소환하셨습니다.`));
                     break;
                  } else {
                     logsPush(logs, chalk.red(`${unitStr[choice - 1]} 유닛을 더 이상 소환할 수 없습니다.(최대 6)`));
                     continue;
                  }
               case '4':
               default:
                  continue;
            }
            break;
         case '2':
            //조합
            console.log(chalk.green(`\n1. ${mixStr[0]} 2. ${mixStr[1]} 3. ${mixStr[2]} 4. 취소`) + chalk.blackBright(`\n(기본 -> 중급 ${Settings.grade1Per}% | 중급 -> 상급 ${Settings.grade2Per}%)`));
            const choiceMix = readlineSync.question('당신의 선택은? ');

            let isContinue = false;
            let isSuccess = false;

            switch (choiceMix) {
               case '1':
               case '2':
                  let unitGrade1Cnt = 0;
                  let unitGrade2Cnt = 0;
                  let unitGrade1Arr;
                  let unitGrade2Arr;

                  do {
                     unitGrade1Cnt = 0;
                     unitGrade2Cnt = 0;
                     unitGrade1Arr = [];
                     unitGrade2Arr = [];
                     //3개 체크
                     for (let i = 0; i < locUnits.length; i++) {
                        if (locUnits[i][Number(choiceMix) - 1]) {
                           //등급별 유닛 수 체크
                           if (locUnits[i][Number(choiceMix) - 1]['grade'] === 1) {
                              unitGrade1Cnt++;
                              unitGrade1Arr.push(i);
                           } else if (locUnits[i][Number(choiceMix) - 1]['grade'] === 2) {
                              unitGrade2Cnt++;
                              unitGrade2Arr.push(i);
                           }
                        }
                     }

                     if (unitGrade1Cnt >= 3 || unitGrade2Cnt >= 3) {
                        //소환
                        //2등급 생성
                        if (unitGrade1Cnt >= 3) {
                           // 80%의 성공 확률
                           if (Math.floor(Math.random() * 100) < Settings.grade1Per) {
                              mixUnit(locUnits, unitGrade1Arr, Number(choiceMix), unitStr, 2);

                              logsPush(logs, chalk.blue(`[조합 성공] 중급 ${unitStr[Number(choiceMix) - 1]} 유닛이 소환되었습니다.`));
                              isSuccess = true;
                           } else {
                              locUnits[unitGrade1Arr.length - 1][Number(choiceMix) - 1] = false;
                              logsPush(logs, chalk.red(`[조합 실패] ${unitStr[Number(choiceMix) - 1]} 유닛이 소모되었습니다.`));
                              break;
                           }
                        }
                        //3등급 생성
                        if (unitGrade2Cnt >= 3) {
                           if (Math.floor(Math.random() * 100) < Settings.grade2Per) {
                              mixUnit(locUnits, unitGrade2Arr, Number(choiceMix), unitStr, 3);
                              logsPush(logs, chalk.blue(`[조합 성공] 상급 ${unitStr[Number(choiceMix) - 1]} 유닛이 소환되었습니다.`));
                              isSuccess = true;
                           } else {
                              locUnits[unitGrade2Arr.length - 1][Number(choiceMix) - 1] = false;
                              logsPush(logs, chalk.red(`[조합 실패] ${unitStr[Number(choiceMix) - 1]} 유닛이 소모되었습니다.`));
                              break;
                           }
                        }
                     } else {
                        //재료가 부족한 경우
                        logsPush(logs, chalk.red(`조합 가능한 유닛이 없습니다.`));
                        isContinue = true;
                        break;
                     }
                  } while (unitGrade1Cnt >= 3 || unitGrade2Cnt >= 3);

                  if (isContinue && !isSuccess) {
                     continue;
                  } else if (isContinue && isSuccess) {
                     break;
                  } else {
                     break;
                  }
               case '3':
                  /***
                   * Case1 근접1,원거리2 Case2: 근접2,원거리1 Case3:원거리2,근접1
                   */

                  let unitGrade1MCnt = 0; //1등급 밀리
                  let unitGrade1RCnt = 0; //1등급 원거리
                  let unitGrade2MCnt = 0; //2등급 밀리
                  let unitGrade2RCnt = 0; //2등급 원거리

                  let unitGrade1MArr;
                  let unitGrade1RArr;
                  let unitGrade2MArr;
                  let unitGrade2RArr;

                  do {
                     unitGrade1MCnt = 0; //1등급 밀리
                     unitGrade1RCnt = 0; //1등급 원거리
                     unitGrade2MCnt = 0; //2등급 밀리
                     unitGrade2RCnt = 0; //2등급 원거리

                     unitGrade1MArr = [];
                     unitGrade1RArr = [];
                     unitGrade2MArr = [];
                     unitGrade2RArr = [];

                     for (let i = 0; i < locUnits[0].length - 1; i++) {
                        for (let j = 0; j < locUnits.length; j++) {
                           if (locUnits[j][i]) {
                              //등급별 유닛 수 체크
                              if (locUnits[j][i]['grade'] === 1) {
                                 if (i === 0) {
                                    //근접
                                    unitGrade1MCnt++;
                                    unitGrade1MArr.push(j);
                                 } else if (i === 1) {
                                    //원거리
                                    unitGrade1RCnt++;
                                    unitGrade1RArr.push(j);
                                 }
                              } else if (locUnits[j][i]['grade'] === 2) {
                                 if (i === 0) {
                                    //근접
                                    unitGrade2MCnt++;
                                    unitGrade2MArr.push(j);
                                 } else if (i === 1) {
                                    //원거리
                                    unitGrade2RCnt++;
                                    unitGrade2RArr.push(j);
                                 }
                              }
                           }
                        }
                     }

                     if ((unitGrade1MCnt >= 1 && unitGrade1RCnt >= 2) || (unitGrade1MCnt >= 2 && unitGrade1RCnt >= 1) || (unitGrade2MCnt >= 1 && unitGrade2RCnt >= 2) || (unitGrade2MCnt >= 2 && unitGrade2RCnt >= 1)) {
                        //등급별 조합 가능 여부
                        let isGrade1 = (unitGrade1MCnt >= 1 && unitGrade1RCnt >= 2) || (unitGrade1MCnt >= 2 && unitGrade1RCnt >= 1) ? true : false;
                        let isGrade2 = (unitGrade2MCnt >= 1 && unitGrade2RCnt >= 2) || (unitGrade2MCnt >= 2 && unitGrade2RCnt >= 1) ? true : false;

                        if (isGrade1) {
                           //성공, 실패 결과 유닛
                           let unitType = Math.floor(Math.random() * 2) + 1; // 0,1

                           // 80%의 성공 확률
                           if (Math.floor(Math.random() * 100) < Settings.grade1Per) {
                              if (unitGrade1MCnt >= 2 && unitGrade1RCnt >= 2) {
                                 for (let i = 0; i < 2; i++) {
                                    unitType === 1 ? (locUnits[unitGrade1MArr[i]][unitType - 1] = false) : (locUnits[unitGrade1RArr[i]][unitType - 1] = false);
                                 }

                                 unitType === 1 ? (locUnits[unitGrade1RArr[unitGrade1RArr.length - 1]][1] = false) : (locUnits[unitGrade1MArr[unitGrade1MArr.length - 1]][0] = false);

                                 createUnit(locUnits, unitType, unitStr, 2);
                              } else {
                                 if (unitGrade1MCnt >= 1 && unitGrade1RCnt >= 2) {
                                    //근접1 원거리2 소모
                                    for (let i = 0; i < 2; i++) {
                                       locUnits[unitGrade1RArr[i]][unitType - 1] = false;
                                    }

                                    locUnits[unitGrade1MArr[unitGrade1MArr.length - 1]][0] = false;

                                    //상급 유닛 Create
                                    createUnit(locUnits, unitType, unitStr, 2);
                                 }

                                 if (unitGrade1MCnt >= 2 && unitGrade1RCnt >= 1) {
                                    //근접2 원거리1 소모
                                    for (let i = 0; i < 2; i++) {
                                       locUnits[unitGrade1MArr[i]][unitType - 1] = false;
                                    }

                                    locUnits[unitGrade1RArr[unitGrade1RArr.length - 1]][1] = false;

                                    //상급 유닛 Create
                                    createUnit(locUnits, unitType, unitStr, 2);
                                 }
                              }
                              logsPush(logs, chalk.blue(`[조합 성공] 중급 ${unitStr[unitType - 1]} 유닛이 소환되었습니다.`));
                              isSuccess = true;
                           } else {
                              //실패
                              unitType === 1 ? (locUnits[unitGrade1MArr[unitGrade1MArr.length - 1]][unitType - 1] = false) : (locUnits[unitGrade1RArr[unitGrade1RArr.length - 1]][unitType - 1] = false);
                              logsPush(logs, chalk.red(`[조합 실패] ${unitStr[unitType - 1]} 유닛이 소모되었습니다.`));
                              break;
                           }
                        } else if (isGrade2) {
                           //성공, 실패 결과 유닛
                           let unitType = Math.floor(Math.random() * 2) + 1; // 0,1

                           if (Math.floor(Math.random() * 100) < Settings.grade2Per) {
                              //성공
                              if (unitGrade2MCnt >= 2 && unitGrade2RCnt >= 2) {
                                 for (let i = 0; i < 2; i++) {
                                    unitType === 1 ? (locUnits[unitGrade2MArr[i]][unitType - 1] = false) : (locUnits[unitGrade2RArr[i]][unitType - 1] = false);
                                 }

                                 unitType === 1 ? (locUnits[unitGrade2RArr[unitGrade2RArr.length - 1]][1] = false) : (locUnits[unitGrade2MArr[unitGrade2MArr.length - 1]][0] = false);

                                 createUnit(locUnits, unitType, unitStr, 3);
                              } else {
                                 if (unitGrade2MCnt >= 1 && unitGrade2RCnt >= 2) {
                                    //근접1 원거리2 소모
                                    for (let i = 0; i < 2; i++) {
                                       locUnits[unitGrade2RArr[i]][unitType - 1] = false;
                                    }

                                    locUnits[unitGrade2MArr[unitGrade2MArr.length - 1]][0] = false;

                                    //상급 유닛 Create
                                    createUnit(locUnits, unitType, unitStr, 3);
                                 }

                                 if (unitGrade2MCnt >= 2 && unitGrade2RCnt >= 1) {
                                    //근접2 원거리1 소모
                                    for (let i = 0; i < 2; i++) {
                                       locUnits[unitGrade2MArr[i]][unitType - 1] = false;
                                    }

                                    locUnits[unitGrade2RArr[unitGrade2RArr.length - 1]][1] = false;

                                    //상급 유닛 Create
                                    createUnit(locUnits, unitType, unitStr, 3);
                                 }
                              }
                              logsPush(logs, chalk.blue(`[조합 성공] 상급 ${unitStr[unitType - 1]} 유닛이 소환되었습니다.`));
                              isSuccess = true;
                           } else {
                              //실패
                              unitType === 1 ? (locUnits[unitGrade2RArr[unitGrade2RArr.length - 1]][unitType - 1] = false) : (locUnits[unitGrade2RArr[unitGrade2RArr.length - 1]][unitType - 1] = false);
                              logsPush(logs, chalk.red(`[조합 실패] 중급 ${unitStr[unitType - 1]} 유닛이 소모되었습니다.`));
                              break;
                           }
                        }
                     } else {
                        logsPush(logs, chalk.red(`조합 가능한 유닛이 없습니다.`));
                        isContinue = true;
                        break;
                     }
                  } while ((unitGrade1MCnt > 0 && unitGrade1RCnt > 0) || (unitGrade2MCnt > 0 && unitGrade2RCnt > 0));

                  if (isContinue && !isSuccess) {
                     continue;
                  } else if (isContinue && isSuccess) {
                     break;
                  } else {
                     break;
                  }
               case '4':
                  continue;
               default:
                  logsPush(logs, chalk.red(`올바른 선택을 하세요.`));
                  continue;
            }
            break;
         case '3':
            //아이템
            console.log(chalk.green(`\n1. ${itemStr[0]} (${inventory[0].ea}개) 2. ${itemStr[1]} (${inventory[1].ea}개) 3. ${itemStr[2]} (${inventory[2].ea}개) 4. 취소`));
            const choiceItem = readlineSync.question('당신의 선택은? ');
            let isSelectItem = false;
            switch (choiceItem) {
               case '1': //버프스톤
                  const isHave1 = checkItem(logs, inventory, itemStr, Number(choiceItem));
                  if (!isHave1) continue;

                  //이미 적용중이면 pass
                  if (itemBuffTurn > 0) {
                     logsPush(logs, chalk.red(`${itemStr[0]} 의 효과가 남아있어 사용할 수 없습니다. (남은 턴: ${itemBuffTurn})`));
                     continue;
                  }

                  buffItemControl(locUnits, true);
                  itemBuffTurn = 5;
                  logsPush(logs, chalk.white(`${inventory[Number(choiceItem) - 1]['name']} 을 사용하였습니다.`));
                  inventory[Number(choiceItem) - 1].useItem();
                  isSelectItem = true;
                  break;

               case '2': //두루마리
                  const isHave2 = checkItem(logs, inventory, itemStr, Number(choiceItem));
                  if (!isHave2) continue;
                  logsPush(logs, chalk.white(`${inventory[Number(choiceItem) - 1]['name']} 를 사용하였습니다.`));
                  for (let i = 0; i < locMonsters.length; i++) {
                     for (let j = 0; j < locMonsters[0].length; j++) {
                        if (locMonsters[i][j]) {
                           let damage = Math.floor(Math.random() * 9 + 1);
                           locMonsters[i][j].receveDamage(damage);
                           logsPush(logs, chalk.white(`${locMonsters[i][j]['name']} 에게 ${damage} 데미지를 주었습니다.`));
                        }
                     }
                  }
                  inventory[Number(choiceItem) - 1].useItem();
                  isSelectItem = true;
                  break;

               case '3': //원기옥
                  const isHave3 = checkItem(logs, inventory, itemStr, Number(choiceItem));
                  if (!isHave3) continue;

                  let sumAttack = 0;
                  //소환된 유닛의 총 공격력 계산
                  for (let i = 0; i < locUnits.length; i++) {
                     for (let j = 0; j < locUnits[0].length; j++) {
                        if (locUnits[i][j]) {
                           sumAttack += locUnits[i][j].attack();
                        }
                     }
                  }

                  let getMonstersLoc = [];
                  //현재 몬스터 위치를 getMonstersLoc 담는다.
                  for (let i = 0; i < locMonsters.length; i++) {
                     for (let j = 0; j < locMonsters[0].length; j++) {
                        if (locMonsters[i][j]) {
                           getMonstersLoc.push([i, j]);
                        }
                     }
                  }

                  //getMonstersLoc legnth로 대상 몬스터 뽑기
                  let selectMonster = Math.floor(Math.random() * getMonstersLoc.length);
                  locMonsters[getMonstersLoc[selectMonster][0]][getMonstersLoc[selectMonster][1]].receveDamage(sumAttack * 2);
                  logsPush(logs, chalk.white(`${inventory[Number(choiceItem) - 1]['name']} 을 사용하였습니다.`));
                  logsPush(logs, chalk.white(`${locMonsters[getMonstersLoc[selectMonster][0]][getMonstersLoc[selectMonster][1]]['name']} 에게 ${sumAttack * 2} 데미지를 주었습니다.`));

                  inventory[Number(choiceItem) - 1].useItem();
                  isSelectItem = true;
                  break;

               case '4':
                  continue;

               default:
                  logsPush(logs, chalk.red(`올바른 선택을 하세요.`));
                  continue;
            }
            if (isSelectItem) break;
            else continue;
         case '4':
            //수리
            if (castle.hp === Settings.maxCastleHp) {
               logsPush(logs, chalk.red(`성의 체력이 이미 가득 차 있습니다.`));
               continue;
            }

            if (castle.repairCnt === 0) {
               logsPush(logs, chalk.red(`도구가 고갈되어 더 이상 수리할 수 없습니다.`));
               continue;
            }

            if (Math.floor(Math.random() * 100 + 1) <= 5) {
               //풀피 회복
               castle.hp = Settings.maxCastleHp;
               logsPush(logs, chalk.white(`5%의 기적! 성의 체력이 최대치로 회복했습니다.`));
            } else {
               const maxRepairHp = 100;
               let repairHp = Math.floor(Math.random() * maxRepairHp + 20);

               if (repairHp >= maxRepairHp) {
                  repairHp = maxRepairHp;
               }

               if (castle.hp + repairHp > Settings.maxCastleHp) repairHp = Settings.maxCastleHp - castle.hp;

               castle.repair(repairHp);

               logsPush(logs, chalk.white(`성의 체력이 ${repairHp} 회복했습니다.`));
            }
            break;
         case '0':
            process.exit(0);
         // break;
         default:
            logsPush(logs, chalk.red(`올바른 선택을 하세요.`));
            continue;
         // break;
      }

      /***
       * 웨이브, 턴 처리
       */
      if (wave !== Settings.maxWave) {
         //현재 턴이 0이면 웨이브 +1 아니면 턴 -1
         if (turn === 0) {
            wave++;
            turn = Settings.maxTurn;

            //웨이브 시작 - 몬스터 소환
            await monsterSpawn(logs, locMonsters, displayMonsters, stage, wave);
         } else {
            turn--;
         }

         await turnEndAction(logs, locUnits, locMonsters, castle, inventory, displayMonsters);
      } else if (wave === Settings.maxWave) {
         if (monsters.length === 0) {
            isStageClear = true;

            if (stage === Settings.maxStage) {
               isWin = true;
            }
         }
      }

      //버프 아이템 턴 소모처리
      if (itemBuffTurn > 0) {
         if (itemBuffTurn - 1 === 0) {
            logsPush(logs, chalk.white(`${itemStr[0]}의 효과가 사라졌습니다.`));
            buffItemControl(locUnits, false);
         }
         itemBuffTurn--;
      }
   }

   return isWin;
};

export async function startGame() {
   console.clear();

   const castle = new Castle(1000, 0, 3);
   const inventory = createInventory();

   let stage = 1;
   let isWin = false;
   let itemBuffTurn = 0;
   let locUnits = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
   ];

   while (stage <= Settings.maxStage) {
      isWin = await battle(stage, castle, isWin, locUnits, inventory, itemBuffTurn);
      // 스테이지 클리어 및 게임 종료 조건

      //최종스테이지고 isWin = true면 클리어 아니면 패배
      stage++;
   }

   if (isWin) {
      //클리어 화면
      console.clear();
      console.log('승리');
   } else {
      //패배 화면
      console.clear();
      console.log('패배');
   }

   return isWin;
}

//유닛 생성
const createUnit = (locUnits, idx, unitStr, grade, isUnitBuff) => {
   let gradeText = grade === 1 ? '' : grade === 2 ? '중급 ' : '상급 ';

   for (let i = 0; i < locUnits.length; i++) {
      if (!locUnits[i][Number(idx) - 1]) {
         locUnits[i][Number(idx) - 1] = new Unit(gradeText + unitStr[idx - 1] + (i + 1), idx - 1, grade, idx === 1 ? 2 : idx === 2 ? 1 : 0, 10, false, isUnitBuff);
         return true;
      }
   }
   return false;
};

//유닛 조합
const mixUnit = (locUnits, unitGradeArr, choiceMix, unitStr, grade) => {
   //하위 재료 삭제(자리 확보)
   for (let i = 0; i < Settings.useUnitCnt; i++) {
      locUnits[unitGradeArr[i]][choiceMix - 1] = false;
   }

   //상급 유닛 Create
   createUnit(locUnits, choiceMix, unitStr, grade);
};

const monsterSpawn = async (logs, locMonsters, displayMonsters, stage, wave) => {
   //몬스터 소환 수 (1~6)
   const spawnCnt = Math.floor(Math.random() * (10 - 5 + 1)) + 1;
   let locRandom = new Set();

   //소환 위치 정하기
   while (locRandom.size < spawnCnt) {
      locRandom.add(Math.floor(Math.random() * (10 - 5 + 1)) + 1);
   }
   locRandom = [...locRandom];
   //소환
   for (let i = 0; i < locRandom.length; i++) {
      if (!locMonsters[locRandom[i] - 1][6]) {
         locMonsters[locRandom[i] - 1][6] = new Monster('몹', 0, 'F', 5, 10, 100, null);
         displayMonsters.push(locMonsters[locRandom[i] - 1][6]);
         locMonsters[locRandom[i] - 1][6]['displayLoc'] = displayMonsters.length - 1;
      }
   }
   logsPush(logs, chalk.whiteBright(`[Wave:${wave}] 몬스터 ${spawnCnt} 마리가 등장하였습니다.`));
};

//턴 종료
const turnEndAction = async (logs, locUnits, locMonsters, castle, inventory, displayMonsters) => {
   /***
    * 아군 행동
    *
    * 1. 범위 내 몬스터 확인 (우선 내 앞줄 체크 없으면 전체)
    * 2. 있으면 공격
    */

   //공격 유닛 종류 (근접, 원거리)
   //공격순서: 근접 > 원거리
   for (let i = 0; i < 2; i++) {
      //1종류당 6마리 배치
      for (let j = 0; j < 6; j++) {
         if (locUnits[j][i]) {
            let range = locUnits[j][i].getRange();

            let isAttack = false; //공격 여부
            //궁수는 최대 사정거리 부터 공격 그래서 --처리
            for (let k = range; k > 0; k--) {
               if (locMonsters[j][k - 1]) {
                  locMonsters[j][k - 1].hp -= locUnits[j][i].attack();

                  //처치 시 삭제
                  if (locMonsters[j][k - 1].hp <= 0) {
                     logsPush(logs, chalk.white(`${locUnits[j][i]['name']}가 ${locMonsters[j][k - 1]['name']} 를 처치하였습니다.`));

                     for (let i = locMonsters[j][k - 1]['displayLoc'] + 1; i < displayMonsters.length; i++) {
                        displayMonsters[i]['displayLoc'] -= 1;
                     }

                     displayMonsters.splice(locMonsters[j][k - 1]['displayLoc'], 1);
                     locMonsters[j][k - 1] = false;

                     getItemRate(logs, inventory); //아이템 획득 여부?
                     //킬 카운트
                  } else {
                     logsPush(logs, chalk.white(`${locUnits[j][i]['name']}가 ${locMonsters[j][k - 1]['name']} 에게 데미지 ${locUnits[j][i].attack()} 를 주었습니다.`));
                  }

                  isAttack = true;
                  break;
               }
            }

            //내 앞줄에 몹이 없는 것 확인
            if (!isAttack) {
               for (let k = range; k > 0; k--) {
                  //대상 찾기(고도화)x
                  for (let n = 0; n < locMonsters.length; n++) {
                     if (locMonsters[n][k - 1]) {
                        locMonsters[n][k - 1].hp -= locUnits[j][i].attack();

                        //처치 시 삭제
                        if (locMonsters[n][k - 1].hp <= 0) {
                           logsPush(logs, chalk.white(`${locUnits[j][i]['name']}가 ${locMonsters[n][k - 1]['name']} 를 처치하였습니다.`));

                           for (let i = locMonsters[n][k - 1]['displayLoc'] + 1; i < displayMonsters.length; i++) {
                              displayMonsters[i]['displayLoc'] -= 1;
                           }

                           displayMonsters.splice(locMonsters[n][k - 1]['displayLoc'], 1);
                           locMonsters[n][k - 1] = false;

                           getItemRate(logs, inventory); //아이템 획득 여부?

                           //킬 카운트
                        } else {
                           logsPush(logs, chalk.white(`${locUnits[j][i]['name']}가 ${locMonsters[n][k - 1]['name']} 에게 데미지 ${locUnits[j][i].attack()} 를 주었습니다.`));
                        }

                        isAttack = true;
                        break;
                     }
                  }
               }
            }
         }
      }
   }

   /***
    * 몬스터 행동
    *
    * 1. 공격 가능한 몹 체크
    * 2-1) 있으면 성 공격
    * 2-2)
    */
   // 1. 공격 거리 확인
   let sumDamage = 0;
   for (let i = 0; i < locMonsters[0].length; i++) {
      for (let j = 0; j < locMonsters.length; j++) {
         //해당 위치 몬스터 여부 체크
         if (locMonsters[j][i]) {
            if (i === 0) {
               castle.hp -= locMonsters[j][i].attack();
               sumDamage += locMonsters[j][i].attack();
            } else if (i === 2 && locMonsters[j][i]['type'] === 3) {
               castle.hp -= locMonsters[j][i].attack();
               sumDamage += locMonsters[j][i].attack();
            } else {
               //내 앞에 몬스터가 있는지 확인
               if (locMonsters[j][i - 1]) {
               } else {
                  locMonsters[j][i - 1] = locMonsters[j][i];
                  locMonsters[j][i] = false;
               }
            }
         }
      }
   }

   if (sumDamage > 0) logsPush(logs, chalk.white(`몬스터의 공격으로 성의 체력이 ${sumDamage} 감소 했습니다.`));
};

function checkItem(logs, inventory, itemStr, idx) {
   let isHave = true;
   if (inventory[idx - 1]['ea'] === 0) {
      logsPush(logs, chalk.red(`${itemStr[idx - 1]} 이 없습니다.`));
      isHave = false;
   }
   return isHave;
}

const buffItemControl = (locUnits, isBuff) => {
   for (let i = 0; i < locUnits.length; i++) {
      for (let j = 0; j < locUnits[0].length; j++) {
         if (locUnits[j][i]) {
            locUnits[j][i]['isItemBuff'] = isBuff;
            locUnits[j][i].itemBuff();
         }
      }
   }
};

function endGame(isWin) {
   if (isWin) {
      //승리 화면
      //업적 처리
      //초기 화면 이동
   } else {
      //패배 화면
      //초기 화면 이동
   }
}

const createInventory = () => {
   const inventory = [];
   inventory.push(new Item(Items.ITEM_CODE01_CODE, Items.ITEM_CODE01_NAME, Items.ITEM_CODE01_DESC, 0));
   inventory.push(new Item(Items.ITEM_CODE02_CODE, Items.ITEM_CODE02_NAME, Items.ITEM_CODE02_DESC, 0));
   inventory.push(new Item(Items.ITEM_CODE03_CODE, Items.ITEM_CODE03_NAME, Items.ITEM_CODE03_DESC, 0));
   return inventory;
};

const getItemRate = (logs, inventory) => {
   //개별로 확률이 존재. 하지만
   const itemsRates = [Items.ITEM_CODE01_RATE, Items.ITEM_CODE02_RATE, Items.ITEM_CODE03_RATE];

   for (let i = 0; i < itemsRates.length; i++) {
      if (Math.floor(Math.random() * 100 + 1) / 100 <= itemsRates[i]) {
         logsPush(logs, chalk.blue(inventory[i].getItem()));
      }
   }
};
