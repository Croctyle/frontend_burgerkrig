import * as React from "react";
import { Api, IUser } from "../Api";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiContext } from "..";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";

export function Searchbar() {
  const api = React.useContext(ApiContext);
  let [text, setText] = React.useState("");
  let [results, setResults] = React.useState<IUser[]>([]);

  const onChange = async e => {
    setText(e.target.value);
    if (text.length >= 4) {
      let response = await api.request("user.get", { query: text });
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
        onKeyPress={e => {
          e.preventDefault()
          console.log("123123")
        }}
      />
      {!!results.length && !!text.length && (
        <div
          style={{
            position: "absolute",
            bottom: "-25px",
            background: "white",
            fontFamily: "bangers",
            width: "240px",
            borderRadius: "4px",
            backgroundColor: "rgb(255,171,19)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {results.map((e: IUser) => {
              return (
                <div>
                  <Link to={`/profil/${e.id}`}>{e.loginName}</Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
