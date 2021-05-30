<template>
    <v-card color="rgb(201, 201, 201)">
        <draggable v-model="answers" @end="sendAnswer" class="row wrap justify-space-around">
            <v-card width="30%" class="my-2" v-for="option in answers" :key="option.id" ripple>
                    <v-img width="100%" v-if="option.img !== null" :src="imagePathPrefix + option.img"/>
                    <v-card-title>
                        {{ option.content }}
                    </v-card-title>
            </v-card>
        </draggable>
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    import draggable from 'vuedraggable';

    export default {
        name: 'Ordering',
        components: {draggable},
        props: {
            qId: {
                type: Number
            },
            official: {
                type: Boolean,
                required: true,
            },
            options: {required: true}
        },
        computed: {
            // hasImage() {
            //     return this.question.img !== null
            // },
            imagePathPrefix() {
                const baseUrl = HTTP.defaults.baseURL + 'files/';
                return baseUrl;
            }
        },
        data() {
            return {
                // options: this.$attrs.options,
                answers: this.options,
                id: null,
            }
        },
        created: function () {
            // this.call();
            // console.log(this.options);
        },
        methods: {
            call: function () {
                // console.log(`Console on this component Ordering is working`);
            },
            formatAnswers: function () {
                return this.answers.map(a => a.id);
            },
            sendAnswer: async function () {
                if (this.official) {
                    const payload = {answer: {ids: this.formatAnswers()}};
                    if (this.id === null) {
                        const res = await HTTP.post(`questions/${this.qId}/answeredquestions`, payload);
                        if (res.status < 400) {
                            // console.log(res);
                            this.id = res.data.id;
                        }
                    } else {
                        await HTTP.put(`answeredquestions/${this.id}`, payload)
                    }
                }
            }
        }

    }

</script>

<style>

</style>
