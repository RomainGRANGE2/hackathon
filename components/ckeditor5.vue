<template>
  <!-- The template section of the Vue component. It contains the CKEditor component. -->
  <div class="flex justify-center">
    <!-- The CKEditor component. It is bound to the editor, editorData, and editorConfig properties of the Vue component. -->
    <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
    />
  </div>
</template>

<script>
// Importing the CKEditor Vue component and the ClassicEditor build.
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'App',
  components: {
    // Registering the CKEditor Vue component.
    ckeditor: CKEditor.component,
  },
  props: {
    // The ressource prop. It is expected to be a string.
    ressource: {
      type: String
    }
  },
  data() {
    // The data function returns the initial state of the Vue component.
    return {
      // The editor property is set to the ClassicEditor build.
      editor: ClassicEditor,
      // The editorData property is initially set to the value of the ressource prop.
      editorData: this.ressource,
      // The editorConfig property contains the configuration for the CKEditor component.
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo'],
        table: {
          toolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
      },
    };
  },
  watch: {
    // Watcher for the ressource prop. When it changes, the editorData property is updated.
    ressource(newVal) {
      this.editorData = newVal;
    },
    // Watcher for the editorData property. When it changes, a custom event is emitted with the new value.
    editorData(newVal) {
      this.$emit('custom-event', newVal);
    }
  }
};
</script>

<style>
.ck.ck-editor {
  width: 100%;
}
</style>