import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';



const ConfirmModal = (props: ComponentProps)=> {
    const [open, setOpen] = React.useState(false);

    const {handleOpen, handleSubmit, handleClose, title} = props;   

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(()=> {
        console.log('confirm Box', props);
        setOpen(handleOpen);
    },[handleOpen])

    return (
        <div>        
        <Dialog
            open={handleOpen}
            onClose={()=> handleClose()}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            DELETE
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                {title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=> handleClose()} color="primary">
                Cancel
            </Button>
            <Button onClick={()=> handleSubmit()} color="secondary">
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

interface ComponentProps {
    handleOpen: boolean;
    handleSubmit: Function;
    handleClose: Function;
    title: string;
}

export default ConfirmModal;