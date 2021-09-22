import { useState } from 'react';

export const Searchbar = ({ handlerOnSubmit }) => {
  const [request, setRequest] = useState('home');

  const onChange = ({ target: { value } }) => {
    setRequest(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handlerOnSubmit(request);
    setRequest('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="request"
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={request}
          onChange={onChange}
        />
      </form>
    </header>
  );
};
