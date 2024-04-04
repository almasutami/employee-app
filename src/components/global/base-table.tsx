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
}

class BaseTable extends Component<BaseTableProps> {
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
    const { data, headers } = this.props;
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header, index) => (
          <td key={index}>{row[header.key]}</td>
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>{this.renderTableHeaders()}</thead>
        <tbody>{this.renderTableData()}</tbody>
      </table>
    );
  }
}

export default BaseTable;
