export interface SingleItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export default class Item implements SingleItem {
  constructor(
    private _id: string = "",
    private _firstName: string = "",
    private _lastName: string = "",
    private _email: string = "",
    private _country: string = ""
  ) { }

  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  get firstName(): string {
    return this._firstName;
  }
  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }

  get country(): string {
    return this._country;
  }
  set country(country: string) {
    this._country = country;
  }
}