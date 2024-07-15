import Item from "./Item";

interface AllItem {
  items: Item[];
  load(): void;
  save(): void;
  clearItem(): void;
  addItem(item: Item): void;
  removeItem(id: string): void;
  editItem(id: string, firstName: string, lastName: string, email: string, country: string): void;
}

export default class ItemList implements AllItem {
  private _items: Item[] = [];

  get items(): Item[] {
    return this._items;
  }

  load(): void {
    const storedItems = localStorage.getItem("addresses");
    if (!storedItems) return;

    JSON.parse(storedItems).forEach((itemObj: any) => {
      this.addItem(new Item(itemObj._id, itemObj._firstName, itemObj._lastName, itemObj._email, itemObj._country));
    });
  }

  save(): void {
    localStorage.setItem("addresses", JSON.stringify(this._items));
  }

  clearItem(): void {
    this._items = [];
    localStorage.removeItem("addresses");
  }

  addItem(item: Item): void {
    this._items.unshift(item);
    this.save();
  }

  removeItem(id: string): void {
    this._items = this._items.filter(item => item.id !== id);
    this.save();
  }

  editItem(id: string, firstName: string, lastName: string, email: string, country: string): void {
    const item = this._items.find(item => item.id === id);
    if (!item) return;
    Object.assign(item, { firstName, lastName, email, country });
    this.save();
  }
}