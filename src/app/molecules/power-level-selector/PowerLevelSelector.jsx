import React from 'react';
import PropTypes from 'prop-types';
import './PowerLevelSelector.scss';

import IconButton from '../../atoms/button/IconButton';
import { MenuHeader, MenuItem } from '../../atoms/context-menu/ContextMenu';

import CheckIC from '../../../../public/res/ic/outlined/check.svg';

function PowerLevelSelector({
  value, max, onSelect,
}) {
  const handleSubmit = (e) => {
    const powerLevel = e.target.elements['power-level']?.value;
    if (!powerLevel) return;
    onSelect(Number(powerLevel));
  };

  return (
    <div className="power-level-selector">
      <MenuHeader>选择权限等级</MenuHeader>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
        <input
          className="input"
          defaultValue={value}
          type="number"
          name="power-level"
          placeholder="Power level"
          max={max}
          autoComplete="off"
          required
        />
        <IconButton variant="primary" src={CheckIC} type="submit" />
      </form>
      {max >= 0 && <MenuHeader>预设</MenuHeader>}
      {max >= 100 && <MenuItem variant={value === 100 ? 'positive' : 'surface'} onClick={() => onSelect(100)}>管理员 - 100</MenuItem>}
      {max >= 50 && <MenuItem variant={value === 50 ? 'positive' : 'surface'} onClick={() => onSelect(50)}>审核 - 50</MenuItem>}
      {max >= 0 && <MenuItem variant={value === 0 ? 'positive' : 'surface'} onClick={() => onSelect(0)}>成员 - 0</MenuItem>}
    </div>
  );
}

PowerLevelSelector.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PowerLevelSelector;
