import * as React from "react";
import { Api } from "../Api";
import { CheeseWrapper } from "./CheeseWrapper";
import { Avatar } from "./Avatar";
import { Spinner } from "./Spinner";
import { ApiContext } from "..";
import { Button, Badge } from "react-bootstrap";
import { PermissionSelect } from "./PermissionSelect";

export interface IProfilState {
  user: any;
}

export interface IProfilProps {
  id: number;

  // injected
  api?: Api;
}

export const Profil: React.FC<IProfilProps> = props => {
  const api = React.useContext(ApiContext);
  let [user, setUser] = React.useState(null);

  React.useEffect(() => {
    api
      .request("user.getById", {
        userId: props.id || api.userId
      })
      .then(e => {
        setUser(e);
      });
  }, []);
  if (!user) {
    return (
      <CheeseWrapper
        style={{
          width: "50%",
          height: "40em",
          margin: "auto",
          marginTop: "10em",
          textAlign: "center"
        }}
      >
        <Spinner />
      </CheeseWrapper>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <CheeseWrapper
        showcheese
        style={{
          margin: "auto",
          marginTop: "7em",
          textAlign: "center",
          padding: "30px"
        }}
      >
        <h2 style={{ marginTop: "20px" }}>{user.loginName}{!user.active && <Badge variant="danger">BANNED</Badge>}</h2>

        <Avatar avatarId={user.avatarId} userId={user.id} size={120} />
        <div id="stats" style={{ marginTop: "50px" }}>
          <h2>Dein Highscore</h2>
          <h4>{user.gameinfo.highscore}</h4>
          <h2>Abgefeuerte Gurken</h2>
          <h4>{user.gameinfo.shots}</h4>
          <h2>Gesamt Spielzeit</h2>
          <h4>{Math.floor(user.gameinfo.timeSpend / 60)} min</h4>
          <h2>Gesammelte Punkte Gesamt</h2>
          <h4>{user.gameinfo.points}</h4>
          {api.permissionId === 0 && <>
            <Button onClick={() => {
              api.request("user.setActive", {id: user.id, active: !user.active}).then(e => alert("Ok"));
              }}>
                Bann / Unbann
            </Button>
            <Button onClick={() => {
              api.request("user.deleteData", {id: user.id}).then(e => alert("Ok"));
              }}>
                DELETE MATCHES
            </Button>
            <PermissionSelect onChange={(e) => api.request("user.setPermission", {id: user.id, permission: Number.parseInt(e.target.value)})} defaultValue={user.permission.id}/>
          </>}
        </div>
      </CheeseWrapper>
      <div>
        <CheeseWrapper
          showcheese
          style={{
            width: "20%",
            height: "20em",
            margin: "auto",
            marginTop: "8em",
            textAlign: "center",
            position: "absolute",
            display: "inlineblock",
            marginLeft: "-27em"
          }}
        >
          <div id="rankinfo" style={{ marginTop: "30px" }}>
            <h2>Aktueller Rank</h2>
            <h3 style={{ color: user.currentRank.rank_color }}>
              {user.currentRank.rank_name}
            </h3>
            {user.nextRank.name !== user.currentRank.rank_name && (
              <>
                <h2>Nächster Rank</h2>
                <h4 style={{ color: user.nextRank.color }}>
                  {user.nextRank.name}
                </h4>
                <h4>In</h4>
                <h4>{user.nextRank.points - user.gameinfo.points} Points</h4>
              </>
            )}
          </div>
        </CheeseWrapper>
      </div>
    </div>
  );
};
