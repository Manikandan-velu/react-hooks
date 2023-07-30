import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { getHorses, deleteHorse } from '../../Services/xhr';
import { IHorse } from '../../Interface/interface';
import CardInfo from '../../Components/Card/Card';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { setSelectedHorse, setLoading } from '../../Redux/Actions/Actions';
import { useHistory } from 'react-router-dom';
import { StoreState } from '../../Redux/Reducers/Reducer';
import ConfirmModal from '../../Components/ConfirmModal/ConfirmModal';
 
const Home = (props: ComponentProps)=> {

    const [horses, setHorses] = useState<IHorse[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getHorse();
    }, []);

    const getHorse = ()=> {
        props.setLoading(true)
        getHorses()
        .then(data => {
            setHorses(data.data)
            console.log('Horsess', horses)
        })
        .catch(err => {})
        .finally(() => {props.setLoading(false)});
    }

    const editHorse = (horse:IHorse)=> {
        console.log(horse);
        props.setSelectedHorse(horse)
        history.push(`/edit/${horse.id}`);
    }

    const handleDeleteHorse = (horse:IHorse)=> {
        setIsOpen(true);
        props.setSelectedHorse(horse)
        //handleOpen();
        console.log('clicked Delete', isOpen)

    }

    const handleOpen = () => {
    };

    const handleSubmit = ()=> {
        console.log('clicked Delete')
        props.setLoading(true)
        let _id = props.selectedHorse?.id;
        setIsOpen(false);
        deleteHorse(_id)
        .then(data => {
            console.log(data)
            getHorse();
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {props.setLoading(false)});

    }

    const handleClose = ()=> {
        setIsOpen(false);
    }

    return (    
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} container  direction="row"  justify="flex-end"  alignItems="center" >
                <Button variant="contained" color="primary" size="small" href="/add">
                        Add New Data
                </Button>
            </Grid>
            {horses.map((horse:IHorse, i:number)=>
                <Grid item xs={4}>
                    <CardInfo key={i}
                    horse={horse}
                    editHorse={editHorse}
                    deleteHorse={handleDeleteHorse} />
                </Grid>                
            )}
        </Grid>
        <ConfirmModal handleOpen={isOpen}
            handleSubmit={handleSubmit} 
            handleClose={handleClose}
            title='Are you Sure Want to Delete the Selected Horse ?' />
        </>

    )
}

interface ComponentProps {
    setSelectedHorse: typeof setSelectedHorse;
    setLoading: typeof setLoading
    confirmTitle: string;
    selectedHorse: IHorse
}

const mapStateToProps = (state:StoreState)=> ({
    loading: state.loading,
    selectedHorse: state.selectedHorse
})

const mapDispatchToProps = { setSelectedHorse, setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
