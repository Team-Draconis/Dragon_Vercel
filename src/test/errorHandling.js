import incorrectIcon from "./image/incorrect.png";
export default function errorHandling() {
  const container = document.createElement("div");
  container.setAttribute("class", "result-description");
  const icon = document.createElement("img");
  const message = document.createElement("a");
  message.setAttribute("class", "result-message");

  icon.src = incorrectIcon;
  icon.style.width = "20px";
  icon.style.height = "21.05px";
  message.innerHTML = `Fail - Your code is wrong. Please check requirements and try again.`;

  container.appendChild(icon);
  container.appendChild(message);
  document.getElementById("test-result").appendChild(container);
}
