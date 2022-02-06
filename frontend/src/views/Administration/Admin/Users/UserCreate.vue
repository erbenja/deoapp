<template>
    <div>
        <AdminHeader/>
        <v-container class="d-flex justify-center">
            <v-col cols="8">
                <v-card class="px-4">
                    <v-card-title>Nový uživatel</v-card-title>

                    <v-text-field id="firstname" type="text" label="křestní jméno" v-model="user.firstname"/>
                    <v-text-field id="surname" type="text" label="příjmení" v-model="user.surname"/>
                    <v-text-field id="username" type="text" label="uživatelské jméno" v-model="user.username"/>
                    <v-text-field id="password" type="text" label="heslo" v-model="user.password"/>
                    <v-text-field id="email" type="email" label="email" :rules="[this.$rules.required, this.$rules.email]"
                                  v-model="user.email"/>

                    <v-card-actions class="justify-center">
                        <v-btn color="success" v-on:click="createUser">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                            Vytvořit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";

    export default {
        name: 'UserCreate',
        components: {AdminHeader},
        created() {
        },
        data() {
            return {
                user: {},
            }
        },
        methods: {
            createUser: function () {
                HTTP.post("/accounts", {...this.user})
                    .then((res) => {
                        const newId = res.data.id;
                        this.$store.dispatch('popMessage', {
                            text: 'Nový uživatel byl vytvořen',
                            color: 'success'
                        });
                        this.$router.push({name: 'UserEdit', params: {id: newId}})
                    })
                    .catch(() => this.$store.dispatch('popMessage', {
                        text: 'Chyba na serveru. Zkuste znovu nebo později',
                        color: 'error'
                    }));
            },
        }
    }
</script>

<style>
</style>
