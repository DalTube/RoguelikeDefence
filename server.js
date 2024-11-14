import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';
import { exec } from 'child_process'; //콘솔 제어
import * as GameSystem from './constants/settings.js';
import * as Achieve from './constants/achievements.js';
import { Achievement } from './models/achievement.js';

const achievement = new Achievement(0, false, false, false, false, false, false, false, false, false, false);

function displayChage() {
   exec(`mode con: cols=${GameSystem.CONSOLE_COL} lines=${GameSystem.CONSOLE_ROW}`, (error, stdout, stderr) => {
      if (error) {
         console.error(`Error resizing cmd: ${error.message}`);
         process.exit(0);
         // return;
      }
   });
}

// 로비 화면을 출력하는 함수

function displayLobby() {
   console.clear();
   console.log('');
   console.log('');
   console.log('');
   console.log('');
   console.log('');
   // 타이틀 텍스트
   console.log(
      chalk.cyan(
         figlet.textSync(' '.repeat(49) + 'Castle Defence Game', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
         }),
      ),
   );

   //아스키 아트
   console.log();
   console.log(' '.repeat(61) + chalk.white('                                  |>>>'));
   console.log(' '.repeat(61) + chalk.white('                                  |'));
   console.log(' '.repeat(61) + chalk.white('                    |>>>      _  _|_  _         |>>>'));
   console.log(' '.repeat(61) + chalk.white('                    |        |;| |;| |;|        |'));
   console.log(' '.repeat(61) + chalk.white('   \\,/          _  _|_  _    \\\\.    .  /    _  _|_  _'));
   console.log(' '.repeat(61) + chalk.white('               |;|_|;|_|;|    \\\\:. ,  /    |;|_|;|_|;|'));
   console.log(' '.repeat(61) + chalk.white('               \\\\..      /    ||;   . |    \\\\.    .  /'));
   console.log(' '.repeat(61) + chalk.white('                \\\\.  ,  /     ||:  .  |     \\\\:  .  /'));
   console.log(' '.repeat(61) + chalk.white('                 ||:   |_   _ ||_ . _ | _   _||:   |'));
   console.log(' '.repeat(61) + chalk.white('                 ||:  .|||_|;|_|;|_|;|_|;|_|;||:.  |'));
   console.log(' '.repeat(61) + chalk.white('     /`\\         ||:   ||.    .     .      . ||:  .|'));
   console.log(' '.repeat(61) + chalk.white('                 ||: . || .     . .   .  ,   ||:   |       \\,/'));
   console.log(' '.repeat(61) + chalk.white('                 ||:   ||:  ,  _______   .   ||: , |            /`\\ '));
   console.log(' '.repeat(61) + chalk.white('                 ||:   || .   /+++++++\\    . ||:   |'));
   console.log(' '.repeat(61) + chalk.white('                 ||:   ||.    |+++++++| .    ||: . |'));
   console.log(' '.repeat(61) + chalk.white('              __ ||: . ||: ,  |+++++++|.  . _||_   |'));
   console.log(' '.repeat(61) + chalk.white("   ___ _--`~     '--~~__|.    |+++++__|----~    ~`---,              ___"));
   console.log(' '.repeat(61) + chalk.white("-~--~                   ~---__|,--~'                  ~~----_____-~'  "));
   console.log();

   // 상단 경계선
   const line = chalk.magentaBright('='.repeat(71) + '\n');
   console.log(' '.repeat(61) + line);

   // 게임 이름
   console.log(' '.repeat(61) + chalk.yellowBright.bold('CLI 로그라이크 디펜스 게임에 오신것을 환영합니다!'));

   // 설명 텍스트
   console.log(' '.repeat(61) + chalk.green('옵션을 선택해주세요.'));
   console.log();

   // 옵션들
   console.log(' '.repeat(61) + chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
   console.log(' '.repeat(61) + chalk.blue('2.') + chalk.white(' 업적 확인하기'));
   console.log(' '.repeat(61) + chalk.blue('3.') + chalk.white(' 난이도 설정'));
   console.log(' '.repeat(61) + chalk.blue('4.') + chalk.white(' 종료'));

   // 하단 경계선
   console.log(' '.repeat(61) + line);

   // 하단 설명
   console.log(' '.repeat(61) + chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
   const choice = readlineSync.question(' '.repeat(61) + '입력: ');
   console.clear();

   switch (choice) {
      case '1':
         console.log(chalk.green('게임을 시작합니다.'));
         // 여기에서 새로운 게임 시작 로직을 구현
         startGame(achievement);
         start();
         break;
      // break;
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
   console.log('');
   console.log('');
   console.log('');
   console.log('');
   console.log('');
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + '=' + '='.repeat(44) + `=`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(16) + `${Achieve.ACHIVE_LV_EASY_NAME}` + ' '.repeat(18) + `│` + ' '.repeat(16) + `${Achieve.ACHIVE_LV_NOMAL_NAME}` + ' '.repeat(15) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(13) + `${Achieve.ACHIVE_LV_EASY_DESC}` + ' '.repeat(14) + `│` + ' '.repeat(14) + `${Achieve.ACHIVE_LV_NOMAL_DESC}` + ' '.repeat(13) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${achievement.isLvEasy ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(21) + `│` + ' '.repeat(20) + `${achievement.isLvNomal ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + `=` + '='.repeat(44) + `=`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${Achieve.ACHIVE_LV_HARD_NAME}` + ' '.repeat(19) + `│` + ' '.repeat(19) + `${Achieve.ACHIVE_LV_HELL_NAME}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(12) + `${Achieve.ACHIVE_LV_HARD_DESC}` + ' '.repeat(13) + `│` + ' '.repeat(15) + `${achievement.isLvHell ? Achieve.ACHIVE_LV_HELL_DESC : ' '.repeat(5) + '??????' + ' '.repeat(7)}` + ' '.repeat(12) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${achievement.isLvHard ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(21) + `│` + ' '.repeat(20) + `${achievement.isLvHell ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + `=` + '='.repeat(44) + `=`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(16) + `${Achieve.ACHIVE_MELEE_MAX_GRADE_NAME}` + ' '.repeat(16) + `│` + ' '.repeat(17) + `${Achieve.ACHIVE_RANGED_MAX_GRADE_NAME}` + ' '.repeat(15) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(5) + `${Achieve.ACHIVE_MELEE_MAX_GRADE_DESC}` + ' '.repeat(7) + `│` + ' '.repeat(8) + `${Achieve.ACHIVE_RANGED_MAX_GRADE_DESC}` + ' '.repeat(6) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${achievement.isMeleeMaxGrade ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(21) + `│` + ' '.repeat(20) + `${achievement.isRangedMaxGrade ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + `=` + '='.repeat(44) + `=`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(16) + `${Achieve.ACHIVE_MONSTER_KILL01_NAME}` + ' '.repeat(18) + `│` + ' '.repeat(18) + `${Achieve.ACHIVE_MONSTER_KILL02_NAME}` + ' '.repeat(16) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(13) + `${Achieve.ACHIVE_MONSTER_KILL01_DESC}` + ' '.repeat(14) + `│` + ' '.repeat(14) + `${Achieve.ACHIVE_MONSTER_KILL02_DESC}` + ' '.repeat(12) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${achievement.isMosterKill01 ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(21) + `│` + ' '.repeat(20) + `${achievement.isMosterKill02 ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + `=` + '='.repeat(44) + `=`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(16) + `${Achieve.ACHIVE_MONSTER_KILL03_NAME}` + ' '.repeat(18) + `│` + ' '.repeat(18) + `${Achieve.ACHIVE_MONSTER_KILL04_NAME}` + ' '.repeat(17) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(13) + `${Achieve.ACHIVE_MONSTER_KILL03_DESC}` + ' '.repeat(13) + `│` + ' '.repeat(13) + `${achievement.isMosterKill02 ? Achieve.ACHIVE_MONSTER_KILL04_DESC : ' '.repeat(7) + '??????' + ' '.repeat(7)}` + ' '.repeat(12) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(18) + `${achievement.isMosterKill03 ? chalk.blueBright(' 획득 ') : chalk.blackBright('미획득')}` + ' '.repeat(21) + `│` + ' '.repeat(20) + `${achievement.isMosterKill04 ? chalk.blueBright(' 획득 ') : chalk.blackBright(chalk.blackBright('미획득'))}` + ' '.repeat(19) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + `│` + ' '.repeat(45) + `│` + ' '.repeat(45) + `│`);
   console.log(' '.repeat(49) + ` =` + '='.repeat(45) + `=` + '='.repeat(44) + `=`);

   const choice = readlineSync.question('\n' + ' '.repeat(50) + "초기화면:'ENTER'");
}

// 게임 실행
start();
