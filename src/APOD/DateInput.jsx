import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({ getAPOD }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getAPOD(e.target.value)
    }
  }
  return (
    <div>
      Search for a Picture of the Day by date in YYYY-MM-DD format. Press enter. Not out here trynna spam nasa onChange.
      If you get a youtube video as the response /shrug. Pick a different date.
      <input type="text" onKeyPress={e => handleKeyPress(e)} />
    </div>
  );
}

DateInput.propTypes = {
  getAPOD: PropTypes.func.isRequired,
};

export default DateInput;
