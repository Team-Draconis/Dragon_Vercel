export default function errorHandling(description) {
  const container = document.createElement("div");
  container.innerHTML = `Fail - ${description}`;
  document.getElementById("test-result").appendChild(container);
}
