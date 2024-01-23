import * as React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { loginAction } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useAppDispatch()
  const authState = useAppSelector(state => state.auth)
  const router = useRouter()

  React.useEffect(()=>{
    if (authState.loginStatus === `loggedIn`) {
      router.push('/')
    }
  }, [authState.loginStatus, router])

  const submitHandler = React.useCallback((e: React.MouseEvent)=>{
    dispatch(loginAction({username, password}));
  }, [dispatch, username, password])

  return (
    <div className="w-5/12 mx-auto mt-40 bg-slate-100 flex flex-col justify-between gap-10 p-4 rounded-md">
      <div className="text-black text-center text-3xl">Login</div>
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth onChange={e => setUsername(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password" onChange={e => setPassword(e.target.value)}/>
      <Button variant="outlined" size="large" onClick={submitHandler}>Login</Button>
    </div>
  );
}
