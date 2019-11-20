import * as React from "react";
import { Api, IUser } from "../Api";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiContext } from "..";
import { Avatar } from "./Avatar";

export function Searchbar() {
  const api = React.useContext(ApiContext);
  const ref = React.useRef(null);
  let [text, setText] = React.useState("");
  let [results, setResults] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const func = function(e) {
      if (!ref.current.contains(e.target)) setResults([]);
    };
    document.addEventListener("mousedown", func, false);

    return function cleanup() {
      document.removeEventListener("mousedown", func, false);
    };
  }, []);

  const onChange = async e => {
    setText(e.target.value);
    if (text.length >= 3) {
      let response = await api.request("user.search", { query: text });
      setResults(response);
    }
  };

  return (
    <div ref={ref} style={{ display: "flex", position: "relative" }}>
      <FormControl
        type="text"
        placeholder="Burger Soldiers"
        className="mr-sm-2"
        value={text}
        onChange={onChange}
      />
      {!!results.length && (
        <div className="dropdown">
          <div
            className="dropdown-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {results.map((e: IUser) => {
              return (
                <div
                  onClick={() => {
                    setResults([]);
                    setText("");
                  }}
                >
                  <Link to={`/profil/${e.id}`}>
                    {" "}
                    <div className="avatar">
                      <Avatar
                        avatarId={e.avatarId}
                        userId={e.id}
                        size={27}
                        noBorder
                      />
                      &nbsp;&nbsp;
                      {e.loginName}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
