import React from 'react'
import {Modal} from "react-bootstrap";
import ProductTable from "./ProductTable";
import TotalLabel from "./TotalLabel";
import ModelPageIframe from "./ModelPageIframe";

export default function ModelPage(props) {
    const tableEnable = props.tableenable;
    const app_url = process.env.MIX_APP_URL;
    const permanentDomain = props.permanentdomain;
    const productId = props.productid;
    const url = app_url+"/store-front-model/"+permanentDomain+"/"+productId;

    return(
        <Modal
            className="panther-modal"
            style={{opacity:1, backgroundColor:"rgba(152, 150, 150, 0.4)", paddingTop:"20px", WebkitTransform:"none", transform:"none", overflowY:"none"}}
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
        >
            <Modal.Body className="panther-modal-body">
                    <img style={{cursor:"pointer"}} src={app_url+"/images/close.svg"} onClick={props.onHide}/>
                {
                    tableEnable === undefined || tableEnable && tableEnable === 1 ?
                    <iframe id="load_iframe" src={url} width="100%" height="850px" permanent-domain={permanentDomain} product-id={productId}/>
                    :
                        <iframe id="load_iframe" src={url} width="100%" height="350px" permanent-domain={permanentDomain} product-id={productId}/>
                }
            </Modal.Body>
        </Modal>
    );
}
