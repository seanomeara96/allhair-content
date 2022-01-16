import "./App.css";
import ReactQuill from "react-quill";
import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";

function App() {
  const [intro, setIntro] = useState("");
  const [body, setBody] = useState("");
  const defaultCopyState = { msg: "", style: "" };
  const [copySuccess, setCopySuccess] = useState(defaultCopyState);
  const columns = {
    width: "50%",
  };
  function flash(msg, success) {
    success
      ? setCopySuccess({ msg, style: "success" })
      : setCopySuccess({ msg, style: "failure" });
    setTimeout(() => setCopySuccess(defaultCopyState), 3000);
  }
  return (
    <>
      <main
        style={{
          padding: "2rem 0",
          margin: "0 2rem",
          display: "flex",
          height: "100%",
        }}
      >
        <div
          style={{
            ...columns,
          }}
        >
          <div>
            <h2>Introduction</h2>
            <ReactQuill theme="snow" value={intro} onChange={setIntro} />
          </div>
          <div className="body">
            <h2>Body</h2>
            <ReactQuill theme="snow" value={body} onChange={setBody} />
          </div>
        </div>
        <div
          style={columns}
          onClick={(e) =>
            navigator.clipboard.writeText(e.target.textContent).then(
              function () {
                const msg = "Copying to clipboard was successful!";
                console.log(msg);
                flash(msg, true);
              },
              function (err) {
                const msg = "Could not copy text.";
                console.error(msg, err);
                flash(msg, false);
              }
            )
          }
        >
          {`<details><summary>${intro.replace(
            "</p>",
            "&nbsp;<b>Read More</b></p>"
          )}</summary>${body}</details>`}
        </div>
      </main>
      <i className={`success-message ${copySuccess.style}`}>
        {copySuccess.msg}
      </i>
    </>
  );
}

export default App;
