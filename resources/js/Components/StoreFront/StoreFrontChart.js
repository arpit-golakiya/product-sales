import React from "react";
import Chart from "react-apexcharts";

export const StoreFrontChart = (props)  => {
    if (props.chartType === undefined || props.months === undefined || props.sums === undefined){
        return true;
    }
    const chartType = props.chartType;
    const months = props.months;
    const sums = props.sums;

    const series = [{
        name: "",
        data: sums
    }];

    let options = null,
        type = null;

    if (chartType === "line-chart") {
        options = {
            chart: {
                id: "basic-bar",
                type:"bar",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    tools: {
                        download: false,
                    },
                },
            },
            colors: ['rgb(0, 143, 251)'],
            plotOptions: {
                bar: {
                    columnWidth: '75%',
                    endingShape: 'flat',
                    dataLabels: {
                        position: 'center', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                style: {
                    fontSize: '12px',
                    colors: ["#FFFFFF"]
                }
            },
            stroke: {
                width:0
            },
            type:"bar",
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [100]
                },
            },
            xaxis: {
                position: 'bottom',
                type: 'category',
                categories: months,
                labels: {
                    style: {
                        colors: '#202123',
                        fontSize: '12px'
                    }
                },
            },
            zoom: {
                enabled: false
            }
        };
        type = "bar";

        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    } else if (chartType === "basic-area-chart") {
        options = {
            chart: {
                height: 350,
                type: 'area',
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    tools: {
                        download: false,
                    },
                },
                zoom: {
                    enabled: false
                }
            },
            colors :'#028EFA',
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'center', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                background:{
                    enabled: false,
                },
                enabled: true,
                offsetY: -5,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [100]
                },
            },
            xaxis: {
                categories: months,
                position: 'bottom',
                labels: {
                    style: {
                        colors: '#202123',
                        fontSize: '12px'
                    }
                },
            }
        };
        type = "area";
        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    } else if (chartType === "column-with-data-label") {
        options = {
            chart: {
                height: 350,
                type: "bar",
                toolbar: {
                    tools: {
                        download: false
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: "top"
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                    return val;
                },
                offsetY: -15,
                style: {
                    fontSize: "12px",
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: months,
                position: "top"
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false,
                    formatter: function(val) {
                        return val;
                    }
                }
            },
            zoom: {
                enabled: false
            }
        };
        type = "bar";

        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    } else if (chartType === "column-with-rotated-label") {
        options = {
            chart: {
                height: 350,
                type: "bar",
                toolbar: {
                    tools: {
                        download: false
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                    endingShape: "rounded"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
            grid: {
                row: {
                    colors: ["#fff", "#f2f2f2"]
                }
            },
            xaxis: {
                labels: {
                    rotate: -45
                },
                categories: months,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.85,
                    opacityTo: 0.85,
                    stops: [50, 0, 100]
                }
            },
            zoom: {
                enabled: false
            },
        };
        type = "bar";

        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    } else if (chartType === "distributed-column") {
        const colors = ["#40A0FC","#51E7A6","#FEBC4A","#FF6478","#8C75D7","#6E848E","#52B3AA","#DA3FED","#ABD3FE","#785DD0","#B47EB4","#0090FB"];
        options = {
            chart: {
                height: 350,
                type: 'bar',
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    tools: {
                        download: false,
                    },
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                    endingShape: 'flat'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: months,
                position: 'bottom',
                labels: {
                    style: {
                        colors: colors,
                        fontSize: '12px'
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [100]
                },
            },
            zoom: {
                enabled: false
            }
        };
        type = "bar";

        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    } else if (chartType === "line-with-data-label") {
        options = {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
                background:{
                    enabled: false,
                },
                enabled: true,
                offsetY: -5,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            stroke: {
                width :"3",
                curve: 'smooth'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },

            xaxis: {
                categories: months,
                position: 'bottom',
                labels: {
                    style: {
                        colors: '#202123',
                        fontSize: '12px'
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            zoom: {
                enabled: false
            }
        };
        type = "line";
        return <Chart options={options} series={series} type={type} style={{height:"75%",width:"75%"}} />;
    }
};
export default StoreFrontChart;
