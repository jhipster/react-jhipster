import React from 'react';
import { TextFormat } from '../../formatter';
import { Button, ProgressBar } from 'react-bootstrap';
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
      threadDumpBlocked: 0,
    },
  };

  countThreadByState() {
    if (this.props.jvmThreads.threads) {
      const threadStats = {
        threadDumpAll: 0,
        threadDumpRunnable: 0,
        threadDumpTimedWaiting: 0,
        threadDumpWaiting: 0,
        threadDumpBlocked: 0,
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
      showModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
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
        <ProgressBar
          animated
          min={0}
          now={threadStats.threadDumpRunnable}
          max={threadStats.threadDumpAll}
          variant="success"
          label={
            <TextFormat
              value={(threadStats.threadDumpRunnable * 100) / threadStats.threadDumpAll}
              type="number"
              format={wholeNumberFormat}
            />
          }
        />
        <p>
          <span>Timed Waiting</span> ({threadStats.threadDumpTimedWaiting})
        </p>
        <ProgressBar
          animated
          min={0}
          now={threadStats.threadDumpTimedWaiting}
          max={threadStats.threadDumpAll}
          variant="warning"
          label={
            <TextFormat
              value={(threadStats.threadDumpTimedWaiting * 100) / threadStats.threadDumpAll}
              type="number"
              format={wholeNumberFormat}
            />
          }
        />
        <p>
          <span>Waiting</span> ({threadStats.threadDumpWaiting})
        </p>
        <ProgressBar
          animated
          min={0}
          now={threadStats.threadDumpWaiting}
          max={threadStats.threadDumpAll}
          variant="warning"
          label={
            <TextFormat
              value={(threadStats.threadDumpWaiting * 100) / threadStats.threadDumpAll}
              type="number"
              format={wholeNumberFormat}
            />
          }
        />
        <p>
          <span>Blocked</span> ({threadStats.threadDumpBlocked})
        </p>
        <ProgressBar
          animated
          min={0}
          now={threadStats.threadDumpBlocked}
          max={threadStats.threadDumpAll}
          variant="success"
          label={
            <TextFormat
              value={(threadStats.threadDumpBlocked * 100) / threadStats.threadDumpAll}
              type="number"
              format={wholeNumberFormat}
            />
          }
        />
        {this.renderModal()}
        <Button variant="primary" size="sm" className="hand" onClick={this.openModal}>
          Expand
        </Button>
      </div>
    );
  }
}
