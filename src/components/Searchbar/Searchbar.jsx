import PropTypes from 'prop-types';
export const Searchbar = ({ onSubmit }) => {
  const formSubmit = e => {
    e.preventDefault();
    const { search } = e.target.elements;
    onSubmit(search.value);
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={formSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
