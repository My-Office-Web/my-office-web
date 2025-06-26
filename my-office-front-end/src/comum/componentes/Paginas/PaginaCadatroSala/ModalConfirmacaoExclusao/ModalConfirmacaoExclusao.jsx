import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Slide,
  IconButton,
  CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ModalConfirmacaoExclusao({
  open,
  onClose,
  onConfirm,
  salaId,
  loading = false,  
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose} 
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        },
      }}
    >
      <IconButton
        onClick={loading ? null : onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        aria-label="fechar"
        disabled={loading}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 1,
          mt: 1,
          justifyContent: "center",
          color: "#d32f2f",
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 40 }} />
        <DialogTitle
          sx={{
            fontWeight: "700",
            fontSize: "1.6rem",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          Confirmação de Exclusão
        </DialogTitle>
      </Box>

      <DialogContent dividers sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontSize: 16, mb: 1 }}>
          Você tem certeza que deseja excluir a sala?
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Esta ação é irreversível e todos os dados relacionados serão
          permanentemente removidos.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          pb: 2,
          pt: 1,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{
            flexGrow: 1,
            borderColor: "grey.400",
            color: "grey.700",
            "&:hover": {
              borderColor: "grey.600",
              backgroundColor: "grey.100",
            },
          }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            flexGrow: 1,
            fontWeight: "700",
            textTransform: "none",
            boxShadow:
              "0 4px 8px rgba(211,47,47,0.3), 0 0 4px rgba(211,47,47,0.2)",
            "&:hover": {
              boxShadow:
                "0 6px 14px rgba(211,47,47,0.45), 0 0 8px rgba(211,47,47,0.35)",
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Excluir"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
