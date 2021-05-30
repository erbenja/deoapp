import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from "./http-common";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        message: {text: '', color: 'green'},
        showMessage: false
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token) {
            state.status = 'success';
            state.token = token;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        },
        newMessage(state, message) {
            state.message = message;
            state.showMessage = true;
        },
        hideMessage(state) {
            state.message = {text: '', color: 'green'};
            state.showMessage = false;
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                HTTP.post('auth/login', {username: user.username, password: user.password})
                // axios({url: 'http://localhost:3000/login', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.access_token;

                        // console.log('login data');
                        // console.log(resp.data);

                        localStorage.setItem('token', token);
                        // HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                        // Add the following line:
                        // axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token);
                        resolve(resp);
                        this.dispatch('popMessage', {text: 'Jste přihlášen :)', color: "success"});
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        this.dispatch('popMessage', {text: 'Nespravné jméno nebo heslo', color: "error"});
                        reject(err);
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                this.dispatch('popMessage', {text: 'Odhlášen', color: "success"});
                // delete axios.defaults.headers.common['Authorization']
                resolve();
            })
        },
        // register({commit}, user) {
        //     return new Promise((resolve, reject) => {
        //         commit('auth_request')
        //         axios({url: 'http://localhost:3000/register', data: user, method: 'POST'})
        //             .then(resp => {
        //                 const token = resp.data.token
        //                 const user = resp.data.user
        //                 localStorage.setItem('token', token)
        //                 // Add the following line:
        //                 axios.defaults.headers.common['Authorization'] = token
        //                 commit('auth_success', token, user)
        //                 resolve(resp)
        //             })
        //             .catch(err => {
        //                 commit('auth_error', err)
        //                 localStorage.removeItem('token')
        //                 reject(err)
        //             })
        //     })
        // },
        loginWithCode({commit}, code) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                HTTP.post('auth/accessCode', {code})
                    .then(res => {
                        const token = res.data.access_token;

                        localStorage.setItem('token', token);
                        // HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                        resolve(res);
                        commit('auth_success', token);
                        this.dispatch('popMessage', {text: 'Zadal jste platný kód :)', color: "success"});

                    })
                    .catch(err => {
                            commit('auth_error');
                            localStorage.removeItem('token');

                            const status = err.message.slice(err.message.length - 3, err.message.length + 1000);
                            // console.log(parseInt(status));
                            switch (Number.parseInt(status)) {
                                case 401: {
                                    this.dispatch('popMessage', {text: 'Kód není aktivován nebo není platný', color: "error"});
                                    break;
                                }
                                case 403: {
                                    this.dispatch('popMessage', {text: 'Kód byl už použit', color: "error"});
                                    break;
                                }
                                default: {
                                    this.dispatch('popMessage', {text: 'Přihlášení se nepodařilo. Zkuste to znovu', color: "error"});
                                    break;
                                }
                            }

                            reject(err);
                        }
                    );
            })
        },
        popMessage({commit}, msg) {
            commit('newMessage', msg);
            setTimeout(() => commit('hideMessage'), 3000);
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isUser: state => {
            if (state.token === '') return false;
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            if (payload.account === undefined) {
                return false;
            }
            return payload.account.id !== undefined;
        },
        isContestant: state => {
            if (state.token === '') return false;
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            if (payload.code === undefined) {
                return false;
            }
            return payload.code !== undefined;
        },

        isAdmin: state => {
            if (state.token === '') return false;
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            if (payload.account === undefined) {
                return false;
            }
            return payload.account.permissions.some(a => a.name === 'admin');
        },

        isCreator: state => {
            if (state.token === '') return false;
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            if (payload.account === undefined) {
                return false;
            }
            return payload.account.permissions.some(a => a.name === 'creator');
        },

        isEvaluator: state => {
            if (state.token === '') return false;
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            if (payload.account === undefined) {
                return false;
            }
            return payload.account.permissions.some(a => a.name === 'evaluator');
        },

        authStatus: state => state.status,

        //TODO comment out on live
        token: state => state.token,
        user: state => {
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            return payload.account;
        },

        guaranteeId: state => {
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            return payload.account.guarantee !== null ? payload.account.guarantee.id : -1;
        },

        code: state => {
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            return payload.code;
        },

        testId: state => {
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            return payload.code.testId;
        },

        contestantCategory: state => {
            const base64Url = state.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(atob(base64));
            return payload.code.category.name || 'X';
        },

        message: state => state.message,
        showMessage: state => state.showMessage,

    }
})
