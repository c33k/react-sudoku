import React, { FocusEvent, FormEvent } from 'react';

import './Cell.css';

interface CellProps {
  value: number;
  row: number;
  col: number;
  className?: string;
  disabled: boolean;
  onSetValue: (value: number, r: number, c: number) => void;
}
const Cell: React.FC<CellProps> = ({
  col,
  row,
  disabled,
  onSetValue,
  value,
}: CellProps) => {
  const [editing, setEditing] = React.useState(false);

  const onBlur = (event: FocusEvent) => {
    setEditing(false);
  };

  const onStartEditing = () => {
    if (!disabled) {
      setEditing(true);
    }
  };

  const onFinishEditing = (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
  };
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);

    if (newValue >= 0 && newValue <= 9) {
      onSetValue(Number(event.currentTarget.value), row, col);
    }
  };

  const _renderCellInput = () => {
    return (
      <form onSubmit={onFinishEditing}>
        <input
          autoFocus={true}
          onChange={handleChange}
          onBlur={onBlur}
          value={value > 0 ? value : ''}
        />
      </form>
    );
  };

  const style: React.CSSProperties = {
    fontWeight: disabled ? 'bold' : 'normal',
  };

  return (
    <button className="Cell" onClick={onStartEditing}>
      {editing ? (
        _renderCellInput()
      ) : (
        <span style={style}>{value > 0 ? value : ''}</span>
      )}
    </button>
  );
};

export default Cell;
