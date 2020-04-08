<template>
  <v-card >
    <v-toolbar dense >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>^^</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card
        height="500"
        class="overflow-hidden"
    >
        <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :left="left"
            dark
        >
            <v-list>
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
                </v-list-item>
                <v-list-group
                    value="true"
                >
                    <template v-slot:activator>
                        <v-list-item-title>Users</v-list-item-title>
                    </template>
                    <v-list-group
                        no-action
                        sub-group
                        value="true"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Admin</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(admin, i) in admins"
                            :key="i"
                            link
                        >
                            <v-list-item-title v-text="admin[0]"></v-list-item-title>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>

                    <v-list-group
                        sub-group
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Actions</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(crud, i) in cruds"
                            :key="i"
                        >
                            <v-list-item-title :to="crud[1]" v-text="crud[0]"></v-list-item-title>
                            <v-list-item-action>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-group>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </v-card>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      admins: [
        ['ElectronApi', '/ElectronApi'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ],
      color: 'red',
      left: true
    }
  }
}
</script>
