<template>
    <v-card>
        <v-card-title>
            <v-row class="justify-space-around">
                <h2>Odpověď</h2>
                <h4>typ: {{$typeToCzech['ordering']}}</h4>
            </v-row>
        </v-card-title>
        <v-col>
            <v-card-title>Správné pořadí</v-card-title>
            <v-row class="flex-row">
                <v-col :key="item.id" v-for="item in optionsCorrectOrder" cols="2">
                    <v-card>
                        <v-img contain v-if="item.img !== null" :src="imagePathPrefix + item.img"/>
                        <v-card-text>{{item.content}}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-card-title>Zodpovězení pořadí</v-card-title>
            <v-row class="flex-row">
                <v-col :key="item.id" v-for="item in optionsAnswerOrder" cols="2">
                    <v-card>
                        <v-img contain v-if="item.img !== null" :src="imagePathPrefix + item.img"/>
                        <v-card-text>{{item.content}}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'Ordering',
        props: {answer: {required: true}},
        computed: {
            imagePathPrefix() {
                const baseUrl = HTTP.defaults.baseURL + 'files/';
                return baseUrl;
            },
            optionsCorrectOrder() {
                const options = this.answer.question.options;
                options.sort((a, b) => a.correct > b.correct);
                return options;
            },
            optionsAnswerOrder() {
                const options = this.answer.question.options;
                const result = [];
                this.answer.answer.ids.forEach(a => result.push(options.find(b => b.id === a)));
                return result;
            },
        },
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
