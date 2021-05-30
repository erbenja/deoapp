<template>
    <div>
        <PublicHeader/>
        <v-container class="post">
            <v-card-title>-----</v-card-title>
            <PostComponent/>
        </v-container>
    </div>
</template>

<script>

    import PostComponent from "../../components/Post";
    import PublicHeader from "../../components/layout/PublicHeader";

    export default {
        name: 'Post',
        components: {
            PostComponent,
            PublicHeader,
        }
    }
</script>
