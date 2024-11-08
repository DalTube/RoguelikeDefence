import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';
import { exec } from 'child_process'; //콘솔 제어

async function displayChage() {
   await exec('mode con: cols=150 lines=55', (error, stdout, stderr) => {
      if (error) {
         console.error(`Error resizing cmd: ${error.message}`);
         process.exit(0);
         return;
      }
      // console.log('Command prompt resized successfully.');
   });
}

// 로비 화면을 출력하는 함수
function displayLobby() {
   console.clear();

   // 타이틀 텍스트
   console.log(
      chalk.cyan(
         figlet.textSync('RL- Javascript\nCastle Defence Game', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
         }),
      ),
   );

   //아스키 아트
   console.log();
   console.log(chalk.white('                                  |>>>'));
   console.log(chalk.white('                                  |'));
   console.log(chalk.white('                    |>>>      _  _|_  _         |>>>'));
   console.log(chalk.white('                    |        |;| |;| |;|        |'));
   console.log(chalk.white('   \\,/          _  _|_  _    \\\\.    .  /    _  _|_  _'));
   console.log(chalk.white('               |;|_|;|_|;|    \\\\:. ,  /    |;|_|;|_|;|'));
   console.log(chalk.white('               \\\\..      /    ||;   . |    \\\\.    .  /'));
   console.log(chalk.white('                \\\\.  ,  /     ||:  .  |     \\\\:  .  /'));
   console.log(chalk.white('                 ||:   |_   _ ||_ . _ | _   _||:   |'));
   console.log(chalk.white('                 ||:  .|||_|;|_|;|_|;|_|;|_|;||:.  |'));
   console.log(chalk.white('     /`\\         ||:   ||.    .     .      . ||:  .|'));
   console.log(chalk.white('                 ||: . || .     . .   .  ,   ||:   |       \\,/'));
   console.log(chalk.white('                 ||:   ||:  ,  _______   .   ||: , |            /`\\ '));
   console.log(chalk.white('                 ||:   || .   /+++++++\\    . ||:   |'));
   console.log(chalk.white('                 ||:   ||.    |+++++++| .    ||: . |'));
   console.log(chalk.white('              __ ||: . ||: ,  |+++++++|.  . _||_   |'));
   console.log(chalk.white("   ___ _--`~     '--~~__|.    |+++++__|----~    ~`---,              ___"));
   console.log(chalk.white("-~--~                   ~---__|,--~'                  ~~----_____-~'  "));
   console.log();

   // 상단 경계선
   const line = chalk.magentaBright('='.repeat(71) + '\n');
   console.log(line);

   // 게임 이름
   console.log(chalk.yellowBright.bold('CLI 로그라이크 디펜스 게임에 오신것을 환영합니다!🙃'));

   // 설명 텍스트
   console.log(chalk.green('옵션을 선택해주세요.'));
   console.log();

   // 옵션들
   console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
   console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
   console.log(chalk.blue('3.') + chalk.white(' 난이도 설정'));
   console.log(chalk.blue('4.') + chalk.white(' 종료'));

   // 하단 경계선
   console.log(line);

   // 하단 설명
   console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
   const choice = readlineSync.question('입력: ');
   console.clear();

   switch (choice) {
      case '1':
         console.log(chalk.green('게임을 시작합니다.'));
         // 여기에서 새로운 게임 시작 로직을 구현
         let isWIn = startGame();
         //  start();
         break;
      case '2':
         //   console.log(chalk.yellow('구현 준비중입니다.. 게임을 시작하세요'));
         // 업적 확인하기 로직을 구현
         displayAchivements();
         start();
         break;
      case '3':
         console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
         // 옵션 메뉴 로직을 구현
         start();
         break;
      case '4':
         console.log(chalk.red('게임을 종료합니다.'));
         // 게임 종료 로직을 구현
         process.exit(0); // 게임 종료
         break;
      default:
         console.log(chalk.red('올바른 선택을 하세요.'));
         start(); // 유효하지 않은 입력일 경우 다시 입력 받음
         return;
   }
}

// 게임 시작 함수
function start() {
   displayChage();

   setTimeout(() => {
      displayLobby();
      handleUserInput();
   }, 100);
}

function displayAchivements() {
   console.clear();
   let logs = [];

   // const line = chalk.magentaBright('='.repeat(71) + '\n');
   logs.push(chalk.whiteBright('#' + '.'.repeat(78) + '#'));
   for (let i = 0; i < 50; i++) {
      logs.push(chalk.whiteBright('.'.repeat(79) + '#'));
   }
   logs.forEach((log) => console.log(log));

   const choice = readlineSync.question("초기화면:'ENTER'");
}

// 게임 실행
start();
