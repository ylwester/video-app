import React from "react";
import { Modal } from "reactstrap";
import './../styles/modalVideo.css'

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
      <Modal centered size="lg" style={{maxWidth: "1120px", width: "100%", height: "630px"}} isOpen={modal} toggle={toggle}>
          <iframe
            width="1120"
            height="630"
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
