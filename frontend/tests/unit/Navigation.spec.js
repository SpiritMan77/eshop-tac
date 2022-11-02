import { shallowMount } from '@vue/test-utils'
import Navigation from "@/components/Navigation";

describe('Navigation.vue', () => {
 it('Check if title is displayed', () => {
  const wrapper = shallowMount(Navigation, {
  })
  const element = wrapper.findComponent({ref:'title'})
  expect(element.text()).toContain('TAC-Shop')
 })
})
