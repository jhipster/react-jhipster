import * as React from 'react';
import { TextFormat } from '../../formatter';
import { Progress, Button } from 'reactstrap';
import ThreadsModal from './threads-modal';

export interface IJvmThreadsProps {
  jvmThreads: any;
  wholeNumberFormat: string;
}

export interface IJvmThreadsState {
  showModal: boolean;
  threadStats: {
    threadDumpAll: number;
    threadDumpRunnable: number;
    threadDumpTimedWaiting: number;
    threadDumpWaiting: number;
    threadDumpBlocked: number;
  };
}

export class JvmThreads extends React.Component<IJvmThreadsProps, IJvmThreadsState> {
  state: IJvmThreadsState = {
    showModal: false,
    threadStats: {
      threadDumpAll: 0,
      threadDumpRunnable: 0,
      threadDumpTimedWaiting: 0,
      threadDumpWaiting: 0,
      threadDumpBlocked: 0
    }
  };

  countThreadByState() {
    if (this.props.jvmThreads.threads) {
      const threadStats = {
        threadDumpAll: 0,
        threadDumpRunnable: 0,
        threadDumpTimedWaiting: 0,
        threadDumpWaiting: 0,
        threadDumpBlocked: 0
      };

      this.props.jvmThreads.threads.forEach(thread => {
        if (thread.threadState === 'RUNNABLE') {
          threadStats.threadDumpRunnable += 1;
        } else if (thread.threadState === 'WAITING') {
          threadStats.threadDumpWaiting += 1;
        } else if (thread.threadState === 'TIMED_WAITING') {
          threadStats.threadDumpTimedWaiting += 1;
        } else if (thread.threadState === 'BLOCKED') {
          threadStats.threadDumpBlocked += 1;
        }
      });

      threadStats.threadDumpAll =
        threadStats.threadDumpRunnable + threadStats.threadDumpWaiting + threadStats.threadDumpTimedWaiting + threadStats.threadDumpBlocked;

      this.setState({ threadStats });
    }
  }

  componentDidMount() {
    if (this.props.jvmThreads.threads) {
      this.countThreadByState();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.jvmThreads.threads && this.props.jvmThreads.threads !== prevProps.jvmThreads.threads) {
      this.countThreadByState();
    }
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  renderModal = () => <ThreadsModal handleClose={this.handleClose} showModal={this.state.showModal} threadDump={this.props.jvmThreads} />;

  render() {
    const { wholeNumberFormat } = this.props;
    const { threadStats } = this.state;
    return (
      <div>
        <b>Threads</b> (Total: {threadStats.threadDumpAll}){' '}
        <p>
          <span>Runnable</span> {threadStats.threadDumpRunnable}
        </p>
        <Progress animated min="0" value={threadStats.threadDumpRunnable} max={threadStats.threadDumpAll} color="success">
          <span>
            <TextFormat value={threadStats.threadDumpRunnable * 100 / threadStats.threadDumpAll} type="number" format={wholeNumberFormat} />
          </span>
        </Progress>
        <p>
          <span>Timed Waiting</span> ({threadStats.threadDumpTimedWaiting})
        </p>
        <Progress animated min="0" value={threadStats.threadDumpTimedWaiting} max={threadStats.threadDumpAll} color="warning">
          <span>
            <TextFormat
              value={threadStats.threadDumpTimedWaiting * 100 / threadStats.threadDumpAll}
              type="number"
              format={wholeNumberFormat}
            />
          </span>
        </Progress>
        <p>
          <span>Waiting</span> ({threadStats.threadDumpWaiting})
        </p>
        <Progress animated min="0" value={threadStats.threadDumpWaiting} max={threadStats.threadDumpAll} color="warning">
          <span>
            <TextFormat value={threadStats.threadDumpWaiting * 100 / threadStats.threadDumpAll} type="number" format={wholeNumberFormat} />
          </span>
        </Progress>
        <p>
          <span>Blocked</span> ({threadStats.threadDumpBlocked})
        </p>
        <Progress animated min="0" value={threadStats.threadDumpBlocked} max={threadStats.threadDumpAll} color="success">
          <span>
            <TextFormat value={threadStats.threadDumpBlocked * 100 / threadStats.threadDumpAll} type="number" format={wholeNumberFormat} />
          </span>
        </Progress>
        {this.renderModal()}
        <Button color="primary" size="sm" className="hand" onClick={this.openModal}>
          Expand
        </Button>
      </div>
    );
  }
}
