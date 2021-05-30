<template>
    <v-card class="description d-flex justify-center mt-4">
            <v-textarea placeholder="Type your answer here..." v-model="answers" @change="sendAnswer" rows="4" class="mx-4"></v-textarea>
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'Description',
        props: {
            official: {
                type: Boolean,
                required: true,
            },
            qId: {
                type: Number
            },
            // options: {}
        },
        data() {
            return {
                // options: this.$attrs.options,
                answers: '',
                id: null,
            }
        },
        created: function () {
            // this.call();
            // console.log(this.options);
            HTTP.get('/posts');
        },
        methods: {
            call: function () {
                // console.log(`Console on this component YesNo is working`);
            },
            formatAnswers: function () {
                return this.answers;
            },
            sendAnswer: async function () {
                if (this.official) {
                    const payload = {answer: {text: this.formatAnswers()}};
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
