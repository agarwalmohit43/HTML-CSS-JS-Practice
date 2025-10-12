import { getContainers } from "./constants.js";
import * as storage from "./storage.js";
import * as view from "./view.js";

function handleListClick(event) {
  const action = event.target.dataset.action;
  if (!action) return;

  const li = event.target.closest("li.emailItem");
  if (!li) return;

  const id = li.dataset.id;

  switch (action) {
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
  };

  storage.pushEmail(newEmail);

  const { emailLists } = getContainers();
  emailLists.appendChild(view.createEmailItem(newEmail));
};

function handleTitleBarClick(event) {
  const action = event.target.dataset.action;
  if (!action) return;

  switch (action) {
    case "add-email":
      handleAddEmail(event);
      break;

    default:
      console.warn(`Unknown title bar action: ${action}`);
      break;
  }
}

export { handleListClick, handleTitleBarClick };
