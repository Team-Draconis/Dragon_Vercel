import correctIcon from "./image/correct.png";
import incorrectIcon from "./image/incorrect.png";

export default function test(element, target, expected, description) {
  const container = document.createElement("div");
  container.setAttribute("class", "result-description");
  const icon = document.createElement("img");
  const message = document.createElement("a");
  message.setAttribute("class", "result-message");

  const pass = () => {
    icon.src = correctIcon;
    icon.style.width = "20px";
    icon.style.height = "21.05px";
    message.innerHTML = `Pass - ${description}`;
  };

  const fail = () => {
    icon.src = incorrectIcon;
    icon.style.width = "20px";
    icon.style.height = "21.05px";
    message.innerHTML = `Fail - ${description}`;
  };

  const append = () => {
    container.appendChild(icon);
    container.appendChild(message);
    document.getElementById("test-result").appendChild(container);
  };

  if (target === "text") {
    if (element === expected) {
      pass();
    } else {
      fail();
    }
    append();
  }

  if (target === "isDefined") {
    if (element) {
      pass();
    } else {
      fail();
    }
    append();
  }

  if (target === "isNotDefined") {
    if (!element) {
      pass();
    } else {
      fail();
    }
    append();
  }

  if (target === "length") {
    if (element.length === expected) {
      pass();
    } else {
      fail();
    }
    append();
  }
}
