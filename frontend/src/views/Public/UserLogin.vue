<template>
    <div>
        <PublicHeader/>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>Přihlášení ogranizator</v-card-title>
            <v-form @submit.prevent="login" class="d-flex align-center flex-column pa-4">
                <v-text-field id="username" v-model="username" label="uživatelské jméno"></v-text-field>
                <v-text-field type="password" id="password" v-model="password" label="heslo"></v-text-field>
                <v-btn type="submit" color="success">Přihlásit se</v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
    import PublicHeader from "../../components/layout/PublicHeader";

    export default {
        name: 'Login',
        components: {PublicHeader},
        data() {
            return {
                username: "",
                password: "",
                continueTo: '',
            }
        },
        created: function () {
            this.continueTo = this.$route.params.continueTo || {name: 'Administration'};
        },
        methods: {
            login: function () {
                let username = this.username;
                let password = this.password;
                this.$store.dispatch("login", {username, password})
                    .then(() => {
                        // console.log('Logging in');
                        this.$router.push(this.continueTo)
                    })
                    // .catch(err => console.log(err));
            }
        }
    }
</script>
