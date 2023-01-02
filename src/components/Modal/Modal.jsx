import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Component } from 'react';
export class Modal extends Component {
  ClickBacdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleVisibleModal();
    }
  };
  closeModalEsc = e => {
    if (e.code === 'Escape') {
      this.props.toggleVisibleModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  render() {
    const { imageModal, alt } = this.props;
    const { ClickBacdrop } = this;
    return (
      <div
        className="Overlay"
        onClick={e => {
          ClickBacdrop(e);
        }}
      >
        <div className="Modal">
          <img src={imageModal} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageModal: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
};
