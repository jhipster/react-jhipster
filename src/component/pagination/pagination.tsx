import React from 'react';
import { Pagination } from 'react-bootstrap';

export interface IJhiPaginationProps {
  activePage: number;
  onSelect: (page: number) => void;
  maxButtons: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IJhiPaginationState {
  currentPage: number;
}

export class JhiPagination extends React.Component<IJhiPaginationProps, IJhiPaginationState> {
  constructor(props: IJhiPaginationProps) {
    super(props);
    this.state = {
      currentPage: this.props.activePage,
    };
  }

  updateActivePage = (currentPage: number) => () => {
    this.setState({ currentPage });
    this.props.onSelect(currentPage);
  };

  previousPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
    this.props.onSelect(this.state.currentPage - 1);
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.props.onSelect(this.state.currentPage + 1);
  };

  itemsToDisplay = (activePage: number) => {
    const items: { display?: string }[] = [];
    let item: { display?: string } = {};
    let previousItem: { display?: string } = {};
    const maxPage = this.getMaxPage();
    const padSup = Math.floor((this.props.maxButtons - 1) / 2);
    const modulo = (this.props.maxButtons - 1) % 2;
    const padInf = padSup + modulo;
    for (let j = 0; j < maxPage; j++) {
      item = {};
      if (
        j === 0 ||
        j === maxPage - 1 ||
        j === activePage - 1 ||
        j === activePage - 2 ||
        (activePage === 1 && j === 1) ||
        (activePage - padInf < j && j < activePage + padSup)
      ) {
        item.display = 'display';
      } else if (previousItem.display === 'disabled') {
        item.display = 'hidden';
      } else {
        item.display = 'disabled';
      }
      items.push(item);
      previousItem = { ...item };
      if (item.display === 'hidden') {
        previousItem.display = 'disabled';
      }
    }
    return items;
  };

  displayPaginationItem = (i: number, activePage: number) => (
    <Pagination.Item active={activePage === i + 1} key={i} onClick={this.updateActivePage(i + 1)}>
      {i + 1}
    </Pagination.Item>
  );

  cleanActivePage = () => {
    const { totalItems, itemsPerPage, activePage } = this.props;
    const cleanActivePage = totalItems === 0 ? 1 : Math.min(activePage, Math.ceil(totalItems / itemsPerPage));

    if (cleanActivePage !== activePage) {
      this.updateActivePage(cleanActivePage)();
    }
  };

  getMaxPage = () => {
    const { itemsPerPage, totalItems } = this.props;
    const division = Math.floor(totalItems / itemsPerPage);
    const modulo = totalItems % itemsPerPage;
    return division + (modulo !== 0 ? 1 : 0);
  };

  render() {
    this.cleanActivePage();
    const { activePage } = this.props;
    const maxPage = this.getMaxPage();

    return (
      <div>
        <Pagination>
          <Pagination.First disabled={activePage === 1} onClick={this.updateActivePage(1)} />
          <Pagination.Prev disabled={activePage === 1} onClick={this.previousPage} />
          {this.itemsToDisplay(activePage).map((paginationItem, i) =>
            paginationItem.display === 'display' ? (
              this.displayPaginationItem(i, activePage)
            ) : paginationItem.display === 'disabled' ? (
              <Pagination.Ellipsis disabled key={i} />
            ) : null,
          )}
          <Pagination.Next disabled={activePage === maxPage} onClick={this.nextPage} />
          <Pagination.Last disabled={activePage === maxPage} onClick={this.updateActivePage(maxPage)} />
        </Pagination>
      </div>
    );
  }
}
