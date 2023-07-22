/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {useState} from 'react';
import './Login.scss';
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IInput, ILogin } from '../../Interface/interface';
import Input from '../../Components/Input/Input';
import { login } from '../../Services/xhr';
import * as _ from "lodash";
import sha512 from 'js-sha512';
import { useHistory, Link } from "react-router-dom";
import Loading from '../../Components/Loading/Loading';
import { setToken, setLoading, setToaster } from '../../Redux/Actions/Actions';
import { StoreState } from '../../Redux/Reducers/Reducer';
import { toast } from 'react-toastify';


const Login = ( props: ComponentProps )=> {

    const Email: IInput = {
        elementType: 'text',
        id: 'email',
        value: '',
        title: 'Email',
        elementConfig: {
            type: 'text',
            name: 'email',
        },
        validations: {
            required: {
              value: true,
              message: 'Email is requeired',
            }
        }
    }

    const Password: IInput = {
        elementType: 'password',
        id: 'password',
        value: '',
        title: 'Password',
        elementConfig: {
            type: 'password',
            name: 'password',
        },
        validations: {
            required: {
              value: true,
              message: 'Password is requeired',
            }
        }
    }

    const {setLoading, setToaster, setToken} = props;

    const {handleSubmit, register, errors, formState, getValues } = useForm({
        mode: "onBlur"
    });

    const [serverValidation, setServerValidation] = useState();

    const [loginForm, setLoginForm] = useState({
        inputs: [Email, Password]
    })

    const onSubmit = (data: Object) => { console.log(data) }

    const history = useHistory()

    const inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedForm = { ...loginForm }
        const updatedInput: IInput = _.find<IInput | any>(updatedForm.inputs, function (o: IInput) { return o.id == inputIdentifier; });
        updatedInput.value = event.target.value
        setLoginForm(updatedForm)
    } 

    const signIn = ()=> {
        const user : ILogin = getValues();        
        user.password = user.password ? sha512.sha512(user.password) : '';
        if(_.some(getValues())){
            setLoading(true);
            login(user)
            .then(result => {
                console.log(result.data)
                localStorage.setItem('access_token', result.data.access_token);
                const toast = {
                    type: 'success',
                    message: 'Login Successfully !!!'
                }
                setToaster(toast)
                setToken(true);
                history.push('/list');          
            })
            .catch(err => {
                console.log(err.response)
                const toast ={
                    type: 'error',
                    message: err.response.data.errors
                }
                setToaster(toast)
                setServerValidation(err.response.data.errors);
            })
            .finally(()=> setLoading(false))
        }        
    }

    return (        
        <div className="form-container" data-testid="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                    {loginForm.inputs.map((input: IInput, i) => 
                        <Input key={i}
                            elementType={input.elementType}
                            elementConfig={input.elementConfig}
                            title={input.title}
                            registerInput={register}
                            errorsInput={errors}
                            changed={(event: any) => inputChangedHandler(event, input.id)}
                            value={input.value}
                            validations={input.validations}
                        />
                    )}
                {serverValidation && <p className="mt-2 text-danger">{serverValidation}</p>}                     
                <div>
                    <Button data-test="loginForm" id="loginForm" type="submit" variant="primary" className="btn-primary mt-4 mb-2" onClick={() => signIn()}>Login Now</Button>
                </div>
                <Link to='signup'>Don't have account ? Register Now</Link>
            </form>
        </div>
    )
}

interface ComponentProps {
    setToken : typeof setToken;
    loading?: boolean;
    setLoading: typeof setLoading;
    setToaster: typeof setToaster;
    login?: any;
    store?: any;
}

const mapStateToProps = (state:StoreState)=> ({
    loading: state.loading
})

const mapDispatchToProps = { setToken, setLoading, setToaster }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
