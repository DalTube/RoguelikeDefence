export class Unit {
   //유닛
   // constructor(name, type, grade, damage, critical, isItemBuff, isUnitBuff) {

   constructor(name, type, grade, damage, isItemBuff, isUnitBuff) {
      this._name = name;
      this._type = type;
      this._grade = grade;
      this._damage = damage;
      this._critical = 0;
      this._isItemBuff = isItemBuff;
      this._isUnitBuff = isUnitBuff;
   }

   get name() {
      return this._name;
   }

   set name(value) {
      this._name = value;
   }

   get type() {
      return this._type;
   }

   set type(value) {
      this._type = value;
   }

   get grade() {
      return this._grade;
   }

   set grade(value) {
      this._grade = value;
   }

   get damage() {
      return this._damage;
   }

   set damage(value) {
      this._damage = value;
   }

   get critical() {
      return this._critical;
   }

   set critical(value) {
      this._critical = value;
   }

   get isItemBuff() {
      return this._isItemBuff;
   }

   set isItemBuff(value) {
      this._isItemBuff = value;
   }

   get isUnitBuff() {
      return this._isUnitBuff;
   }

   set isUnitBuff(value) {
      this._isUnitBuff = value;
      this.unitBuff();
   }

   attack() {
      // 유닛의 공격
      return this._damage;
   }

   getRange() {
      let range = 0;
      if (this._type === 0) {
         range = 1;
      } else if (this._type === 1) {
         range = 3;
      }

      return range;
   }

   itemBuff() {
      this._isItemBuff ? (this._damage += 3) : (this._damage -= 3);
   }

   unitBuff() {
      this._isUnitBuff ? (this._damage += 3) : null;
   }
}
