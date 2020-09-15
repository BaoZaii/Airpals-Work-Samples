import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

const OrderBar = (props) => {
  const [barData, setBarData] = useState({});

  const bar = () => {
    let barColor = "#FD87A6";
    setBarData({
      labels: props.label,
      datasets: [
        {
          label: "Orders",
          data: props.data,
          backgroundColor: [
            barColor,
            barColor,
            barColor,
            barColor,
            barColor,
            barColor,
            barColor,
          ],
          borderWidth: 3,
        },
      ],
    });
  };
  useEffect(() => {
    bar();
  }, []);
  return (
    <div className="App">
      <div>
        <Bar
          data={barData}
          options={{
            legend: {
              align: "end",
            },
            layout: {
              padding: {
                left: 20,
                right: 30,
                top: 0,
                bottom: 10,
              },
            },
            responsive: true,
            title: { text: "orders count", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};
OrderBar.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.string),
};
export default OrderBar;
