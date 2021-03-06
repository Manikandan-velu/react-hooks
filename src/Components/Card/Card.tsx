import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import img from '../../assets/images/horse_1.png';
import { IHorse } from '../../Interface/interface';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 175,
    },
  });

const CardInfo = (props: ComponentProps)=> {

    const classes = useStyles();

    const { horse, editHorse, deleteHorse } = props;
    console.log('horse', horse)

    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={img}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {horse.horse_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   #{horse.id} Horses are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={()=> editHorse(horse)} data-test="editHorse">
                Edit
                </Button>
                <Button size="small" color="primary" onClick={()=> deleteHorse(horse)} data-test="deleteHorse">
                Delete
                </Button>
            </CardActions>
        </Card>
    )
}

interface ComponentProps {
    horse: IHorse;
    editHorse: Function;
    deleteHorse: Function;
}

export default CardInfo;