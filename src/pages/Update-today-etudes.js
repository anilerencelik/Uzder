import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import "./temp.css";

const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };
 
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
 
class MyComponent extends Component {
  render() {
    return (
    <div className="outer">
        <div className="xd">
            fdsfdsf
        </div>
      <DataTable 
        title="Arnold Movies"
        columns={columns}
        data={data}
        fixedHeader={true}
        noHeader={true}
        highlightOnHover={true}
        fixedHeaderScrollHeight="70vh"
        selectableRows
        Clicked 
        Selected={handleChange}
        selectableRowsHighlight={true}
        />
    </div>
    )
  }
};

export default MyComponent;

