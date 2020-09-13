import React from 'react';
import DataTable from 'react-data-table-component';

const handleChange = (state) => {
  // You can use setState or dispatch with something like Redux so we can use the retrieved data
  console.log('Selected Rows: ', state.selectedRows);
};

const dataDef = [  { id: 1, title: 'Conan the Barbarian', year: '1982' }, 
                {id: 2, title: 'Conan the Barbarian', year: '1982' },
                {id: 3, title: 'Conan the Barbarian', year: '1982' },
                {id: 4, title: 'Conan the Barbarian', year: '1982' },
                {id: 5, title: 'Conan the Barbarian', year: '1982' },
                { id: 11, title: 'Conan the Barbarian', year: '1982' }, 
                {id: 12, title: 'Conan the Barbarian', year: '1982' },
                {id: 13, title: 'Conan the Barbarian', year: '1982' },
                {id: 14, title: 'Conan the Barbarian', year: '1982' },
                { id: 21, title: 'Conan the Barbarian', year: '1982' }, 
                {id: 22, title: 'Conan the Barbarian', year: '1982' },
                {id: 23, title: 'Conan the Barbarian', year: '1982' },
                {id: 24, title: 'Conan the Barbarian', year: '1982' },
                { id: 31, title: 'Conan the Barbarian', year: '1982' }, 
                {id: 32, title: 'Conan the Barbarian', year: '1982' },
                {id: 33, title: 'Conan the Barbarian', year: '1982' },
                {id: 34, title: 'Conan the Barbarian', year: '1982' }
];

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


const Panel = ({scrollHeight="70vh", data=dataDef, columns=columnsDef}) => {
    return(
        <DataTable 
        columns={columns}
        data={data}
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

export default Panel;