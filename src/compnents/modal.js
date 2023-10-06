import 'dotenv/config';

const Modal = ({
  onClose,
  project
}) => {
  return (
    <div style={{ position: "absolute", left: '0px', top: '10px', background:"white",padding:'20px' }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={onClose}
          style={{
            fontSize: '40px',
            fontWeight: 'bold'
          }}
            className="w3-button w3-display-topright">&times;</span>
            <img src={project.image}
            style={{
              width: '100%',

            }}
            />
            <h3>
              {project.title}
            </h3>
          <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
