<template>
    <div id="app" style="margin-bottom: 100px">
        <v-app>
            <v-card class="text-center pa-1" id="popup" v-if="this.$store.getters.showMessage"
                    :color="this.$store.getters.message.color">{{this.$store.getters.message.text}}
            </v-card>
            <router-view/>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: 'App',

        components: {},

        data() {
            return {
            }
        },
    };
</script>

<style>
    #popup {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }

</style>
