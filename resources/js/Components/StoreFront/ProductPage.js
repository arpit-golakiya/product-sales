import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import {Col, Container, Row} from "react-bootstrap";
import ProductTable from "./ProductTable";
import 'bootstrap/dist/css/bootstrap.css';
import StoreFrontChart from "./StoreFrontChart";
import TotalLabel from "./TotalLabel";
import {Spinner} from "react-bootstrap";
import {AxiosService} from '../Utils/axios.service';

let permanentDomain = document.getElementById("script_id_storefront").getAttribute("permanent-domain");
let productId = document.getElementById("script_id_storefront").getAttribute("product-id");


export default function ProductPage() {
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
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    const app_url = process.env.MIX_APP_URL;
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
        }).catch(error => {
            setShowSpinner(false);
            setError(true);
        });
    };
    return (
        <div>
            {
                error === false ?
                <div>
                    <h4  style={{fontFamily:"serif",marginLeft:"5%",marginTop:"1%"}}>{data && data.setting && data.setting.title ? data.setting.title : "Total Transaction"} ({firstMonth} To {lastMonth})</h4>
                    <h6 style={{fontFamily:"serif",marginLeft:"7%",marginTop:"1%"}}>{data && data.setting && data.setting.sub_title && data.setting.sub_title}</h6>
                    <Container style={{fontFamily:"serif"}}>
                        <Row>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <div>
                                    <div>
                                        <StoreFrontChart
                                            chartType={data.setting !== null ? data.setting.chart_type  : 'line-chart' }
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
                </div>
                    :
                    null
            }
            {
                showSpinner === true ?
                    <Spinner animation="border" role="status" size="lg" style={{marginLeft:"48%"}}>
                    </Spinner>
                    :
                    null
            }
            {
                error === false && data.setting === null || data.setting && data.setting.is_table_enabled && data.setting.is_table_enabled === 1 ?
                    <>
                        <h4 style={{fontFamily:"serif",marginLeft:"5%",marginTop:"1%"}}>{data && data.setting && data.setting.list_title ? data.setting.list_title : "Product Transaction Details"}</h4>
                        <div style={{paddingTop:"1%",paddingLeft:"10%",paddingRight:"10%"}}>
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
                        <hr/>
                    </> : null
            }
        </div>
    );
};

if (document.getElementById("renderTransaction")) {
    ReactDOM.render(<ProductPage />, document.getElementById("renderTransaction"));
}
