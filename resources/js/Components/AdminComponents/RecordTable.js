import React, {useState} from 'react'
import {Card} from "@shopify/polaris";
import {Form, Table,} from 'react-bootstrap';
import {transactions,countries} from '../Utils/Constants';

export default function Counter() {
    const [sortCountry,setSortCountry] = useState('');

    let Sorttransactions = transactions.filter(function (transaction) {
        return transaction.country == sortCountry;
    });

    const handleChange = (event) => {
        setSortCountry(event.target.value);
    };

    const mystyle = {
        fontSize:"1.6rem"
    };

    return(
        <>
            <Card sectioned>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control as="select" custom style={{fontSize:"1.6rem"}}  onChange={event => handleChange(event)}>
                            <option value={''}>All Countries / Regions</option>
                            {
                                countries && countries.map((country,index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={mystyle}>Buyer</th>
                        <th style={mystyle}>Shipping Destination</th>
                        <th style={mystyle}>Transaction Quantity</th>
                        <th style={mystyle}>Transaction Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortCountry === '' ?
                        transactions && transactions.map((transaction,index) => (
                            <tr key={index}>
                                <td style={mystyle}>{ transaction.buyer_name === '' ? 'x**' : transaction.buyer_name.slice(0,1)+'**'}</td>
                                <td  style={mystyle}>{transaction.country}</td>
                                <td  style={mystyle}>{transaction.quantity+' Pieces'}</td>
                                <td  style={mystyle}>{transaction.date}</td>
                            </tr>
                        ))
                        :
                        Sorttransactions && Sorttransactions.map((transaction,index) => (
                            <tr key={index}>
                                <td style={mystyle}>{ transaction.buyer_name === '' ? 'x**' : transaction.buyer_name.slice(0,1)+'**'}</td>
                                <td  style={mystyle}>{transaction.country}</td>
                                <td  style={mystyle}>{transaction.quantity+' Pieces'}</td>
                                <td  style={mystyle}>{transaction.date}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Card>
        </>
    );
}
