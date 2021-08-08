import React, {useEffect, useState} from 'react'
import ReactDOM from "react-dom";
import {Row, Col, Container, Spinner } from "react-bootstrap";
import StoreFrontChart from "./StoreFrontChart";
import ProductTable from "./ProductTable";
import TotalLabel from "./TotalLabel";
import 'bootstrap/dist/css/bootstrap.css';
import {AxiosService} from '../Utils/axios.service';

let permanentDomain = null;
let productId = null;

const element = document.getElementById("panther_transaction");
const scriptTag = document.getElementById("script_id_storefront");
const app_url = process.env.MIX_APP_URL;

if (element !== null){
    let snippet =  JSON.parse(element.text);
    productId = snippet.product.id;
    permanentDomain = snippet.shop.permanent_domain;
}
else if (scriptTag !== null) {
    permanentDomain = document.getElementById("script_id_storefront").getAttribute("permanent-domain");
    productId = document.getElementById("script_id_storefront").getAttribute("product-id");
}

export default function ModelPageIframe(props) {
    if (permanentDomain === null || productId === null){
        return true;
    }
    const [data,setData] = useState({
        countries:"",
        days:"",
        monthWiseRecord:"",
        setting:"",
        transactionsData:"",
        arrayMonths:"",
        arraySums:"",
    });

    const [sortcountry, setSortcountry] = useState('');
    const [firstMonth, setFirstMonth] = useState();
    const [lastMonth, setLastMonth] = useState();
    const [showSpinner, setShowSpinner] = useState(true);
    const [page, setPage] = useState(1);

    let rowsPerPage = 10;

    useEffect(() => {
        loadOrders();
    }, [sortcountry,page]);

    const handleChangeCountry = (country) =>{
        setSortcountry(country);
        setPage(1);
    };

    const loadOrders = () => {
        let params = {
            page: page,
            perpage: rowsPerPage,
            country: sortcountry
        };

        let url = app_url+"/api/"+permanentDomain+`/get-transaction-data-for-product/${productId}?`+new URLSearchParams(params).toString();
        AxiosService.get(url).then(response => {
            setFirstMonth(response.data.arrayMonths[0]);
            setLastMonth(response.data.arrayMonths[response.data.arrayMonths.length-1]);
            setShowSpinner(false);
            setData(response.data);
        });
    };

    return(
        <>
            <h4  style={{fontFamily:"serif",marginLeft:"5%",marginTop:"1%"}}>{data && data.setting && data.setting.title ? data.setting.title : "Total Transaction"} ({firstMonth} To {lastMonth})</h4>
            <h6 style={{fontFamily:"serif",marginLeft:"7%",marginTop:"1%"}}>{data && data.setting && data.setting.sub_title && data.setting.sub_title}</h6>
            <Container style={{ fontFamily: "serif" }}>
                <Row>
                    <Col xl={7} lg={7} md={12} sm={12}>
                        <div>
                            <div>
                                <StoreFrontChart
                                    chartType={data.setting !== null ? data.setting.chart_type : 'line-chart'}
                                    months={data.arrayMonths}
                                    sums={data.arraySums}
                                />
                            </div>
                        </div>
                    </Col>
                    <TotalLabel
                        transactionCount={data.transactionsData.transaction_total}
                        quantity={data.transactionsData.quantity}
                        users={data.transactionsData.buyers}
                    />
                </Row>
            </Container>
            {
                showSpinner === true ?
                    <Spinner animation="border" role="status" size="lg" style={{marginLeft:"48%"}}>
                    </Spinner>
                    :
                    null
            }
            {
                data.setting && data.setting.is_table_enabled && data.setting.is_table_enabled === 1 ?
                    <>
                        <h4 style={{fontFamily:"serif",marginLeft:"5%",marginTop:"3%"}}>{data && data.setting && data.setting.list_title ? data.setting.list_title : "Product Transaction Details"}</h4>
                        <div style={{paddingTop:"2%",paddingLeft:"8%",paddingRight:"8%"}}>
                            <ProductTable
                                countries={data.countries}
                                transactions={data.transactionsData.transactions.data}
                                changeCountry = {country => handleChangeCountry(country)}
                                page={page}
                                changePage = { page => setPage(page) }
                                transactionCount = {data.transactionsData.transaction_total}
                                rowsPerPage={rowsPerPage}
                                changeshowSpinner={(spinner) => setShowSpinner(spinner)}
                            />
                        </div>
                    </>
                    : null
            }
        </>
    );
}

if (document.getElementById("renderTransaction")) {
    ReactDOM.render(<ModelPageIframe />, document.getElementById("renderTransaction"));
}
