import { FC, useEffect } from 'react';
import { redirect } from 'react-router';

const NotFoundPage: FC = () => {
  useEffect(() => {
    (async () => redirect('/winter-rent-crm'))();
  }, []);

  return (
      <h1>
          <span>
              Page Not Found
          </span>
      </h1>
  );
};

export default NotFoundPage;
