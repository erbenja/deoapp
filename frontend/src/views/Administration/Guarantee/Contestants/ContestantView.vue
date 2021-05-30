<template>
    <div>
        <AdminHeader/>
        <v-container>
            <v-card class="px-16 py-4 mx-auto" max-width=700>
                <v-card-title>Náhled soutěžící #{{this.$route.params.id}}</v-card-title>

                <v-text-field type="text" label="křestní jméno" v-model="data.firstname" readonly/>
                <v-text-field type="text" label="příjmení" v-model="data.surname" readonly/>
                <v-text-field type="text" label="email" v-model="data.email" readonly/>
                <v-text-field type="text" label="datum narození" v-model="data.birthdate" readonly/>
                <v-text-field type="text" label="škola" v-model="data.school.name" readonly/>


                <!--                TODO codes grouped by year and ordered by rounds-->
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
                            v-for="(v, i) in this.data.accessCodes"
                            :key="i"
                            :href="`#tab-${i}`"
                    >
                        Q-{{ i + 1 }}
                        <v-icon v-if="icons">mdi-phone</v-icon>
                    </v-tab>

                    <v-tab-item :key="a.id" :value="`tab-${i}`"
                                v-for="(a, i) in this.data.accessCodes">
                        <v-card class="px-4">
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field type="text" label="ročník" v-model="a.round.year.year" readonly/>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field type="text" label="druh kola" v-model="a.round.type.name" readonly/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field type="text" label="datum aktivace" v-model="a.activated" readonly/>
                                </v-col>
                                <v-btn v-show="a.activated === null" color="success" @click="activateCode(a.id)" class="align-self-center mb-1">
                                    aktivovat
                                    <v-icon>
                                        mdi-power
                                    </v-icon>
                                </v-btn>
                            </v-row>

                            <v-row>
                                <v-col cols="8">
                                    <v-text-field type="text" label="datum hodnocení" v-model="a.evaluated" readonly/>
                                </v-col>
                                <v-btn v-show="a.evaluated !== null" color="info" @click="goTo('TestResultView', a.id)" class="align-self-center mb-1">
                                    náhled opraveného testu
                                    <v-icon>
                                        mdi-card-search
                                    </v-icon>
                                </v-btn>

                            </v-row>

                            <v-text-field type="text" label="kód" v-model="a.code" readonly/>
                        </v-card>
                    </v-tab-item>
                </v-tabs>

            </v-card>
        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";

    export default {
        name: 'ContestantView',
        components: {AdminHeader},
        props: ['propPost'],
        mounted() {
            // console.log("Props.post: " + this.$props.propPost);
            if (this.$props.propPost === undefined) {
                // console.log("Props EMPTY - getting data from server...")
                HTTP.get('contestants/' + this.$route.params.id)
                    .then(res => {
                        if (res.status == 204) {
                            this.$router.push({name: 'GuaranteeContestants'});
                        }
                        this.data = res.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            } else {
                this.data = this.$props.propPost
            }
        },
        data() {
            return {
                data: {school: {name: ''}},
                message: '',
                showMessage: false,

                tab: null,
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
            getData: async function () {
                const res = await HTTP.get('contestants/' + this.$route.params.id);
                this.data = res.data;
            },
            activateCode: async function (id) {
                const res = await HTTP.post(`/accesscodes/${id}/activate`);
                if (res.status < 400) {
                    await this.$store.dispatch('popMessage', {text: "Kód aktivován", color: 'success'});
                    this.getData();
                } else {
                    await this.$store.dispatch('popMessage', {
                        text: "Kód se nepodařilo aktivovat. Zkuste znovu nebo později",
                        color: 'error'
                    });
                }
            },
            goTo: async function (name, id) {
                await this.$router.push({name, params: {id}});
            }
        }
    }
</script>

<style>
</style>
