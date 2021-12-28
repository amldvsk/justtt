import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { getRows } from './utils/Api';
import moment from 'moment';

function App() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRows(page);
      setRows(data.data);
    };
    fetchData();
  }, [page]);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>transaction id</TableCell>
              <TableCell>customer id</TableCell>
              <TableCell>first name</TableCell>
              <TableCell>last name</TableCell>
              <TableCell>country</TableCell>
              <TableCell>city</TableCell>
              <TableCell>street</TableCell>
              <TableCell>phone</TableCell>
              <TableCell>credit card number</TableCell>
              <TableCell>credit card type</TableCell>
              <TableCell>currency</TableCell>
              <TableCell>total price</TableCell>
              <TableCell>created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow>
                <TableCell>{row.transaction_id}</TableCell>
                <TableCell>{row.customer_uuid}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.street}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.credit_card_number}</TableCell>
                <TableCell>{row.credit_card_type}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.total_price}</TableCell>
                <TableCell>{moment(row.created_at).format('MMM Do YY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div'
        count={100}
        rowsPerPage={10}
        page={page}
        onPageChange={(e, v) => setPage(v)}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}

export default App;
