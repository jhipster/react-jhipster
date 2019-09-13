import * as React from 'react';
import { TextFormat } from '../../formatter';
import { Progress, Col, Row } from 'reactstrap';

export interface ISystemMetricsProps {
  systemMetrics: any;
  wholeNumberFormat: string;
  timestampFormat: string;
}

export class SystemMetrics extends React.Component<ISystemMetricsProps> {
  static convertMillisecondsToDuration(ms) {
    const times = {
      year: 31557600000,
      month: 2629746000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000
    };
    let timeString = '';
    let plural = '';
    for (const key in times) {
      if (Math.floor(ms / times[key]) > 0) {
        plural = Math.floor(ms / times[key]) > 1 ? 's' : '';
        timeString += Math.floor(ms / times[key]).toString() + ' ' + key.toString() + plural + ' ';
        ms = ms - times[key] * Math.floor(ms / times[key]);
      }
    }
    return timeString;
  }

  render() {
    const { systemMetrics, wholeNumberFormat, timestampFormat } = this.props;
    return (
      <div>
        <h4>System</h4>
        <Row>
          <Col md="4">Uptime</Col>
          <Col md="8" className="text-right">
            {SystemMetrics.convertMillisecondsToDuration(systemMetrics['process.uptime'])}
          </Col>
        </Row>
        <Row>
          <Col md="4">Start time</Col>
          <Col md="8" className="text-right">
            <TextFormat value={systemMetrics['process.start.time']} type="date" format={timestampFormat} />
          </Col>
        </Row>
        <Row>
          <Col md="9">Process CPU usage</Col>
          <Col md="3" className="text-right">
            <TextFormat value={100 * systemMetrics['process.cpu.usage']} type="number" format={wholeNumberFormat} /> %
          </Col>
        </Row>
        <Progress animated value={100 * systemMetrics['process.cpu.usage']} color="success">
          <span>
            <TextFormat value={100 * systemMetrics['process.cpu.usage']} type="number" format={wholeNumberFormat} /> %
          </span>
        </Progress>
        <Row>
          <Col md="9">System CPU usage</Col>
          <Col md="3" className="text-right">
            <TextFormat value={100 * systemMetrics['system.cpu.usage']} type="number" format={wholeNumberFormat} /> %
          </Col>
        </Row>
        <Progress animated value={100 * systemMetrics['system.cpu.usage']} color="success">
          <span>
            <TextFormat value={100 * systemMetrics['system.cpu.usage']} type="number" format={wholeNumberFormat} /> %
          </span>
        </Progress>
        <Row>
          <Col md="9">System CPU count</Col>
          <Col md="3" className="text-right">
            {systemMetrics['system.cpu.count']}
          </Col>
        </Row>
        <Row>
          <Col md="9">System 1m Load average</Col>
          <Col md="3" className="text-right">
            <TextFormat value={systemMetrics['system.load.average.1m']} type="number" format={wholeNumberFormat} />
          </Col>
        </Row>
        <Row>
          <Col md="7">Process files max</Col>
          <Col md="5" className="text-right">
            <TextFormat value={systemMetrics['process.files.max']} type="number" format={wholeNumberFormat} />
          </Col>
        </Row>
        <Row>
          <Col md="4">Process files open</Col>
          <Col md="8" className="text-right">
            <TextFormat value={systemMetrics['process.files.open']} type="number" format={wholeNumberFormat} />
          </Col>
        </Row>
      </div>
    );
  }
}
