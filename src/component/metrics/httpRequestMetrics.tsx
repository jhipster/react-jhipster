import React from 'react';
import { TextFormat } from '../../formatter';
import { Progress, Table } from 'reactstrap';
import { nanToZero } from '../../util/number-utils';

export interface IHttpRequestMetricsProps {
  requestMetrics: any;
  wholeNumberFormat: string;
  twoDigitAfterPointFormat: string;
}

export class HttpRequestMetrics extends React.Component<IHttpRequestMetricsProps> {
  render() {
    const { requestMetrics, wholeNumberFormat, twoDigitAfterPointFormat } = this.props;
    return (
      <div>
        <h3>HTTP requests (time in milliseconds)</h3>
        <p>
          <span>Total requests:</span>{' '}
          <b>
            <TextFormat value={requestMetrics.all.count} type="number" format={wholeNumberFormat} />
          </b>
        </p>
        <Table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Count</th>
              <th className="text-end">Mean</th>
              <th className="text-end">Max</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(requestMetrics.percode).map((key, index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  <Progress min="0" max={requestMetrics.all.count} value={requestMetrics.percode[key].count} color="success" animated>
                    <span>
                      <TextFormat value={requestMetrics.percode[key].count} type="number" format={wholeNumberFormat} />
                    </span>
                  </Progress>
                </td>
                <td className="text-end">
                  <TextFormat value={nanToZero(requestMetrics.percode[key].mean)} type="number" format={twoDigitAfterPointFormat} />
                </td>
                <td className="text-end">
                  <TextFormat value={nanToZero(requestMetrics.percode[key].max)} type="number" format={twoDigitAfterPointFormat} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
