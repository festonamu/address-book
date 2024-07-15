import Item from "../model/Item";
import ListController from "../controller/ListController";
import countryList  from 'country-list';

interface DOMList {
  clear(): void;
  render(allItem: Item[]): void;
}

export default class HTMLItemListView implements DOMList {
  private ul: HTMLUListElement;
  private listController: ListController;
  constructor(listController: ListController) {
    this.ul = document.getElementById("address-book") as HTMLUListElement;
    this.listController = listController;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  private createItemListElement(item: Item): HTMLLIElement {
    const li = document.createElement("li") as HTMLLIElement;
    li.className = "list-group-item d-flex gap-3 align-items-center";
    li.dataset.itemId = item.id;

    const editNameInput = this.createInput("text", item.firstName);
    const editSurnameInput = this.createInput("text", item.lastName);
    const editEmailInput = this.createInput("email", item.email);

    const countries = countryList.getNames();
    const editCountryInput = this.createSelect(countries, item.country);
    const labelName = this.createLabel('Name: ' + item.firstName);
    const labelSurname = this.createLabel('Surname: ' + item.lastName);
    const labelEmail = this.createLabel('Email: ' + item.email);
    const labelCountry = this.createLabel('Country: ' + item.country);

    const [saveButton, editButton] = this.createEditAndSaveButtons(
      editNameInput, labelName, editSurnameInput, labelSurname, 
      editEmailInput, labelEmail, editCountryInput, labelCountry, item
    );

    const deleteButton = this.createButton("Delete", "btn-primary", () => {
      this.listController.deleteItem(item.id);
      this.render(this.listController.getList());
    });

    li.append(editNameInput, labelName, editSurnameInput, labelSurname, editEmailInput, labelEmail, editCountryInput, labelCountry, editButton, saveButton, deleteButton);
    return li;
  }

  private createInput(type: string, value: string): HTMLInputElement {
    const input = document.createElement("input") as HTMLInputElement;
    input.hidden = true;
    input.type = type;
    input.className = "form-control";
    input.value = value;
    input.required = true;
    return input;
  }

  private createSelect(options: string[], selectedValue: string): HTMLSelectElement {
    const select = document.createElement("select") as HTMLSelectElement;
    select.className = "form-control";
    select.required = true;
    select.hidden = true;

    options.forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText;
        option.text = optionText;
        if (optionText === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
  }

  private createLabel(text: string): HTMLLabelElement {
    const label = document.createElement("label") as HTMLLabelElement;
    label.textContent = text;
    return label;
  }

  private createEditAndSaveButtons(
    editNameInput: HTMLInputElement, labelName: HTMLLabelElement,
    editSurnameInput: HTMLInputElement, labelSurname: HTMLLabelElement,
    editEmailInput: HTMLInputElement, labelEmail: HTMLLabelElement,
    editCountryInput: HTMLSelectElement, labelCountry: HTMLLabelElement,
    item: Item
  ): HTMLButtonElement[] {
    const saveButton = this.createButton("Save", "btn-warning", () => {
      item.firstName = editNameInput.value;
      item.lastName = editSurnameInput.value;
      item.email = editEmailInput.value;
      item.country = editCountryInput.value;

      function isValidEmail(email: string): boolean {
        const pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
        return pattern.test(email);
      }

      if (item.firstName.length < 1 || item.lastName.length < 1 || item.country.length < 1) {
        alert(`Please fill up all fields`);
        return;
      } else if (!isValidEmail(item.email)) {
        alert(`Please enter a valid emaik.`);
        return;
      } else {
        this.listController.editItem(item.id, item.firstName, item.lastName, item.email, item.country);
      }
      this.render(this.listController.getList());
    });

    const editButton = this.createButton("Edit", "btn-success", () => {
      this.toggleEditMode(editNameInput, labelName);
      this.toggleEditMode(editSurnameInput, labelSurname);
      this.toggleEditMode(editEmailInput, labelEmail);
      editCountryInput.hidden = !editCountryInput.hidden;
      labelCountry.hidden = true;
      saveButton.hidden = false;
      editButton.hidden = true;
    });

    saveButton.hidden = true;
    return [saveButton, editButton];
  }

  private toggleEditMode(input: HTMLInputElement, label: HTMLLabelElement): void {
    input.hidden = !input.hidden;
    label.hidden = !label.hidden;
  }

  private createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button") as HTMLButtonElement;
    button.className = `btn btn-sm ${className}`;
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  render(allItem: Item[]): void {
    this.clear();
    allItem.forEach(item => this.ul.append(this.createItemListElement(item)));
  }
}