import Item from "../model/Item";
import List from "../model/List";

interface Controller {
  getList(): Item[];
  addItem(newItem: Item): void;
  deleteItem(itemId: string): void;
  editItem(itemId: string, updatedFirstName: string,  updatedLastName: string, updatedEmail: string, updatedCountry: string): void;
  loadItem(): void;
  saveItem(): void;
}

export default class ListController implements Controller {
  private _itemList: List = new List();

  constructor() {
    this.loadItem();
  }

  getList(): Item[] {
    return this._itemList.items;
  }

  addItem(newItem: Item): void {
    this._itemList.addItem(newItem);
  }

  deleteItem(itemId: string): void {
    this._itemList.removeItem(itemId);
  }

  editItem(itemId: string, updatedFirstName: string,  updatedLastName: string, updatedEmail: string, updatedCountry: string): void {
    this._itemList.editItem(itemId, updatedFirstName, updatedLastName, updatedEmail, updatedCountry);
  }

  loadItem(): void {
    this._itemList.load();
  }

  saveItem(): void {
    this._itemList.save();
  }
}