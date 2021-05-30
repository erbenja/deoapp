<template>
    <div>
        <AdminHeader/>
        <v-container>
            <v-card-title>
                <h1>Náhled opravéného testu {{this.$route.params.id}}</h1>
                <v-spacer></v-spacer>
                <h2>
                    Body celkem {{receivedPoints}} / {{totalPoints}}
                </h2>
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
                        v-for="(a, i) in answers"
                        :key="i"
                        :href="`#tab-${i}`"
                >
                    Q-{{ i + 1 }}
                    <v-icon v-if="icons">mdi-phone</v-icon>
                </v-tab>

                <v-tab-item :key="a.id" :value="`tab-${i}`" v-for="(a, i) in answers">
                    <Answer :answer="a" :evaluation="false"></Answer>
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
        name: 'TestResultView',
        components: {AdminHeader, Answer},
        props: [],
        created() {
            this.getAnswersFromServer()
        },
        computed: {
            length() {
                return this.answers.length;
            },
            totalPoints() {
                const points = this.answers.map(a => a.question.points);
                // console.log('total points');
                // console.log(points);
                return points.length ? points.reduce((a, c) => a += c) : 0;
            },
            receivedPoints() {
                const points = this.answers.map(a => a.evaluation.points);
                // console.log('received points');
                // console.log(points);
                return points.length ? points.reduce((a, c) => a += c) : 0;
            }
        },
        data() {
            return {
                tab: null,
                answers: [],
                errors: [],

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
            getAnswersFromServer: function () {
                HTTP.get(`accesscodes/${this.$route.params.id}/answers`)
                    .then(res => {
                        if (res.status == 204) {
                            this.$store.dispatch('popMessage', {
                                text: 'Chyba na serveru. Zkuste znovu nebo později',
                                color: 'error'
                            });
                            this.$router.push({name: 'EvaluatorEvaluations'})
                        }
                        this.answers = res.data;
                        this.answers.sort((a, b) => a.question.orderNum > b.question.orderNum);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
        }
    }
</script>
