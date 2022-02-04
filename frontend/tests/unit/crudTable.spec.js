// Import the `mount()` method from Vue Test Utils
import { mount, shallowMount } from '@vue/test-utils'
import CrudTable from '@/components/layout/CrudTable.vue';
import PostTable from '@/components/tables/PostTable.vue';
import vuetify from "vuetify";
import Vue from 'vue';
import VueRouter from 'vue-router'

describe.skip('Post component', () => {
  let wrapper;

  beforeEach(()=>{
    Vue.use(VueRouter)
    Vue.use(vuetify)
    wrapper = mount(CrudTable, {
      propsData: {
          fields: [
              // {text: 'id', value: 'id'},
              {text: 'time limit', value: 'timeLimit', groupable: false},
              {text: 'year', value: 'round.year.year', groupable: true},
              {text: 'category', value: 'category.name', groupable: false},
              {text: 'closed', value: 'closed', class: 'bool', groupable: false}],
          //     ['id', 'title', 'content', 'lastModified'],
          path: 'tests',
          editName: 'TestEdit',
          remove: false,
          groupProp: 'round.year.year',
          maxLength: 15,
      }
    });

    wrapper.setData({
      data: [
        {timeLimit: 12, round: {year: {year: 2020}}, category: {name: 'A'}, closed: false}
      ]
    });
  })

  it('should render post', () => {
    // const { vm } = wrapper;

    console.log(wrapper.html());

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeDefined();
  });

})


