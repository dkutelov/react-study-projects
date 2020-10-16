import React from 'react'

import ArticleList from '../components/ArticleList'

//import renderer from 'react-test-renderer'

// shallow does not render artice like tree only ArticleList
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'

describe('ArticleList', () => {
    const testProps = {
        articles : {
            a : { id: 'a', date: '123', title: '123', body: '123' },
            b : { id: 'b', date: '123', title: '123', body: '123' }
        }
        // store    : {
        //     lookupAuthor : jest.fn(() => ({}))
        // }
    }

    it('renders correctly', () => {
        //const tree = renderer.create(<ArticleList {...testProps} />).toJSON()
        //expect(tree).toMatchSnapshot()
        // expect(tree.children.length).toBe(2)
        const wrapper = shallow(<ArticleList {...testProps} />)
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.getElement().props.children.length).toBe(2)
    })
})
