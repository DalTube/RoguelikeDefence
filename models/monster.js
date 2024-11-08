export class Monster {
   //몬스터
   constructor(name, type, grade, hp, damage, critical) {
      this._name = name;
      this._type = type;
      this._grade = grade;
      this._hp = hp;
      this._damage = damage;
      this._critical = critical;
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

   get critical() {
      return this._critical;
   }

   set critical(value) {
      this._critical = value;
   }

   attack() {
      return this._damage;
   }

   receveDamage(value) {
      this._hp -= value;
   }
}
