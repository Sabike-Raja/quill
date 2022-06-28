// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactQuill, { Quill } from "react-quill"; // ES6

import "react-quill/dist/quill.snow.css";

// const Quill = ReactQuill.Quill;
const BlockEmbed = Quill.import("blots/embed");
class AudioBlot extends BlockEmbed {
  static create(url: string) {
    let node = super.create();
    node.classList.add("email-variables");
    node.innerText = url;
    return node;
  }

  static value(node: any) {
    return node;
  }
}
AudioBlot.blotName = "audio";
AudioBlot.tagName = "span";
Quill.register(AudioBlot);

class Editor extends React.Component {
  quillRef: null;
  reactQuillRef: ReactQuill | null;
  constructor(props: any) {
    super(props);
    this.state = { editorHtml: "", mountedEditor: false };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  // componentDidMount () {
  //   this.attachQuillRefs()
  // }

  // componentDidUpdate () {
  //   this.attachQuillRefs()
  // }

  // attachQuillRefs() {
  //   // Ensure React-Quill reference is available:
  //   if (typeof this.reactQuillRef.getEditor !== 'function') return;
  //   // Skip if Quill reference is defined:
  //   if (this.quillRef != null) return;

  //   const quillRef = this.reactQuillRef.getEditor();
  //   if (quillRef != null) this.quillRef = quillRef;
  // }

  handleClick() {
    const localRef = this.reactQuillRef?.getEditor();
    var range = localRef?.getSelection();
    let position = range ? range.index : 0;
    console.log("succ", position);
    //localRef.insertText(position, 'Hello, World! ')
    localRef?.insertEmbed(position, "audio", "First Name", "user");
    // localRef.clipboard.dangerouslyPasteHTML(position, '<div style="color:red">text</div>')
    // localRef.insertEmbed(position, 'span', 'working', 'user');
  }

  handleChange(html: string) {
    console.log("succ", html);
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
        <button onClick={this.handleClick}>Insert Audio</button>
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"], // blocks
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }], // lists
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults
    [{ font: [] }], // font family
    [{ align: [] }], // text align
    ["clean"], // remove formatting
  ],
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "background",
  "color",
  "code",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "script",
  "align",
  "direction",
  "link",
  "image",
  "code-block",
  "formula",
  "audio",
];

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
