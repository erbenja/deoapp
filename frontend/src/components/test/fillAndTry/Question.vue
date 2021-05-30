<template>
    <v-container>
        <!--            v-bind:class="[isVisible ? 'selected' : 'unselected']">-->
        <v-card>
            <v-card-title>Otázka #{{question.orderNum}} | Type: {{$typeToCzech[question.type.type]}} | [Body: {{question.points}}]
            </v-card-title>
            <!--            <v-row>-->
            <v-card-text><b>Zadání:</b> {{question.task}}</v-card-text>
            <v-col cols="5" class="mx-auto">
                <v-img contain v-if="hasImage" :src="imagePath"></v-img>
            </v-col>
            <!--            </v-row>-->
            <div v-if="compareType(question.type.type,'singleChoice')">
                <SingleChoice :options="question.options" :qId="question.id" :official="official"
                              ref="optionsComp"/>
            </div>
            <div v-else-if="compareType(question.type.type,'ordering')">
                <Ordering :options="question.options" :qId="question.id" :official="official" ref="optionsComp"/>
            </div>
            <div v-else-if="compareType(question.type.type,'multipleChoice')">
                <MultipleChoice :options="question.options" :qId="question.id" :official="official"
                                ref="optionsComp"/>
            </div>
            <div v-else-if="compareType(question.type.type,'yesNo')">
                <YesNo :options="question.options" :qId="question.id" :official="official" ref="optionsComp"/>
            </div>
            <div v-else-if="compareType(question.type.type,'description')">
                <Description :options="question.options" :qId="question.id" :official="official" ref="optionsComp"/>
            </div>
            <div v-else>Tento typ otázky nebyl ještě implementován, Prosím kontaktujte podporu</div>


        </v-card>

    </v-container>
</template>

<script>
    import {HTTP} from "@/http-common";
    import SingleChoice from "./question-types/SingleChoice";
    import Ordering from "./question-types/Ordering";
    import MultipleChoice from "./question-types/MultipleChoice";
    import YesNo from "./question-types/YesNo";
    import Description from "./question-types/Description";

    export default {
        name: 'Question',
        components: {Description, SingleChoice, Ordering, MultipleChoice, YesNo},
        props: {
            official: {
                type: Boolean,
                required: true,
            }
        },
        // {
        // initQuestion: {
        //     id: Number,
        //     task: String,
        //     points: Number,
        //     orderNum: Number,
        //     type: {id: Number, type: String},
        //     options: [
        //         {id: Number}
        //     ]
        // }
        // },
        data() {
            return {
                question: this.$attrs.question,
                answer: {
                    qId: this.$attrs.question.id,
                    answers: {}
                },
            }
        },
        created: function () {
            // this.call();
            // console.log(this.question.styles);
        },
        computed: {
            hasImage() {
                return this.question.img !== null
            },
            imagePath() {
                const baseUrl = HTTP.defaults.baseURL + 'files/';
                return baseUrl + this.question.img;
            }
        },
        methods: {
            call: function () {
                // console.log(`Console on this component Question is working`);
            },
            compareType: function (n1, n2) {
                return n1 == n2;
            },
            setAnswer: function () {
                // const answerComp = this.$children[0];
                const answerComp = this.$refs.optionsComp;

                // console.log(this.$refs.optionsComp);

                const formatedAnswers = answerComp.formatAnswers();
                this.answer.answers = formatedAnswers;

                // console.log("returning");
                // console.log(this.answer)
                return this.answer;
            }

        }

    }

</script>

<style>
</style>
