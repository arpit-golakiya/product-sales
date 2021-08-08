import React from 'react'
import {Col, Row} from "react-bootstrap";
import {textStyle} from "../Utils/Constants";
import TransactionLogo from "../../../css/Svgs/transaction.svg";
import QuantityLogo from "../../../css/Svgs/quantities.svg";
import BuyersLogo from "../../../css/Svgs/buyers.svg";

export default function TotalLabel({transactionCount,quantity,users}) {
    if (transactionCount === undefined || quantity === undefined || users === undefined){
        return true;
    }

    return(
        <Col xl={5} lg={5} md={12} sm={12} style={{margin:"Auto"}}>
            <Row style={{marginTop:"10%"}}>
                <Col>
                    <div style={{textAlign:"center"}}>
                        <img style={{marginBottom:"10px"}} src={TransactionLogo} />
                        <p style={textStyle}>{transactionCount}</p>
                        <p style={textStyle}>Total Transactions</p>
                    </div>
                </Col>
                <Col>
                    <div style={{textAlign:"center"}}>
                        <img style={{marginBottom:"10px"}} src={QuantityLogo} />
                        <p style={textStyle}>{quantity}</p>
                        <p style={textStyle}>Total Quantities</p>
                    </div>
                </Col>
                <Col>
                    <div  style={{textAlign:"center"}}>
                        <img style={{marginBottom:"10px"}} src={BuyersLogo} />
                        <p style={textStyle}>{users}</p>
                        <p style={textStyle}>Total Buyers</p>
                    </div>
                </Col>
            </Row>
        </Col>
    );
}
