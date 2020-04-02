<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dense flat color="primary" dark>
        <v-toolbar-title>
          게시판
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogAddOpen()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
          <v-data-table :headers="headers" :items="items">
              <template v-slot:item.createdAt="{item}">
                  {{ item.createdAt.toLocaleString() }}
              </template>
              <template v-slot:item.updatedAt="{item}">
                  {{ item.updatedAt.toLocaleString() }}
              </template>
          </v-data-table>
      </v-card-text>
      <v-dialog v-model="dialogAdd">
          <v-card>
                <v-card-title>글 작성</v-card-title>
                <v-card-text>
                    <v-text-field label="제목" v-model="title"></v-text-field>
                    <editor :initialValue="content" ref="toastuiEditor" />
                </v-card-text>
                <v-card-action>
                    <v-btn @click="add">저장</v-btn>
                </v-card-action>
          </v-card>
      </v-dialog>
      <v-dialog v-model="dialogEdit">
          <v-card>
                <v-card-title>글 수정</v-card-title>
                <v-card-text>
                    <v-text-field label="제목" v-model="title"></v-text-field>
                    <editor :initialValue="content" ref="toastuiEditor" />
                </v-card-text>
                <v-card-action>
                    <v-btn @click="update">저장</v-btn>
                </v-card-action>
          </v-card>
      </v-dialog>
      <!-- <v-dialog v-model="dialogAdd">
          <v-card>
                <v-card-title>글 작성</v-card-title>
                <v-card-text>
                    <v-text-field label="제목" v-model="title"></v-text-field>
                    <editor :initialValue="content" ref="toastuiEditor" />
                </v-card-text>
                <v-card-action>
                    <v-btn>test</v-btn>
                </v-card-action>
          </v-card>
      </v-dialog> -->
    </v-card>
  </v-container>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Editor } from '@toast-ui/vue-editor'
const Datastore = require('nedb-promises')
const Diary = Datastore.create('diary.db')
const DiaryContent = Datastore.create('diaryContent.db')

export default {
  components: {
    editor: Editor
    // viewer: Viewer
  },
  data () {
    return {
      editMode: true,
      title: '',
      content: '',
      dialogAdd: false,
      dialogEdit: false,
      dialogRead: false,
      headers: [
        { value: 'createdAt', text: '작성일' },
        { value: 'updatedAt', text: '수정일' },
        { value: 'title', text: '제목' }
      ],
      items: []
    }
  },
  async mounted () {
    await this.removeAll()
    await this.list()
  },
  methods: {
    async removeAll () {
      await DiaryContent.remove({}, { multi: true })
      await Diary.remove({}, { multi: true })
    },
    dialogAddOpen () {
      this.title = ''
      this.content = ''
      this.dialogAdd = true
    },
    async add () {
      this.content = this.$refs.toastuiEditor.invoke('getMarkdown')
      const dc = await DiaryContent.insert({ content: this.content })
      await Diary.insert({
        title: this.title,
        _content: dc._id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      this.dialogAdd = false
      await this.list()
    },
    async list () {
      this.items = await Diary.find()
      console.log(this.items)
    },
    update () {

    },
    del () {

    }
  }
}
</script>
