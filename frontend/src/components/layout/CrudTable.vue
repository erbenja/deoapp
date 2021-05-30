<template>
    <v-container>
        <v-row>
            <!--        create new item-->
            <v-col cols="4">
                <v-btn @click="goTo(createName)" v-if="createName !== undefined">
                    <v-icon
                            class="mr-6"
                            color="green"
                    >
                        mdi-plus
                    </v-icon>
                    create new
                </v-btn>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="4">
                <div v-if="searchProp !== undefined">
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>

        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="data"
                :group-by="groupProp || undefined"
                item-key="id"
                class="elevation-1"
                show-group-by
                :search="search"
        >
            <template v-slot:item.actions="{item}">
                <v-icon
                        v-if="editName !== undefined"
                        color="blue"
                        @click="goToEdit(item.id)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        v-if="viewName !== undefined"
                        color="green"
                        @click="goToView(item.id)"
                >
                    mdi-file-account
                </v-icon>
                <v-icon
                        v-if="remove !== undefined"
                        color="red"
                        @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>

            <!--            custom properties or needs computation-->
            <template v-slot:item.admin="{item}">
                <v-icon>
                    {{hasPermission('admin', item) ? iconYes : iconNo}}
                </v-icon>
            </template>
            <template v-slot:item.guarantee="{item}">
                <v-icon>
                    {{hasPermission('guarantee', item) ? iconYes : iconNo}}
                </v-icon>
            </template>
            <template v-slot:item.creator="{item}">
                <v-icon>
                    {{hasPermission('creator', item) ? iconYes : iconNo}}
                </v-icon>
            </template>
            <template v-slot:item.evaluator="{item}">
                <v-icon>
                    {{hasPermission('evaluator', item) ? iconYes : iconNo}}
                </v-icon>
            </template>
            <template v-slot:item.openToPublic="{item}">
                <v-icon>
                    {{item.openToPublic ? iconYes : iconNo}}
                </v-icon>
            </template>
            <template v-slot:item.contestantCategory="{item}">
                {{getContestantCategory(item)}}
            </template>
            <template v-slot:item.receivedPoints="{item}">
                {{getTotalPoints(item)}}
            </template>
        </v-data-table>
    </v-container>

</template>

<script>
    import {HTTP} from '@/http-common';

    export default {
        name: 'CrudTable',
        components: {},
        props: ['fields', 'path', 'createName', 'editName', 'viewName', 'remove', 'maxLength', 'sortProp', 'groupProp', 'searchProp'],
        data() {
            return {
                headers: [],
                data: [],
                selected: [],
                singleSelect: {},
                iconYes: 'mdi-check-bold',
                iconNo: 'mdi-close-outline',
                search: '',
            }
        },
        created: function () {
            this.headers.push({text: 'Akce', value: 'actions', width: 150, sortable: false, groupable: false});
            this.fields.forEach(a => this.headers.push(a));
            this.getItems();
        },
        computed: {},
        methods: {
            getItems: async function () {
                const res = await HTTP.get(this.path);

                if(res.status < 400) {
                    this.data = res.data;
                } else {
                    await this.$store.dispatch('popMessage', {text: 'Nastala chyba při načítání dat. Zkuste znovu načíst stránku', color: 'error'});
                }

                // if (this.sortProp !== undefined) {
                //     this.data.sort((a, b) => {
                //         return this.getProperty(a, this.sortProp) < this.getProperty(b, this.sortProp)
                //     });
                // }
            },
            hasPermission: function (name, item) {
                // console.log(item);
                if (name === 'guarantee') {
                    if (item.guarantee !== undefined) {
                        return item.guarantee.id !== undefined;
                    }
                } else {
                    if (item.permissions !== undefined) {
                        const mapped = item.permissions.map(a => a.type.name);
                        return mapped.includes(name);
                    }
                }
                return false;
            },
            goToEdit: function (id) {
                this.$router.push({name: this.editName, params: {id}});

            },
            goToView: function (id) {
                this.$router.push({name: this.viewName, params: {id}});
            },
            deleteItem: async function (id) {
                if (confirm('Potvrďte pro odstranění vybrané položky?')) {
                    try {
                        await HTTP.delete(`${this.path}/${id}`);
                        await this.getItems();
                    } catch {
                        // console.error(e);
                    }
                } else {
                    // console.log('didnt confirm to delete');
                    // alert('Too bad');
                }
            },
            goTo: function (name, params = {}) {
                this.$router.push({name, params});
            },
            getContestantCategory: function (item) {
                return item.answeredQuestions[0].question.test.category.name;
            },
            getTotalPoints: function (item) {
                const points = item.answeredQuestions.map(a => a.evaluation.points);
                return points.reduce((c, a) => c += a);
            }
        }
    }
</script>

<style>
</style>
