import incorrectIcon from "./image/incorrect.png";
export default function errorHandling() {
  const container = document.createElement("div");
  const icon = document.createElement("img");
  const message = document.createElement("a");

  icon.src = incorrectIcon;
  icon.style.width = "20px";
  message.innerHTML = `Fail - Your code is wrong. Please check requirements and try again.`;

  container.appendChild(icon);
  container.appendChild(message);
  document.getElementById("test-result").appendChild(container);
}
