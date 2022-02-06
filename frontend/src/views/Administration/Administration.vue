<template>
    <div>
        <AdminHeader/>
        <h1 class="d-flex justify-center">Administrace</h1>
        <v-container>
            <v-row>
                <v-col v-for="role in roles" :key="role.name" cols="3">
                    <v-card class="d-flex flex-column px-4 pb-4" v-if="hasPermission(role.name)">
                        <v-card-title>{{role.name}}</v-card-title>
                        <v-btn :class="role.path" :id="item.path" v-for="item in role.items" :key="item.text" @click="goTo(item.path)" :color="role.color"
                               class="my-2">
                            {{item.text}}
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    import AdminHeader from "../../components/layout/AdminHeader";

    export default {
        name: 'Administration',
        components: {AdminHeader},
        data() {
            return {
                roles: [
                    {
                        name: 'Admin',
                        path: 'admin',
                        color: 'info',
                        items: [
                            {text: 'Články', path: 'AdminPosts'},
                            {text: 'Uživatel', path: 'AdminUsers'},
                            {text: 'Ročníky', path: 'AdminYears'},
                            {text: 'Výsledky', path: 'AdminResults'}
                        ]
                    },
                    {
                        name: 'Tvůrce',
                        path: 'creator',
                        color: 'success',
                        items: [
                            {text: 'Tvorba testů', path: 'CreatorTests'},
                        ]
                    },
                    {
                        name: 'Garant',
                        path: 'guarantee',
                        color: 'warn',
                        items: [
                            {text: 'Soutěžící', path: 'GuaranteeContestants'},
                        ]
                    },
                    {
                        name: 'Hodnotitel',
                        path: 'evaluator',
                        color: 'error',
                        items: [
                            {text: 'Hodnocení', path: 'EvaluatorEvaluations'},
                        ]
                    }
                ]
            }
        },
        methods: {
            goTo: async function (name, params = {}) {
                await this.$router.push({name, params});
            },
            hasPermission: function (name) {
                if (!this.$store.getters.isUser) {
                    return false;
                }

                if(this.$store.getters.isAdmin){
                    return true;
                }

                switch (name) {
                    case 'creator': {
                        return this.$store.getters.isCreator;
                    }
                    case 'evaluator': {
                        return this.$store.getters.isEvaluator;
                    }
                    case 'guarantee': {
                        return this.$store.getters.guaranteeId > 0;
                    }
                }
            }
        }
    }
</script>
