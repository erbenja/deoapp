<template>
    <div>
        <PublicHeader/>

        <v-container class="home">
            <v-card-title>Domovská stránka</v-card-title>
            <Posts/>
        </v-container>
    </div>
</template>

<script>
    import Posts from "../../components/Posts";
    import PublicHeader from "../../components/layout/PublicHeader";

    export default {
        name: 'Home',
        components: {
            Posts,
            PublicHeader,
        },
        data() {
            return {
            }
        },
        methods: {        }
    }
</script>
