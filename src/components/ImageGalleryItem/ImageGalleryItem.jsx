import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';
export class ImageGalleryItem extends Component {
  state = {
    modal: false,
    imageModal: '',
    alt: '',
  };
  toggleVisibleModal = (imageModal, alt) => {
    console.log(imageModal);
    this.setState(prevState => ({
      modal: !prevState.modal,
      imageModal,
      alt,
    }));
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { modal, imageModal, alt } = this.state;
    const { toggleVisibleModal } = this;
    return (
      <>
        <li className="ImageGalleryItem">
          <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
            onClick={() => {
              toggleVisibleModal(largeImageURL, tags);
            }}
          />
        </li>
        {modal && (
          <Modal
            imageModal={imageModal}
            alt={alt}
            toggleVisibleModal={toggleVisibleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
