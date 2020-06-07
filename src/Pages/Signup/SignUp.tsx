import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../..//Components/Input/Input';
import { IInput, ISignup } from '../../Interface/interface';
import {signUp} from '../../Services/xhr';
import * as _ from "lodash";
import { Paper, Typography, Grid, makeStyles, createStyles, Theme, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 600,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }),
);

const Signup = ()=> {
    
    const Firstname: IInput = {
        elementType: 'text',
        id: 'first_name',
        value: '',
        title: 'First Name',
        elementConfig: {
            type: 'text',
            name: 'first_name',
        },
        validations: {
            required: {
              value: true,
              message: 'First Name is requeired',
            }
        }
    }

    const Lastname: IInput = {
        elementType: 'text',
        id: 'last_name',
        value: '',
        title: 'Last Name',
        elementConfig: {
            type: 'text',
            name: 'last_name',
        },
        validations: {
            required: {
              value: true,
              message: 'Last Name is requeired',
            }
        }
    }

    const Email: IInput = {
        elementType: 'text',
        id: 'email',
        value: '',
        title: 'Work Email',
        elementConfig: {
            type: 'text',
            name: 'email',
        },
        validations: {
            required: {
              value: true,
              message: 'Email is requeired',
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter valid email'
              }
        }
    }

    const Phone: IInput = {
        elementType: 'text',
        id: 'phone_number',
        value: '',
        title: 'Phone',
        elementConfig: {
            type: 'number',
            name: 'phone_number',
        },
        validations: {
            required: {
              value: true,
              message: 'Phone Number is requeired',
            }
        }
    }

    const classes = useStyles();


    const {handleSubmit, register, errors, formState, getValues } = useForm({
        mode: "onBlur"
    });

    const { isValid } = formState;

    const [signupForm, setSignupForm] = useState({
        inputs: [Firstname, Lastname, Email, Phone]
    })

    const [userTypes, setUserTypes] = useState([
        {id:1, name: 'owner'},
        {id:2, name: 'rider'},
        {id:3, name: 'trainer'},
        {id:4, name: 'others'},
    ])

    const inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedForm = { ...signupForm }
        const updatedInput: IInput = _.find<IInput | any>(updatedForm.inputs, function (o: IInput) { return o.id == inputIdentifier; });
        updatedInput.value = event.target.value
        setSignupForm(updatedForm)
    }

    const onSubmit = (data: Object) => { 
        console.log(data) 
    }

    const userSignup = ()=> {
        const signup: ISignup = getValues();
        signUp(signup)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography data-testid='title' gutterBottom variant="h5" component="h2">
                    Signup
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} container  direction="column"  justify="center"  alignItems="center" >                    
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    {signupForm.inputs.map((input: IInput, i) => 
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
                    <div className="form-item mt-4">
                        {userTypes.map((radio:any, i)=> 
                            <div className="custom-radio">
                                <input name='role' type="radio" value={radio.id} ref={register({ required: true })}/> 
                                <span>{radio.name}</span>
                            </div>
                        )}
                    </div>                                                        
                <div>
                    <button type="submit" className="btn btn-primary mt-4" disabled={!isValid} onClick={()=> userSignup()}>Signup</button>
                </div>
            </form>                  
                </Grid>            
            </Grid>
            </Paper>
        </div>
    )
}

export default Signup;