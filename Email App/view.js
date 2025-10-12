import { getContainers } from "./constants.js";

function createEmailItem(email) {
  const { id = "", title = "", isOpened = false } = email;
  const li = document.createElement("li");
  li.className = "emailItem";
  li.dataset.id = id;

  const titleSpan = document.createElement("span");
  titleSpan.className = isOpened ? "email-title-read" : "email-title-unread";
  titleSpan.textContent = title;

  const actionDiv = document.createElement("div");
  actionDiv.className = "actionDiv-btns";

  const read = document.createElement("button");
  read.type = "button";
  read.textContent = "Read";
  read.dataset.action = "toggle-read";
  read.name = "read";
  read.disabled = isOpened;

  const unread = document.createElement("button");
  unread.type = "button";
  unread.textContent = "Unread";
  unread.dataset.action = "toggle-unread";
  unread.name = "unread";
  unread.disabled = !isOpened;

  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "Delete";
  del.dataset.action = "delete";
  del.name = "delete";

  actionDiv.append(read, unread, del);
  li.append(titleSpan, actionDiv);
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
  const readBtn = actionBtnDiv.querySelector('button[name="read"]');
  const unreadBtn = actionBtnDiv.querySelector('button[name="unread"]');
  readBtn.disabled = read;
  unreadBtn.disabled = !read;
  return true;
}

function removeEmailLi(id) {
  const { emailLists } = getContainers();
  const li = emailLists.querySelector(`li[data-id="${id}"]`);
  if (li) li.remove();
}

export { createEmailItem, renderEmails, updateEmailLiUI, removeEmailLi };
