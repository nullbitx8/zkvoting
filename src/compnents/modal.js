import 'dotenv/config';

const Modal = ({
                 open,
                 onClose,
                 project
               }) => {
  const style = open
    ? {
      display: "block"
    }
    : {
      display: "none"
    };
  return (
    <div className="w3-modal" style={style}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={onClose}
                className="w3-button w3-display-topright">&times;</span>
          <div dangerouslySetInnerHTML={{__html: project.description}}></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
