import * as React from "react";
import { inject } from "mobx-react";
import { Api } from "../Api";

export interface IProfilState {}

export interface IProfilProps {
  id: number;

  // injected
  api?: Api;
}

@inject("api")
export class Profil extends React.Component<IProfilProps, IProfilState> {
  constructor(props: IProfilProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return <div>Hallo Profil</div>;
  }
}
