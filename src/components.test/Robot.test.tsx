import { fireEvent, render, screen } from '@testing-library/react';

import { Robot } from '@/components/Robot';

const MOCK_GRID_CELLS = 5;

describe('Robot component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  describe('Guarding/Alerting method', () => {
    it('If I try to move past max number of grids I will get error alert', () => {
      render(<Robot gridCells={MOCK_GRID_CELLS} />);

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
      render(<Robot gridCells={MOCK_GRID_CELLS} />);

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
      render(<Robot gridCells={MOCK_GRID_CELLS} />);
      expect(screen.getAllByRole('option')[0].selected).toBe(true);

      fireEvent.click(
        screen.getByRole('button', {
          name: /right/i,
        }),
      );
      expect(screen.getAllByRole('option')[1].selected).toBe(true);
    });

    it('Clicking left will alter Direction value', () => {
      render(<Robot gridCells={MOCK_GRID_CELLS} />);
      expect(screen.getAllByRole('option')[0].selected).toBe(true);

      fireEvent.click(
        screen.getByRole('button', {
          name: /left/i,
        }),
      );

      // Relies on options being laid out in clockwise order.
      expect(
        screen.getAllByRole('option')[screen.getAllByRole('option').length - 1]
          .selected,
      ).toBe(true);
    });
  });

  describe('Highlighting cell', () => {
    it('Changing x/y values will select correct cell', async () => {
      const MOCK_SELECTED_CELL = 1;
      render(<Robot gridCells={MOCK_GRID_CELLS} />);
      const input = screen.getByRole('spinbutton', { name: /X/ });
      fireEvent.change(input, {
        target: { value: MOCK_SELECTED_CELL },
      });
      expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });
});
