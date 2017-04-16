import React, {Component} from 'react';
import _ from 'lodash';
import AutoSuggest from './AutoSuggest';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import styled from 'styled-components';


//Define custom options for table
const tableOptions = {
  page: 1,
  sizePerPage: 15,
  hideSizePerPage: true
};

//Allow user to type before search
const searchDelayTime = 0;
class Table extends Component {
  render() {
    let columns = this.getColumns();

    const selectRowProp = {
      mode: 'checkbox',
      onSelect: this.props.onRowSelect,
      clickToSelect: true,
      bgColor: "rgb(78, 89, 101)",
      fontColor: "rgb(255, 255, 255)"
    };

    //Define custom options for table
    const customizationOptions = {
      data: this.props.data,
      pagination: this.props.pagination || false,
      search: this.props.search || false,
      deleteRow: this.props.deleteRow || false,
      //selectRow: this.props.deleteRow ? selectRowProp : null
      selectRow: selectRowProp
      // searchPlaceholder: 'Search by Data File Name'
    };

    let options = _.defaults({}, {
      noDataText: this.props.noDataText,
      clearSearch: this.props.search,
      onDeleteRow: this.props.onDeleteRow,
      searchPanel: this.renderCustomSearchPanel
    }, tableOptions);


    return (
      <BootstrapTable {...customizationOptions}
        options={options}
        tableStyle={ { 'width': '1352px', 'height':'803px' } }
        >
        {columns}
      </BootstrapTable>
    );
  }

  onSearch(props, event, obj) {
    console.log(props, obj.suggestion,obj.suggestionValue);
    props.search(obj.suggestionValue);
  }

  renderCustomSearchPanel = (props) => {
    console.log(props);
    return (
      <div>
          <AutoSuggest files={this.props.data} clearSearch={props.clearBtnClick}
            onSuggestionSelected={this.onSearch.bind(this, props)}
            />
      </div>
    );
  }

  getColumns() {
    let columns = this.props.columns.map(function (col) {
      let headerOptions = {
        dataField: col.field,
        isKey: col.isKey,
        dataSort: col.sort,
        width: col.width,
        columnClassName: col.columnClassName,
        className:col.className
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
  onDeleteRow: React.PropTypes.func,
  onRowSelect: React.PropTypes.func,
  trClass: React.PropTypes.string.isRequired
};

//Module Export definitions
export default Table;
