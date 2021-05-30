<template>
    <div>
        <!--        <PublicHeader/>-->
        <v-container>
            <v-card class="px-4 justify-center d-flex">
                <v-col cols="7">
                    <v-card-title>Gratulujeme</v-card-title>
                    <v-card-text>
                        Právě jste dokončili ukázkový test dějepisné olympiády.
                    </v-card-text>
                </v-col>
            </v-card>
            <v-row class="justify-center">
                <v-btn x-large color="success" class="mt-4" @click="goTo('Home')">
                    <v-icon>mdi-close</v-icon>
                    Pokračovat na domů
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    export default {
        name: 'ExampleTestEnd',
        components: {},
        created() {
        },
        data() {
            return {}
        },
        methods: {
            goTo: function (name) {
                this.$router.push({name});
            }
        }
    }
</script>
