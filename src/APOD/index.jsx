import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from './APODDuck.js';

import DateInput from './DateInput';

import './styles.scss';

class APOD extends Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    actions: PropTypes.shape({
      getAPOD: PropTypes.func,
    }).isRequired,
    error: PropTypes.string,
    stage: PropTypes.symbol.isRequired,
  };

  static defaultProps = {
    data: Map(),
    error: "",
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getAPOD('2018-10-02');
  }

  render() {
    const { actions, data, error, stage } = this.props;

    return (
      <div className="apod">
        <div>
          Fetch stage:
          &nbsp;
          {stage.toString()}
        </div>

        <p>
          NASA Picture of the day
        </p>

        <DateInput getAPOD={actions.getAPOD} />

        {error &&
          (
            <div>
              There was an error: 
              &nbsp;
              {error}
            </div>
          )
        }
        {data.get('url') &&
          <img alt="space" src={data.get('url')} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ APODReducer }) => ({
  ...APODReducer.toObject()
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
  dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(APOD);
