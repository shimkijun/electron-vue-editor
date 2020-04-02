<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dense flat color="primary" dark>
        <v-toolbar-title>
          문서편집기
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="editMode = !editMode">
          <v-icon>{{ editMode ? 'mdi-eye' : 'mdi-pencil'}}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field label="제목" v-model="form.title"></v-text-field>
         <editor v-if="editMode" :initialValue="form.content" ref="toastuiEditor" />
        <viewer v-else :initialValue="form.content" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="fileImport">fileImport</v-btn>
        <v-btn @click="fileExport">fileExport</v-btn>
        <v-btn @click="dbRead">Read</v-btn>
        <v-btn @click="dbWrite">Write</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
const Datastore = require('nedb-promises')
const db = Datastore.create('/path/to/db.db')
const { dialog } = require('electron').remote
const fs = require('fs')

export default {
  components: {
    editor: Editor,
    viewer: Viewer
  },
  data () {
    return {
      editMode: true,
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    fileImport () {
      const options = {
        filters: [
          {
            name: 'text and markdown',
            extentions: ['txt', 'md']
          }
        ]
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.form.content = fs.readFileSync(r[0]).toString()
    },
    fileExport () {
      const options = {
        filters: [
          {
            name: 'text and markdown',
            extentions: ['txt', 'md']
          }
        ]
      }
      const r = dialog.showSaveDialogSync(options)
      if (!r) return
      fs.writeFileSync(r, this.form.initialValue)
    },
    async dbWrite () {
      this.form.content = this.$refs.toastuiEditor.invoke('getMarkdown')
      await db.insert(this.form)
    },
    async dbRead () {
      const rs = await db.findOne()
      console.log(rs)
    }
  }
}
</script>
