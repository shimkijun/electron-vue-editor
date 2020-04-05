<template>
  <v-app>
      <ElectronApi />
  </v-app>
</template>

<script>
import ElectronApi from './views/ElectronApi'

export default {
  name: 'App',

  components: {
    ElectronApi
  }
}
</script>
