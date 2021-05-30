<template>
    <div>
        <PublicHeader/>
        <v-container>
            <v-row class="justify-end">
                <v-btn color="error" class="mb-4 mr-4" @click="exitLobby">
                    <v-icon color="white">mdi-close</v-icon>
                    Zpět
                </v-btn>
            </v-row>
            <v-card class="px-4 justify-center d-flex">
                <v-col cols="7">
                    <v-card-title>Test lobby</v-card-title>
                    <v-card-text>
                        Je před vámi školní kolo nového ročníku dějepisné olympiády kategorie
                        {{this.$store.getters.code.category}}. Na
                        vypracování testu máte 90 minut. Čas se začne odpočítávat v momentě, kdy kliknete na tlačítko
                        <b>ZAČÍT TEST</b> v zeleném políčku. V průběhu testu není povoleno používat dějepisné atlasy,
                        literaturu ani
                        učebnice. Mobilní telefony prosím vypněte a uschovejte do svého batohu nebo tašky. Přejeme vám
                        mnoho zdaru při řešení školního kola dějepisné olympiády kategorie
                        {{this.$store.getters.code.category}}.
                    </v-card-text>
                    <v-card-text>
                        Zkontrolujte zda je níže uvedené údaje souhlasí:
                        <v-card-text class="text-h5">
                            {{this.$store.getters.code.contestant.firstname}}
                            {{this.$store.getters.code.contestant.surname}}
                            [třída: {{this.$store.getters.code.contestant.classNum}}]
                        </v-card-text>
                    </v-card-text>
                </v-col>
            </v-card>
            <v-row class="justify-center mt-4">
                <v-btn x-large color="success" @click="startTest">ZAČÍT TEST</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import PublicHeader from "../../components/layout/PublicHeader";

    export default {
        name: 'TestLobby',
        components: {PublicHeader},
        created() {
            // console.log(HTTP.defaults);
        },
        data() {
            return {}
        },
        methods: {
            startTest: async function () {
                // console.log('START TEST');
                HTTP.put('accesscodes/starttest')
                    .then(
                        () => {
                            if (confirm('Chystáte se začít test')) {
                                this.$router.push({name: 'Test'})
                            }
                        }
                    ).catch(
                    () => this.$store.dispatch('popMessage', {
                        text: 'Nepodařilo se spustit test. Zkuste to znovu načíst stránku.',
                        color: 'error'
                    })
                )
            },
            exitLobby: async function () {
                await this.$store.dispatch('logout');
                await this.$router.push({name: 'Home'});
            }
        }
    }
</script>
