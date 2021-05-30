<template>
    <v-container>
        <v-card class="mb-3" v-bind:key="post.id" v-for="post of activePosts">
            <v-card-title class="post-title">{{post.title}}</v-card-title>
            <v-card-text class="post-content">{{post.content}}</v-card-text>
            <!--                <div @click="goToPost(post.id)">more</div>-->
            <v-card-actions>
                <v-btn text color="blue" @click="goToPost(post.id)">
                    více
                </v-btn>
            </v-card-actions>
            <!--            <router-link :to="{ name: 'Post', params: { id: post.id }}">more</router-link>-->
        </v-card>
        <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
        ></v-pagination>
    </v-container>

</template>


<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'Posts',
        computed: {
            activePosts: function () {
                const b =  this.page * this.itemsPerPage;
                const a = b - this.itemsPerPage;
                return this.posts.slice(a, b);
            },
            length: function () {
                return Math.ceil(this.posts.length / this.itemsPerPage);
            }
        },
        data() {
            return {
                page: 1,
                itemsPerPage: 6,
                posts: [],
                errors: []
            }
        },
        created: function () {
            this.get();
        },
        methods: {
            get: function () {
                HTTP.get('posts')
                    .then(res => this.posts = res.data)
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            goToPost: async function (id) {
                await this.$router.push({name: 'Post', params: {id: id}})
            }
        }

    }

</script>

<style>
</style>
