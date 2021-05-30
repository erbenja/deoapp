<template>
    <div>
        <AdminHeader/>
        <v-container>
            <v-card-title>
                <h1>Hodnocení testu {{this.$route.params.id}}</h1>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="closeEvaluation">
                    <v-icon>
                        mdi-lock
                    </v-icon>
                    Uzavřít hodnocení
                </v-btn>
            </v-card-title>

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

                <v-tab
                        v-for="(a, i) in answersForManual"
                        :key="i"
                        :href="`#tab-${i}`"
                >
                    Q-{{ i + 1 }}
                    <v-icon v-if="icons">mdi-phone</v-icon>
                </v-tab>

                <v-tab-item :key="a.id" :value="`tab-${i}`" v-for="(a, i) in answersForManual">
                    <Answer :answer="a" @updateData="getAnswersFromServer" :evaluation="evaluation"></Answer>
                </v-tab-item>
            </v-tabs>
        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";
    import Answer from "../../../../components/test/evaluation/Answer";

    export default {
        name: 'TestEvaluation',
        components: {AdminHeader, Answer},
        props: [],
        created() {
            this.getAnswersFromServer()
        },
        computed: {
            length() {
                return this.answers.length;
            },
            answersForManual: function () {
                return this.answers.filter(a => !a.question.type.serverEvaluation);// .questions.map(el => el.orderNum).sort((a,b) => a < b);
            }
        },
        data() {
            return {
                tab: null,
                answers: [],
                errors: [],
                evaluation: true,

                icons: false,
                centered: false,
                grow: false,
                vertical: false,
                prevIcon: false,
                nextIcon: false,
                right: false,
            }
        },
        methods: {
            rerenderQuestionData: async function () {
                // console.log('rerendering form ' + id);
                await this.getAnswersFromServer();
                // this.$refs[`question${id}`][0].$forceUpdate();
            },
            getAnswersFromServer: function () {
                HTTP.get(`accesscodes/${this.$route.params.id}/answers`)
                    .then(res => {
                        if (res.status == 204) {
                            this.$router.push({name: 'EvaluatorEvaluations'})
                        }
                        this.answers = res.data;
                        this.answers.sort((a, b) => a.question.orderNum > b.question.orderNum);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            closeEvaluation: async function () {
                if (this.answersForManual.some(a => a.evaluation === undefined)) {
                    await this.$store.dispatch('popMessage', {
                        text: 'Pro uzavření hodnocení musí být obodovány všechny odpovědi',
                        color: 'warning'
                    })
                } else if (confirm('Potvrdte pro uzavření hodnocení')) {
                    const res = await HTTP.post(`/accesscodes/${this.$route.params.id}/closeevaluation`);
                    if (res.status < 400) {
                        await this.$router.push({name: 'EvaluatorEvaluations'});
                    } else {
                        await this.$store.dispatch('popMessage', {
                            text: 'Chyba na serveru. Zkuste znovu nebo později',
                            color: 'error'
                        })
                    }
                }
            }

        }
    }
</script>
