<template>
    <v-container>
        <v-card>
            <v-card-title class="post-title">{{post.title}}</v-card-title>
            <v-card-text class="post-content" v-html="post.content"></v-card-text>
        </v-card>
    </v-container>
</template>


<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'Post',
        // props: {},
        data() {
            return {
                // id: this.$route.params.id,
                post: {},
                error: {},
            }
        },
        created: function () {
            this.get();
            // console.log("SINGLE POST");
        },
        methods: {
            get: function () {
                HTTP.get(`posts/${this.$route.params.id}`)
                    .then(res => this.post = res.data)
                    .catch(e => {
                        this.error = e;
                    })
            },
        }

    }

</script>

<style>
</style>
