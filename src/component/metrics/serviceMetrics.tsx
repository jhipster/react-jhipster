import * as React from 'react';
import { TextFormat } from '../../formatter';
import { Table } from 'reactstrap';

export interface IServiceMetricsProps {
  servicesMetrics: any;
  wholeNumberFormat: string;
}

export class ServiceMetrics extends React.Component<IServiceMetricsProps> {
  render() {
    const { servicesMetrics, wholeNumberFormat } = this.props;
    return (
      <div>
        <h3>Services statistics (time in millisecond)</h3>
        <Table>
          <thead>
            <tr>
              <th>Service name</th>
              <th>Count</th>
              <th>Mean</th>
              <th>Min</th>
              <th>p50</th>
              <th>p75</th>
              <th>p95</th>
              <th>p99</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(servicesMetrics).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{servicesMetrics[key].count}</td>
                <td>
                  <TextFormat value={servicesMetrics[key].mean} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key]['0.0']} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key]['0.5']} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key]['0.75']} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key]['0.95']} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key]['0.99']} type="number" format={wholeNumberFormat} />
                </td>
                <td>
                  <TextFormat value={servicesMetrics[key].max} type="number" format={wholeNumberFormat} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
