import React from 'react';
import DataTable from 'react-data-table-component';

const data = [  { id: 1, title: 'Conan the Barbarian', year: '1982' }, 
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

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];


const Panel = () => {
    return(
        <DataTable 
        columns={columns}
        data={data}
        fixedHeader={true}
        noHeader={true}
        highlightOnHover={true}
        fixedHeaderScrollHeight="70vh"
        selectableRows
        Clicked 
        Selected={[]}
        selectableRowsHighlight={true}
        />
        )
}

export default Panel;