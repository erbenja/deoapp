<template>
    <v-container>
        <!--        class="mx-lg-auto mx-md-2"-->
        <v-row class="px-3 justify-space-between">
            <v-card-title>Otázka #{{question.orderNum}} [typ: {{$typeToCzech[question.type.type]}}]</v-card-title>
            <div>
                <v-btn class="ma-2" color="error" @click="deleteQuestion" label="Delete question">
                    <v-icon small>
                        mdi-delete
                    </v-icon>
                    Odstranit otázku
                </v-btn>
            </div>
        </v-row>

        <v-col cols="2">
            <v-select label="Maximum bodů" :items="points" v-model="question.points"
                      @change="updateQuestion('points', $event)"></v-select>
        </v-col>

        <v-row>
            <v-col>
                <v-card cols="8">
                    <v-card-title>Zadání</v-card-title>
                    <v-textarea class="mx-4" label="Zadání" name="task"
                                v-model="question.task" @change="updateQuestion('task', $event)"/>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="px-4">
                    <v-card-title>Obrázek pod zadáním</v-card-title>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <v-file-input v-model="image" label="File input"/>
                            </v-row>
                            <v-row class="d-flex justify-end pr-2">
                                <v-btn small @click="sendFile" color="blue">
                                    <v-icon color="white">
                                        mdi-upload
                                    </v-icon>
                                </v-btn>
                                <v-btn small @click="deleteImage" color="red">
                                    <v-icon color="white">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-img contain v-if="hasImage" :src="imagePath"/>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="hasOptions">
            <v-card-title>Možnosti</v-card-title>
        </v-row>

        <div v-if="compareType(question.type.type,'singleChoice')">
            <SingleChoice v-bind:options="question.options"/>
        </div>
        <div v-else-if="compareType(question.type.type,'ordering')">
            <Ordering v-bind:options="question.options" @optionUpdate="updateDataInParent"/>
        </div>
        <div v-else-if="compareType(question.type.type,'multipleChoice')">
            <MultipleChoice v-bind:options="question.options"/>
        </div>
        <div v-else-if="compareType(question.type.type,'yesNo')">
            <YesNo v-bind:options="question.options"/>
        </div>
        <div v-else-if="compareType(question.type.type,'description')">
            <Description/>
        </div>
        <div v-else>Tento typ otázky nebyl ještě implementován, Prosím kontaktujte podporu</div>

        <v-row class="justify-end mr-10" v-if="hasOptions">
            <v-btn v-if="hasOptions" color="success" class="ma-2" v-on:click="addOptionToQuestion">
                <v-icon small>
                    mdi-plus
                </v-icon>
                Přidat možnost
            </v-btn>
        </v-row>
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
        components: {Description, YesNo, SingleChoice, Ordering, MultipleChoice},
        props: {question: {required: true}},
        created() {
            this.points = [...Array(10).keys()].map(a => ({text: a + 1, value: a + 1}));
        },
        data() {
            return {
                path: HTTP.defaults.baseURL + 'files/',
                image: [],
                points: [],
            }
        },
        computed: {
            hasImage() {
                return this.question.img !== null
            },
            imagePath() {
                return this.path + this.question.img;
            },
            hasOptions() {
                const noOptionsQuestions = ['description'];
                return !noOptionsQuestions.includes(this.question.type.type);
            }
        },
        methods: {
            sendFile: async function () {
                let formData = new FormData();
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
                formData.append('image', this.image);
                const res = await HTTP.post('/files/upload', formData, headers);

                if (res.status < 400) {
                    const payload = {img: res.data.filename};
                    const res2 = await HTTP.put("questions/" + this.question.id, payload);
                    if (res2.status < 400) {
                        this.updateDataInParent()
                    }
                }
            },
            deleteImage() {
                this.updateQuestion('img', null);
            },
            updateDataInParent() {
                this.$emit('questionUpdate', this.question.id);
            },
            call: function () {
                // console.log(`Console on this component Question is working`);
            },
            compareType: function (n1, n2) {
                return n1 == n2;
            },
            updateQuestion: async function (name, value) {
                // console.log(name);
                // console.log(value);
                let payload = {};
                payload[name] = value;
                await HTTP.put("questions/" + this.question.id, payload)
                    // .then(res => console.log("UPDATED" + res))
                    // .catch(e => console.error(e));
                this.$emit('questionUpdate', this.question.id);
            },
            getQuestionFromServer: async function () {
                try {
                    const res = await HTTP.get("questions/" + this.question.id);
                    return res.data;
                } catch {
                    // console.error(e);
                }
            },
            deleteQuestion: function () {
                this.$emit('delete', this.question.id);
            },
            postNewOption: async function () {
                const option = {content: '', correct: 0};
                const res = await HTTP.post("questions/" + this.question.id + "/questionoptions", option);
                return res;
            },
            addOptionToQuestion: async function () {
                try {
                    await this.postNewOption();
                    // console.log(newOption.data);
                    this.$emit('questionUpdate', this.question.id);
                    // const q = await this.getQuestionFromServer();
                    // this.question.options = q.options;
                } catch {
                    // console.error(e);
                }
            }

        }

    }

</script>

<style>
</style>
