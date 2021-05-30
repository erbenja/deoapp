<template>
    <v-container>
        <v-form v-on:change="updateRound">
            <v-card-title>{{round.id}} --> {{nextRoundId}}</v-card-title>

            <v-row>
                <v-col cols="5">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-col cols="10">
                                <v-text-field :value="round.roundStart" v-on="on" label="Začátek kola"
                                              prepend-icon="mdi-calendar-range"></v-text-field>
                            </v-col>
                        </template>
                        <v-date-picker v-model="round.roundStart" v-on:change="updateRound"></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="5">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-col cols="10">
                                <v-text-field :value="round.roundEnd" v-on="on" label="Konec kola"
                                              prepend-icon="mdi-calendar-range"></v-text-field>
                            </v-col>
                        </template>
                        <v-date-picker v-model="round.roundEnd" v-on:change="updateRound"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>

            <!--            <v-card-title>{{round.type.name}}</v-card-title>-->

            <v-row>
                <v-col cols="5">
                    <v-select id="round-type-select" ref="roundTypeSelect" label="druh kola" return-object :items="allTypes"
                              item-value="id" item-text="name" v-model="round.type" v-on:change="updateRound">
                    </v-select>
                </v-col>
            </v-row>

        </v-form>
    </v-container>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'RoundEditSmall',
        components: {},
        props: ['propRound', 'allTypes'],
        data() {
            return {
                // allRoundTypes: [],
                round: {},
                menu2: false,
            }
        },
        created: function () {
            this.round = this.propRound;
            // this.getAllRoundTypes();
        },
        watch: {
            propRound: function () {
                this.round = this.propRound;
            }
        },
        computed: {
            nextRoundId: function () {
                return this.round.nextRound !== undefined ? this.round.nextRound.id : -1;
            }
        },
        methods: {
            getAllRoundTypes: async function () {
                const res = await HTTP.get('/roundtypes');
                // console.log(res.data);
                this.allRoundTypes = res.data.sort((a, b) => a.name > b.name);
            },
            isSelectedType: function (id) {
                return this.round.type.id === id;
            },
            updateRound: async function () {
                // eslint-disable-next-line no-unused-vars
                const {type, ...payload} = this.round;
                payload.typeId = this.round.type.id;

                // delete payload.type;

                try {
                    const res = await HTTP.put(`/olympiadrounds/${payload.id}`, payload);
                    this.round = res.data;
                } catch (e) {
                    // console.log(e);
                }
            }
        }
    }
</script>

<style>
</style>
