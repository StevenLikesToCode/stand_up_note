<template>
  <div>
    <div v-if="editorFocused" class="editor-kit-menu mb-2 d-flex flex-wrap align-items-center">
      <input
      class="mr-1 mt-1"
      type="color"
      @input="($event) => {editor.chain().focus().setColor($event.target.value).run()}"
      :value="editor.getAttributes('textStyle').color"
    >
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      bold
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      italic
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      paragraph
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      h3
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
      h4
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
      h5
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      bullet list
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      ordered list
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      undo
    </button>
    <button class="btn btn-theme mr-1 mt-1" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      redo
    </button>
  </div>
    <editor-content
      :editor="editor"
      class="editor-content"
      :aria-placeholder="text"
      @click="click_on_text"
      @blur="editorBlur"
      @focus="editorFocus"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import ColorPicker from 'vue-pick-colors'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  emits: ['update:modelValue'],
  components: {
    EditorContent,
    ColorPicker
  },

  data() {
    return {
      editor: null,
      editorFocused: false, 
    }
  },

  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
      // default: 'Please enter header content here',
    }
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Image.configure({
            allowBase64: true,
            inline: true,
        }),
        TextStyle,
        Color.configure({
          types: ['textStyle'],
        }),
        Placeholder.configure({
          // Use a placeholder:
          placeholder: this.placeholder,
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },

  methods: {
    editorFocus() {
      this.editorFocused = true; // Set editor focus to true when it gains focus
    },
    editorBlur() {
      this.editorFocused = false; // Set editor focus to false when it loses focus
    },
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>

.editor-content{
  border: none;
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  color: #adb5bd;
  pointer-events: none;
}

.ProseMirror p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  color: #adb5bd;
  pointer-events: none;
}

/* Basic editor styles */
.ProseMirror {
   > * + * {
    margin-top: .75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    color: #616161;
    background-color: rgba(#616161, .1);
  }

  pre {
    padding: .75rem 1rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    background: #0d0d0d;
    border-radius: .5rem;

    code {
      padding: 0;
      color: inherit;
      font-size: .8rem;
      background: none;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, .1);
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 2px solid rgba(#0d0d0d, .1);
  }
}
</style>
