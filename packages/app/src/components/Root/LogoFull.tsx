import React from 'react';
import { makeStyles } from '@material-ui/core';
import myCustomLogoFull from './logo/janus-transparent.png'

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 50,
  },
  path: {
    fill: '#151515',
  },
});

const LogoFull = () => {
  const classes = useStyles();
  return <img className={classes.svg} src={myCustomLogoFull} />
};

export default LogoFull;
