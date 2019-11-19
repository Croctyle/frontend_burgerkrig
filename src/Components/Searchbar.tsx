import * as React from "react";
import { Api, IUser } from "../Api";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiContext } from "..";

export function Searchbar() {
  const api = React.useContext(ApiContext);
  let [text, setText] = React.useState("");
  let [results, setResults] = React.useState<IUser[]>([]);

  const onChange = async e => {
    setText(e.target.value);
    if (text.length >= 4) {
      let response = await api.request("user.get", {});
      setResults(response);
    }
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <FormControl
        type="text"
        placeholder="Burger Soldiers"
        className="mr-sm-2"
        value={text}
        onChange={onChange}
      />
      {!!results.length && !!text.length && (
        <div
          style={{
            position: "absolute",
            bottom: "-90px",
            background: "white",
            fontFamily: "bangers",
            width: "240px",
            borderRadius: "4px",
            backgroundColor: "rgb(255,171,19)"
          }}
        >
          <ul>
            {results.map((e: IUser) => {
              return (
                <li>
                  <Link to={`/profil/${e.id}`}>{e.loginName}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
