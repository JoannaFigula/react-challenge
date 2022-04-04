import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '22px',
    textTransform: 'capitalize',
    borderRadus: '4px',
    padding: '8px 12px',
    boxShadow: 'none',
    '&.MuiButton-containedPrimary': {
      color: '#fff',
      background: '#334ACC',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#223289',
        opacity: '100%',
      },
      '&:active': {
        backgroundColor: '#223289',
      },
    },

    '&.MuiButton-outlinedPrimary': {
      color: '#334ACC',
      background: '#E8EAF6',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        color: '#223289',
        backgroundColor: '#C5CAE9',
        opacity: '100%',
      },
      '&:active': {
        color: '#223289',
        backgroundColor: '#C5CAE9',
      },
    },

    '&.MuiButton-containedError': {
      color: '#FF5D5D',
      background: '#FCECE6',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        color: '#fff',
        backgroundColor: '#FF5D5D',
        opacity: '100%',
      },
      '&:active': {
        color: '#FF5D5D',
        background: '#FCECE6',
      },
    },

    '&.MuiButton-outlinedError': {
      color: '#FF5D5D',
      background: '#fff',
      border: '1px solid #FF5D5D',
      '&:hover': {
        color: '#FF5D5D',
        backgroundColor: '#FCECE6',
        opacity: '100%',
      },
      '&:active': {
        color: '#FF5D5D',
        backgroundColor: '#FCECE6',
      },
    },

    '&.MuiButton-containedSuccess': {
      color: '#00A980',
      background: '#DBEBDB',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        color: '#fff',
        backgroundColor: '#00A980',
      },
      '&:active': {
        color: '#00A980',
        backgroundColor: '#DBEBDB',
        boxShadow: 'none',
      },
    },

    '&.MuiButton-outlinedSuccess': {
      color: '#00A980',
      background: '#FFF',
      border: '1px solid #66BB6A',
      boxShadow: 'none',
      opacity: '100%',
      '&:hover': {
        backgroundColor: '#DBEBDB',
      },
      '&:active': {
        color: '#00A980',
        backgroundColor: '#DBEBDB',
      },
    },

    '&.MuiButton-containedWarning': {
      color: '#B28C09',
      background: '#FFF5D2',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        color: '#fff',
        backgroundColor: '#FFA726',
      },
      '&:active': {
        color: '#B28C09',
        backgroundColor: '#FFF5D2',
      },
    },

    '&.MuiButton-outlinedWarning': {
      color: '#FFA726',
      background: '#FFF',
      border: '1px solid #FFA726',
      boxShadow: 'none',
      '&:hover': {
        color: '#FFA726',
        backgroundColor: '#FFF5D2',
      },
      '&:active': {
        color: '#FFA726',
        backgroundColor: '#FFF5D2',
      },
    },
  },
}));

export function Button({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiButton className={classes.root} {...props}>
      {children}
    </MuiButton>
  );
}
