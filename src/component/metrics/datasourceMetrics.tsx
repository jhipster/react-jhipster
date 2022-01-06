import React from 'react';
import { TextFormat } from '../../formatter';
import { Table } from 'reactstrap';

export interface IDatasourceMetricsProps {
  datasourceMetrics: any;
  twoDigitAfterPointFormat: string;
}

export class DatasourceMetrics extends React.Component<IDatasourceMetricsProps> {
  render() {
    const { datasourceMetrics, twoDigitAfterPointFormat } = this.props;
    return (
      <div>
        <h3>DataSource statistics (time in millisecond)</h3>
        <Table>
          <thead>
            <tr>
              <th>
                <span>Connection Pool Usage </span>
                (active: {datasourceMetrics.active.value}, min: {datasourceMetrics.min.value}, max: {datasourceMetrics.max.value}, idle:{' '}
                {datasourceMetrics.idle.value})
              </th>
              <th className="text-end">Count</th>
              <th className="text-end">Mean</th>
              <th className="text-end">Min</th>
              <th className="text-end">p50</th>
              <th className="text-end">p75</th>
              <th className="text-end">p95</th>
              <th className="text-end">p99</th>
              <th className="text-end">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Acquire</td>
              <td className="text-end">{datasourceMetrics.acquire.count}</td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire.mean} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire['0.0']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire['0.5']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire['0.75']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire['0.95']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire['0.99']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.acquire.max} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
            </tr>
            <tr>
              <td>Creation</td>
              <td className="text-end">{datasourceMetrics.creation.count}</td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation.mean} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation['0.0']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation['0.5']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation['0.75']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation['0.95']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation['0.99']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.creation.max} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
            </tr>
            <tr>
              <td>Usage</td>
              <td className="text-end">{datasourceMetrics.usage.count}</td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage.mean} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage['0.0']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage['0.5']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage['0.75']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage['0.95']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage['0.99']} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
              <td className="text-end">
                <TextFormat value={datasourceMetrics.usage.max} type={'number'} format={twoDigitAfterPointFormat} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
