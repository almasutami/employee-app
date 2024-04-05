import React, { useState, useEffect } from "react";
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
  onEditRow: (row: any) => void;
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
  onEditRow: (row: any) => void;
}

const BaseTable: React.FC<BaseTableProps> = ({
  headers,
  data,
  pageSize,
  objectName,
  queryState,
  title,
  description,
  onQueryChange,
  onEditRow,
}: BaseTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [queryState]);

  const renderTableHeaders = () => {
    return (
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </tr>
    );
  };

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    if (data.length <= 0) {
      return (
        <tr>
          <td className="block" colSpan={headers.length}>
            <div>No {objectName} found.</div>
          </td>
        </tr>
      );
    }

    return paginatedData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header, index) => {
          if (header.label === "Actions" && row?.isActive) {
            return (
              <td key={index}>
                <span
                  style={{ fontSize: "14px" }}
                  className="px-2 py-1 rounded bg-primary text-white rounded btn-sm update-button"
                  onClick={() => onEditRow(row)}
                >
                  Update
                </span>
              </td>
            );
          } else if (header.label === "Actions") {
            return <td key={index}></td>;
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
  };

  const renderPagination = () => {
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
                  setCurrentPage(currentPage - 1);
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
                    setCurrentPage(pageNumber);
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
                  setCurrentPage(currentPage + 1);
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
  };

  return (
    <div className="border m-4 rounded">
      <div className="custom-header filter d-flex justify-content-between align-items-center p-4 border-bottom">
        <div className="custom-title-header">
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
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
};

export default BaseTable;
