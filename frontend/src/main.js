import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import HTTP from './http-common';
import typeToCzech from './czech-types'
import rules from './validation-rules';
import vuetify from './plugins/vuetify';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    // HTTP,
    // rules,
    vuetify,
    // VueFilterDateFormat,
    // VueFilterDateParse,
    render: h => h(App)
});

// Vue.use(HTTP);
Vue.use(rules);
Vue.use(typeToCzech);

Vue.use(VueFilterDateFormat, {
    dayOfWeekNames: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday'
    ],
    dayOfWeekNamesShort: [
        'Su', 'Mo', 'Tu', 'We', 'Tr', 'Fr', 'Sa'
    ],
    monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    // Timezone offset, in minutes (0 - UTC, 180 - Russia, undefined - current)
    timezone: 0
});

Vue.use(VueFilterDateParse);

app.$mount('#app');
