import React from "react";
import OrderBar from "./OrderBar";
import * as DateService from "../../services/dateService";
import * as AnalyticsService from "../../services/analyticsService";
import debug from "airpals-debug";

const _logger = debug.extend("Analytics");

class AnalyticsOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersTotal: 0,
      ordersLabel: 0,
      ordersData: 0,
    };
  }
  componentDidMount() {
    AnalyticsService.GetOrders()
      .then(this.onOrdersSuccess)
      .catch(this.onCallFailure);
  }
  onOrdersSuccess = (response) => {
    let orders = response.items;
    let total = [];
    let labels = [];
    let data = [];
    for (let index = 0; index < orders.length; index++) {
      let ordersArr = orders[index].orderCount;
      let ordersLabels = DateService.formatDateDay(orders[index].date);
      total.push(ordersArr);
      labels.push(ordersLabels);
      data.push(ordersArr);
    }
    let totalCount = total.reduce((a, b) => a + b, 0);
    this.setState((prevState) => {
      return {
        ...prevState,
        ordersTotal: totalCount,
        ordersLabel: labels,
        ordersData: data,
      };
    });
  };
  onCallFailure = (error) => {
    _logger(error);
  };
  render() {
    return (
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div className="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
                <em className="fa-3x mr-2 fas fa-boxes" />
              </div>
              <div className="col-8 py-3 bg-primary rounded-right">
                <div className="h2 mt-0">
                  {this.state.ordersTotal ? this.state.ordersTotal : 0}
                </div>
                <div className="text-uppercase">Amount of Orders</div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div className="col-4 d-flex align-items-center bg-green justify-content-center rounded-left">
                <div className="text-center">
                  <div
                    format="MMMM"
                    className="text-sm"
                    style={{ display: "inline-block" }}
                  >
                    {DateService.currentMonth()}
                  </div>
                  <br />
                  <div
                    format="D"
                    className="h2 mt0"
                    style={{ display: "inline-block" }}
                  >
                    {DateService.currentDayN()}
                  </div>
                </div>
              </div>
              <div className="col-8 py-3 rounded-right">
                <div
                  format="dddd"
                  className="text-uppercase"
                  style={{ display: "inline-block" }}
                >
                  {DateService.currentDayS()}
                </div>
                <br />
                <div
                  format="h:mm"
                  className="h2 mt0 mr-sm"
                  style={{ display: "inline-block" }}
                >
                  {DateService.currentTime()}
                </div>
                <div
                  format="a"
                  className="text-muted text-sm"
                  style={{ display: "inline-block" }}
                >
                  {DateService.currentAmPm()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <div className="card card-default">
              <div className="card-header">Orders</div>
              {this.state.ordersData !== 0 &&
                this.state.ordersLabel !== undefined && (
                  <OrderBar
                    data={this.state.ordersData}
                    label={this.state.ordersLabel}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AnalyticsOrders;
