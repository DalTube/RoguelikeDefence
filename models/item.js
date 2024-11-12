export class Item {
   //아이템
   constructor(id, name, desc, ea) {
      this._id = id;
      this._name = name;
      this._desc = desc;
      this.ea = ea;
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

   get ea() {
      return this._ea;
   }

   set ea(value) {
      this._ea = value;
   }

   useItem() {
      this._ea -= 1;
   }

   getItem() {
      let text = ``;
      if (this._ea >= 10) {
         text = `${this._name} 의 최대 소지수량을 도달하였습니다. (최대 10개)`;
      } else {
         this._ea += 1;
         text = `${this._name} 1개 획득`;
      }

      return text;
   }
}
