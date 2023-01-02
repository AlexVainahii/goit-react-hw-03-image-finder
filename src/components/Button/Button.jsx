import PropTypes from 'prop-types';
export const Button = ({ onClick }) => {
  return (
    <button
      className="Button"
      type="button"
      name="loadMore"
      onClick={() => onClick()}
    >
      Load More
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
