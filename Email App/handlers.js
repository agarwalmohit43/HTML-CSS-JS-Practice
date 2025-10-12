import { getContainers, intialValue } from "./constants.js";
import * as storage from "./storage.js";
import * as view from "./view.js";

function handleListClick(event) {
  const action = event.target.dataset.action;

  const isOpened = event.target.dataset.isOpened === "true" ? true : false;
  if (!action) return;

  const li = event.target.closest("li.emailItem");
  if (!li) return;

  const id = li.dataset.id;

  switch (action) {
    case "select-email":
      view.selectEmailLi(id, event.target.checked);
      break;
    case "toggle-read":
      if (view.updateEmailLiUI(id, true)) {
        storage.updateEmailById(id, { isOpened: true });
      }
      break;

    case "toggle-unread":
      if (view.updateEmailLiUI(id, false)) {
        storage.updateEmailById(id, { isOpened: false });
      }
      break;

    case "toggleEmail-read-unRead":
      if (view.updateEmailLiUI(id, !isOpened)) {
        storage.updateEmailById(id, { isOpened: !isOpened });
      }
      break;

    case "delete":
      li.classList.add("removing");

      li.addEventListener(
        "transitionend",
        () => {
          storage.deleteEmailById(id);
          view.removeEmailLi(id);
        },
        { once: true }
      );

      setTimeout(() => {
        if (document.contains(li)) {
          storage.deleteEmailById(id);
          view.removeEmailLi(id);
        }
      }, 400);
      break;

    default:
      console.warn(`Unknown list action: ${action}`);
      break;
  }
}

const handleAddEmail = (event) => {
  const newEmail = {
    id: crypto.randomUUID(),
    title: `Email Title - ${Math.floor(Math.random() * 100)}`,
    body: "Lorem ipsum ...",
    isOpened: false,
    isSelected: false,
  };

  storage.pushEmail(newEmail);

  const { emailLists } = getContainers();
  emailLists.appendChild(view.createEmailItem(newEmail));
};

const handleLoadEmail = (event) => {
  storage.initData(intialValue);
  view.renderEmails(storage.getEmails());

  const loadBtn = event.target.closest("button#load-email");
  if (!loadBtn) return;
  loadBtn.remove();

  const titleBar = event.currentTarget;

  if (!titleBar) return;
  const checkboxDiv = titleBar.querySelector(
    "section.emailTitleBar-leftSection .titleBar-leftSection-checkboxDiv"
  );
  if (!checkboxDiv) return;
  checkboxDiv.style.display = "flex";
};

const handleSelectAllEmail = (event) => {
  const isChecked = event.target.checked;
  const emails = storage.getEmails();
  emails.forEach((email) => {
    view.selectEmailLi(email.id, isChecked);
  });
};

const deleteAllSelectedEmails = () => {
  const selectedEmails = storage.getSelectedEmails();
  if (selectedEmails.length === 0) return;
  selectedEmails.forEach((email) => {
    storage.deleteEmailById(email.id);
    view.removeEmailLi(email.id);
  });

  if (storage.getEmails().length === 0) {
    const selectAllCheckbox = document.getElementById(
      "selectAll-email-checkbox"
    );
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
    }
    const checkboxDiv = document.querySelector(
      "section.emailTitleBar-leftSection .titleBar-leftSection-checkboxDiv"
    );
    if (checkboxDiv) {
      checkboxDiv.style.display = "none";
    }
    const rightSection = document.querySelector(
      "section.emailTitleBar-rightSection"
    );
    if (!rightSection) return;
    view.createLoadEmailButton(rightSection, true);

    const delBtn = document.querySelector("#del-email");
    if (delBtn) delBtn.disabled = true;
  }
};

function handleTitleBarClick(event) {
  const action = event.target.dataset.action;
  if (!action) return;

  switch (action) {
    case "select-all-email":
      handleSelectAllEmail(event);
      break;
    case "add-email":
      handleAddEmail(event);
      break;

    case "load-email":
      handleLoadEmail(event);
      break;
    case "del-email":
      deleteAllSelectedEmails();
      break;
    default:
      console.warn(`Unknown title bar action: ${action}`);
      break;
  }
}

export { handleListClick, handleTitleBarClick };
