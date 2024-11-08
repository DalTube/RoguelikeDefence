export class Item {
   //아이템
   constructor(id, name, desc, count) {
      this._id = id;
      this._name = name;
      this._desc = desc;
      this._count = count;
   }

   get id() {
      return this._id;
   }

   set id(value) {
      this._id = value;
   }

   get name() {
      return this._name;
   }

   set name(value) {
      this._name = value;
   }

   get desc() {
      return this._desc;
   }

   set desc(value) {
      this._desc = value;
   }

   get count() {
      return this._count;
   }

   set count(value) {
      this.count = value;
   }
}
