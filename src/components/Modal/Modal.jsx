import PropTypes from 'prop-types';
export const Modal = ({ imageModal, alt, toggleVisibleModal }) => {
  return (
    <div
      className="Overlay"
      onClick={() => {
        toggleVisibleModal('', '');
      }}
    >
      <div className="Modal">
        <img src={imageModal} alt={alt} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  imageModal: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
};
