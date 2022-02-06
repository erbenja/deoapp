<template>
    <div>
        <!--        <v-app-bar app v-if="sidebar">-->
        <!--            <v-list>-->
        <!--                <v-list-item-->
        <!--                        v-for="item in activeMenuItems"-->
        <!--                        :key="item.title"-->
        <!--                        :to="item.path">-->
        <!--                    <v-list-item-action>-->
        <!--                        <v-icon>{{ item.icon }}</v-icon>-->
        <!--                    </v-list-item-action>-->
        <!--                    <v-list-item-content>{{ item.title }}</v-list-item-content>-->
        <!--                </v-list-item>-->
        <!--            </v-list>-->
        <!--        </v-app-bar>-->

        <v-toolbar>
            <!--            <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>-->
            <!--            <v-tooltip @click="sidebar = !sidebar">-->
            <!--            </v-tooltip>-->

            <v-toolbar-title>
                <v-card-title @click="goTo('Home')" tag="span" style="cursor: pointer">
                    {{ appTitle }}
                </v-card-title>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn
                        text
                        v-for="item in activeMenuItems"
                        :key="item.title"
                        @click="item.action()">
                    <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>

                <v-btn
                        v-if="this.$store.getters.isLoggedIn"
                        text
                        @click="adminItem.action()">
                    <v-icon left dark>{{adminItem.icon}}</v-icon>
                    {{adminItem.title}}
                </v-btn>
                <v-btn
                        id="login"
                        v-if="!this.$store.getters.isLoggedIn"
                        text
                        @click="loginItem.action()">
                    <v-icon left dark>{{loginItem.icon}}</v-icon>
                    {{loginItem.title}}
                </v-btn>
                <v-btn
                        id="logout"
                        v-if="this.$store.getters.isLoggedIn"
                        text
                        @click="logoutItem.action()">
                    <v-icon left dark>{{logoutItem.icon}}</v-icon>
                    {{logoutItem.title}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

<!--        <v-row>-->
<!--            <v-container>-->
<!--                <v-card>-->
<!--                    <v-card-text class="ma-auto pa-1">Is user: {{this.$store.getters.isUser}}</v-card-text>-->
<!--                    <v-card-text class="ma-auto pa-1">Is contestant: {{this.$store.getters.isContestant}}</v-card-text>-->
<!--                    <v-card-text class="ma-auto pa-1">Token: {{this.$store.getters.token}}</v-card-text>-->
<!--                </v-card>-->
<!--            </v-container>-->
<!--        </v-row>-->
    </div>

</template>

<script>
    export default {
        name: "PublicHeader",
        data() {
            return {
                appTitle: 'DeoApp',
                sidebar: false,
                hack: 0,
                menuItems: [
                    {
                        title: 'Domů', action: () => {
                            this.goTo('Home')
                        }, icon: 'mdi-home'
                    },
                    {
                        title: 'O nás', action: () => {
                            this.goTo('About')
                        }, icon: 'mdi-face'
                    },
                    {
                        title: 'Ukázkový test', action: () => {
                            this.goTo('ExampleTestLobby')
                        }, icon: 'mdi-clipboard-text-play'
                    },
                    {
                        title: 'Zadat kód', action: () => {
                            this.goTo('AccessCode')
                        }, icon: 'mdi-barcode'
                    },
                ],
                loginItem: {
                    title: 'Přihlásit se', action: () => {
                        this.goTo('Login')
                    }, icon: 'mdi-login', condition: !this.$store.getters.isLoggedIn
                },
                adminItem: {
                    title: 'Administrace', action: async () => {
                        this.goTo('Administration');
                    }, icon: 'mdi-home-edit', condition: this.$store.getters.isLoggedIn
                },
                logoutItem: {
                    title: 'Odhlásit se', action: async () => {
                        this.logout();
                    }, icon: 'mdi-logout', condition: this.$store.getters.isLoggedIn
                }
            }
        },
        computed: {
            activeMenuItems: function () {
                this.hack;
                return this.menuItems.filter(a => {
                    if (a.condition !== undefined) {
                        return a.condition;
                    }
                    return true;
                });
            }
        },
        methods: {
            goTo: async function (name) {
                if (this.$route.name !== name) {
                    await this.$router.push({name});
                }
            }
            ,
            logout: async function () {
                await this.$store
                    .dispatch("logout");
                // console.log('Logging out');
                await this.goTo('Home');
            }
        }
    }
</script>

<style>
</style>
