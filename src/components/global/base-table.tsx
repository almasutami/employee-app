import React, { Component } from "react";

interface RowData {
  [key: string]: any;
}

interface Header {
  label: string;
  key: string;
}

interface BaseTableProps {
  headers: Header[];
  data: RowData[];
  pageSize: number;
}

interface BaseTableState {
  currentPage: number;
}

class BaseTable extends Component<BaseTableProps, BaseTableState> {
  constructor(props: BaseTableProps) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  renderTableHeaders() {
    const { headers } = this.props;
    return (
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </tr>
    );
  }

  renderTableData() {
    const { data, headers, pageSize } = this.props;
    const { currentPage } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return paginatedData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header, index) => {
          if (header.key === "Actions") {
            return <td key={index}>Button</td>;
          } else {
            return <td key={index}>{row[header.key]}</td>;
          }
        })}
      </tr>
    ));
  }

  renderPagination() {
    const { data, pageSize } = this.props;
    const { currentPage } = this.state;
    const totalPages = Math.ceil(data.length / pageSize);
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return (
      <ul className="pagination">
        <li
          className="page-link"
          onClick={() => {
            if (currentPage > 1) {
              this.goToPage(currentPage - 1);
            }
          }}
        >
          Previous
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            className="page-link"
            key={pageNumber}
            onClick={() => {
              if (currentPage !== pageNumber) {
                this.goToPage(pageNumber);
              }
            }}
          >
            {pageNumber}
          </li>
        ))}
        <li
          className="page-link"
          onClick={() => {
            if (currentPage < totalPages) {
              this.goToPage(currentPage + 1);
            }
          }}
        >
          Next
        </li>
      </ul>
    );
  }

  goToPage(pageNumber: number) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>{this.renderTableHeaders()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}
      </div>
    );
  }
}

export default BaseTable;
