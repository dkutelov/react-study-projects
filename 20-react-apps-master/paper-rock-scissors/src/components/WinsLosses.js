import React from 'react';

export default function WInsLosses({ wins, losses }) {
  return (
    <div className='wins-losses'>
      <div className='wins'>
        <span className='number'>{wins}</span>
        <span className='text'>Win{wins !== 1 ? 's' : ''}</span>
      </div>

      <div className='losses'>
        <span className='number'>{losses}</span>
        <span className='text'>Loss{losses !== 1 ? 'es' : ''}</span>
      </div>
    </div>
  );
}
