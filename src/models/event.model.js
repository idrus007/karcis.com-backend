import { Ticket } from "./ticket.model.js";

export class Event {
  constructor({ id, name, description, location, date, image, tickets = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.date = new Date(date);
    this.image = image;
    this.tickets = tickets.map((t) => new Ticket(t));
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      location: this.location,
      date: this.date,
      image: this.image,
      tickets: this.tickets.map((t) => t.toObject()),
    };
  }

  toObjectWithoutTickets() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      location: this.location,
      date: this.date,
      image: this.image,
    };
  }

  toPrismaCreateInput() {
    return {
      name: this.name,
      description: this.description,
      location: this.location,
      date: this.date,
      image: this.image,
      tickets: {
        create: this.tickets.map((t) => t.toObject()),
      },
    };
  }
}
