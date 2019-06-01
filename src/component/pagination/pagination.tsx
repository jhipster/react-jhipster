import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

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
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.activePage
    };
  }

  updateActivePage = currentPage => () => {
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

  itemsToDisplay = activePage => {
    const items = [];
    let item: any = {};
    let previousItem: any = {};
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

  displayPaginationItem = i => (
    <PaginationItem key={i}>
      <PaginationLink onClick={this.updateActivePage(i + 1)} href="javascript:void(0)">
        {i + 1}
      </PaginationLink>
    </PaginationItem>
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
          <PaginationItem {...activePage === 1 && { disabled: true }}>
            <PaginationLink onClick={this.updateActivePage(1)} href="javascript:void(0)">
              ««
            </PaginationLink>
          </PaginationItem>
          <PaginationItem {...activePage === 1 && { disabled: true }}>
            <PaginationLink previous onClick={this.previousPage} href="javascript:void(0)" />
          </PaginationItem>
          {this.itemsToDisplay(activePage).map(
            (paginationItem, i) =>
              paginationItem.display === 'display' ? (
                this.displayPaginationItem(i)
              ) : paginationItem.display === 'disabled' ? (
                <PaginationItem disabled key={i}>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
              ) : null
          )}
          <PaginationItem {...activePage === maxPage && { disabled: true }}>
            <PaginationLink next onClick={this.nextPage} href="javascript:void(0)" />
          </PaginationItem>
          <PaginationItem {...activePage === maxPage && { disabled: true }}>
            <PaginationLink onClick={this.updateActivePage(maxPage)} href="javascript:void(0)">
              »»
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}
