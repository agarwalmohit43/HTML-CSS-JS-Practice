const emailContainer = document.querySelector("#email-container");
const emailLists = document.querySelector("#emailLists");
const emailDetails = document.querySelector("#emailDetails");
const emailTitleBar = document.querySelector("#emailTitleBar");

const initialiseTitleBar = () => {
  const addEmailBtn = document.createElement("button");
  addEmailBtn.id = "add-email";
  addEmailBtn.textContent = "Add Email";
  addEmailBtn.dataset.action = "add-email";

  emailTitleBar.append(addEmailBtn);
};

const generateEmail = () => {
  return {
    id: crypto.randomUUID(),
    title: `Email Title - ${Math.floor(Math.random() * 100)}`,
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isOpened: false,
  };
};

const intialValue = [
  {
    id: crypto.randomUUID(),
    title: "Welcome to Email App",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isOpened: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Thanks for signing up",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isOpened: false,
  },
];

const EMAIL_DATA_KEY = "EMAIL_DATA_KEY";

let emailData = [];

const saveData = () => {
  localStorage.setItem(EMAIL_DATA_KEY, JSON.stringify(emailData));
};

const loadData = () => {
  const data = localStorage.getItem(EMAIL_DATA_KEY);
  return data ? JSON.parse(data) : [];
};

const createEmailItem = (email) => {
  const { id = "", title = "", isOpened = "" } = email;
  const li = document.createElement("li");
  li.classList.add("emailItem");
  li.dataset.id = id;

  const titleSpan = document.createElement("span");
  titleSpan.classList.add(
    `${isOpened ? "email-title-read" : "email-title-unread"}`
  );
  titleSpan.textContent = title;

  const actionButtonDiv = document.createElement("div");
  actionButtonDiv.className = "actionDiv-btns";

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

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.action = "delete";
  deleteBtn.name = "delete";

  actionButtonDiv.append(read, unread, deleteBtn);

  li.append(titleSpan, actionButtonDiv);
  return li;
};

const renderEmails = () => {
  emailLists.innerHTML = "";
  const fragment = document.createDocumentFragment();
  emailData.forEach((email) => fragment.appendChild(createEmailItem(email)));
  emailLists.appendChild(fragment);
};

const init = () => {
  initialiseTitleBar();
  emailData = loadData();
  if (emailData.length === 0) {
    emailData = intialValue;
    saveData();
  }
  renderEmails();
};

const updateEmailLi = (id, read) => {
  const li = emailLists.querySelector(`li[data-id='${id}']`);
  if (!li) return null;
  const titleSpan = li.querySelector("span");
  titleSpan.classList.toggle("email-title-read", read);
  titleSpan.classList.toggle("email-title-unread", !read);

  const actionBtnDiv = li.querySelector("div");
  const readBtn = actionBtnDiv.querySelector("button[name='read']");
  const unReadBtn = actionBtnDiv.querySelector("button[name='unread']");

  readBtn.disabled = read;
  unReadBtn.disabled = !read;
  return true;
};

const toggleEmailOpenedById = (id, read) => {
  if (updateEmailLi(id, read)) {
    emailData = emailData.map((e) =>
      e.id === id ? { ...e, isOpened: read } : e
    );
    saveData();
  }
};

const deleteEmail = (id, li) => {
  emailData = emailData.filter((email) => email.id !== id);
  saveData();
  li.classList.add("removing");
  li.addEventListener("transitionend", () => li.remove(), { once: true });

  setTimeout(() => {
    if (document.contains(li)) li.remove();
  }, 400);
};

const handleAddEmail = (event) => {
  const addEmailBtn = event.target.closest("button#add-email");
  if (!addEmailBtn) return;
  const newEmail = generateEmail();
  if (emailLists.appendChild(createEmailItem(newEmail))) {
    emailData.push(newEmail);
    saveData();
  }
};

emailLists.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  const li = event.target.closest("li.emailItem");
  if (!li) return;
  const id = li.dataset.id;
  if (action === "toggle-read") toggleEmailOpenedById(id, true);
  if (action === "toggle-unread") toggleEmailOpenedById(id, false);
  if (action === "delete") deleteEmail(id, li);
});

emailTitleBar.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  switch (action) {
    case "add-email":
      handleAddEmail(event);
      break;
    default:
      console.log("Action fallback for Title Bar");
      break;
  }
});

init();
