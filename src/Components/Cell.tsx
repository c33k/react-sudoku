import React, { FormEvent } from 'react';

import './Cell.css';

interface CellProps {
  value: number;
  row: number;
  col: number;
  className?: string;
  onSetValue: (value: number, r: number, c: number) => void;
}
const Cell: React.FC<CellProps> = (props: CellProps) => {
  const [editing, setEditing] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(props.value);

  const { col, row, onSetValue } = props;

  const onBlur = () => {
    setEditing(false);
    setLocalValue(props.value);
  };

  const onStartEditing = () => {
    setEditing(true);
  };

  const onFinishEditing = (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);
    onSetValue(localValue, row, col);
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);

    if (newValue >= 1 && newValue <= 9) {
      setLocalValue(Number(event.currentTarget.value));
    }
  };

  const _renderCellInput = () => {
    return (
      <form onSubmit={onFinishEditing}>
        <input
          autoFocus={true}
          onChange={handleChange}
          onBlur={onBlur}
          value={localValue > 0 ? localValue : ''}
        />
      </form>
    );
  };

  return (
    <button className="Cell" onClick={onStartEditing}>
      {editing ? (
        _renderCellInput()
      ) : (
        <span>{localValue > 0 ? localValue : ''}</span>
      )}
    </button>
  );
};

export default Cell;
