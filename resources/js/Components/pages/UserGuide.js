import React from "react";
import {Accordion, Card} from "react-bootstrap";
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';
function About() {
    return (
        <>
            <SimpleReactLightbox>
                <SRLWrapper>
            <Accordion defaultActiveKey="">
                <Card>
                    <Accordion.Toggle className="toggle_btn" as={Card.Header} eventKey="0">
                        Configurations
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div id="collapse-configurations" className="collapse show"
                                 aria-labelledby="configurationsOne" data-parent="#metafieldsConfiguration">
                                <div className="card-body">
                                    <ul>
                                        <p>
                                            Here, we are going to create configuration for each module.
                                        </p>
                                        <li><h3>Create Settings Configuration</h3></li>
                                        <p>- First, open Setting tab.<br/>
                                            - Here. give setting value according to the choice.
                                        </p>
                                        <img src="/images/userGuide/setting-userguide.png"
                                             className="meta-config-install-img"/>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="toggle_btn" as={Card.Header} eventKey="1">
                        Date Range In Setting
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div id="collapse-configurations" className="collapse show"
                                 aria-labelledby="configurationsOne" data-parent="#metafieldsConfiguration">
                                <div className="card-body">
                                    <ul>
                                        <p>
                                            Here, we are going Understand The Date Range.
                                        </p>
                                        <p>- This Setting's Date Range is used to show Table and graph selected date range wise<br/>
                                            - Here is the available option to select the date udner date-range options
                                        </p>
                                        <img style={{width:"35%"}} src="/images/userGuide/screenshot.png"
                                             className="meta-config-install-img"/>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="toggle_btn" as={Card.Header} eventKey="2">
                        Select View In Setting
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <div id="collapse-exported-csv" className="collapse show" aria-labelledby="exported-csvOne"
                                 data-parent="#metafieldsConfiguration">
                                <div className="card-body">
                                    <ul>
                                        <p>
                                            Here, we are going to understand the select view.
                                        </p>
                                        <p>- This Setting's Select View is used to show Ui according to selected options<br/>
                                            - Here is the available option to select the date udner date-range options
                                        </p>
                                        <img style={{width:"35%"}} src="/images/userGuide/select-view.png"
                                             className="meta-config-install-img"/>
                                        <br/>
                                        <br/>
                                        <li><h3>For Product-Page View</h3></li>
                                        <p>- if we select product page the view in store front-end look like this
                                        </p>
                                        <img src="/images/userGuide/product-page.png"
                                             className="meta-config-install-img"/>
                                        <br/>
                                        <br/>
                                        <li><h3>For Model-Page View</h3></li>
                                        <p>- if we select Model page the view in store front-end look like this
                                        </p>
                                        <img src="/images/userGuide/modal-button.png"
                                             className="meta-config-install-img"/>
                                        <p>- After click on the icon which is displaying in bottom right corner this kind of popup will appear on the screen</p>
                                        <img src="/images/userGuide/model-view.png"
                                             className="meta-config-install-img"/>
                                             <br/>
                                             <br/>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="toggle_btn" as={Card.Header} eventKey="3">
                        Manually Add Short-code to Templates
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <div id="collapse-exported-csv" className="collapse show" aria-labelledby="exported-csvOne"
                                 data-parent="#metafieldsConfiguration">
                                <div className="card-body">
                                    <ul>
                                        <p>
                                            Here, we are going to understand how to add code manually.
                                        </p>
                                        <p>- If Your App's themes do not have the code then you have to import short-code in your app.<br/>
                                            - Here we will see when and how to add add this short-code <br/>
                                            - firstly we have to click on this online store button which you can saw in this below image
                                        </p>
                                        <img style={{width:"35%"}} src="/images/userGuide/online-store-btn.png"
                                             className="meta-config-install-img"/>
                                        <br/>
                                        <br/>
                                        <li><h3>Perform edit actions in themes section</h3></li>
                                        <p>- to perform edit action we have to click on this edit code button which you can see in below image
                                        </p>
                                        <img src="/images/userGuide/edit-code-btn.png"
                                             className="meta-config-install-img"/>
                                        <br/>
                                        <br/>
                                        <li><h3>Edit Product.liquid file</h3></li>
                                        <p>- you will see product.liquid file in templates section which is available and look like this.(depends on various themes)
                                        </p>
                                        <img src="/images/userGuide/product-liquid-file.png"
                                             className="meta-config-install-img"/>
                                             <p> - after open this file you will saw this lines of code then you have to hover product's line code</p>
                                             <p> - then after you will saw this icons (below image)</p>
                                             <p> - click on that icon </p>
                                             <img src="/images/userGuide/add-div-tag.png"
                                             className="meta-config-install-img"/>
                                        <p> This is the code that you have to add in product.liquid file </p>
                                        <br/>
                                            <h1>
                                             <pre>
                                                 <code className="code-style">
                                                 &lt;div id="shopify-section-product-template-panther" class="panther-div"&gt;
                                                 &lt;/div&gt;
                                             </code>
                                             </pre>
                                            </h1>
                                        <br/>
                                        <br/>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
                </SRLWrapper>
            </SimpleReactLightbox>
        </>
    )
};
export default About;
