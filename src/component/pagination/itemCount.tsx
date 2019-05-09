import * as React from 'react';
import { Translate } from '../../language';

export interface IJhiItemCountProps {
  page: number;
  total: number;
  itemsPerPage: number;
  i18nEnabled: boolean;
}

export class JhiItemCount extends React.Component<IJhiItemCountProps> {
  constructor(props) {
    super(props);
  }

  i18nValues() {
    const { page, total, itemsPerPage } = this.props;

    const first = (page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1;
    const second = page * itemsPerPage < total ? page * itemsPerPage : total;

    return {
      first,
      second,
      total
    };
  }

  render() {
    const { page, total, itemsPerPage, i18nEnabled } = this.props;
    return (
      <div className="info jhi-item-count">
        {i18nEnabled ? (
          <span>
            <Translate contentKey="global.item-count" interpolate={this.i18nValues()}>
              Count
            </Translate>
          </span>
        ) : (
          <span>
            Showing
            {(page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1}
            - {page * itemsPerPage < total ? page * itemsPerPage : total} of {total} items.
          </span>
        )}
      </div>
    );
  }
}
