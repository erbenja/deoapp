<template>
    <v-card class="mx-lg-auto mx-md-2">
        <!--        //TODO if not evaluation disable inputs-->
        <v-row class="mx-2">
            <v-card-title>Otázka #{{answer.question.orderNum}} Editace</v-card-title>
            <v-spacer></v-spacer>
            <v-card-title>Body: {{answer.evaluation !== undefined ? answer.evaluation.points : '--'}} /
                {{answer.question.points}}
            </v-card-title>
        </v-row>

        <v-card class="px-2">
            <v-card-title>Zadání</v-card-title>
            <v-row>
                <v-col cols="7">
                    <v-card-text class="mx-4" label="Zadání" name="task">{{answer.question.task}}</v-card-text>
                </v-col>

                <v-col cols=5>
                    <v-img class="justify-self-center" contain max-height="200" v-if="hasImage"
                           :src="imagePath"></v-img>
                </v-col>
            </v-row>
        </v-card>

        <div v-if="compareType(answer.question.type.type,'description')">
            <Description :answer="answer"></Description>
        </div>
        <div v-else-if="compareType(answer.question.type.type,'ordering')">
            <Ordering :answer="answer"></Ordering>
        </div>
        <div v-else-if="compareType(answer.question.type.type,'singleChoice')">
            <SingleChoice :answer="answer"></SingleChoice>
        </div>
        <div v-else-if="compareType(answer.question.type.type,'multipleChoice')">
            <MultipleChoice :answer="answer"></MultipleChoice>
        </div>
        <div v-else-if="compareType(answer.question.type.type,'yesNo')">
            <YesNo :answer="answer"></YesNo>
        </div>
        <div v-else>Tento typ otázky nebyl ještě implementován, Prosím kontaktujte podporu</div>


        <v-card class="px-2">
            <v-card-title>Hodnocení</v-card-title>
            <v-row class="mx-4">
                <v-col cols="7">
                    <v-textarea v-model="note" placeholder="Zde můžete vyplnit poznámku o odpovědi nebo hodnocení..." label="poznámka"
                                @change="postEvaluation('note', note)"></v-textarea>
                </v-col>

                <v-spacer></v-spacer>

                <v-col v-if="evaluation" cols=3 class="align-start mt-2">
                    <v-select :items="maxPoints" v-model="points" label="Udělené body"
                              @change="postEvaluation('points', points)"></v-select>
                </v-col>
            </v-row>
        </v-card>
    </v-card>

</template>

<script>
    import {HTTP} from "@/http-common";
    import Ordering from "./question-types/Ordering";
    import Description from "./question-types/Description";
    import SingleChoice from "./question-types/SingleChoice";
    import MultipleChoice from "./question-types/MultipleChoice";
    import YesNo from "./question-types/YesNo";

    export default {
        name: 'AnswerEvaluation',
        components: {YesNo, MultipleChoice, SingleChoice, Description, Ordering},
        props: {answer: {required: true}, evaluation: {required: true, type: Boolean}},
        created() {
            this.maxPoints = [...Array(this.answer.question.points + 1).keys()].map(a => ({text: a, value: a}));
            this.id = this.answer.evaluation !== undefined ? this.answer.evaluation.id : undefined;

            if (this.answer.evaluation) {
                this.note = this.answer.evaluation || '';
                this.points = this.answer.evaluation.points || 0;
            }
        },
        data() {
            return {
                path: HTTP.defaults.baseURL + 'files/',
                maxPoints: [],
                note: '',
                points: 0,
                id: undefined,
            }
        },
        computed: {
            hasImage() {
                return this.answer.question.img !== null
            },
            imagePath() {
                return this.path + this.answer.question.img;
            }
        },
        methods: {
            compareType: function (n1, n2) {
                return n1 == n2;
            },
            postEvaluation: async function (name, value) {
                // console.log(name);
                // console.log(value);
                let payload = {};
                payload[name] = value;
                if (this.id === undefined) {
                    const res = await HTTP.post(`answeredquestions/${this.answer.id}/evaluatedquestions`, payload);
                    if (res.status < 400) {
                        this.id = res.data.id;
                    } else {
                        await this.$store.dispatch('popMessage', {
                            text: 'Nepodařilo se uložit hodnocení. Prosím zkuste znovu nebo později.',
                            color: 'error'
                        })
                    }
                } else {
                    const res = await HTTP.put(`evaluatedquestions/${this.id}`, payload);
                    if (res.status >= 400) {
                        await this.$store.dispatch('popMessage', {
                            text: 'Nepodařilo se uložit hodnocení. Prosím zkuste znovu nebo později.',
                            color: 'error'
                        })
                    }
                }
                this.$emit('updateData', 12);
            },
        }

    }

</script>

<style>
</style>
