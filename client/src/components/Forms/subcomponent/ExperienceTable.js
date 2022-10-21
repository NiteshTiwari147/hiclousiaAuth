import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(companyName, duration) {
  return {companyName, duration};
}

export default function ExperienceTable(props) {
  const data = props.data;
  let rows = [];
  data.map(obj => {
    rows.push(createData(obj.company, '3yr 2mon'))
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 150, margin: '1rem' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 1000, fontSize: '12px'}}>Title</TableCell>
            <TableCell align="right" style={{fontWeight: 1000, fontSize: '12px'}}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.companyName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.companyName.toUpperCase()}
              </TableCell>
              <TableCell align="right">{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
