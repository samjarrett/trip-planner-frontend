import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Snack = ({open, handleClose, children, autoHideDuration = 6000}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{children}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
export default Snack;
