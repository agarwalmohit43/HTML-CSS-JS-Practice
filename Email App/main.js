import { getContainers } from "./constants.js";
import * as storage from "./storage.js";
import * as view from "./view.js";
import { handleListClick, handleTitleBarClick } from "./handlers.js";

function init() {
  const { emailLists, emailTitleBar } = getContainers();

  storage.initData();
  view.titleBarInitialise();
  view.renderEmails(storage.getEmails());

  // event delegation
  emailLists.addEventListener("click", handleListClick);
  emailTitleBar.addEventListener("click", handleTitleBarClick);
}

document.addEventListener("DOMContentLoaded", init);
