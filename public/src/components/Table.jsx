import React, {Component} from 'react';
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//Define custom options for table
const tableOptions = {
  page: 1,
  sizePerPage: 15,
  hideSizePerPage: true
};

const selectRowProp = {
  mode: 'checkbox'
};

//Allow user to type before search
const searchDelayTime = 0;

class Table extends Component {

  render() {
    let columns = this.getColumns();

    //Define custom options for table
    const customizationOptions = {
      data: this.props.data,
      pagination: this.props.pagination || false,
      // search: this.props.search || false,
      deleteRow: this.props.deleteRow || false,
      selectRow: this.props.deleteRow ? selectRowProp : null
      // searchPlaceholder: 'Search by Data File Name'
    };

    let options = _.defaults({}, {
      // noDataText: this.props.noDataText,
      // clearSearch: this.props.search,
      // searchDelayTime: this.props.search ? searchDelayTime : 0,
      onDeleteRow: this.props.onDeleteRow
      // defaultSearch: this.props.searchTerm
    }, tableOptions);

    return (
      <BootstrapTable {...customizationOptions} options={options}>
        {columns}
      </BootstrapTable>
    );
  }

  getColumns() {
    let columns = this.props.columns.map(function (col) {
      let headerOptions = {
        dataField: col.field,
        isKey: col.isKey,
        dataSort: col.sort,
        width: col.width
      };
      return (
        <TableHeaderColumn key={col.title} {...headerOptions}>
          {col.title}
        </TableHeaderColumn>
      );
    });
    return columns;
  }
}

//Define propTypes to make inputs compulsory
Table.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  noDataText: React.PropTypes.string.isRequired,
  pagination: React.PropTypes.bool,
  search: React.PropTypes.bool,
  deleteRow: React.PropTypes.bool,
  onDeleteRow: React.PropTypes.func
};

//Module Export definitions
export default Table;
