import { shallowMount } from '@vue/test-utils'
import NotFound from "@/views/NotFound";

describe('NotFound.vue', () => {
 it('Check if title is displayed', () => {
  const wrapper = shallowMount(NotFound, {
  })
  const element = wrapper.findComponent({ref:'title'})
  expect(element.text()).toContain('(404) Page Not Found')
 })
})
