import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';
export const Loader = ({ isLoading }) => {
  return (
    <>
      <Dna
        visible={isLoading}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </>
  );
};
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
