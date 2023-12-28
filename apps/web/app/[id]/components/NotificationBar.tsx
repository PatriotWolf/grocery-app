import { Snackbar, Alert } from '@mui/material';
import { NotificationType } from '../types';

interface Props {
  open: boolean;
  handleClose: (_event: React.SyntheticEvent | Event, reason?: string) => void;
  notifyData: NotificationType;
}

const FlashMessage = ({ open, handleClose, notifyData }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notifyData.severity}
        sx={{ width: '100%' }}
      >
        {notifyData.message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
