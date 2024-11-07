export class Unit {
  //유닛
  constructor(name, type, grade, damage, critical) {
    this._name = name;
    this._type = type;
    this._grade = grade;
    this._damage = damage;
    this._critical = critical;
    this._maxGrade = 3;
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

  attack() {
    // 유닛의 공격
    return this._damage;
  }
}
