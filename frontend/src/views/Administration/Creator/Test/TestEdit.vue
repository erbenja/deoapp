<template>
    <div>
        <AdminHeader/>
        <v-card max-width="1000" class="mx-auto px-1">
            <v-row class="justify-space-between mx-10">
                <v-card-title>
                    <h1>Editace testu</h1>
                </v-card-title>
                <v-btn color="info" @click="goToTry" class="align-self-center">
                    Vyzkoušet test
                    <v-icon>
                        mdi-test-tube
                    </v-icon>
                </v-btn>
            </v-row>

            <v-container>
                <v-row class="justify-space-around">
                    <v-col cols="4">
                        <v-row>
                            <v-text-field type="number" id="title-input" v-model="timeLimit"
                                          label="Časový limit (minuty)"
                                          @change="updateTest('timeLimit', $event)"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-checkbox type="checkbox" id="closed-input" v-model="test.closed"
                                        label="uzavřen" @change="updateTest('closed', $event)"></v-checkbox>

                        </v-row>
                        <v-row>
                            <h2>Celkém bodů: {{totalPoint}}</h2>
                        </v-row>
                    </v-col>

                    <v-spacer></v-spacer>


                    <v-col cols="4">
                        <v-row>
                            <v-select full-width label="typ nové otázky" :items="types"
                                      item-value="id" item-text="type" v-model="newType">
                            </v-select>
                        </v-row>

                        <v-row class="justify-end">
                            <v-btn small color="success" @click="addQuestionToTest">
                                <v-icon color="white">
                                    mdi-plus
                                </v-icon>
                                Přidat otázku
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-tabs
                    v-model="tab"
                    background-color="deep-purple accent-4"
                    class="elevation-2"
                    dark
                    :centered="centered"
                    :grow="grow"
                    :vertical="vertical"
                    :right="right"
                    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
                    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
                    show-arrows
                    :icons-and-text="icons"
            >
                <v-tabs-slider></v-tabs-slider>

                <draggable v-model="questions" class=" row" @end="updateQuestionsOrderNum">
                    <v-tab
                            v-for="(q, i) in questions"
                            :key="q.id"
                            :href="`#tab-${i}`"
                            ripple
                    >
                        Q-{{ i + 1 }}
                        <v-icon v-if="icons">mdi-phone</v-icon>
                    </v-tab>
                </draggable>

                <v-tab-item :key="q.id" :value="`tab-${i}`"
                            v-for="(q, i) in questions">
                    <v-card>
                        <Question :question="q" @delete="deleteQuestion" @questionUpdate="rerenderQuestionData"
                                  :ref="`question${q.id}`"></Question>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";
    import Question from "../../../../components/test/edit/Question";
    import draggable from 'vuedraggable'

    export default {
        name: 'TestEdit',
        components: {AdminHeader, Question, draggable},
        props: ['propTest'],
        created() {
            // console.log("Props.test: " + this.$props.test);
            if (this.$props.test === undefined) {
                // console.log("Props EMPTY - getting data from server...")
                this.getQuestionsFromServer();
            } else {
                this.test = this.$props.test
            }

            this.getQuestionTypes();
        },
        computed: {
            length() {
                return this.questions ? this.questions.length : 0;
            },
            totalPoint() {
                if (this.questions.length > 0) {
                    const points = this.questions.map(a => a.points);
                    return points.reduce((a, e) => a + e);
                } else {
                    return 0;
                }
            }
            // sortedQuestions: function () {
            //     console.log(this.test);
            //     return this.test.questions.map(el => el.orderNum).sort((a,b) => a < b);
            // }
        },
        data() {
            return {
                tab: null,
                test: {},
                questions: [],
                timeLimit: Number.MAX_VALUE,
                types: [],
                errors: [],
                newType: '',


                icons: false,
                centered: false,
                grow: false,
                vertical: false,
                prevIcon: false,
                nextIcon: false,
                right: false,

                questionPosted: false,
            }
        },
        methods: {
            rerenderQuestionData: async function () {
                // console.log('rerendering form ' + id);
                await this.getQuestionsFromServer();
                // this.$refs[`question${id}`][0].$forceUpdate();
            },
            getQuestionsFromServer: function () {
                HTTP.get('tests/' + this.$route.params.id)
                    .then(res => {
                        if (res.status == 204) {
                            this.$store.dispatch('popMessage', {
                                text: 'Chyba na serveru. Zkuste znovu nebo později',
                                color: 'error'
                            })
                            this.$router.push({name: 'CreatorTests'})
                        }
                        this.test = res.data;
                        this.timeLimit = this.test.timeLimit / 60;
                        this.questions = res.data.questions;
                        this.questions.sort((a, b) => a.orderNum > b.orderNum);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getQuestionTypes: function () {
                HTTP.get("questiontypes")
                    .then(res => {
                        this.types = res.data;
                    })
                    // .catch(() => this.$store.dispatch('popMessage', {
                    //     text: 'Chyba na serveru. Zkuste znovu nebo později',
                    //     color: 'error'
                    // }));
            },
            deletePost: function () {
                HTTP.delete("/posts/" + this.$route.params.id)
                    .then(() => {
                        this.$store.dispatch('popMessage', {text: 'Článek byl smazán', color: 'success'})
                        this.$router.push({name: 'AdminPosts'})
                    })
                    .catch(() => this.$store.dispatch('popMessage', {
                    text: 'Chyba na serveru. Zkuste znovu nebo později',
                    color: 'error'
                }));
            },
            postNewQuestion: async function (typeId) {
                //TODO
                let question = {typeId, task: "", points: 5, orderNum: this.questions.length + 1};
                const res = await HTTP.post("tests/" + this.$route.params.id + "/questions", question);
                return res;
            },
            addQuestionToTest: async function () {
                if (this.newType === '') {
                    await this.$store.dispatch('popMessage', {
                        text: 'Pro vytvoření nové otázky musíte vybrat typ',
                        color: 'warning'
                    });
                    return;
                }
                try {
                    if (!this.questionPosted) {
                        this.questionPosted = true;
                        const res = await this.postNewQuestion(this.newType);
                        // console.log('after post');
                        // console.log(res);
                        if (res.status < 400) {
                            await this.getQuestionsFromServer();
                            await this.$store.dispatch('popMessage', {text: 'Přidána nová otázka', color: 'success'});
                        } else {
                            await this.$store.dispatch('popMessage', {
                                text: 'Chyba na serveru. Zkuste znovu nebo později',
                                color: 'error'
                            })
                        }
                        // this.test.questions.push(res.data);
                        this.questionPosted = false;
                    }

                } catch {
                    // console.log(e);
                    await this.$store.dispatch('popMessage', {
                        text: 'Chyba na serveru. Zkuste znovu nebo později',
                        color: 'warn'
                    })
                    this.questionPosted = false;
                }

            },
            updateQuestionsOrderNum: async function () {
                const questionIds = this.questions.map(a => a.id);
                const payload = {questionIds};
                // console.log('request');
                // console.log(questionIds);
                const res = await HTTP.put(`tests/${this.test.id}/questionsorder`, payload);
                if (res.status < 400) {
                    // console.log('response');
                    // console.log(res.data);
                    this.getQuestionsFromServer()
                }
            },
            deleteQuestion: async function (id) {
                try {
                    await HTTP.delete("questions/" + id);

                    // const index = this.test.questions.map(el => el.id).indexOf(id);
                    // const questionsAfter = this.test.questions.slice(index + 1);
                    //
                    // console.log("---------------------------");
                    //
                    // for (let q of questionsAfter) {
                    //     console.log(q);
                    //     await this.updateQuestionOrderNum(q.orderNum - 1, q.id);
                    // }
                    await this.getQuestionsFromServer();
                    // await this.updateQuestionsOrderNum();
                    // await this.getQuestionsFromServer();
                } catch (e) {
                    // console.log("unable to delete new question");
                    // console.log(e);
                }
            },
            updateTest: async function (prop, val) {
                const payload = {};
                if (prop === 'timeLimit') {
                    val *= 60;
                }
                payload[prop] = val;
                await HTTP.put(`tests/${this.test.id}`, payload);
                this.getQuestionsFromServer();
            },
            goToTry: async function () {
                const params = {id: this.test.id}
                await this.$router.push({name: 'TestTry', params});
            }
        }
    }
</script>
