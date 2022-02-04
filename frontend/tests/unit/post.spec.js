// Import the `mount()` method from Vue Test Utils
import { mount } from '@vue/test-utils'
import Post from '@/components/Post.vue';
import vuetify from "vuetify";
import Vue from 'vue';


describe('Post component', () => {
  let wrapper;

  beforeEach(()=>{
    Vue.use(vuetify)
    const $route = {params: {id: 1}};
    wrapper = mount(Post, {
      mocks: {
        $route
      },
      // methods: {
      //   get: function() {return {title: 'PostTitle', content: 'Contents'}},
      // }
    });

    wrapper.setData({
      post: {title: 'PostTitle', content: 'Contents'},
    });
  })

  it('should render post', () => {
    console.log(wrapper.html());

    expect(wrapper.find('.post-title').text()).toBe('PostTitle');
  });

})
