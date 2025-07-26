export class Ticket {
  constructor({ id, name, price, quantity, event_id }) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.quantity = quantity;
    this.event_id = event_id;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      event_id: this.event_id,
    };
  }
}
