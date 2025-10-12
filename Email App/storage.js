import { EMAIL_DATA_KEY } from "./constants.js";

let emailData = [];

function getSelectedEmails() {
  return emailData.filter((e) => e.isSelected);
}

function selectEmail(id, select = true) {
  emailData = emailData.map((e) =>
    e.id === id ? { ...e, isSelected: select } : e
  );
  save();
  console.log(getSelectedEmails());
}

function initData(seed = []) {
  const raw = localStorage.getItem(EMAIL_DATA_KEY);
  emailData = raw && raw !== "[]" ? JSON.parse(raw) : seed;
  save();
  return emailData;
}

function getEmails() {
  return emailData;
}

function pushEmail(email) {
  emailData.push(email);
  save();
}

function updateEmailById(id, patch) {
  emailData = emailData.map((e) => (e.id === id ? { ...e, ...patch } : e));
  save();
}

function deleteEmailById(id) {
  emailData = emailData.filter((e) => e.id !== id);
  save();
}

function save() {
  localStorage.setItem(EMAIL_DATA_KEY, JSON.stringify(emailData));
}

export {
  initData,
  getEmails,
  pushEmail,
  updateEmailById,
  deleteEmailById,
  getSelectedEmails,
  selectEmail,
};
