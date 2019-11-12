import * as React from "react";

export interface IProfilState {}

export interface IProfilProps {}

export class Profil extends React.Component<IProfilProps, IProfilState> {
  constructor(props: IProfilProps) {
    super(props);

    this.state = {};
  }

  public render(): JSX.Element {
    return <div>Hallo Profil</div>;
  }
}
