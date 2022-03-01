import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

// a helper function to get the total number of appointments from an AppointmentDateMap object
const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test.skip('filter appointments by availability_ColtonsVersion', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the appointments to populate
  await waitFor(() => Object.keys(result.current.appointments).length > 0);
  const filteredAppointmentsLength = result.current.appointments[1].length;

  console.log(
    '---- first result.current.appointments):',
    result.current.appointments[1],
  );
  // set to show all appointments
  act(() => result.current.setShowAll(true));

  console.log('second time: ', result.current.appointments[1]);

  // wait for the appointments to show more than when filtered
  await waitFor(
    () => result.current.appointments[1].length > filteredAppointmentsLength,
  );
});

// from the lecture, but not working:
test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  // to get your bearings
  // console.log(result);
  // console.log(result.current);

  // wait for the appointments to populate
  await waitFor(() => getAppointmentCount(result.current.appointments) > 0);

  const filteredAppointmentLength = getAppointmentCount(
    result.current.appointments,
  );

  // set to filter to all appointments
  // should show at least one more appointment (the one that was "taken")
  // might show more depending on what day of the month test is run on!
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more than when filtered
  await waitFor(() => {
    return (
      getAppointmentCount(result.current.appointments) >
      filteredAppointmentLength
    );
  });
});
