// PrintInvoiceTable.js
import React from 'react';

const PrintInvoiceTable = ({ invoices }) => {
  return (
    <div>
      <h1>Invoice Table</h1>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
     
        </tbody>
      </table>
    </div>
  );
};

export default PrintInvoiceTable;
