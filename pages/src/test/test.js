export default function test(element, target, expected, description) {
  if (target === "text") {
    const container = document.createElement("div");
    if (element === expected) {
      container.innerHTML = `Pass - ${description}`;
    } else {
      container.innerHTML = `Fail - ${description}`;
    }
    document.getElementById("test-result").appendChild(container);
  }

  if (target === "isDefined") {
    const container = document.createElement("div");
    if (element) {
      container.innerHTML = `Pass - ${description}`;
    } else {
      container.innerHTML = `Fail - ${description}`;
    }
    document.getElementById("test-result").appendChild(container);
  }

  if (target === "isNotDefined") {
    const container = document.createElement("div");
    if (!element) {
      container.innerHTML = `Pass - ${description}`;
    } else {
      container.innerHTML = `Fail - ${description}`;
    }
    document.getElementById("test-result").appendChild(container);
  }
}
