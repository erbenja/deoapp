<template>
    <div>
        <!--        <PublicHeader/>-->
        <v-container>
            <v-row class="justify-end">
                <v-btn id="return" color="error" class="mb-4 mr-4" @click="goTo('Home')">
                    <v-icon color="white">mdi-close</v-icon>
                    Zpět
                </v-btn>
            </v-row>
            <v-card class="px-4 justify-center d-flex">
                <v-col cols="7">
                    <v-card-title>
                        <h3>Úkázkový test lobby</h3>
                    </v-card-title>
                    <v-card-text>
                        Je před vámi ukázkový test. Na
                        vypracování testu máte 90 minut. Čas se začne odpočítávat v momentě, kdy kliknete na tlačítko
                        <b>ZAČÍT TEST</b> v zeleném políčku. V průběhu testu není povoleno používat dějepisné atlasy,
                        literaturu ani
                        učebnice. Mobilní telefony prosím vypněte a uschovejte do svého batohu nebo tašky. Přejeme vám
                        mnoho zdaru při řešení ukázkového testu.
                    </v-card-text>
                    <v-card-text>
                        Zkontrolujte zda je níže uvedené údaje souhlasí <b>(pouze příklad)</b>:
                        <v-card-text class="text-h5">
                            Jana
                            Nováková
                            [třída: 9]
                        </v-card-text>
                    </v-card-text>
                </v-col>
            </v-card>
            <v-row class="justify-center mt-4">
                <v-btn id="startTest" x-large color="success" @click="startTest">ZAČÍT TEST</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    export default {
        name: 'ExampleTestLobby',
        components: {},
        created() {
        },
        data() {
            return {}
        },
        methods: {
            startTest: function () {
                if (confirm('You are about to start example test')) {
                    this.goTo('ExampleTest');
                }
            },
            goTo: async function (name) {
                await this.$router.push({name});
            }
        }
    }
</script>
