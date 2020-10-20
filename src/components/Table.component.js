import React, { useState, useCallback } from 'react'
import DataTable from 'react-data-table-component';

const Table = ({ allData, columns, delFunction, title, buttonTitle = "Kaldır", getFunction , fixed=false}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(false)
  const [data, setData] = useState(allData)

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows)
  }, []);

  const contextActions = useCallback(() => {
    const handleDelete = () => {

      if (window.confirm(`${selectedRows.length} adet öğeyi silmek istediğinize emin misiniz?`)) {
        setToggleCleared(!toggleCleared)
        delFunction(selectedRows)
        setData(getFunction())
      }
    };

    return <button type="button" className="btn btn-danger" key="delete" onClick={handleDelete}>{buttonTitle}</button>;
  }, [data, selectedRows, toggleCleared]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      selectableRows
      contextActions={contextActions()}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      highlightOnHover={true}
      selectableRowsHighlight={true}
      noHeader={fixed}
      fixedHeader={fixed}
      fixedHeaderScrollHeight="25vh"
    />
  );
};

export default Table;
