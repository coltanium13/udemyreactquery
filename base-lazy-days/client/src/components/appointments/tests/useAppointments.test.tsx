import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';

test.skip('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the appointments to populate
  await waitFor(() => Object.keys(result.current.appointments).length > 0);
  const filteredAppointmentsLength = Object.keys(result.current.appointments)
    .length;

  console.log(
    '---- Object.keys(result.current.appointments).length:',
    Object.keys(result.current.appointments),
  );
  // set to show all appointments
  act(() => result.current.setShowAll(true));

  console.log('second time: ', Object.keys(result.current.appointments));

  // wait for the appointments to show more than when filtered
  await waitFor(
    () =>
      Object.keys(result.current.appointments).length >
      filteredAppointmentsLength,
  );
});
