export default function errorHandling() {
  const container = document.createElement("div");
  container.innerHTML = `Fail - Your code is wrong. Please check requirements and try again.`;
  document.getElementById("test-result").appendChild(container);
}
