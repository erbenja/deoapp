<template>
    <div>
        <AdminHeader/>
        <v-container class="d-flex justify-center">
            <v-col cols="8">
                <v-card class="px-4">
                    <v-card-title>Úprava članku</v-card-title>

                    <v-text-field type="text" label="nadpis" required v-model="post.title"></v-text-field>
                    <v-textarea v-model="post.content" label="obsah" placeholder="vyplňte obsah článku..."></v-textarea>

                    <v-card-actions class="justify-center">
                        <v-btn color="success" v-on:click="updatePost">
                            <v-icon>
                                mdi-trash
                            </v-icon>
                            Uložit
                        </v-btn>
                        <v-btn color="error" v-on:click="deletePost">
                            <v-icon>
                                mdi-trash
                            </v-icon>
                            Smazat
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
        name: 'PostEdit',
        components: {AdminHeader},
        props: ['propPost'],
        mounted() {
            // console.log("Props.post: " + this.$props.propPost);
            if (this.$props.propPost === undefined) {
                // console.log("Props EMPTY - getting data from server...")
                HTTP.get('posts/' + this.$route.params.id)
                    .then(res => {
                        if (res.status == 204) {
                            this.$router.push({name: 'AdminPosts'})
                        }
                        this.post = res.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            } else {
                this.post = this.$props.propPost
            }
        },
        data() {
            return {
                post: {},
                message: '',
                showMessage: false,
            }
        },
        methods: {
            updatePost: async function () {
                const res = await HTTP.put("/posts/" + this.$route.params.id, {...this.post});
                if (res.status < 400) {
                    await this.$store.dispatch('popMessage', {text: "Úpravy uloženy", color: 'green'});
                }
            },
            deletePost: async function () {
                const res = await HTTP.delete("/posts/" + this.$route.params.id)
                if (res.status < 400) {
                    await this.$store.dispatch('popMessage', {text: "Článek smazán", color: 'red'});
                    await this.$router.push({name: 'AdminPosts'})
                }
// })
//                     .catch(e => alert("SOMETHING WENT WRONG" + e));
            },
        }
    }
</script>

<style>
</style>
