import Register from "@/containers/Auth/Register/Register";
import * as React from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <Register />
    </div>
  );
}
