import React from 'react';
import {shallow, mount} from 'enzyme';
import {findTestAttr} from '../../Utlis/helpers';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Login from './Login';

const mockStore = configureMockStore();
const store = mockStore({});

interface IResponse {
    status: "SUCCESS" | "ERROR";
  }

  const mockCallBack = jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
        return {
        __esModule: true,
        ...originalModule,
        useRouteMatch: { url: '/login' },
        useHistory: jest.fn(),
        };
    });

const setUp = (props={})=> {   
    
    const Component = mount(<Provider store={store}><Login login={mockCallBack} /></Provider>).childAt(0);
    console.log('setUp', Component.debug());
    return Component;
}

 describe('Login Test', ()=> {

    let component: any;

    beforeEach(()=> {
        component = setUp();
    })

    it('It Should render without Render', ()=> {
        console.log('component', component.debug());

        component.find('#loginForm').simulate('click', { preventDefault() {} });
        expect(component.find('#loginForm').exists()).toBe(true);

    })

    it('should call the mock login function', () => {


        component.find('#loginForm').simulate(
            'submit', 
            {preventDefault() {}}
        )
        expect(mockCallBack.mock.call.length).toBe(1)
    })

    it('should be called with the email and password in the state as arguments', () => {
        component.find('#email').simulate(
            'change', 
            {target: 
              {name: 'email', value: 'blah@gmail.com'}
            }
          )
          component.find('#password').simulate(
            'change', 
            {target: 
               {name: 'password', value: 'cats'}
            }
          )
          component.find('#loginForm').simulate(
            'submit', 
            {preventDefault() {}}
          )
          expect(mockCallBack.mock.caller).toEqual(
            {email: 'blah@gmail.com', password: 'cats'}
          )
    })    
 })