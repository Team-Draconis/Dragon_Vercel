// import React, { useState, useRef } from "react";
// import { createEditor } from "../utils/editor";
// // import { babel } from "@babel/core";

// // let Output = undefined;
// function ToggleMessage({ codeInput }) {
//   // Output = codeInput;
//   // const el = useRef(null);
//   // const editor = createEditor(el.current);
//   // const input = editor.compile({ codeInput });
//   console.log("this is the codes passed to Toggle component", { codeInput });
//   const [display, setDisplay] = useState("none");
//   const toggle = () => {
//     display === "none" ? setDisplay("block") : setDisplay("none");
//   };

//   // const input = codeInput.slice(1, -1);
//   console.log("hhhhhhhhhhhhhhhhhhhh", typeof codeInput);

//   return (
//     <div>
//       <a href="#" onClick={toggle}>
//         Want to buy a new car?
//       </a>
//       <p style={{ display }}>Call +11 22 33 44 now!</p>
//       <p>{codeInput}</p>
//       {/* <div
//         className="Container"
//         dangerouslySetInnerHTML={{ __html: codeInput }}
//       ></div> */}
//       {/* <p ref={el}>jsjsjsj</p> */}
//     </div>
//   );
// }

// // const Sample = eval(codeInput)

// export default ToggleMessage;
