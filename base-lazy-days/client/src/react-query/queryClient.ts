import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });
let counter = 0;

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = `react-query-error-${counter}`;
  counter += 1;
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  console.log('in error handler id: ', id);
  // prevent duplicate toasts
  // had to comment out this line becuase its not letting the toast show on the Staff page
  // or adding counter to make the id unique, shows 1 error at a time.
  toast.closeAll();
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
