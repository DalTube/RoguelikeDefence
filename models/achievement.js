export class Achievement {
   //성
   constructor(killCount, isLvEasy, isLvNomal, isLvHard, isLvHell, isMeleeMaxGrade, isRangedMaxGrade, isMosterKill01, isMosterKill02, isMosterKill03, isMosterKill04) {
      this._killCount = killCount;
      this._isLvEasy = isLvEasy;
      this._isLvNomal = isLvNomal;
      this._isLvHard = isLvHard;
      this._isLvHell = isLvHell;
      this._isMeleeMaxGrade = isMeleeMaxGrade;
      this._isRangedMaxGrade = isRangedMaxGrade;
      this._isMosterKill01 = isMosterKill01;
      this._isMosterKill02 = isMosterKill02;
      this._isMosterKill03 = isMosterKill03;
      this._isMosterKill04 = isMosterKill04;
   }

   get killCount() {
      return this._killCount;
   }

   set killCount(value) {
      this._killCount = value;
   }

   get isLvEasy() {
      return this._isLvEasy;
   }

   set isLvEasy(value) {
      this._isLvEasy = value;
   }

   get isLvNomal() {
      return this._isLvNomal;
   }

   set isLvNomal(value) {
      this._isLvNomal = value;
   }

   get isLvHard() {
      return this._isLvHard;
   }

   set isLvHard(value) {
      this._isLvHard = value;
   }

   get isLvHell() {
      return this._isLvHell;
   }

   set isLvHell(value) {
      this._isLvHell = value;
   }

   get isMeleeMaxGrade() {
      return this._isMeleeMaxGrade;
   }

   set isMeleeMaxGrade(value) {
      this._isMeleeMaxGrade = value;
   }

   get isRangedMaxGrade() {
      return this._isRangedMaxGrade;
   }

   set isRangedMaxGrade(value) {
      this._isRangedMaxGrade = value;
   }

   get isMosterKill01() {
      return this._isMosterKill01;
   }

   set isMosterKill01(value) {
      this._isMosterKill01 = value;
   }

   get isMosterKill02() {
      return this._isMosterKill02;
   }

   set isMosterKill02(value) {
      this._isMosterKill02 = value;
   }

   get isMosterKill03() {
      return this._isMosterKill03;
   }

   set isMosterKill03(value) {
      this._isMosterKill03 = value;
   }

   get isMosterKill04() {
      return this._isMosterKill04;
   }

   set isMosterKill04(value) {
      this._isMosterKill04 = value;
   }
}
