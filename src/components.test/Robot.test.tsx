import { fireEvent, render, screen } from '@testing-library/react';

import { Robot } from '@/components/Robot';

const MOCK_GRID_CELLS = 5;

describe('Robot component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  describe('Guarding/Alerting method', () => {
    it('If I try to move past max number of grids I will get error alert', () => {
      render(<Robot gridCells={5} />);

      for (let i = 0; i < MOCK_GRID_CELLS; i += 1) {
        fireEvent.click(
          screen.getByRole('button', {
            name: /move/i,
          }),
        );
      }

      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('Trying to move off edge I will get error alert', async () => {
      render(<Robot gridCells={5} />);

      // Relies on default position being right, would need to be updated to handle other scenarious for prod-ready code.
      fireEvent.click(
        screen.getByRole('button', {
          name: /right/i,
        }),
      );

      fireEvent.click(
        screen.getByRole('button', {
          name: /move/i,
        }),
      );

      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  describe('Moving direction', () => {
    it('Clicking right will alter Direction value', () => {
      render(<Robot gridCells={5} />);
      expect(screen.getAllByRole('option')[0].selected).toBe(true);

      fireEvent.click(
        screen.getByRole('button', {
          name: /right/i,
        }),
      );
      expect(screen.getAllByRole('option')[1].selected).toBe(true);
    });
  });
});
