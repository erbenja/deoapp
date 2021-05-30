<template>
    <div>
        <AdminHeader/>
        <v-card class="px-16 py-4 mx-auto" max-width=800>
            <v-card-title>Úprava ročníku [{{this.year.year}}]</v-card-title>

            <v-row>
                <v-col>
                    <v-text-field v-model="year.name" label="název" @change="updateYear"></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-checkbox v-model="year.openToPublic" label="otevřeno pro registraci" @change="updateYear"></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-textarea v-model="year.description" label="popis" @change="updateYear"></v-textarea>
            </v-row>

            <v-card>
                <v-container>
                    <v-card-title>ROUNDS</v-card-title>
                    <v-card :key="round.id" v-for="round in this.year.rounds">
                        <RoundEditSmall :propRound="round" :allTypes="allTypes"/>
                        <v-btn color="error" v-on:click="removeRound(round.id)" class="ma-2">
                            Odstranit kolo
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card>
                </v-container>

                <v-card class="my-3">
                    <v-card-title>Nové kolo</v-card-title>

                    <v-select id="round-type-select" ref="roundTypeSelect" label="typ kola" return-object
                              :items="allTypes"
                              item-value="id" item-text="name" v-model="type">
                    </v-select>

                    <v-row>
                        <v-col cols="6">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-col cols="10">
                                        <v-text-field :value="roundStart" v-on="on" label="začátek nového kola"
                                                      prepend-icon="mdi-calendar-range"></v-text-field>
                                    </v-col>
                                </template>
                                <v-date-picker v-model="roundStart"></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-col cols="10">
                                        <v-text-field :value="roundEnd" v-on="on" label="konec nového kola"
                                                      prepend-icon="mdi-calendar-range"></v-text-field>
                                    </v-col>
                                </template>
                                <v-date-picker v-model="roundEnd"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <v-btn color="success" class="ma-2" rounded name="round" v-on:click="addRound">
                        přidat kolo
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </v-card>
            </v-card>
        </v-card>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";
    import RoundEditSmall from "../../../../components/layout/RoundEditSmall";

    export default {
        name: 'YearEdit',
        components: {AdminHeader, RoundEditSmall},
        props: ['propYear'],
        mounted() {
            // console.log("Props.year: " + this.$props.propYear);
            if (this.$props.propYear === undefined) {
                // console.log("Props EMPTY - getting data from server...")
                this.getYearData();
            } else {
                this.year = this.$props.propYear
            }

            this.getAllRoundTypes();
        },
        data() {
            return {
                year: {},
                allTypes: [],
                roundStart: '',
                roundEnd: '',
                type: {},
            }
        },
        methods: {
            getYearData: async function () {
                const res = await HTTP.get(`olympiadyears/${this.$route.params.id}`);

                try {
                    if (res.status === 204) {
                        await this.$router.push({name: 'AdminYears'})
                    }
                    this.year = res.data;
                    //TODO more sophisticated sort if moving rounds made possible
                    this.year.rounds.sort((a, b) => a.id > b.id);
                    // this.$children.forEach(a => a.$forceUpdate());
                } catch  {
                    // console.log(e);
                }
            },
            removeRound: async function (id) {
                await HTTP.delete(`/olympiadrounds/${id}`);
                this.getYearData();
            },
            addRound: async function () {

                const lastRound = this.year.rounds.find(a => a.nextRound === undefined);
                const lastRoundId = lastRound !== undefined ? lastRound.id : undefined;

                const {roundStart, roundEnd} = this;
                const payload = {typeId: this.type.id, roundEnd, roundStart};
                if (lastRoundId !== undefined) {
                    payload.previousRoundId = lastRoundId;
                }

                const res = await HTTP.post(`/olympiadyears/${this.$route.params.id}/olympiadrounds`, payload);

                if (res.status < 400) {
                    await this.$store.dispatch('popMessage', {text: "Nové kolo úspěšně přidáno", color: 'success'});
                }

                this.getYearData();
            },
            getAllRoundTypes: async function () {
                const res = await HTTP.get('/roundtypes');
                this.allTypes = res.data;
                // this.allTypes.forEach(a => {a.text = a.name; a.value = a.id});
            },
            updateYear: async function () {
                // eslint-disable-next-line no-unused-vars
                const {rounds, ...payload} = this.year;
                payload.roundIds = [];
                // payload.openToPublic = this.year.openToPublic === 1;

                await HTTP.put("/olympiadyears/" + this.$route.params.id, payload)
                // .then(res => alert("UPDATED" + res))
                // .catch(e => alert("SOMETHING WENT WRONG" + e));
            },
            deleteYear: function () {
                HTTP.delete("/olympiadyears/" + this.$route.params.id)
                    .then(() => {
                        this.$router.push({name: 'AdminYears'})
                    })
                    .catch(() => this.$store.dispatch('popMessage', {
                        text: 'Chyba na serveru. Zkuste znovu nebo později',
                        color: 'error'
                    }));
            }
        }
    }
</script>

<style>
</style>
