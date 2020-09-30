import React, {useState, useCallback} from 'react';
import DataTable from 'react-data-table-component';

const dataDef = [{ id: 1, title: 'Conan the Barbarian', summary: 'Orphaned boy Conan is enslaved after his village is destroyed...',  year: '1982' }];


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


const Table = ({scrollHeight="25vh", dataparam=dataDef, columns=columnsDef, noTableHead=true, fixedHeader=true}) => {



  return(
        <DataTable 
          columns={columns}
          data={dataparam}
          fixedHeader={fixedHeader}
          noHeader={true}
          noTableHead={noTableHead}
          highlightOnHover={true}
          fixedHeaderScrollHeight={scrollHeight}
        />
        )
}

export default Table;