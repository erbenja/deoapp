<template>
    <div>
        <PublicHeader/>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>Přihlášení kódem soutěžícího</v-card-title>
            <v-form @submit.prevent="enterCode" class="d-flex align-center flex-column pa-4">
                <v-text-field id="code" v-model="code" label="kód"></v-text-field>
                <v-btn class="mb-5" type="submit" color="success">Zadat</v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
    import PublicHeader from "../../components/layout/PublicHeader";

    export default {
        name: 'ContestantLogin',
        components: {PublicHeader},
        data() {
            return {
                code: '',
            }
        },
        methods: {
            enterCode: async function () {
                const code = this.code;
                await this.$store.dispatch("loginWithCode", code)

                if (this.$store.getters.testId) {
                    // .then(() => {
                    //     console.log('Logging in');
                    //     //TODO FORWARD TO OFFICIAL TEST just LOBBY
                    await this.$router.push({name: 'TestLobby'})
                    // })
                    // .catch(err => console.error(err));
                }
            }
        }
    }
</script>
