import React from 'react';
import { Card, Collapse, Row } from 'react-bootstrap';

export interface IThreadItemProps {
  threadDumpInfo: any;
}

export interface IThreadItemState {
  collapse: boolean;
}

export class ThreadItem extends React.Component<IThreadItemProps, IThreadItemState> {
  state: IThreadItemState = {
    collapse: false,
  };

  toggleStackTrace = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  render() {
    const { threadDumpInfo } = this.props;

    return (
      <div>
        <a onClick={this.toggleStackTrace} style={{ color: 'hotpink' }}>
          {this.state.collapse ? <span>Hide StackTrace</span> : <span>Show StackTrace</span>}
        </a>
        <Collapse in={this.state.collapse}>
          <Card>
            <Card.Body>
              <Row className="break" style={{ overflowX: 'scroll' }}>
                {Object.entries(threadDumpInfo.stackTrace).map(([stK, stV]: [string, any]) => (
                  <samp key={`detail-${stK}`}>
                    {stV.className}.{stV.methodName}
                    <code>
                      ({stV.fileName}:{stV.lineNumber})
                    </code>
                  </samp>
                ))}
                <span className="mt-1" />
              </Row>
            </Card.Body>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default ThreadItem;
