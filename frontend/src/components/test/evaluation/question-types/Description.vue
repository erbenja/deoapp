<template>
    <v-card>
        <v-card-title>
            <v-row class="justify-space-around">
                <h2>Odpověď</h2>
                <h4>typ: {{$typeToCzech['description']}}</h4>
            </v-row>
        </v-card-title>
        <v-row>
            <v-card-text class="mx-4" label="Answer">
                {{answer.answer.text}}
            </v-card-text>
        </v-row>
    </v-card>
</template>

<script>

    export default {
        name: 'Description',
        props: {answer: {required: true}},
        data() {
            return {}
        },
        created: function () {
        },
        methods: {}

    }

</script>

<style>
</style>
