import React from "react";
import { Card, Layout,DisplayText, TextContainer, Heading, Stack } from "@shopify/polaris";
import Tick from "../../../css/Svgs/tick.svg";

function About() {
    return (
        <div className="panther-plan-price-card">
            <Layout >
                <Layout.Section oneThird>
                </Layout.Section>
                <Layout.Section oneThird>
                    <Card subdued sectioned>
                        <TextContainer>
                            <Heading>PLUS</Heading>
                        </TextContainer>
                        <br/>
                        <DisplayText size="extraLarge"> $3.00 / month </DisplayText>
                        <br/>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">7 days Trail</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">Dates range</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">App: Enable/Disable</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">Six types of charts</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">Display sales in List View by country</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">Placement control (Product Page or in Modal Box)</DisplayText>
                        </Stack>
                        <Stack>
                            <img style={{marginTop:"13px"}} src={Tick} />
                            <DisplayText size="extraLarge">Priority support</DisplayText>
                        </Stack>
                        <br/>
                        {/*<Link url="/billing/2">*/}
                        {/*    <Button primary>Start Plus</Button>*/}
                        {/*</Link>*/}
                    </Card>
                </Layout.Section>
                <Layout.Section oneThird>
                </Layout.Section>
            </Layout>
        </div>
    );
}
export default About;
