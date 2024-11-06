import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
  }

  attack() {
    // 플레이어의 공격
  }
}

class Monster {
  constructor() {
    this.hp = 100;
  }

  attack() {
    // 몬스터의 공격
  }
}

function displayStatus(stage, player, monster) {
    const line = chalk.magentaBright('='.repeat(71));
    let imogi = '🗡️';
    let imogi2 = ' ';
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보`,
    ) +
    chalk.redBright(
      `| 몬스터 정보 |`,
    ),
  );
console.log(chalk.magentaBright(`=====================\n`));

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
console.log(line);
console.log(chalk.white('                   _____'));  
console.log(chalk.white('                  <_____|'));
console.log(chalk.white('                        |'));  
console.log(chalk.white('  ___                  .|'));
console.log(chalk.white(' <___|               .\'/`\`.'));
console.log(chalk.white('  _  |  _   _      .\' / :`.\`.'));
console.log(chalk.white('_|;|_|_|;|_|;|__ .\'  /  : .\'|_')); 
console.log(chalk.white('     |          --------.\' .\'|'));
console.log(chalk.white('   / ^\\         | |###| |.\'  |'));
console.log(chalk.white(`  /  | \\     .\'        .\'    |`));
console.log(chalk.white(` /   |  \\  .\'        .\'      |`));
console.log(chalk.white('/____|___\\\'        .\'        |')); 
console.log(chalk.white('|         |      .\' ㅡ\\     .\'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _'));
console.log(chalk.white('|    _    |    .\'  /+++|  .\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|   |#|   |  .\'   ㅣ+++|.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|  =====  |.\'     ㅣ++.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|         |       ㅣ.\'🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|         |      .\' 🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|         |    .\' 🐉  🐉  🐉     🐉     🐉     🐉     🐉'));
console.log(chalk.white('|         |  .\'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __'));
console.log(chalk.white('|_________|.\'                                                         \n'));
console.log(line);
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while(player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 아무것도 하지않는다.`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
    process.exit(0);
  }
  
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건

    stage++;
  }
}