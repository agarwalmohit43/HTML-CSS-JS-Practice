import { getContainers } from "./constants.js";
import { getEmails } from "./storage.js";

function createEmailItem(email) {
  const { id = "", title = "", isOpened = false } = email;
  const li = document.createElement("li");
  li.className = "emailItem";
  li.dataset.id = id;

  const contentDiv = document.createElement("div");
  contentDiv.className = "email-content-div";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const titleSpan = document.createElement("span");
  titleSpan.className = isOpened ? "email-title-read" : "email-title-unread";
  titleSpan.textContent = title;

  const actionDiv = document.createElement("div");
  actionDiv.className = "actionDiv-btns";

  // const read = document.createElement("button");
  // read.type = "button";
  // read.textContent = "Read";
  // read.dataset.action = "toggle-read";
  // read.name = "read";
  // read.disabled = isOpened;

  // const unread = document.createElement("button");
  // unread.type = "button";
  // unread.textContent = "Unread";
  // unread.dataset.action = "toggle-unread";
  // unread.name = "unread";
  // unread.disabled = !isOpened;

  const toggleEmail = document.createElement("button");
  toggleEmail.type = "button";
  toggleEmail.textContent = isOpened ? "Unread" : "Read";
  toggleEmail.dataset.action = "toggleEmail-read-unRead";
  toggleEmail.dataset.isOpened = isOpened;
  toggleEmail.name = "toggleEmail";

  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "Delete";
  del.dataset.action = "delete";
  del.name = "delete";

  contentDiv.append(checkbox, titleSpan);

  actionDiv.append(toggleEmail, del);
  li.append(contentDiv, actionDiv);
  return li;
}

function renderEmails(emails) {
  const { emailLists } = getContainers();
  emailLists.innerHTML = "";
  const frag = document.createDocumentFragment();
  emails.forEach((e) => frag.appendChild(createEmailItem(e)));
  emailLists.appendChild(frag);
}

function updateEmailLiUI(id, read) {
  const { emailLists } = getContainers();
  const li = emailLists.querySelector(`li[data-id="${id}"]`);
  if (!li) return false;
  const titleSpan = li.querySelector("span");
  titleSpan.classList.toggle("email-title-read", read);
  titleSpan.classList.toggle("email-title-unread", !read);

  const actionBtnDiv = li.querySelector(".actionDiv-btns");
  // const readBtn = actionBtnDiv.querySelector('button[name="read"]');
  // const readBtn = actionBtnDiv.querySelector('button[name="read"]');
  // const unreadBtn = actionBtnDiv.querySelector('button[name="unread"]');
  // readBtn.disabled = read;
  // unreadBtn.disabled = !read;
  const toggleEmailBtn = actionBtnDiv.querySelector(
    'button[name="toggleEmail"]'
  );
  toggleEmailBtn.textContent = read ? "Unread" : "Read";
  toggleEmailBtn.dataset.isOpened = read;
  return true;
}

function removeEmailLi(id) {
  const { emailLists } = getContainers();
  const li = emailLists.querySelector(`li[data-id="${id}"]`);
  if (li) li.remove();
}

function titleBarleftSection(leftSection) {
  const emailData = getEmails();

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "titleBar-leftSection-checkboxDiv";
  checkboxDiv.style.display = emailData.length ? "flex" : "none";

  const selectAll = document.createElement("input");
  selectAll.type = "checkbox";
  selectAll.id = "selectAll-email-checkbox";

  const label = document.createElement("label");
  label.htmlFor = selectAll.id;
  label.textContent = "Select all";

  checkboxDiv.append(selectAll, label);

  leftSection.append(checkboxDiv);
}

function titleBarRightSection(rightSection) {
  const emailData = getEmails();

  // Load email, only if emailData is empty
  if (!emailData.length) {
    const loadEmail = document.createElement("button");
    loadEmail.id = "load-email";
    loadEmail.textContent = "Load Default emails";
    loadEmail.dataset.action = "load-email";
    rightSection.append(loadEmail);
  }

  // Add email intialise
  const addBtn = document.createElement("button");
  addBtn.id = "add-email";
  addBtn.dataset.action = "add-email";
  addBtn.textContent = "Add";
  rightSection.append(addBtn);
}

function titleBarInitialise() {
  const { emailTitleBar } = getContainers();

  const leftSection = document.createElement("section");
  leftSection.className = "emailTitleBar-leftSection";

  const rightSection = document.createElement("section");
  rightSection.className = "emailTitleBar-rightSection";

  titleBarRightSection(rightSection);
  titleBarleftSection(leftSection);

  emailTitleBar.innerHTML = "";

  emailTitleBar.append(leftSection, rightSection);
}

export {
  createEmailItem,
  renderEmails,
  updateEmailLiUI,
  removeEmailLi,
  titleBarInitialise,
};
