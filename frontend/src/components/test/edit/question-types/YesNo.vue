<template>
    <div class="yes-no">
        <v-row class="option px-5 justify-space-between"
               v-bind:key="option.id"
               v-for="option of options" width="100">
            <v-col cols="11">
                <v-card>
                    <v-row>
                        <v-col cols="9">
                            <v-text-field class="mx-4" type="text" name="content" v-model="option.content"
                                          label="text možnosti" @change="updateOption('content', option.id, $event)"/>
                        </v-col>
                        <v-col cols="3" class="pr-2">
                            <v-checkbox type="checkbox" name="correct" v-model="option.correct" label="označte pokud Ano" @change="updateOption('correct', option.id, $event)"/>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="1" class="d-flex align-center">
                <v-btn fab x-small class="ma-1 align-self-center" color="red" v-on:click="deleteOption(option.id)">
                    <v-icon color="white">
                        mdi-delete
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>


    </div>
</template>

<script>
    import {HTTP} from "@/http-common";

    export default {
        name: 'YesNo',
        props: {options: {required: true}},
        data() {
            return {}
        },
        created: function () {
            // this.call();
            // console.log(this.options);
        },
        methods: {
            updateOption: async function (name, id, val) {
                // console.log(val);
                let payload = {};
                const value = name === "correct" ? val ? 1 : 0 : val;
                payload[name] = value;
                await HTTP.put("questionoptions/" + id, payload);
            },
            deleteOption: async function (id) {
                await HTTP.delete("questionoptions/" + id);
                const index = this.options.map(el => el.id).indexOf(id);
                if (index > -1) {
                    this.options.splice(index, 1);
                }
                // this.options = this.options.filter(el => el.id != id);
            }
        }

    }

</script>

<style>
</style>
