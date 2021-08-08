import React, {useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import $ from 'jquery';
import {AxiosService} from '../Utils/axios.service';
import ModelPage from "./ModelPage";

const snippetElement =  document.getElementById("transaction-app").text;
const snippet = JSON.parse(snippetElement);
const productId = snippet.product.id;
const permanentDomain = snippet.shop.permanent_domain;
const app_url = process.env.MIX_APP_URL;
const renderTransaction = `<div id="renderTransaction"></div>`;
if($("#shopify-section-product-template-panther").length >= 1){
    $("#shopify-section-product-template-panther").append(renderTransaction);
} else if($("#shopify-section-product-template").length >= 1){
    $("#shopify-section-product-template").after(renderTransaction);
}else if($("main").length >= 1){
    $("main").after(renderTransaction);
}

export default function StoreFront() {
    const [pageType, setPageType] = useState();
    const [applicationStatus, setApplicationStatus] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [tableEnable, setTableEnable] = useState();
    const [modelPosition, setModelPosition] = useState();
    let params = {
        page: 1,
        perpage: 10,
        country: ''
    };

    useEffect( () => {
        getResults();
    },[]);

    const getResults = () => {
        let url = app_url+"/api/"+permanentDomain+`/get-transaction-data-for-product/${productId}?`+new URLSearchParams(params).toString();
        AxiosService.get(url).then(response => {
            setApplicationStatus(response.data.setting && response.data.setting.application_status);
            setPageType(response.data.setting && response.data.setting.product_page_modal);
            setTableEnable(response.data.setting && response.data.setting.is_table_enabled);
            setModelPosition(response.data.setting && response.data.setting.modal_button_position);
        });
    };

    if (applicationStatus && applicationStatus === 1 && pageType && pageType === 'modal' && modelPosition && modelPosition === 'right-bottom'){
        const modelButton = `<div>
                              <div>
                                <div style="position: fixed; bottom: 20px; right: 20px">
                                    <img style="cursor: pointer" src="${app_url}/images/logo.svg" />
                                </div>
                            </div>
                           </div>`;
        const shopifyModel = $("#admin-bar-iframe");
        shopifyModel.before($(modelButton).click(() => {
            setModalShow(true);
        }));
    }
    else if (applicationStatus && applicationStatus === 1 && pageType && pageType === 'modal' && modelPosition && modelPosition === 'left-bottom') {
        const modelButton = `<div>
                              <div>
                                <div style="position: fixed; bottom: 20px; left: 20px">
                                    <img style="cursor: pointer" src="${app_url}/images/logo.svg" />
                                </div>
                            </div>
                           </div>`;
        const shopifyModel = $("#admin-bar-iframe");
        shopifyModel.before($(modelButton).click(() => {
            setModalShow(true);
        }));
    }

    let urlIframe = app_url+"/store-front/"+permanentDomain+"/"+productId;
    return (
        <>
            {
                applicationStatus === null || applicationStatus === undefined || applicationStatus && applicationStatus === 1 ?
                    pageType === null || pageType === undefined || pageType && pageType === 'product-page' ?
                        tableEnable === null || tableEnable && tableEnable === 1 ?
                            <iframe src={urlIframe} width="100%" height="870px"/>
                            :
                            <iframe src={urlIframe} width="100%" height="400px"/>
                        : pageType && pageType === 'modal' ?
                            <ModelPage
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                permanentdomain={permanentDomain}
                                productid={productId}
                                tableenable={tableEnable}
                            />
                    : null
                : null
            }
        </>
    );
};
if (document.getElementById("renderTransaction")) {
    ReactDOM.render(<StoreFront />, document.getElementById("renderTransaction"));
}
