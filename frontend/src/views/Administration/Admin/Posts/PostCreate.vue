<template>
    <div>
        <AdminHeader/>
        <v-container class="d-flex justify-center">
            <v-col cols="8">
                <v-card class="px-4">
                    <v-card-title>Nový článek</v-card-title>

                    <v-text-field id="title" type="text" label="nadpis" required v-model="post.title"></v-text-field>
                    <v-textarea id="content" v-model="post.content" label="obsah" placeholder="vyplňte obsah článku..."></v-textarea>

                    <v-card-actions class="justify-center">
                        <v-btn color="success" v-on:click="createPost">
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
        name: 'PostCreate',
        components: {AdminHeader},
        data() {
            return {
                post: {},
            }
        },
        methods: {
            createPost: function () {
                HTTP.post("/posts", {...this.post})
                    .then(() => {this.$router.push({name: 'AdminPosts'})})
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
