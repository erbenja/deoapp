<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Nový ročník</h1>

        <v-container>
            <v-card class="pa-4">
                <v-col cols="4">
                    <v-text-field type='number' v-model="year.year" label="rok ročníku"></v-text-field>
                </v-col>
                <v-text-field type='text' v-model="year.name" label="název"></v-text-field>
                <v-textarea v-model="year.description" label="description"></v-textarea>

                <v-checkbox v-model="year.openToPublic" label="otevřeno pro registraci"></v-checkbox>
                <v-menu>
                    <template v-slot:activator="{ on }">
                        <v-col cols="3">
                            <v-text-field :value="year.registrationDeadline" v-on="on" label="registrační deadline"
                                          prepend-icon="mdi-calendar-range"></v-text-field>
                        </v-col>
                    </template>
                    <v-date-picker v-model="year.registrationDeadline"></v-date-picker>
                </v-menu>

                <v-btn color='success' class="d-flex justify-self-center" x-large v-on:click="createPost">Vytvořit</v-btn>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";

    export default {
        name: 'YearCreate',
        components: {AdminHeader},
        data() {
            return {
                year: {
                    year: 2000,
                    openToPublic: false,
                    description: '',
                    name: '',
                    registrationDeadline: undefined,
                },
            }
        },
        methods: {
            createPost: function () {
                const payload = {...this.year};
                payload.year = Number.parseInt(payload.year);
                HTTP.post("/olympiadyears", payload)
                    .then(res => {
                        this.$router.push({name: 'YearEdit', params: {id: res.data.id}})
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
