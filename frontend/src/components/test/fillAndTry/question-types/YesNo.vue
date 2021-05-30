<template>
    <v-card class="yes-no d-flex justify-center">
        <!--        <h1>Options YesNo</h1>-->
        <!--        <v-card>-->
        <div class="mx-auto">
            <v-row v-for="option in options" :key="option.id" class="d-flex justify-end">
                <v-radio-group row hide-details justify="space-end" type="checkbox" name="checkboxes"
                               :value="option.id" v-model="answers[option.id]"
                               :label="option.content" @change="sendAnswer">
                    <v-radio value="yes" label="Ano"></v-radio>
                    <v-radio value="no" label="Ne"></v-radio>
                </v-radio-group>
            </v-row>
        </div>
        <!--        </v-card>-->
    </v-card>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'YesNo',
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
                answers: {},
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
                // this.answers.for(a => a = a === 'yes');
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
