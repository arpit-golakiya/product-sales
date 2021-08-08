import React, { useCallback, useState, useEffect } from "react";
import { ContextualSaveBarComponent } from "../ContextualSaveBarComponent";
import {Card,Layout,ChoiceList,SkeletonBodyText,ButtonGroup,Button,Form,FormLayout,TextField,Select,RadioButton,Stack,Toast,Spinner} from "@shopify/polaris";
import {
    titleStyle,
    months,
    chartType,
    series,
    dateRangeOptions,
    ModalButtonPositionType
} from '../Utils/Constants';

import 'bootstrap/dist/css/bootstrap.css';
import {AxiosService} from "../Utils/axios.service";
import Charts from "../ChartComponent/Charts";
import Counter from "../AdminComponents/Counter";
import RecordTable from "../AdminComponents/RecordTable";

function Home() {
    const [isDirty, setIsDirty] = useState(false);
    const [setting, setSetting] = useState({
        title: "Total Transaction",
        subTitle: "",
        listTitle: "Product Transaction Details",
        view: "product-page",
        modal_button_position:"right-bottom",
        application_status: false,
        isTableEnable: false,
        dateRange: "three-month",
        selectedChart: "line-chart",
        user_id: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        getSettings();
    }, []);

    const  getSettings = async () => {
        const headers = {
            'Authorization': `Bearer ${window.sessionToken}`,
        }
        setIsLoading((isLoading) => !isLoading);
        await AxiosService.get("/get-settings", { headers: headers }).then(response => {
            const res = response && response.data;
            res && setSetting(res);
            setIsLoading((isLoading) => !isLoading);
        })
    };

    const handleSubmit = async () => {
        const headers = {
            'Authorization': `Bearer ${window.sessionToken}`,
        }
        setIsLoading((isLoading) => !isLoading);
        await AxiosService.post("save-settings", setting, { headers: headers }).then(response => {
            setIsLoading((isLoading) => !isLoading);
            setIsDirty(!isDirty);
            setSuccess(true);
        })
        .catch(error => {
            setIsLoading((isLoading) => !isLoading);
            setIsDirty((isDirty) => !isDirty);
            setSuccess(false)
        })
    };

    const handleTitleChange = value => {
        setIsDirty(true);
        setSetting({ ...setting, ["title"]: value });
    };

    const handleSubTitleChange = value => {
        setIsDirty(true);
        setSetting({ ...setting, ["subTitle"]: value });
    };

    const handleListTitleChange = value => {
        setIsDirty(true);
        setSetting({ ...setting, ["listTitle"]: value });
    };

    const GetChartData = () => {
        const handleChange = useCallback(
            value => {
                setIsDirty(true);
                setSetting({ ...setting, ["selectedChart"]: value[0] });
            },
            [setting.selectedChart]
        );

        return (
            <>
                <h4 style={titleStyle}>Chart Type</h4>
                <ChoiceList
                    choices={chartType}
                    selected={setting.selectedChart}
                    onChange={value => handleChange(value)}
                    title=""
                />
            </>
        );
    };

    const ViewType = () => {
        const handleChange = (
            value => {
                setIsDirty(true);
                setSetting({ ...setting, ["view"]: value[0] });
            }
        );

        const handlePositionChange = (
            value => {
                setIsDirty(true);
                setSetting({ ...setting, ["modal_button_position"]: value[0] });
            }
        );

        const renderChildren = (isSelected) =>
            isSelected && (
                <>
                    <br/>
                    <h4 style={titleStyle}>Placement</h4>
                    <ChoiceList
                            choices={ModalButtonPositionType}
                            selected={setting.modal_button_position}
                            onChange={value => handlePositionChange(value)}
                            title=""
                        />
                </>
            );

        return (
            <>
                <h4 style={titleStyle}>Select View Type</h4>
                <ChoiceList
                    choices={[
                        { value:"product-page", label:"Product Page"},
                        { value:"modal", label:"Modal", renderChildren},
                    ]}
                    selected={setting.view}
                    onChange={value => handleChange(value)}
                />
            </>
        );
    };

    const GetStatus = () => (
        <>
            <h4 style={titleStyle}>Status</h4>
            <ButtonGroup segmented>
                <Button
                    onClick={() => {
                        setSetting({ ...setting, ["application_status"]: true });
                        setIsDirty(true);
                    }}
                    primary={setting.application_status}
                >
                    Enable
                </Button>

                <Button
                    onClick={() => {
                        setSetting({ ...setting, ["application_status"]: false });
                        setIsDirty(true);
                    }}
                    primary={!setting.application_status}
                >
                    Disable
                </Button>
            </ButtonGroup>
        </>
    );

    const handleDateRangeChange = (value) => {
        setSetting({ ...setting, dateRange: value });
        setIsDirty(true);
    };

    const IsTableEnable = () => {
        const handleChange = useCallback(
            (_checked, newValue) => {
                setIsDirty(true);
                setSetting({ ...setting, ["isTableEnable"]: !setting.isTableEnable })
            },
            [],
        );

        return (
            <>
                <h4 style={titleStyle}>Customer Table</h4>
                <Stack>
                    <RadioButton
                        label="Show"
                        checked={!!setting.isTableEnable === true}
                        id="enable"
                        name="isTableEnable"
                        onChange={handleChange}
                    />
                    <RadioButton
                        label="Hide"
                        id="disable"
                        name="isTableEnable"
                        checked={!!setting.isTableEnable === false}
                        onChange={handleChange}
                    />
                </Stack>
            </>
        )
    };

    return (
        <>
            { !isDirty ? null : (
                <ContextualSaveBarComponent
                    message={"Unsaved Changes"}
                    onAction={handleSubmit}
                    loading={false}
                    disabled={false}
                    discardAction={() => setIsDirty(false)}
                />
            )}
            <Layout>
                {
                    success !== null ?
                        <Toast content= { !success ? "Something Went Wrong! " : "Setting Saved Successfully!" }  error={!success} duration={2000} onDismiss={ () => setSuccess(null)} />
                        : null
                }
                <Layout.Section secondary>
                    <Card title="Settings" sectioned>
                        {
                            isLoading ?
                                <Spinner accessibilityLabel="Spinner example" size="large" />
                                :
                                <>
                                    <GetStatus />
                                    <br />
                                    <Form>
                                        <FormLayout>
                                            <TextField
                                                value={setting.title}
                                                onChange={handleTitleChange}
                                                label="Title"
                                                type="text"
                                                helpText={
                                                    <span>We’ll use this Title to Display show above chart.
                                                    </span>
                                                }
                                            />
                                            <TextField
                                                value={setting.subTitle}
                                                onChange={handleSubTitleChange}
                                                label="Sub Title"
                                                type="text"
                                                helpText={
                                                    <span>We’ll use this Sub title to show under title.
                                                    </span>
                                                }
                                            />
                                            <TextField
                                                value={setting.listTitle}
                                                onChange={handleListTitleChange}
                                                label="List Title"
                                                type="text"
                                                helpText={
                                                    <span>We’ll use this list title to show as a table title.
                                                    </span>
                                                }
                                            />
                                            <Select
                                                label="Date Range"
                                                options={dateRangeOptions}
                                                onChange={handleDateRangeChange}
                                                value={setting.dateRange}
                                                helpText={
                                                    <span>
                                                        We’ll use this Date Range to filter the list
                                                    </span>
                                                }
                                            />
                                        </FormLayout>
                                    </Form>
                                    <br />
                                    <IsTableEnable/>
                                    <br />
                                    <GetChartData />
                                    <br />
                                    <ViewType />
                                </>
                        }
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Layout>
                        <Layout.Section oneHalf>
                            <Card title="Preview" sectioned>
                                {
                                    isLoading ?
                                        <Spinner accessibilityLabel="Spinner example" size="large" />
                                        :
                                        <React.Suspense fallback={<SkeletonBodyText lines={23} />} >
                                            <Charts series={series} months={months} selectedChart={setting.selectedChart} />
                                        </React.Suspense>
                                }
                            </Card>
                        </Layout.Section>
                        <Layout.Section oneHalf>
                            <Counter/>
                        </Layout.Section>
                    </Layout>
                    <br/>
                    { setting && setting.isTableEnable === true || setting.isTableEnable === 1 ?
                        <Layout>
                            <Layout.Section>
                                <RecordTable />
                            </Layout.Section>
                        </Layout>
                        :
                        null
                    }
                </Layout.Section>
            </Layout>
        </>
    );
}
export default Home;
