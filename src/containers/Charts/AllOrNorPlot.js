import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair,
  makeWidthFlexible
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class AllOrNorPlot extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    period: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    crosshairValues: PropTypes.array.isRequired,
    clearCrosshairValues: PropTypes.func.isRequired,
    updateCrosshairValues: PropTypes.func.isRequired,
    updatePieValues: PropTypes.func.isRequired,
  };

  _onNearestX(value) {
    this.props.updateCrosshairValues(value.x);
    this.props.updatePieValues();
  }

  _onMouseLeave() {
    this.props.clearCrosshairValues();
    this.props.updatePieValues();
  }

  render() {
    const {data, period, unit, crosshairValues} = this.props;

    const dataAll = data.map(pt => ({x: pt.x, y: pt.all}));
    const dataOpReturn = data.map(pt => ({x: pt.x, y: pt.op_return}));
    const dataNonOpReturn = data.map(pt => ({x: pt.x, y: pt.non_op_return}));
    const ticks = data.map(pt => pt.x);

    let dateFormat;
    if (period === 'day') dateFormat = 'DD MMM YYYY';
    if (period === 'week') dateFormat = 'DD MMM YYYY';
    if (period === 'month') dateFormat = 'MMM YYYY';
    if (period === 'year') dateFormat = 'YYYY';

    let unitNamePl;
    if (unit === 'block') unitNamePl = 'Blocks';
    if (unit === 'transaction') unitNamePl = 'Transactions';
    if (unit === 'signal') unitNamePl = 'Signals';

    const itemsFormat = (values) => [
      {title: 'ALL', value: values[0].all},
      {title: 'OP_RETURN', value: values[0].op_return},
      {title: 'NON_OP_RETURN', value: values[0].non_op_return},
    ];

    const titleFormat = (values) => ({
      title: 'date',
      value: moment(values[0].x).format(dateFormat)
    });

    const labelFormat = (xVal) => {
      return moment(xVal).format(dateFormat);
    };

    return (
      <div>
        <h4>{unitNamePl} per {period}</h4>
        <FlexibleXYPlot onMouseLeave={::this._onMouseLeave} height={300} xType="time-utc">
          <HorizontalGridLines />
          <VerticalGridLines />
          <LineSeries onNearestX={::this._onNearestX} data={dataAll} />
          <LineSeries data={dataOpReturn} />
          <LineSeries data={dataNonOpReturn} />
          <XAxis title={period} labelFormat={labelFormat} labelValues={ticks} tickValues={ticks} />
          <YAxis title={`# of ${unit}s`} />
          <Crosshair titleFormat={titleFormat} itemsFormat={itemsFormat} values={crosshairValues} />
        </FlexibleXYPlot>
      </div>
    );
  }

}
