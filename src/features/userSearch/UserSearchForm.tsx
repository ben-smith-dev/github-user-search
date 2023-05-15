import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchUser } from './userSlice';

const UserSearchForm: React.FC = () => {
  const userSearch = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const username = userSearch.current?.value;

    if (username) {
      dispatch(fetchUser(username));
    }

    // Clear search value.
    if (userSearch.current) {
      userSearch.current.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="userSearchInput">Username</label>
      <input
        type="search"
        id="userSearchInput"
        autoComplete="off"
        ref={userSearch}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default UserSearchForm;
