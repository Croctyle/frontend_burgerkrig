import * as React from "react";
import { Modal } from "react-bootstrap";
import { Api } from "../Api";
import { ApiContext } from "..";

interface IAvatarProps {
  userId: number;
  avatarId: number;
  size: number;
  noBorder?: boolean;
  // injected
  api?: Api;
}

export function Avatar(props: IAvatarProps) {
  const api = React.useContext(ApiContext);
  let [show, setShow] = React.useState(false);
  let [avatar, setAvatar] = React.useState(props.avatarId);
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avatar Select</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(avatarId => {
            return (
              <img
                onClick={async () => {
                  let res = await api.request("user.setAvatar", {
                    avatarId
                  });
                  api.self = res;
                  setAvatar(avatarId);
                  setShow(false);
                }}
                style={{
                  borderRadius: "50%",
                  border: "11px solid rgb(255, 171, 19)",
                  marginTop: "35px"
                }}
                src={`media/avatar/${avatarId}.png`}
                width={`120px`}
                height={`120px`}
              />
            );
          })}
        </Modal.Body>
      </Modal>
      <img
        onClick={() => {
          // user will only chance his avatar anyways
          if (props.userId === api.self.id) {
            setShow(true);
          }
        }}
        style={{
          borderRadius: "50%",
          border: props.noBorder ? "none" : "11px solid rgb(255, 171, 19)"
        }}
        src={`media/avatar/${avatar}.png`}
        width={`${props.size ? props.size : 120}px`}
        height={`${props.size ? props.size : 120}px`}
      />
    </>
  );
}
