import React from 'react'
import { shallow } from 'enzyme'
import HeaderTest from '../../components/HeaderTest'

// import ReactShallowRenderer from 'react-test-renderer/shallow'
// test('should render Header correctly', () => {
// 	const renderer = new ReactShallowRenderer()
// 	renderer.render(<HeaderTest />)
// 	expect(renderer.getRenderOutput()).toMatchSnapshot()
// })

test('should render Header correctly', () => {
	const wrapper = shallow(<HeaderTest />)
	expect(wrapper).toMatchSnapshot()
	//expect(wrapper.find('h1').text()).toBe('Expensify')
})
