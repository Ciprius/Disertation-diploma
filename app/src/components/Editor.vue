<template>
  <div>
    <div id="code">
      <div>
        <h3 class="md-title">Html</h3>
        <codemirror class="code-container" id="html" ref="html" v-model="code.htmlCode" @keyHandled="updateOutput" :options="getHtmlOption"></codemirror>
      </div>
      <div>
        <h3 class="md-title">Css</h3>
        <codemirror class="code-container" id="css" ref="css"  v-model="code.cssCode" @keyHandled="updateOutput" :options="getCssOption"></codemirror>
      </div>
      <div>
        <h3 class="md-title">JavaScript</h3>
        <codemirror class="code-container" id="js" ref="js" v-model="code.jsCode" @keyHandled="updateOutput" :options="getJsOption"></codemirror>
      </div>
    </div>
    <div id="iframe">
      <h3 class="md-title">Output</h3>
      <iframe id="output" ref="editor"></iframe>
    </div>
  </div>
</template>

<script>
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { CodemirrorBinding } from 'y-codemirror';
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/lib/codemirror.css';
// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js'
// styleSelectedText
import'codemirror/addon/selection/mark-selection.js'
import'codemirror/addon/search/searchcursor.js'
// hint
import'codemirror/addon/hint/show-hint.js'
import'codemirror/addon/hint/show-hint.css'
import'codemirror/addon/hint/javascript-hint.js'
import'codemirror/addon/selection/active-line.js'
// highlightSelectionMatches
import'codemirror/addon/scroll/annotatescrollbar.js'
import'codemirror/addon/search/matchesonscrollbar.js'
import'codemirror/addon/search/searchcursor.js'
import'codemirror/addon/search/match-highlighter.js'
// keyMap
import'codemirror/mode/clike/clike.js'
import'codemirror/addon/edit/matchbrackets.js'
import'codemirror/addon/comment/comment.js'
import'codemirror/addon/dialog/dialog.js'
import'codemirror/addon/dialog/dialog.css'
import'codemirror/addon/search/searchcursor.js'
import'codemirror/addon/search/search.js'
import'codemirror/keymap/sublime.js'
// foldGutter
import'codemirror/addon/fold/foldgutter.css'
import'codemirror/addon/fold/brace-fold.js'
import'codemirror/addon/fold/comment-fold.js'
import'codemirror/addon/fold/foldcode.js'
import'codemirror/addon/fold/foldgutter.js'
import'codemirror/addon/fold/indent-fold.js'
import'codemirror/addon/fold/markdown-fold.js'
import'codemirror/addon/fold/xml-fold.js'


export default {
  name: 'Editor',
  components: {
    codemirror
  },
  props: {
    theme: {
      type: String,
      default: 'dracula',
    }
  },
  data() {
    return {
      code: {
        htmlCode: '',
        cssCode: '',
        jsCode: '',
      },
    }
  },
  methods: {
    updateOutput() {
      let iframe = document.getElementById('output');
      let body = iframe.contentWindow.document.body;
      let head = iframe.contentWindow.document.head;
      let style = document.createElement('style');
      let script = document.createElement('script');
      style.textContent = this.code.cssCode;
      script.textContent = this.code.jsCode;
      head.appendChild(style);
      head.appendChild(script);
      body.innerHTML = this.code.htmlCode;
    },
  },
  computed: {
    getHtmlOption() {
      return {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        autoCloseTags: true,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'text/html',
        hintOptions:{
          completeSingle: false
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: this.theme || "dracula",
        extraKeys: { "Ctrl": "autocomplete" }
      };
    },
    getCssOption() {
      return {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        autoCloseTags: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'text/css',
        hintOptions:{
          completeSingle: false
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: this.theme || "dracula",
        extraKeys: { "Ctrl": "autocomplete" }
      }
    },
    getJsOption() {
      return {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        autoCloseTags: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'application/javascript',
        hintOptions:{
          completeSingle: false
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: this.theme || "dracula",
        extraKeys: { "Ctrl": "autocomplete" }
      }
    }
  },
  mounted() {
    const ydocHTML = new Y.Doc();
    const ydocCSS = new Y.Doc();
    const ydocJS = new Y.Doc();
    
    const providerHTML = new WebsocketProvider('wss://demos.yjs.dev', 'codemirror-html', ydocHTML); 
    const providerCSS = new WebsocketProvider('wss://demos.yjs.dev', 'codemirror-css', ydocCSS); 
    const providerJS = new WebsocketProvider('wss://demos.yjs.dev', 'codemirror-js', ydocJS);
    
    const ytextHTML = ydocHTML.getText('codemirror');
    const ytextCSS = ydocCSS.getText('codemirror');
    const ytextJS = ydocJS.getText('codemirror');
    
    const htmlEditor = this.$refs?.html?.codemirror;
    const cssEditor = this.$refs?.css?.codemirror;
    const jsEditor = this.$refs?.js?.codemirror;
    
    const bindingHtml = new CodemirrorBinding(ytextHTML, htmlEditor, providerHTML.awareness);
    const bindingCss = new CodemirrorBinding(ytextCSS, cssEditor, providerCSS.awareness);
    const bindingJs = new CodemirrorBinding(ytextJS, jsEditor, providerJS.awareness);

    // @ts-ignore
    window.example = { providerHTML, providerCSS, providerJS, ydocHTML, ydocCSS, ydocJS, ytextHTML, ytextCSS, ytextJS, bindingHtml, bindingCss, bindingJs, Y }
  
    this.$root.$on('updateIframe', ()=> {
      this.updateOutput();
    });
  }
};
</script>

<style scoped>
#code {
  display: flex;
  justify-content: center;
}
.code-container {
  width: 30vw;
}
#html {
  margin-right: 48px;
}
#css {
  margin-right: 48px;
}
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
#iframe {
  margin: 16px;
  border-top: 5px solid grey;
}
#output {
  width: 100%;
  height: 40vh;
}
.md-button.md-theme-default.md-primary {
  border-radius: 10px;
  border: 2px solid black;
  color: black;
}
.md-button.md-theme-default.md-primary:hover {
  border: 2px solid grey;
}
.runIcon {
  font-size: 15px;
}
.md-button.md-theme-default.md-primary.runIcon:hover {
  transform: rotate(360deg);
}
</style>