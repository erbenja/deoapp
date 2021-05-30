<template>
    <v-card class="yes-no d-flex justify-center">
<!--        <v-col cols="6" class="mx-auto">-->
            <v-radio-group v-model="answer" @change="sendAnswer">
                <v-radio v-for="option in options" :key="option.id" type="radio" name="options"
                         :value="option.id" :label="option.content">
                </v-radio>
            </v-radio-group>
<!--        </v-col>-->
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'SingleChoice',
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
        data() {
            return {
                // options: this.$attrs.options,
                answer: '',
                id: null,
            }
        },
        created: function () {
            // this.call();
            // console.log(this.options);
        },
        methods: {
            call: function () {
                // console.log(`Console on this component YesNo is working`);
            },
            formatAnswers: function () {
                // console.log(this.answer);
                return this.answer;
            },
            sendAnswer: async function () {
                if (this.official) {
                    const payload = {answer: {id: this.formatAnswers()}};
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
