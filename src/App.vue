<template>
  <v-app>
      <Diary />
  </v-app>
</template>

<script>
import Diary from './views/Diary'

export default {
  name: 'App',

  components: {
    Diary
  },

  data: () => ({
    //
  })
}
</script>
