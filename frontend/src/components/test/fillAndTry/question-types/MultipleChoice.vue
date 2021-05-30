<template>
    <v-card class="yes-no d-flex justify-center">
<!--        <div class="mx-auto">-->
            <v-col>
                <v-checkbox hide-details type="checkbox" name="checkboxes" :value="option.id" v-model="answers"
                            :label="option.content" @change="sendAnswer" :key="option.id" v-for="option in options">
                </v-checkbox>
            </v-col>
<!--        </div>-->
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'MultipleChoice',
        props: {
            official: {
                type: Boolean,
                required: true,
            },
            qId: {
                type: Number
            },
            options: {required: true}
        },
        data() {
            return {
                // options: this.$attrs.options,
                answers: [],
                id: null,
            }
        },
        created: function () {
            // this.call();
            // console.log(this.options);
        },
        methods: {
            call: function () {
                // console.log(`Console on this component MultipleChoice is working`);
            },
            formatAnswers: function () {
                return this.answers;
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
