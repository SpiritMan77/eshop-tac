import { shallowMount } from '@vue/test-utils'
import HomeView from "@/views/HomeView";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

describe('HomeView.vue', () => {
  it('Check if title is displayed', () => {
    const wrapper = shallowMount(HomeView, {
      vuetify,
    })
    const element = wrapper.findComponent({ref:'title'})
    expect(element.text()).toContain('TAC-Shop')
  }),

    it('Check if subtitle is displayed', () => {
      const wrapper = shallowMount(HomeView, {
        vuetify,
      })
      const element = wrapper.findComponent({ref:'subtitle'})
      expect(element.text()).toContain('Everything you need for men, women and kids.')
    })
})
