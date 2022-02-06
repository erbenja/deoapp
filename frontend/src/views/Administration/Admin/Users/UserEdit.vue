<template>
    <div>
        <AdminHeader/>

        <v-card class="pa-4 mx-auto" max-width="700">
            <v-card-title>Úprava uživatele #{{this.$route.params.id}}</v-card-title>

            <v-text-field type="text" label="křestní jméno" disabled v-model="user.firstname"/>
            <v-text-field type="text" label="příjemní" disabled v-model="user.surname"/>
            <v-text-field type="text" label="uživatelské jméno" disabled v-model="user.username"/>
            <v-text-field type="email" label="email" disabled v-model="user.email"/>
            <v-text-field type="username" label="username" disabled v-model="user.username"/>
            <!--                    <v-card-actions class="justify-center">-->
            <!--                        <v-btn color="success" v-on:click="updateAccount">-->
            <!--                            &lt;!&ndash;                            <v-icon>&ndash;&gt;-->
            <!--                            &lt;!&ndash;                                mdi-update&ndash;&gt;-->
            <!--                            &lt;!&ndash;                            </v-icon>&ndash;&gt;-->
            <!--                            SAVE-->
            <!--                        </v-btn>-->
            <!--                    </v-card-actions>-->


            <v-card class="my-4">
                <v-card-title>Práva</v-card-title>
                <v-row class="justify-space-between px-4">
                    <v-col cols="5" :key="type.id" v-for="type of permissionTypes">
                        <v-checkbox
                                v-model="userPermissions[type.id]"
                                @change="confirmUncheck( 'grantPermission', 'revokePermission', $event, type.id)"
                                :label="type.name">
                        </v-checkbox>
                    </v-col>
                    <v-col cols="5">
                        <v-checkbox v-model="guaranteeCheckbox"
                                    @change="confirmUncheck('grantGuaranteePermission', 'revokeGuaranteePermission', $event)"
                                    label="garant">
                        </v-checkbox>
                    </v-col>
                </v-row>
            </v-card>

            <v-card v-if="isGuarantee" class="my-4">
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
                        :icons-and-text="icons"
                >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab
                            v-for="i in tabNames"
                            :key="i"
                            :href="`#tab-${i}`"
                    >
                        {{ i }}
                        <v-icon v-if="icons">mdi-phone</v-icon>
                    </v-tab>

                    <v-tab-item value="tab-school">
                        <v-card flat tile>
                            <v-card-title>Garant pro školy</v-card-title>
                            <v-list>
                                <v-list-item :key="item.id"
                                             v-for="item in user.guarantee !== undefined ? user.guarantee.schools: []"
                                             class="d-flex justify-center">
                                    <v-col cols="5">
                                        <v-list-item-content>{{item.name}}</v-list-item-content>
                                    </v-col>

                                    <v-col cols="1">
                                        <v-btn fab x-small color="error"
                                               v-on:click="removeGuaranteedProp('school', item.id)">
                                            <v-icon color="white">
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-list-item>
                            </v-list>

                            <v-row class="justify-center">
                                <v-col cols="1">
                                    <v-btn fab x-small color="success"
                                           @click="addGuaranteeProp(selectedSchool, 'school')">
                                        <v-icon color="white">
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-select return-object v-model="selectedSchool"
                                              :items="schools"
                                              item-value="id" item-text="name" labels="škola">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-district">
                        <v-card flat tile>
                            <v-card-title>Garant pro okresy</v-card-title>
                            <v-list>
                                <v-list-item :key="item.id"
                                             v-for="item in user.guarantee !== undefined ? user.guarantee.districts: []"
                                             class="d-flex justify-center">
                                    <v-col cols="5">
                                        <v-list-item-content>{{item.name}}</v-list-item-content>
                                    </v-col>

                                    <v-col cols="1">
                                        <v-btn fab x-small color="error"
                                               v-on:click="removeGuaranteedProp('district', item.id)">
                                            <v-icon color="white">
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-list-item>
                            </v-list>

                            <v-row class="justify-center">
                                <v-col cols="1">
                                    <v-btn fab x-small color="success"
                                           @click="addGuaranteeProp(selectedDistrict, 'district')">
                                        <v-icon color="white">
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-select return-object v-model="selectedDistrict"
                                              :items="districts"
                                              item-value="id" item-text="name" labels="okres">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-region">
                        <v-card flat tile>
                            <v-card-title>Garant pro kraje</v-card-title>
                            <v-list>
                                <v-list-item :key="item.id"
                                             v-for="item in user.guarantee !== undefined ? user.guarantee.regions: []"
                                             class="d-flex justify-center">
                                    <v-col cols="5">
                                        <v-list-item-content>{{item.name}}</v-list-item-content>
                                    </v-col>

                                    <v-col cols="1">
                                        <v-btn fab x-small color="error"
                                               v-on:click="removeGuaranteedProp('region', item.id)">
                                            <v-icon color="white">
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-list-item>
                            </v-list>

                            <v-row class="justify-center">
                                <v-col cols="1">
                                    <v-btn fab x-small color="success"
                                           @click="addGuaranteeProp(selectedRegion, 'region')">
                                        <v-icon color="white">
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-select return-object v-model="selectedRegion"
                                              :items="regions"
                                              item-value="id" item-text="name" labels="kraj">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-roundType">
                        <v-card flat tile>
                            <v-card-title>Garant pro druhy kol</v-card-title>
                            <v-list>
                                <v-list-item :key="item.id"
                                             v-for="item in user.guarantee !== undefined ? user.guarantee.roundTypes: []"
                                             class="d-flex justify-center">
                                    <v-col cols="5">
                                        <v-list-item-content>{{item.name}}</v-list-item-content>
                                    </v-col>

                                    <v-col cols="1">
                                        <v-btn fab x-small color="error"
                                               v-on:click="removeGuaranteedProp('roundType', item.id)">
                                            <v-icon color="white">
                                                mdi-delete
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-list-item>
                            </v-list>

                            <v-row class="justify-center">
                                <v-col cols="1">
                                    <v-btn fab x-small color="success"
                                           @click="addGuaranteeProp(selectedRoundType, 'roundType')">
                                        <v-icon color="white">
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-select return-object v-model="selectedRoundType"
                                              :items="roundTypes"
                                              item-value="id" item-text="name" label="druh kola">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-card>
    </div>
