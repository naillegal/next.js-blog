import Login from '@/containers/Auth/Login/Login';
import * as React from 'react';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <Login />
    </div>
  );
}
