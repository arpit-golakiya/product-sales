import React from 'react';
import {Form, Table, Pagination} from 'react-bootstrap';

export default function TransactionTable({countries, transactions,changeCountry,changeshowSpinner,page,changePage,transactionCount,rowsPerPage}) {

    if (countries === undefined ||transactions === undefined || page === undefined || transactionCount === undefined || rowsPerPage === undefined){
        return true;
    }

    const handleChangePage = (number) => {
        changePage(number);
    };
    let pageNumber = Math.ceil(transactionCount/rowsPerPage);

    let active = page;
    let items = [];
    for (let number = 1; number <= pageNumber; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handleChangePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const handleChange = (event) => {
        changeshowSpinner(true);
        changeCountry(event.target.value);
    };

    return (
        <>
            <Form.Control as="select" custom onChange={event => handleChange(event)}>
                <option value={''} style={{fontSize:"16px"}}>
                    All Countries / Regions
                </option>
                {
                    countries && countries.map((country,index) => (
                        <option key={index} value={country.country} style={{fontSize:"14px"}}>
                            {country.country}
                        </option>
                    ))
                }
            </Form.Control>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th style={{fontSize:"13px"}}>Buyer</th>
                    <th style={{fontSize:"13px"}}>Shipping Destination</th>
                    <th style={{fontSize:"13px"}}>Transaction Quantity</th>
                    <th style={{fontSize:"13px"}}>Transaction Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    transactions && transactions.map((transaction,index) => (
                        <tr key={index}>
                            <td style={{fontSize:"13px"}}>{ transaction.buyer_name === '' ? 'x**' : transaction.buyer_name.slice(0,1)+'**'}</td>
                            <td style={{fontSize:"13px"}}>{transaction.country}</td>
                            <td style={{fontSize:"13px"}}>{transaction.quantity+' Pieces'}</td>
                            <td style={{fontSize:"13px"}}>{transaction.date.slice(0,10)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Pagination size="sm">{items}</Pagination>
        </>
    );
}
