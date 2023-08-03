import React from 'react';

class ExportCSVButton extends React.Component {
  exportDataToCSV = () => {
    const data = [
      { name: 'John Doe', email: 'john@example.com', age: 25 },
      { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
    ];

    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported_data.csv');
    link.click();
  };

  convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((header) => obj[header]));
    const headerRow = headers.join(',');
    const csvRows = [headerRow, ...rows.map((row) => row.join(','))];
    return csvRows.join('\n');
  }

  render() {
    return (
      <div>
        <button onClick={this.exportDataToCSV}>Export CSV</button>
      </div>
    );
  }
}

export default ExportCSVButton;
