import React from 'react';
import DataTable from 'react-data-table-component'; // Importar DataTable

const TableComponent  = ({ datostabla, columnas }) => {

  const customStyles = {
    rows: {
      style: {
        minHeight: '4rem', // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div class="contenedorPadre">
      <div className="contenedorHijo">
        <DataTable class="table-primary"
          columns={columnas}
          data={datostabla}
          customStyles={customStyles}
          fixedHeader
          pagination
        ></DataTable>
      </div>
    </div>
  );
};

export default TableComponent;
