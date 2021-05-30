<template>
    <div>
        <AdminHeader/>
        <v-container>
            <v-card class="pa-4 mx-auto" max-width="500">
                <v-card-title>Nový soutězící</v-card-title>
                <v-select label="ročník" :items="years"
                          item-value="id" item-text="name" v-model="contestant.yearId">
                </v-select>

                <v-text-field type="text" label="křestní jméno" required v-model="contestant.firstname"></v-text-field>
                <v-text-field type="text" label="příjmení" required v-model="contestant.surname"></v-text-field>
                <v-text-field type="email" label="email" required v-model="contestant.email"></v-text-field>

                <v-menu>
                    <template v-slot:activator="{ on }">
                        <!--                        <v-col cols="2">-->
                        <v-text-field :value="contestant.birthdate" v-on="on" label="datum narození"
                                      prepend-icon="mdi-calendar-range"></v-text-field>
                        <!--                        </v-col>-->
                    </template>
                    <v-date-picker v-model="contestant.birthdate"></v-date-picker>
                </v-menu>

                <v-text-field type="number" label="třída" required v-model="contestant.classNum"></v-text-field>

                <v-select label="škola" :items="schools"
                          item-value="id" item-text="name" v-model="contestant.schoolId">
                </v-select>

                <v-card-actions class="justify-center">
                    <v-btn color="success" v-on:click="createContestant">
                        <v-icon>
                            mdi-trash
                        </v-icon>
                        Registrovat
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-container>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "@/components/layout/AdminHeader";

    export default {
        name: 'ContestantCreate',
        components: {AdminHeader},
        created() {
            this.getYears();
            this.getSchools();
        },
        data() {
            return {
                contestant: {
                    firstname: '',
                    surname: '',
                    email: '',
                    birthdate: '',
                    schoolId: -1,
                    classNum: 0,
                    yearId: -1,
                },
                years: [],
                schools: [],
            }
        },
        methods: {
            getYears: async function () {
                const res = await HTTP.get("/olympiadyears");
                this.years = res.data.filter(a => a.openToPublic);
                this.years.forEach(a => a.name = `[${a.year}] ${a.name}`);
            },
            getSchools: async function () {
                const res = await HTTP.get("/schools");
                const resp = await HTTP.get(`/guarantees/${this.$store.getters.guaranteeId}`);

                let guaranteedIds = resp.data.schools;
                guaranteedIds = guaranteedIds.map(a => a.id);

                this.schools = res.data.filter(a => guaranteedIds.includes(a.id));
            },
            createContestant: async function () {
                HTTP.post("/guarantees/contestants", {...this.contestant})
                    .then(async (res) => {
                        await this.$store.dispatch('popMessage', {
                            text: "Soutěžící úspěšně registrován",
                            color: 'success'
                        });
                        this.$router.push({name: 'ContestantView', params: {id: res.data.id}})
                    })
                    .catch(() => this.$store.dispatch('popMessage', {
                        text: 'Chyba na serveru. Zkuste znovu nebo později',
                        color: 'error'
                    }));
            },
        }
    }
</script>
