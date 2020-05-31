import React from 'react';
import {shallow, mount} from 'enzyme';
import {findTestAttr} from '../../Utlis/helpers';
import Signup from './SignUp';

const setUp = (props={})=> {
    const Component = shallow(<Signup />);
    return Component;
}

describe('Signup Component', ()=> {

    let component: any;

    beforeEach(()=> {
        component = setUp();
    })

    it('It Should render without Render', ()=> {
        expect(findTestAttr(component, 'signupup')).toHaveLength(1);        
    })

    it('It Should render without Render', ()=> {
        expect(findTestAttr(component, 'signup-Heading')).toHaveLength(1);        
    }) 
})

 