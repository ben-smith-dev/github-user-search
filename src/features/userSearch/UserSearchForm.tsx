import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchUser } from './usersSlice';
import SearchForm from '../../common/components/searchForm/SearchForm';

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
    <SearchForm
      onSubmit={onSubmit}
      searchRef={userSearch}
      searchPreviewText="Username"
    />
  );
};

export default UserSearchForm;
