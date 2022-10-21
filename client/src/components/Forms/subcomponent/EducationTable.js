import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(uni, type, grade) {
  return {uni, type, grade};
}

export default function EducationTable(props) {
    const data = props.data;
    let rows = [];
    data.map(obj => {
        rows.push(createData(obj.institute, obj.course, obj.grade));
    })
    return (
        <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 150, margin: '1rem' }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell style={{fontWeight: 1000, fontSize: '12px'}}>Authority</TableCell>
                <TableCell align="right" style={{fontWeight: 1000, fontSize: '12px'}}>Degree</TableCell>
                <TableCell align="right" style={{fontWeight: 1000, fontSize: '12px'}}>Grade</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.uni}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.uni.toUpperCase()}
                </TableCell>
                <TableCell align="right">{row.type.toUpperCase()}</TableCell>
                <TableCell align="right">{row.grade}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
