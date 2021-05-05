<template>
  <div>
    <md-toolbar class="md-transparent">
      <h3 class="md-title" style="flex: 1">Multi Collaborative Editor</h3>
      <md-button class="md-primary" id="run" @click="callUpdateIframe">
        <fa-icon icon="caret-right"></fa-icon>
        Run
      </md-button>
      <md-button class="md-primary" id="edit" @click="showModal">
        Configure
      </md-button>
    </md-toolbar>

    <editor :theme="theme"></editor>
    <modal name="example" width="500px" height="500px" id="modal">
      <div id="modal-close">
        <md-button class="md-secondary" id="close" @click="$modal.hide('example')">
          <fa-icon icon="times"></fa-icon>
        </md-button>
      </div>
      <div id="container">
        Select a theme
        <drop-down
            :options="getOptions"
            :disabled="false"
            @selected="updateOptions"
            name="zipcode"
            :maxItem="100"
            placeholder="Please select an option">
        </drop-down>
      </div>
    </modal>
  </div>
</template>

<script>
import Editor from '@/components/Editor';
import Dropdown from 'vue-simple-search-dropdown';

export default {
  name: 'HelloWorld',
  components: {
    editor: Editor,
    'drop-down': Dropdown,
  },
  data() {
    return {
      theme: '',
    }
  },
  methods: {
    callUpdateIframe() {
      this.$root.$emit('updateIframe');
    },
    showModal() {
      this.$modal.show('example');
    },
    updateOptions(option) {
      this.theme = option.name;
    },
  },
  computed: {
    getOptions() {
      return [
        { id: 1, name: 'default'},
        { id: 2, name: '3024-night'},
        { id: 3, name: '3024-day'},
        { id: 4, name: 'abcdef'},
        { id: 5, name: 'ambiance'},
        { id: 6, name: 'ayu-dark'},
        { id: 7, name: 'ayu-mirage'},
        { id: 8, name: 'base16-dark'},
        { id: 9, name: 'base16-light'},
        { id: 10, name: 'darcula'},
        { id: 11, name: 'dracula'},
      ];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#code {
  display: flex;
  margin: 18px;
}
.code-container {
  width: 600px;
}
#html {
  margin-right: 44px;
}
#css {
  margin-right: 44px;
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
#container {
  padding: 16px;
}
#close {
  float: right;
}
#modal-close {
  width: 100%;
  padding-bottom: 20px;
}
.md-button.md-secondary.md-theme-default {
  min-width: unset;
}
</style>
