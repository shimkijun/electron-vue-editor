<template>
    <v-container>
        <div><v-btn color="primary" @click="showOpenDialogTest">showDialog</v-btn></div>
        <div><v-btn color="warning" @click="showMenuTest">showMenu</v-btn></div>
        <div><v-btn color="red" @click="actionIpcSyncTest">actionIpcSync</v-btn></div>
        <div><v-btn @click="showNotificationTest">showNotification</v-btn></div>
        <div>
          <v-btn @click="yotubeDownload">유튜브 mp4</v-btn>
          <v-text-field
            v-model="youtubeLink"
            label="youtube link"
           />
        </div>
    </v-container>
</template>
<script>
const { browserWindow, remote, ipcRenderer } = require('electron')
const { dialog, Menu, MenuItem, Notification } = remote

export default {
  data () {
    return {
      youtubeLink: ''
    }
  },
  methods: {
    showOpenDialogTest () {
      const filters = [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        { name: 'Custom File Type', extensions: ['as'] },
        { name: 'All Files', extensions: ['*'] }
      ]
      dialog.showOpenDialogSync(browserWindow, { filters })

      // dialog.showMessageBoxSync({ type: 'error', message: '잘못된 확장자 입니다.' })
    },
    showMenuTest () {
      const menu = new Menu()
      menu.append(new MenuItem({ label: 'MenuItem1', click () { console.log('item 1 clicked') } }))
      menu.append(new MenuItem({ type: 'separator' }))
      menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

      menu.popup(remote.getCurrentWindow())
    },
    actionIpcSyncTest () {
      ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // "pong"이 출력됩니다.
      })
      ipcRenderer.send('asynchronous-message', 'ping')
    },
    showNotificationTest () {
      const options = {
        title: '제목임다요',
        body: 'No Body No Body 버츄',
        silent: true, // default flase , true : sound off
        timeoutType: 'never'
      }
      const notification = new Notification(options)
      notification.show()
    },
    yotubeDownload () {
      ipcRenderer.on('youtubeDownloadSuccess', (event, arg) => {
        console.log(arg) // "pong"이 출력됩니다.
      })
      ipcRenderer.send('youtubeDownload', this.youtubeLink)
    }
  }
}
</script>
<style scoped>
    div{
        margin-bottom:15px
    }
</style>
