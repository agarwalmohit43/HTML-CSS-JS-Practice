const EMAIL_DATA_KEY = "EMAIL_DATA_KEY";

function getContainers() {
  return {
    emailContainer: document.querySelector("#email-container"),
    emailLists: document.querySelector("#emailLists"),
    emailDetails: document.querySelector("#emailDetails"),
    emailTitleBar: document.querySelector("#emailTitleBar"),
  };
}

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

export { EMAIL_DATA_KEY, getContainers, intialValue };
