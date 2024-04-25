<template>
  <div class="flex justify-center">
      <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
      />
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'App',
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    ressource: {
      type: String
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.ressource,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo'],
        table: {
          toolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
      },
    };
  },
  watch: {
    ressource(newVal) {
      this.editorData = newVal;
    },
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