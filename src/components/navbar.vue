<template>
    <nav>  
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="teal"></v-app-bar-nav-icon>            
            <v-toolbar-title class="text-uppercase teal--text">
                <span class="font-weight-light">Lobo</span>
                <span class="font-weight-bold">App</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img src="../assets/Lobo.png" alt="Lobo" id="loboImage">
            <v-btn text color="teal">
                <span>Sign Out</span>
                <v-icon>mdi-logout</v-icon>            
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer temporary app v-model="drawer" class="teal">
            <v-list color="teal">
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>  
</template>

<script>
export default {
    data(){
        return {
            drawer: false,
            links: [ 
                {icon: 'mdi-view-dashboard', text: 'Main Site', route: '/'} ,
                {icon: 'mdi-eye-outline', text: 'Querys', route: '/Querys'} ,
                {icon: 'mdi-format-list-bulleted', text: 'To-do List', route: '/TodoList'} ,
                {icon: 'mdi-bug-check-outline', text: 'Smoke Generator', route: '/SmokeGenerator'} ,
                {icon: 'mdi-note-outline', text: 'Retros', route: '/Retros'},
                {icon: 'mdi-alpha-f-box-outline', text: 'TaskForce', route: '/TaskForce'},
            ]
        }
    }
    
}
</script>

<style scoped>
#loboImage{
    margin-left: 5px;
    width: 35px;
    height: 30px;
    text-align: center;
}
</style>