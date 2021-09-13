import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const LogoutDialog = ({ open, onClose, onLogout }) => {
  const handleClose = () => {
    onClose();
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to logout?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You must be logged in to use the "Compare States" feature.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleLogout}
          color="primary"
          variant="outlined"
          autoFocus
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
