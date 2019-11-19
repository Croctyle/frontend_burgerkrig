

export class IUser {
  id: number;
  loginName: string;
  avatarId: number;
  highscore: number;
  active: boolean;
}


export class Api {
  private _session = localStorage.getItem("session") || "";
  private get session() {
    return this._session;
  }

  private set session(session: string) {
    this._session = session;
    localStorage.setItem("session", this._session);
  }

  private _userId = localStorage.getItem("userId") || "";

  public get userId() {
    return this._userId === "" || this._userId == null
      ? null
      : Number.parseInt(this._userId);
  }

  public set userId(id) {
    this._userId = `${id}`;
    localStorage.setItem("userId", this._userId);
  }

  public self: IUser;

  private _permissionId = localStorage.getItem("permissionId") || "";

  public get permissionId() {
    return this._permissionId === "" || this._permissionId == null
      ? null
      : Number.parseInt(this._permissionId);
  }

  public set permissionId(id) {
    this._permissionId = `${id}`;
    localStorage.setItem("permissionId", this._permissionId);
  }

  private host: string;
  private port: string;
  private protocol: string;

  constructor(host?: string, port?: string, protocol?: string) {
    this.host = host || "localhost";
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
      this.session = json.session;
      this.userId = json.userId;
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
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
    }
  }

  public async register(loginName: string, hash: string) {
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
              hash
            }
          })
        }
      );
      let json = await temp.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log(err);
      throw new Error("An error has occured");
    }
  }
}
