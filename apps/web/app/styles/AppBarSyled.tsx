"use client";
import { AppBar, AppBarProps, styled } from "@mui/material";

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "white",
}));

export default AppBarStyled;
