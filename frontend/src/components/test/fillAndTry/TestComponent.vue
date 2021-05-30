<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="4">
                <div v-if="test !== undefined">
                    <h3>Ročník: {{test.round ? test.round.year.year : "----"}}</h3>
                    <h3>Kola: {{test.round ? test.round.type.name : "----"}}</h3>
                    <h2>Kategorie: {{test.category ? test.category.name : "ukázkový test"}}</h2>
                </div>
            </v-col>
            <v-col cols="8">
                <div class="d-flex flex-column mr-4">
                    <h1 class="text-end">{{convertedTime}}</h1>
                    <v-btn v-if="this.runType === 'try'" class="align-self-end" color="info" width="150" @click="goBack">
                        Zpět k editaci
                        <v-icon small>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn v-else class="align-self-end" color="error" width="150" @click="endTest">
                        Ukončit test
                        <v-icon small>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <!--        <v-btn color="info" @click="showResults">RESULTS</v-btn>-->

        <v-spacer></v-spacer>

        <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
        ></v-pagination>

        <Question :question="q" :official="RunType[runType]" v-show="selectedPage === q.id" ref="questions" :key="q.id"
                  v-for="(q) in questions"/>

        <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
        ></v-pagination>

    </v-container>
</template>

<script>
    import {HTTP} from "@/http-common";
    import Question from "./Question";

    export default {
        name: 'TestComponent',
        components: {Question},
        props: {runType: {required: true, type: String}, id: {required: true, type: Number}},
        data() {
            return {
                currentPage: -1,
                questionModules: [],
                answersMap: new Map(),
                timeLeft: 7200,
                test: undefined,
                questions: [],
                visMap: new Map(),
                page: 0,

                RunType: {
                    try: false,
                    example: false,
                    official: true,
                }
            }
        },
        computed: {
            selectedPage() {
                return this.questions[this.page > 0 ? this.page - 1 : 0].id;
            },
            length() {
                return this.questions.length;
            },
            convertedTime() {
                const time = this.timeLeft;
                const h = Math.floor(time % (3600 * 24) / 3600);
                const m = Math.floor(time % 3600 / 60);
                const s = Math.floor(time % 60);
                return `${h}:${m}:${s}`;
            },
        },
        created: async function () {
            // console.log(this.runType);

            window.addEventListener('beforeunload', (event) => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = 'You are about to close this page';
            });

            let res;
            if (this.runType === 'example') {
                res = await HTTP.get(`tests/example`);
            } else if ((this.runType === 'official')) {
                res = await HTTP.get(`accesscodes/gettest`);
            } else {
              res = await HTTP.get(`tests/${this.id}`);
            }
			
            const timeLimit = res.data.timeLimit;
            this.timeLeft = timeLimit;

            //START TIMER
            this.countDownTimer();

            this.test = res.data;
            this.questions = res.data.questions;
            this.questions.sort((a, b) => a.orderNum - b.orderNum);

            // this.questions = this.questions.sort((a, b) => a.orderNum - b.orderNum);
            this.currentPage = this.questions[0].id;
            // this.questions.forEach(q => {
            //     this.visMap.set(q.id, false);
            // });
        },
        mounted: function () {
        },
        methods: {
            call: function () {
                // console.log(`Console on this component Example Test is working`);
            },
            showResults: function () {
                let msg = "";
                // console.log('-------------');
                this.$refs.questions
                // $children
                    .forEach(child => {
                        const answer = child.setAnswer();
                        this.answersMap.set(answer.qId, answer.answers)
                    });
                // this.answersMap.forEach((v, k) => console.log(`question: ${k} | answer: ${v}`));
                this.answersMap.forEach((v, k) => msg += `question: ${k} | answer: ${v} \n`);
                // console.log('-------------');
            },
            endTest: async function () {
                if (confirm('Are you sure you want to end this test?')) {
                    await this.$store.dispatch('logout');
                    const name = this.RunType[this.runType] ? 'TestEnd' : 'ExampleTestEnd';
                    await this.$router.push({name})
                }
            },
            autoEndTest: async function () {
                await this.$store.dispatch('popMessage', {text: 'Došel vám čas. Test byl automaticky ukončen', color: 'info'});
                const name = this.RunType[this.runType] ? 'TestEnd' : 'ExampleTestEnd';
                await this.$router.push({name})
            },
            goBack: async function () {
                const id = Number.parseInt(this.$route.params.id);
                await this.$router.push({name: 'TestEdit', params: {id: id}});
            },
            countDownTimer() {
                if (this.timeLeft > 0) {
                    // console.log(Date.now() - this.temp)
                    // this.temp = Date.now();

                    setTimeout(() => {
                        this.timeLeft -= 1
                        this.countDownTimer()
                    }, 1000)
                } else {
                    if (this.runType !== 'try') {
                        this.autoEndTest();
                    }
                }
            }
        },
    }

</script>

<style>
</style>
