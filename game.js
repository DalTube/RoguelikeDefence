import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Castle } from './models/castle.js';
import { Monster } from './models/monster.js';
import { Unit } from './models/unit.js';
import * as Items from './constants/items.js';
import { logsPush } from './utils/utils.js';
import * as Settings from './settings.js';

function displayStatus(stage, wave, turn, castle, monsters) {
   const line = chalk.magentaBright('='.repeat(71));
   let imogi = '🗡️';
   let imogi2 = ' ';
   console.log(chalk.magentaBright(`\n=== Current Status ===`));
   console.log(chalk.cyanBright(`| Stage: ${stage} Wave: ${wave} Next Wave: ${turn} 턴`));
   console.log(chalk.blueBright(`| 성 내구도 ${castle.hp}`));
   console.log(chalk.blueBright(`| 유닛 정보 종류 등급 개수 공격력 `));
   if (monsters.length > 0) {
      console.log(chalk.redBright(`| 몬스터 정보 이름 HP 공격력 ${monsters[0]['name']} ${monsters[0]['hp']} ${monsters[0]['damage']}|`));
   } else {
      console.log(chalk.redBright(`| 몬스터 정보 이름 HP 공격력 |`));
   }
   console.log(chalk.magentaBright(`=====================\n`));
}

function displayMap(locUnits) {
   const line = chalk.magentaBright('='.repeat(71));
   //백업용
   // console.log(line);
   // console.log(chalk.white('                   _____'));
   // console.log(chalk.white('                  <_____|'));
   // console.log(chalk.white('                        |'));
   // console.log(chalk.white('  ___                  .|'));
   // console.log(chalk.white(' <___|               .\'/`\`.'));
   // console.log(chalk.white('  _  |  _   _      .\' / :`.\`.'));
   // console.log(chalk.white('_|;|_|_|;|_|;|__ .\'  /  : .\'|_'));
   // console.log(chalk.white('     |          --------.\' .\'|'));
   // console.log(chalk.white('   / ^\\         | |###| |.\'  |'));
   // console.log(chalk.white(`  /  | \\     .\'        .\'    |`));
   // console.log(chalk.white(` /   |  \\  .\'        .\'      |`));
   // console.log(chalk.white('/____|___\\\'        .\'        |'));
   // console.log(chalk.white('|         |      .\' ㅡ\\     .\'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _'));
   // console.log(chalk.white('|    _    |    .\'  /+++|  .\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|   |#|   |  .\'   ㅣ+++|.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|  =====  |.\'     ㅣ++.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|         |       ㅣ.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|         |      .\' 🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|         |    .\' 🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
   // console.log(chalk.white('|         |  .\'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __'));
   // console.log(chalk.white('|_________|.\'                                                         \n'));
   // console.log(line);
   //
   // console.log(chalk.white('                   _____'));
   // console.log(chalk.white('                  <_____|'));
   // console.log(chalk.white('                        |'));
   // console.log(chalk.white('  ___                  .|'));
   // console.log(chalk.white(" <___|               .'/``."));
   // console.log(chalk.white("  _  |  _   _      .' / :`.`."));
   // console.log(chalk.white("_|;|_|_|;|_|;|__ .'  /  : .'|_"));
   // console.log(chalk.white("     |          --------.' .'|"));
   // console.log(chalk.white("   / ^ \\        | |###| |.'  |"));
   // console.log(chalk.white(`  /  |  \\     .\'    ${locUnits[0][1]['name']}${locUnits[0][0]['name']}   .\'    |`));
   // console.log(chalk.white(` /   |   \\  .\'      ${locUnits[1][1]['name']}${locUnits[1][0]['name']} .\'      |`));
   // console.log(chalk.white(`/____|____\\'    ${locUnits[2][1]['name']}${locUnits[2][0]['name']}   .'        |`));
   // console.log(chalk.white(`|         |     ${locUnits[3][1]['name']}${locUnits[3][0]['name']} .' ㅡ\\     .'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _`));
   // console.log(chalk.white(`|    _    |    ${locUnits[4][1]['name']}${locUnits[4][0]['name']}.'  /+++|  .'🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|   |#|   |${locUnits[5][1]['name']}${locUnits[5][0]['name']}  .'   ㅣ+++|.'🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|  =====  |.'     ㅣ++.'🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|         |       ㅣ.'🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|         |      .' 🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|         |    .' 🐉  🐉  🐉     🐉     🐉     🐉     🐉`));
   // console.log(chalk.white(`|         |  .'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __`));
   // console.log(chalk.white(`|_________|.'                                                         \n`));

   //---------------------------       버퍼                       원거리                        근접
   console.log(chalk.white(`| ${locUnits[0][2]['name']} | ${locUnits[0][1]['name']} | ${locUnits[0][0]['name']} |          | | | | | | | |`));
   console.log(chalk.white(`| ${locUnits[1][2]['name']} | ${locUnits[1][1]['name']} | ${locUnits[1][0]['name']} |          | | | | | | | |`));
   console.log(chalk.white(`| ${locUnits[2][2]['name']} | ${locUnits[2][1]['name']} | ${locUnits[2][0]['name']} |          | | | | | | | |`));
   console.log(chalk.white(`| ${locUnits[3][2]['name']} | ${locUnits[3][1]['name']} | ${locUnits[3][0]['name']} |          | | | | | | | |`));
   console.log(chalk.white(`| ${locUnits[4][2]['name']} | ${locUnits[4][1]['name']} | ${locUnits[4][0]['name']} |          | | | | | | | |`));
   console.log(chalk.white(`| ${locUnits[5][2]['name']} | ${locUnits[5][1]['name']} | ${locUnits[5][0]['name']} |          | | | | | | | |`));
   console.log(line);
}

