export class Castle {
   //성
   constructor(hp, damage, repairCnt) {
      this._hp = hp;
      this._damage = damage;
      this._repairCnt = repairCnt;
   }

   get hp() {
      return this._hp;
   }

   set hp(value) {
      this._hp = value;
   }

   get damage() {
      return this._damage;
   }

   set damage(value) {
      this._damage = value;
   }

   get repairCnt() {
      return this._repairCnt;
   }

   set repairCnt(value) {
      this._repairCnt = value;
   }

   attack() {
      // 성의 공격
      return this._damage;
   }

   repair(value) {
      this._hp += value;
      this._repairCnt--;
   }
}
