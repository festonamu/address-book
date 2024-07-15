import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import Item from "./model/Item";
import ListController from "./controller/ListController";
import HTMLListView from "./view/ListView";
import countryList  from 'country-list';

const countries = countryList.getNames();

const listController = new ListController();
const listView = new HTMLListView(listController);
const addressbookForm = document.getElementById("addressbook-form") as HTMLFormElement;

function populateCountrySelect() {
  const countrySelect = document.getElementById('new-country') as HTMLSelectElement;

  // clear existing options
  countrySelect.innerHTML = '';

  // add default blank option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a country';
  countrySelect.appendChild(defaultOption);

  // populate countries
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });
}

const initApp = () => {
  populateCountrySelect(); 
  listView.render(listController.getList());
};


const handleSubmit = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(addressbookForm);
  const name = formData.get("new-name")?.toString().trim();
  const surname = formData.get("new-surname")?.toString().trim();
  const email = formData.get("new-email")?.toString().trim();
  const country = formData.get("new-country")?.toString();

  function isValidEmail(email: string): boolean {
    const pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  }


  if (!name || !surname || !country || (email && !isValidEmail(email))) {
    alert(`Please fill up all fields and enter a valid email address`);
    return;
  } else {
    listController.addItem(new Item(uuid(), name, surname, email, country));
    initApp();
    addressbookForm.reset();
    document.getElementById('form-section')!.classList.add('hidden');
    document.getElementById('list-section')!.classList.remove('hidden');
  }
};

if (addressbookForm) addressbookForm.addEventListener("submit", handleSubmit);

initApp();