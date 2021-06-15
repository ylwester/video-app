import React from "react";
import { Modal } from "reactstrap";

interface ModalVideoProps {
  toggle: () => void;
  modal: boolean;
  videoId: string | undefined;
}

export const ModalVideo: React.FC<ModalVideoProps> = ({
  videoId,
  toggle,
  modal,
}) => {
  

  return (
    <div>
      <Modal style={{width: "560px", height: "315px"}} isOpen={modal} toggle={toggle}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
      </Modal>
    </div>
  );
};
