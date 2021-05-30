import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Public/Home.vue'
import store from '../store'

Vue.use(VueRouter);


const routes = [
    //PUBLIC
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/About.vue'),
    },
    {
        path: '/posts/:id',
        name: 'Post',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/Post.vue'),
        children: []
    },
    {
        path: '/exampletestlobby',
        name: 'ExampleTestLobby',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/Test/ExampleTestLobby.vue'),
    },
    {
        path: '/exampletest',
        name: 'ExampleTest',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/Test/ExampleTest.vue'),
    },
    {
        path: '/exampletestend',
        name: 'ExampleTestEnd',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/Test/ExampleTestEnd.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/UserLogin.vue')
    },
    {
        path: '/code',
        name: 'AccessCode',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/ContestantLogin.vue')
    },


    //CONTESTANT
    {
        path: '/testlobby',
        name: 'TestLobby',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Contestant/ContestantTestLobby.vue'),
        meta: {
            roles: ['contestant'],
        }
    },
    {
        path: '/test',
        name: 'Test',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Contestant/ContestantTest.vue'),
        meta: {
            roles: ['contestant'],
        }
    },
    {
        path: '/testend',
        name: 'TestEnd',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Contestant/ContestantTestEnd.vue'),
        // meta: {
        //     roles: ['contestant'],
        // }
    },


    //ADMINISTRATION
    {
        path: '/administration',
        name: 'Administration',
        // props: true,
        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Administration.vue'),
        meta: {
            roles: ['admin', 'creator', 'evaluator', 'guarantee'],
        }
    },


    //ADMIN
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            roles: ['admin'],
        },
        component: () => import('../components/RouterView.vue'),
        children: [
            {
                path: 'results',
                name: 'AdminResults',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Results.vue'),
                meta: {
                    roles: ['admin'],
                }
            },
            {
                path: 'results/:id',
                name: 'TestResultView',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Results/ResultView.vue'),
                meta: {
                    roles: ['admin'],
                }
            },
            {
                path: 'rounds',
                name: 'AdminRounds',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Rounds.vue'),
                meta: {
                    roles: ['admin'],
                }
            },
            {
                path: 'users',
                // name: 'AdminUsers',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../components/RouterView.vue'),
                meta: {
                    roles: ['admin'],
                },
                children: [
                    {
                        path: '',
                        name: 'AdminUsers',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Users.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: ':id/edit',
                        name: 'UserEdit',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Users/UserEdit.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: 'create',
                        name: 'UserCreate',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Users/UserCreate.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                ]
            },
            {
                path: 'years',
                // name: 'AdminUsers',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../components/RouterView.vue'),
                meta: {
                    roles: ['admin'],
                },
                children: [
                    {
                        path: '',
                        name: 'AdminYears',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Years.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: ':id/edit',
                        name: 'YearEdit',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Years/YearEdit.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: 'create',
                        name: 'YearCreate',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Years/YearCreate.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                ]
            },
            {
                path: 'posts',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../components/RouterView.vue'),
                meta: {
                    roles: ['admin'],
                },
                children: [
                    {
                        path: '',
                        name: 'AdminPosts',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Posts.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: ':id/edit',
                        name: 'PostEdit',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Posts/PostEdit.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                    {
                        path: 'create',
                        name: 'PostCreate',
                        props: true,
                        component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Admin/Posts/PostCreate.vue'),
                        meta: {
                            roles: ['admin'],
                        }
                    },
                ]
            },
        ]
    },
    //ADMINISTRATION
    //creator
    {
        path: '/creator',
        name: 'Creator',
        meta: {
            roles: ['admin', 'creator'],
        },
        component: () => import('../components/RouterView.vue'),
        children: [
            {
                path: 'tests',
                name: 'CreatorTests',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Creator/Tests.vue'),
                meta: {
                    roles: ['admin', 'creator'],
                }
            },
            {
                path: 'tests/:id/edit',
                name: 'TestEdit',
                props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Creator/Test/TestEdit.vue'),
                meta: {
                    roles: ['admin', 'creator'],
                }
            },
            {
                path: 'tests/:id/try',
                name: 'TestTry',
                props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Creator/Test/TestTry.vue'),
                meta: {
                    roles: ['admin', 'creator'],
                }
            },
        ]
    },

    {
        path: '/guarantee',
        name: 'Guarantee',
        meta: {
            roles: ['admin', 'guarantee'],
        },
        component: () => import('../components/RouterView.vue'),
        children: [
            {
                path: 'contestants',
                name: 'GuaranteeContestants',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Guarantee/Contestants.vue'),
                meta: {
                    roles: ['admin', 'guarantee'],
                }
            },
            {
                path: 'contestants/create',
                name: 'ContestantCreate',
                props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Guarantee/Contestants/ContestantCreate.vue'),
                meta: {
                    roles: ['admin', 'guarantee'],
                }
            },
            {
                path: 'contestants/:id/view',
                name: 'ContestantView',
                props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Guarantee/Contestants/ContestantView.vue'),
                meta: {
                    roles: ['admin', 'guarantee'],
                }
            },
        ]
    },

    {
        path: '/evaluator',
        name: 'Evaluator',
        meta: {
            roles: ['admin', 'evaluator'],
        },
        component: () => import('../components/RouterView.vue'),
        children: [
            {
                path: 'evaluations',
                name: 'EvaluatorEvaluations',
                // props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Evaluator/Evaluations.vue'),
                meta: {
                    roles: ['admin', 'evaluator'],
                }
            },
            {
                path: 'evaluations/:id',
                name: 'TestEvaluation',
                props: true,
                component: () => import(/* webpackChunkName: "about" */ '../views/Administration/Evaluator/Evaluation/TestEvaluation.vue'),
                meta: {
                    roles: ['admin', 'evaluator'],
                }
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.roles !== undefined) {
        const roles = to.meta.roles || [];

        if (roles.some(record => isAuthorized(record))) {
            next();
            return;
        }

        if(roles.includes('contestant')) {
            next({name: 'AccessCode'});
            store.dispatch('popMessage', {text: 'Pro přístup do  ' + to.name  + 'je potřeba přihlásit se kódem ', color: 'warning'})
        } else {
            next({name: 'Login', params: {continueTo: to}});
            store.dispatch('popMessage', {text: 'Přihlášení je povinné pro přístup k  ' + to.name, color: 'warning'})
        }
    } else {
        next();
    }
});

function isAuthorized(role) {
    // console.log('authorizing for: ' + role);

    if (store.getters.isLoggedIn) {
        switch (role) {
            case 'admin': {
                return store.getters.isAdmin;
            }
            case 'creator': {
                return store.getters.isCreator;
            }
            case 'evaluator': {
                return store.getters.isEvaluator;
            }
            case 'guarantee': {
                return store.getters.guaranteeId > 0;
            }
            case 'contestant': {
                return store.getters.isContestant;
            }
        }
    }
    return false;
}

export default router
