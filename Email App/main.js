import { getContainers, intialValue } from "./constants.js";
import * as storage from "./storage.js";
import * as view from "./view.js";
import { handleListClick, handleTitleBarClick } from "./handlers.js";

function init() {
  const { emailContainer, emailLists, emailDetails, emailTitleBar } =
    getContainers();

  storage.initData(intialValue);

  view.renderEmails(storage.getEmails());

  const addBtn = document.createElement("button");
  addBtn.id = "add-email";
  addBtn.dataset.action = "add-email";
  addBtn.textContent = "Add Email";
  emailTitleBar.append(addBtn);

  // event delegation
  emailLists.addEventListener("click", handleListClick);
  emailTitleBar.addEventListener("click", handleTitleBarClick);
}

document.addEventListener("DOMContentLoaded", init);
