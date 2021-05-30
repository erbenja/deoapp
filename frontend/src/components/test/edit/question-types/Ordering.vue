<template>
    <div class="multiple-choice">
<!--        <v-card-title>-->
<!--            <h3>type: ordering</h3>-->
<!--        </v-card-title>-->
        <v-row class="option px-5 justify-space-between" v-on:change="updateOption($event, option.id)"
               v-bind:key="option.id"
               v-for="(option, i) of options" width="100">
            <v-col cols="11">
                <v-card>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field class="mx-4" type="text" name="content" v-model="option.content"
                                          label="text možnosti" @change="updateOption('content', option.id, option.content)"/>
                        </v-col>

                        <!--            <v-file-input v-model="images[i]" label="File input"/>-->
                        <!--            <v-btn @click="sendFile(i, option.id)" color="blue">-->
                        <!--                <v-icon color="white">-->
                        <!--                    mdi-upload-->
                        <!--                </v-icon>-->
                        <!--            </v-btn>-->
                        <!--            <v-btn @click="deleteImage(option.id)" color="red">-->
                        <!--                <v-icon color="white">-->
                        <!--                    mdi-delete-->
                        <!--                </v-icon>-->
                        <!--            </v-btn>-->
                        <!--            <v-img width=100 v-if="option.img !== null" :src="imagePathPrefix + option.img"/>-->
                        <v-col cols="6">
                            <div class="px-4">
                                <!--                                <v-card-title>Image</v-card-title>-->
                                <v-row>
                                    <v-col cols="5">
                                        <v-row>
                                            <v-file-input v-model="images[i]" label="File input"/>
                                        </v-row>
                                        <v-row class="d-flex justify-end pr-2">
                                            <v-btn small @click="sendFile(i, option.id)" color="blue">
                                                <v-icon color="white">
                                                    mdi-upload
                                                </v-icon>
                                            </v-btn>
                                            <v-btn small @click="deleteImage(option.id)" color="red">
                                                <v-icon color="white">
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-img contain v-if="option.img !== null" :src="imagePathPrefix + option.img"/>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>

                        <v-col cols="1" class="mr-2">
                            <v-text-field type="number" name="correct" v-model="option.correct" label="Pořadové číslo"
                                          @change="updateOption('correct', option.id, option.correct)"></v-text-field>
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
        name: 'Ordering',
        components: {},
        props: {options: {required: true}},
        created: function () {
        },
        data() {
            return {
                answers: '',
                images: [],
            }
        },
        computed: {
            imagePathPrefix() {
                const baseUrl = HTTP.defaults.baseURL + 'files/';
                return baseUrl;
            }
        },
        methods: {
            updateOption: async function (name, id, val) {
                // console.log(name);
                let payload = {};
                payload[name] = val;
                await HTTP.put("questionoptions/" + id, payload);
            },
            deleteOption: async function (id) {
                await HTTP.delete("questionoptions/" + id);
                const index = this.options.map(el => el.id).indexOf(id);
                if (index > -1) {
                    this.options.splice(index, 1);
                }
                // this.options = this.options.filter(el => el.id != id);
            },
            deleteImage: async function (id) {
                const payload = {img: null};
                await HTTP.put("questionoptions/" + id, payload)
                // .then(res => console.log("UPDATED" + res))
                // .catch(e => alert("SOMETHING WENT WRONG" + e));
                this.$emit('optionUpdate', id);
            },
            sendFile: async function (index, id) {
                let formData = new FormData();
                const headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
                formData.append('image', this.images[index]);

                const res = await HTTP.post('/files/upload', formData, headers);

                if (res.status < 400) {
                    const payload = {img: res.data.filename};
                    const res2 = await HTTP.put(`questionoptions/${id}`, payload);
                    if (res2.status < 400) {
                        this.$emit('optionUpdate', id);
                    }
                }
            },
        }

    }

</script>

<style>
</style>
