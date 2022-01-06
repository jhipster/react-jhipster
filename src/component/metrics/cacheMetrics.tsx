import React from 'react';
import { TextFormat } from '../../formatter';
import { Table } from 'reactstrap';
import { nanToZero } from '../../util/number-utils';

export interface ICacheMetricsProps {
  cacheMetrics: any;
  twoDigitAfterPointFormat: string;
}

export class CacheMetrics extends React.Component<ICacheMetricsProps> {
  render() {
    const { cacheMetrics, twoDigitAfterPointFormat } = this.props;
    return (
      <div>
        <h3>Cache statistics</h3>
        <Table>
          <thead>
            <tr>
              <th>Cache Name</th>
              <th>Cache Hits</th>
              <th>Cache Misses</th>
              <th>Cache Gets</th>
              <th>Cache Hit %</th>
              <th>Cache Miss %</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cacheMetrics).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{cacheMetrics[key]['cache.gets.hit']}</td>
                <td>{cacheMetrics[key]['cache.gets.miss']}</td>
                <td>{cacheMetrics[key]['cache.gets.miss'] + cacheMetrics[key]['cache.gets.hit']}</td>
                <td>
                  <TextFormat
                    value={nanToZero(
                      (100 * cacheMetrics[key]['cache.gets.hit']) /
                        (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])
                    )}
                    type="number"
                    format={twoDigitAfterPointFormat}
                  />
                </td>
                <td>
                  <TextFormat
                    value={nanToZero(
                      (100 * cacheMetrics[key]['cache.gets.miss']) /
                        (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])
                    )}
                    type="number"
                    format={twoDigitAfterPointFormat}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
