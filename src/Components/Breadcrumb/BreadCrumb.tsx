import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  console.info('You clicked a breadcrumb.');
}

const SimpleBreadcrumbs = ()=> {
    console.log('BreadCrumb')
  return (
    <Grid container xs={9}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/list" onClick={handleClick}>
            Horse
        </Link>
        <Link color="inherit" href="/add" onClick={handleClick}>
            Add
        </Link>
        </Breadcrumbs>
    </Grid>
    
  );
}

export default SimpleBreadcrumbs;