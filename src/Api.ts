import * as Cookie from "js-cookie";


export class IUser {
  id: number;
  loginName: string;
  avatarId: number;
  highscore: number;
  active: boolean;
}

export class Api {
  public get session() {
    return Cookie.get("session");
  }

  public set session(session: string) {
    Cookie.set("session", session);
  }


  public get userId() {
    return Number.parseInt(Cookie.get("userId"));
  }

  public set userId(id) {
    Cookie.set("userId", id)
  }

  public self: IUser;

  public get permissionId() {
    return Number.parseInt(Cookie.get("permissionId"))
  }

  public set permissionId(id) {
    Cookie.set("permissionId", id);
  }

  private host: string;
  private port: string;
  private protocol: string;

  constructor(host?: string, port?: string, protocol?: string) {
    this.host = host || "www.nycaria.de";
    this.protocol = protocol || "http";
    this.port = port || "1234";
  }

  public async logout() {
    this.session = undefined;
    this.userId = undefined;
  }

  public async request(path: string, data: any) {
    try {
      let temp = await fetch(
        `${this.protocol}://${this.host}:${this.port}/rpc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            path,
            userId: this.userId,
            session: this.session,
            data
          })
        }
      );
      let json = await temp.json();
      // this.session = json.session;
      // this.userId = json.userId;
      return json.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async validate() {
    let ret = await this.request("user.validate", {
      session: this.session,
      id: this.userId
    });

    this.self = ret;
    return ret ? !!ret.loginName : false;
  }

  public async login(loginName: string, hash: string) {
    try {
      let temp = await fetch(
        `${this.protocol}://${this.host}:${this.port}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              loginName,
              hash
            }
          })
        }
      );
      let json = await temp.json();
      if (json.data.session) {
        this.session = json.data.session;
        this.userId = json.data.userId;
        this.permissionId = json.data.permissionId;
        return {
          login: true,
          data: json.data
        }
      } else {
        return {
          login: false,
          data: json.data
        }
      };
    } catch (err) {
      console.log(err);
    }
  }

  public async register(loginName: string, hash: string, avatarId: number) {
    try {
      let temp = await fetch(
        `${this.protocol}://${this.host}:${this.port}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              loginName,
              hash,
              avatarId
            }
          })
        }
      );
      let json = await temp.json();
      return json;
    } catch (err) {
      console.log(err);
      throw new Error("An error has occured");
    }
  }
}
