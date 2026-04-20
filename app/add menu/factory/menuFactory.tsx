// abstract product - defines contract for all menu items

abstract class MenuItem {
  abstract getName(): string;
  abstract getCategory(): string;
  abstract getPrice(): number;
  abstract getStatus(): string;
}

// concrete products - each category of menu item implemennts the abstractmethods; encapsulates their own logic and data
class NonCoffeeItem extends MenuItem {
  constructor(
    private name: string,
    private price: number,
    private active: boolean,
  ) {
    super();
  }

  getName() {
    return this.name;
  }
  getCategory() {
    return "non_coffee";
  }
  getPrice() {
    return this.price;
  }
  getStatus() {
    return this.active ? "active" : "hidden";
  }
}

class CoffeeItem extends MenuItem {
  constructor(
    private name: string,
    private price: number,
    private active: boolean,
  ) {
    super();
  }

  getName() {
    return this.name;
  }
  getCategory() {
    return "coffee";
  }
  getPrice() {
    return this.price;
  }
  getStatus() {
    return this.active ? "active" : "hidden";
  }
}

class PastaBurgerItem extends MenuItem {
  constructor(
    private name: string,
    private price: number,
    private active: boolean,
  ) {
    super();
  }

  getName() {
    return this.name;
  }
  getCategory() {
    return "pasta_burger";
  }
  getPrice() {
    return this.price;
  }
  getStatus() {
    return this.active ? "active" : "hidden";
  }
}

class DessertItem extends MenuItem {
  constructor(
    private name: string,
    private price: number,
    private active: boolean,
  ) {
    super();
  }

  getName() {
    return this.name;
  }
  getCategory() {
    return "dessert_pastry";
  }
  getPrice() {
    return this.price;
  }
  getStatus() {
    return this.active ? "active" : "hidden";
  }
}

//abstract factory - declares factory method-- doesnt implement it
//subclasses decide which product to create
abstract class MenuFactory {
  abstract createItem(name: string, price: number, active: boolean): MenuItem;
}

// concrete factories - each factory knows how to create a specific product type
export class CoffeeFactory extends MenuFactory {
  createItem(name: string, price: number, active: boolean) {
    return new CoffeeItem(name, price, active);
  }
}

export class DessertFactory extends MenuFactory {
  createItem(name: string, price: number, active: boolean) {
    return new DessertItem(name, price, active);
  }
}

export class NonCoffeeFactory extends MenuFactory {
  createItem(name: string, price: number, active: boolean) {
    return new NonCoffeeItem(name, price, active);
  }
}

export class PastaBurgerFactory extends MenuFactory {
  createItem(name: string, price: number, active: boolean) {
    return new PastaBurgerItem(name, price, active);
  }
}
