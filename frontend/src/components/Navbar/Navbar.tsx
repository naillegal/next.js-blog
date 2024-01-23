import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutAction } from "@/store/slices/authSlice";

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const authState = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = React.useCallback(() => {
    dispatch(logoutAction());
    router.push("/");
  }, [dispatch, router]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">Blog</Link>
        </Typography>
        {auth && (
          <div>
            {authState.loginStatus === "loggedIn" ? (
              <>
                <Link href="/article/add">
                  <Button color="inherit">Add Article</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
