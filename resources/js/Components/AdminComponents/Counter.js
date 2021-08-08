import React from 'react'
import {Col, Row} from "react-bootstrap";
import {Card} from "@shopify/polaris";
import {textStyle} from "../Utils/Constants";
import TransactionLogo from "../../../css/Svgs/transaction.svg";
import QuantityLogo from "../../../css/Svgs/quantities.svg";
import BuyersLogo from "../../../css/Svgs/buyers.svg";

export default function Counter() {
    return(
        <div>
            <Card sectioned>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Row >
                        <Col>
                            <div style={{textAlign:"center"}}>
                                <img style={{marginBottom:"10px"}} src={TransactionLogo} />
                                <p className="panther-counter-text" style={textStyle}>{10}</p>
                                <p className="panther-counter-text" style={textStyle}>Total Transactions</p>
                            </div>
                        </Col>
                        <Col>
                            <div style={{textAlign:"center"}}>
                                <img style={{marginBottom:"10px"}} src={QuantityLogo} />
                                <p className="panther-counter-text" style={textStyle}>{21}</p>
                                <p className="panther-counter-text" style={textStyle}>Total Quantities</p>
                            </div>
                        </Col>
                        <Col>
                            <div style={{textAlign:"center"}}>
                                <img style={{marginBottom:"10px"}} src={BuyersLogo} />
                                <p className="panther-counter-text" style={textStyle}>{10}</p>
                                <p className="panther-counter-text" style={textStyle}>Total Buyers</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </div>
    );
}
