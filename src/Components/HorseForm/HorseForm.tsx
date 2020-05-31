import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Input from '../../Components/Input/Input';
import { IInput, IHorse } from '../../Interface/interface';
import * as _ from "lodash";
import { addHorse, updateHorse } from '../../Services/xhr';
import { useHistory } from 'react-router-dom';
import { StoreState } from '../../Redux/Reducers/Reducer';
import {useParams} from "react-router-dom";


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

const HorseFOrm = ( props: ComponentProps )=> {
    const Name: IInput = {
        elementType: 'text',
        id: 'name',
        value: '',
        title: 'Horse Name',
        elementConfig: {
            type: 'text',
            name: 'horse_name',
        },
        validations: {
            required: {
              value: true,
              message: 'horse name is requeired',
            }
        }
    }
    const Color: IInput = {
        elementType: 'text',
        id: 'color',
        value: '',
        title: 'Color',
        elementConfig: {
            type: 'text',
            name: 'color',
        },
        validations: {
            required: {
              value: true,
              message: 'Color is requeired',
            }
        }
    }
    const Sex: IInput = {
        elementType: 'select',
        id: 'sex',
        value: '',
        title: 'Sex',
        elementConfig: {
            type: 'text',
            name: 'sex',
            options: [
                {valueEn: 'Stallion'},
                {valueEn: 'Mare'},
                {valueEn: 'Gelding'}
            ]
        }
        
    }
    const owner: IInput = {
        elementType: 'text',
        id: 'owner',
        value: '',
        title: 'Owner Name',
        elementConfig: {
            type: 'text',
            name: 'owner',
        }        
    }

    const classes = useStyles();

    const history = useHistory();

    const { horseId } = useParams();

    const { selectedHorse } = props;

    const {handleSubmit, register, errors, formState, getValues } = useForm({
        mode: "onBlur"
    });

    const [horseForm, setHorseForm] = useState({
        inputs: [Name, Color, Sex, owner]
    })
    const [editMode, setEditMode] = useState(Boolean);

    const onSubmit = (data: Object) => { 
        console.log(data) 
        return horseId ? updateHorseHandle() : addHorseHandle();
    }

    const inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedForm = { ...horseForm }
        const updatedInput: IInput = _.find<IInput | any>(updatedForm.inputs, function (o: IInput) { return o.id == inputIdentifier; });
        updatedInput.value = event.target.value
        setHorseForm(updatedForm)
    }

    const addHorseHandle = ()=> {
        const horse = getValues();
        console.log('add', horse);
        addHorse(horse)
        .then((data)=> {
            console.log(data)
            history.push('/list');
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {        
        console.log('URL PARAMS', horseId)
        const savedObj = checkEditMode();
        if(savedObj){
            const forms = {...horseForm}
            forms.inputs.map((el)=> {
                if(el.id === 'name'){
                    el.value = selectedHorse.horse_name;
                }else if(el.id === 'color'){
                    el.value = selectedHorse.color!;
                }else if (el.id === 'sex'){
                    let sexFormate = selectedHorse.sex ? selectedHorse.sex.toString() : '';
                    el.value = sexFormate;
                }
            })
            setHorseForm(forms);
        }
        console.log('Horse Form Edit', horseForm)
    }, [])

    const checkEditMode = ()=> {
        let edit = history.location.pathname.includes('edit') ? true : false;
        setEditMode(edit);
        console.log(editMode)
        return edit
    }

    const updateHorseHandle = ()=> {
        const horse = getValues();
        console.log(horseId)
        horse.id = horseId;
        updateHorse(horse)
        .then((data)=> {
            console.log(data)
            history.push('/list');
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography gutterBottom variant="h5" component="h2">
                    Add Horses
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} container  direction="column"  justify="center"  alignItems="center" >                    
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    {horseForm.inputs.map((input: IInput, i) => 
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
                <div>
                    <Button type="submit" className="btn-primary mt-4">{horseId ? 'Update' : 'Add'}</Button>
                </div>
            </form>                  
                </Grid>            
            </Grid>
            </Paper>
        </div>
    )
}

interface ComponentProps{
    selectedHorse: IHorse
}

const mapStateToProps = (state: StoreState) => ({
    selectedHorse: state.selectedHorse
})

export default connect(mapStateToProps, null)(HorseFOrm);