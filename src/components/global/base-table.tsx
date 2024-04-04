import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/base-table.css";
import BaseInputSearch from "./base-input-search.tsx";

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
  objectName: string;
  queryState: string;
  title: string;
  description: string;
  onQueryChange: (query: string) => void;
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

  componentDidUpdate(prevProps: BaseTableProps) {
    if (prevProps.queryState !== this.props.queryState) {
      this.setState({ currentPage: 1 });
    }
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
    const { data, headers, pageSize, objectName } = this.props;
    const { currentPage } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    if (data.length <= 0) {
      return (
        <tr>
          <td className="block" colSpan={pageSize}>
            <div>No {objectName} found.</div>
          </td>
        </tr>
      );
    }

    return paginatedData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header, index) => {
          console.log(header.key, row[header.key]);
          if (header.label === "Actions") {
            return <td key={index}>Button</td>;
          }
          if (header.key === "isActive") {
            if (row[header.key]) {
              return (
                <td key={index}>
                  <span
                    style={{ fontSize: "14px" }}
                    className="px-2 py-1 text-white bg-success rounded"
                  >
                    Active
                  </span>
                </td>
              );
            } else {
              return (
                <td key={index}>
                  <span
                    style={{ fontSize: "14px" }}
                    className="px-2 py-1 text-white bg-danger rounded"
                  >
                    Inactive
                  </span>
                </td>
              );
            }
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

    if (data.length > 0) {
      return (
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li
              className={`custom-pagination page-link ${
                currentPage > 1
                  ? "text-secondary"
                  : "custom-disabled text-white"
              }`}
              onClick={() => {
                if (currentPage > 1) {
                  this.goToPage(currentPage - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </li>
            {pageNumbers.map((pageNumber) => (
              <li
                className={`custom-pagination page-link ${
                  currentPage !== pageNumber
                    ? "text-secondary"
                    : "custom-active fw-bold"
                }`}
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
              className={`custom-pagination page-link ${
                currentPage < totalPages
                  ? "text-secondary"
                  : "custom-disabled text-white"
              }`}
              onClick={() => {
                if (currentPage < totalPages) {
                  this.goToPage(currentPage + 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  goToPage(pageNumber: number) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { onQueryChange, queryState, title, description } = this.props;
    return (
      <div className="border m-4 rounded">
        <div className="filter d-flex justify-content-between align-items-center p-4 border-bottom">
          <div>
            <div className="fs-4 text-dark">{title}</div>
            <div className="fs-6 text-secondary">{description}</div>
          </div>
          <BaseInputSearch
            placeholder="Filter by name, email, or ID"
            value={queryState}
            onChange={onQueryChange}
          />
        </div>
        <div className="overflow-x-auto p-0">
          <table className="table p-0">
            <thead>{this.renderTableHeaders()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default BaseTable;
