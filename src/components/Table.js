import React, {useState, useCallback} from 'react';
import DataTable from 'react-data-table-component';

const handleChange = (state) => {
  console.log('Selected Rows:');

};

const columnsDef = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];


const Table = ({scrollHeight="75vh", dataparam=[], columns=columnsDef}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(dataparam);

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
    console.log(selectedRows)
  }, []);



  return(
        <DataTable 
        columns={columns}
        data={dataparam}
        fixedHeader={true}
        noHeader={true}
        highlightOnHover={true}
        fixedHeaderScrollHeight={scrollHeight}
        selectableRows
        Clicked 
        Selected={handleChange}
        selectableRowsHighlight={true}
        
        />
        )
}

export default Table;