</template>

<script>
    import {HTTP} from "@/http-common";
    import AdminHeader from "../../../../components/layout/AdminHeader";

    export default {
        name: 'UserEdit',
        components: {AdminHeader},
        props: ['propUser'],
        async created() {
            await this.getQuestionTypes();
            await this.getGuaranteeOptionsData();

            // console.log("Props.post: " + this.$props.propUser);
            // if (this.$props.propUser === undefined) {
            //     console.log("Props EMPTY - getting data from server...")
            await this.getAccountData();
            this.guaranteeCheckbox = this.isGuarantee();
            // } else {
            //     this.user = this.$props.propUser
            // }
        },
        data() {
            return {
                user: {},
                guaranteeCheckbox: false,
                selectedSchool: undefined,
                selectedDistrict: undefined,
                selectedRegion: undefined,
                selectedRoundType: undefined,
                userPermissions: [],
                permissionTypes: [],

                allschools: [],
                alldistricts: [],
                allregions: [],
                allroundTypes: [],

                //tabs setup
                tab: null,
                tabNames: ['school', 'district', 'region', 'roundType'],
                icons: false,
                centered: false,
                grow: true,
                vertical: false,
                prevIcon: false,
                nextIcon: false,
                right: false,

            }
        },
        computed: {
            isGuarantee: function () {
                return this.user.guarantee !== undefined;
            },
            schools: function () {
                if (this.isGuarantee) {
                    const ids = this.user.guarantee.schools.map(a => a.id);
                    return this.allschools.filter(a => !ids.some(b => a.id === b)).sort((a, b) => a.name > b.name);
                }
                return this.allschools;
            },
            districts: function () {
                if (this.isGuarantee) {
                    const ids = this.user.guarantee.districts.map(a => a.id);
                    return this.alldistricts.filter(a => !ids.some(b => a.id === b)).sort((a, b) => a.name > b.name);
                }
                return this.alldistricts;
            },
            regions: function () {
                if (this.isGuarantee) {
                    const ids = this.user.guarantee.regions.map(a => a.id);
                    return this.allregions.filter(a => !ids.some(b => a.id === b)).sort((a, b) => a.name > b.name);
                }
                return this.allregions;
            },
            roundTypes: function () {
                if (this.isGuarantee) {
                    const ids = this.user.guarantee.roundTypes.map(a => a.id);
                    return this.allroundTypes.filter(a => !ids.some(b => a.id === b)).sort((a, b) => a.name > b.name);
                }
                return this.allroundTypes;
            },
        },
        methods: {
            getAccountData: async function () {
                const res = await HTTP.get('accounts/' + this.$route.params.id);
                if (res !== undefined) {
                    if (res.status === 204) {
                        // console.log("ACCOUNT DOESNT EXITS" + res);
                        await this.$router.push({name: 'AdminPosts'})
                    } else {
                        const newUser = res.data;
                        // console.log(newUser);
                        // this.user = res.data;
                        if (newUser.guarantee !== undefined) {
                            if (newUser.guarantee.id !== undefined) {
                                const gRes = await HTTP.get(`/guarantees/${newUser.guarantee.id}`);
                                newUser.guarantee = gRes.data;
                            }
                        }

                        this.user = newUser;

                        this.permissionTypes.forEach(a => {
                            // console.log(a);
                            this.userPermissions[a.id] = this.hasPermission(a.id)
                        });
                        this.guaranteeCheckbox = this.isGuarantee;
                    }
                    return res.status;
                } else {
                    // console.log("error while getting data");
                    await this.$router.push({name: 'AdminPosts'})
                }

            },
            getGuaranteeOptionsData: async function () {
                const names = this.tabNames.map(a => a += 's');

                for (let name of names) {
                    const res = await HTTP.get(`/${name}`);
                    this[`all${name}`] = res.data;
                }
            },
            hasPermission: function (id) {
                if (this.user.permissions !== undefined) {
                    return this.user.permissions.some(a => a.type.id === id);
                }
                return false;
            },
            grantPermission: async function (id) {
                try {
                    const newPermission = {typeId: id};
                    await HTTP.post(`/accounts/${this.user.id}/permissions`, newPermission);
                    // return true;
                } catch {
                    // console.log(e);
                    // return false;
                }
            },
            revokePermission: async function (typeId) {
                try {
                    const permissions = this.user.permissions;
                    const permissionId = permissions.find(a => a.type.id === parseInt(typeId)).id;
                    await HTTP.delete(`/permissions/${permissionId}`);
                    // if (res.status > 400){
                    //     return false;
                    // }
                    // return true;
                } catch {
                    // console.log(e);
                    // return false;
                }
            },
            confirmUncheck: async function (on, off, val, id = -1) {
                // console.log(val);
                // console.log(id);
                const typeId = id;
                if (val) {
                    // if (
                    await this[on](typeId);
                    // ) {
                    await this.getAccountData();
                    return false;
                    // }
                } else {
                    const box = confirm("Are you sure you want to do this?");
                    if (box === true) {
                        // if (
                        await this[off](typeId)
                        // ) {
                        await this.getAccountData();
                        return true;
                        // }
                    } else {
                        await this.getAccountData();
                        return false;
                    }
                }
            },
            updateAccount: async function () {
                const {username, firstname, lastname, email} = this.user;
                const payload = {username, firstname, lastname, email};
                // console.log(payload);

                await HTTP.put("/accounts/" + this.$route.params.id, payload)
            },
            getQuestionTypes: async function () {
                const res = await HTTP.get("permissiontypes");
                if (res.status < 400) {
                    this.permissionTypes = res.data
                } else {
                    await this.$store.dispatch('popMessage', {text: 'Nastala chyba při načítání dat. Zkuste znovu načíst stránku', color: 'error'});
                }
            },
            grantGuaranteePermission: async function () {
                try {
                    await HTTP.post(`/accounts/${this.user.id}/guarantees`);
                } catch {
                    // console.log(e);
                }
            },
            revokeGuaranteePermission: async function () {
                try {
                    await HTTP.delete(`/guarantees/${this.user.guarantee.id}`);
                } catch {
                    // console.log(e);
                }
            },
            getGuaranteePayload: function () {
                const properties = ["school", "district", "region", "roundType", "guaranteedRound"];
                const payload = this.user.guarantee;
                for (let prop of properties) {
                    const src = `${prop}s`;
                    if (payload[src])
                        payload[`${prop}Ids`] = payload[src].map(a => a.id);
                }
                return payload;
            },
            removeGuaranteedProp: async function (name, id) {
                const payload = this.getGuaranteePayload();
                const prop = `${name}Ids`;
                payload[prop] = payload[prop].filter(a => a !== id);

                try {
                    await HTTP.put(`/guarantees/${this.user.guarantee.id}`, payload);

                    this.getAccountData();
                } catch {
                    // console.log(e);
                }
            },
            addGuaranteeProp: async function (val, name) {
                try {
                    // console.log(name);

                    const id = val.id;
                    const payload = this.getGuaranteePayload();

                    //TODO potential optimization
                    // if (id in payload[`${name}Ids`]) {
                    //     console.log('skipping');
                    //     return;
                    // }

                    payload[`${name}Ids`].push(id);
                    await HTTP.put(`/guarantees/${this.user.guarantee.id}`, payload);

                    this.getAccountData();
                } catch {
                    // console.log(e);
                }
            },
        }
    }
</script>

<style>
</style>
