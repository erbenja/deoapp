<template>
    <div>
<!--        <PublicHeader/>-->
        <v-container>
            <v-card class="px-4 justify-center d-flex">
                <v-col cols="7">
                    <v-card-title>Gratulujeme</v-card-title>
                    <v-card-text>
                        Právě jste dokončili školní kolo dějepisné olympiády kategorie A. Do 10 dnů po
                        skončení termínu stanoveného pro dané kolo v propozicích bude správné řešení zveřejněno na
                        webových stránkách soutěže spolu s výsledkovou listinou. Úspěšní řešitelé postupují do okresního
                        kola
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
            goTo: function (name){
                this.$router.push({name});
            }
        }
    }
</script>
