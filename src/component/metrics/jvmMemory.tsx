import * as React from 'react';
import { TextFormat } from '../../formatter';
import { Progress } from 'reactstrap';

export interface IJvmMemoryProps {
  jvmMetrics: any;
  wholeNumberFormat: string;
}

export class JvmMemory extends React.Component<IJvmMemoryProps> {
  render() {
    const { jvmMetrics, wholeNumberFormat } = this.props;
    return (
      <div>
        <h3>Memory</h3>
        {Object.keys(jvmMetrics).map((key, index) => (
          <div key={index}>
            {jvmMetrics[key].max !== -1 ? (
              <span>
                <span>{key}</span> (<TextFormat value={jvmMetrics[key].used / 1048576} type="number" format={wholeNumberFormat} />M /{' '}
                <TextFormat value={jvmMetrics[key].max / 1048576} type="number" format={wholeNumberFormat} />
                M)
              </span>
            ) : (
              <span>
                <span>{key}</span> <TextFormat value={jvmMetrics[key].used / 1048576} type="number" format={wholeNumberFormat} />M
              </span>
            )}
            <div>
              Committed : <TextFormat value={jvmMetrics[key].committed / 1048576} type="number" format={wholeNumberFormat} />M
            </div>
            {jvmMetrics[key].max !== -1 ? (
              <Progress animated value={jvmMetrics[key].used} min="0" max={jvmMetrics[key].max} color="success">
                <span>
                  <TextFormat value={jvmMetrics[key].used * 100 / jvmMetrics[key].max} type="number" format={wholeNumberFormat} />
                  %
                </span>
              </Progress>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    );
  }
}