const battle = async (stage, castle, isWin) => {
   let logs = [];
   let wave = 1;
   let turn = 5;
   let isStageClear = false;

   let monsters = []; //몬스터 생성
   let locMonsters = [6][7];
   // let locUnits = [6][2]; //줄/열
   let locUnits = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
   ];
   let units = [];

   let choiseStr = ['유닛 소환', '유닛 조합(확률)', '아이템', '수리']; //기본 선택지
   let mixStr = ['근접 유닛 조합', '원거리 유닛 조합', '무작위 조합']; //조합 선택지
   let unitStr = ['근접', '원거리', '버퍼']; //유닛 종류

   while (castle.hp > 0 && !isStageClear) {
      console.clear();

      //상단 Display출력
      displayStatus(stage, wave, turn, castle, monsters);
      displayMap(locUnits);
      //Logs 출력
      logs.forEach((log) => console.log(log));

      //기본 선택문
      console.log(chalk.green(`\n1. ${choiseStr[0]} 2. ${choiseStr[1]} 3. ${choiseStr[2]} 4. ${choiseStr[3]}`));
      const choice = readlineSync.question('당신의 선택은? ');

      // 플레이어의 선택에 따라 다음 행동 처리
      switch (choice) {
         case '1':
            //소환
            console.log(chalk.green(`\n1. 근접 유닛 2. 원거리 유닛 3. 버퍼 4.취소`));
            const choiceUnit = readlineSync.question('당신의 선택은? ');

            switch (choiceUnit) {
               case '1':
               case '2':
               case '3':
                  let isCreate = false;
                  for (let i = 0; i < locUnits.length; i++) {
                     if (!locUnits[i][Number(choiceUnit) - 1]) {
                        locUnits[i][Number(choiceUnit) - 1] = new Unit(unitStr[choiceUnit - 1], choiceUnit - 1, 1, choiceUnit === 1 ? 2 : choiceUnit === 2 ? 1 : 0, 10);
                        isCreate = true;
                        break;
                     }
                  }
                  if (isCreate) {
                     logsPush(logs, chalk.green(`[${choiseStr[choice - 1]}] ${unitStr[choiceUnit - 1]} 유닛을 소환하셨습니다.`));
                     break;
                  } else {
                     logsPush(logs, chalk.red(`${unitStr[choice - 1]} 유닛을 더 이상 소환할 수 없습니다.(최대 6)`));
                     continue;
                  }
               case '4':
                  continue;
               default:
                  continue;
            }
            break;
         case '2':
            //조합
            console.log(chalk.green(`\n1. ${mixStr[0]} 2. ${mixStr[1]} 3. ${mixStr[2]} 4.취소`));
            const choiceMix = readlineSync.question('당신의 선택은? ');

            switch (choiceMix) {
               case '1':
                  //근접 유닛 개수 체크(근거리 최소 3개)
                  logsPush(logs, chalk.green(`[${mixStr[choiceMix - 1]}] 유닛을 소환하셨습니다.`));
                  break;
               case '2':
                  //원거리 유닛 개수 체크(원거리 최소 3개)
                  logsPush(logs, chalk.green(`[${mixStr[choiceMix - 1]}] 유닛을 소환하셨습니다.`));
                  break;
               case '3':
                  //근접 원거리 유닛 개수 체크 (합 3개이상)
                  logsPush(logs, chalk.green(`[${mixStr[choiceMix - 1]}] 유닛을 소환하셨습니다.`));
                  break;
               case '4':
                  continue;
               default:
                  continue;
            }
            break;
         case '3':
            //아이템
            console.log(chalk.green(`\n1. ${Items.ITEM_CODE01_NAME} 2. ${Items.ITEM_CODE02_NAME} 3. ${Items.ITEM_CODE03_NAME} 4. 취소`));
            const choiceItem = readlineSync.question('당신의 선택은? ');
            useItem(choiceItem);
            break;
         case '4':
            //아이템
            break;
         case '0':
            process.exit(0);
            break;
         default:
            logs = logsPush(logs, chalk.red(`올바른 선택을 하세요.`));
            continue;
            break;
      }

      /***
       * 웨이브, 턴 처리
       */
      if (wave !== Settings.maxWave) {
         //현재 턴이 0이면 웨이브 +1 아니면 턴 -1
         if (turn === 0) {
            wave++;
            turn = Settings.maxTurn;
         } else {
            turn--;
         }
      } else if (wave === Settings.maxWave) {
         if (monsters.length === 0) {
            isStageClear = true;

            if (stage === Settings.maxStage) {
               isWin = true;
            }
         }
      }
   }

   return isWin;
};

export async function startGame() {
   console.clear();

   const castle = new Castle(1000, 0);
   let stage = 1;
   let isWin = false;

   while (stage <= Settings.maxStage) {
      isWin = await battle(stage, castle, isWin);
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
const createUnit = (units, idx) => {
   // new Unit('', idx - 1, 1, idx === 1 ? 2 : idx === 2 ? 1 : 0, 10);
};

//유닛 조합
function mixUnit(idx) {
   // 1.근거리 조합 2.원거리 조합 3.무작위 조합
   switch (Number(idx)) {
      case 1: //근거리
         break;
      case 2: //원거리
         break;
      case 3: //무작위
         break;
      default:
         break;
   }
}

//턴 종료
function turnEndAction() {
   /***
    * 아군 행동
    */
   // 1. 공격 거리 확인
   // 2. 범위 내 몬스터가 있으면 공격
   /***
    * 몬스터 행동
    */
   // 1. 공격 거리 확인
   // 2-1 범위 내 성이 있으면 공격
   // 2-2 없으면 성 방향으로 이동
}

function checkItem(idx) {
   //해당 아이템이 있는지 체크
   //있으면 사용
   //없으면
}

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
