export class Castle {
  //성
  constructor(hp, damage) {
    this._hp = hp;
    this._damage = damage;
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

  attack() {
    // 성의 공격
    return this._damage;
  }
}
