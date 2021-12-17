import React, { useEffect } from "react";
import "./index.css";
import { widget } from "../charting_library/charting_library";
import Datafeed from "./api/datafeed";

const TVChartContainer = (props) => {
  const {
    symbol,
    interval,
    containerId,
    datafeedUrl,
    libraryPath,
    chartsStorageUrl,
    chartsStorageApiVersion,
    clientId,
    userId,
    fullscreen,
    autosize,
    studiesOverrides,
  } = props;

  useEffect(() => {
    const widgetOptions = {
      symbol: "Bitfinex:BTC/USD",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: "1D",
      container_id: "tv_chart_container",
      library_path: "/charting_library/",

      locale: "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: true,
      autosize: autosize,
      studies_overrides: studiesOverrides,
      theme: "Dark",
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
        tvWidget = null;
      }
    };
  }, []);

  return <div id={containerId} className={"TVChartContainer"} />;
};

TVChartContainer.defaultProps = {
  symbol: "AAPL",
  interval: "D",
  containerId: "tv_chart_container",
  datafeedUrl: "https://demo_feed.tradingview.com",
  libraryPath: "/charting_library/",
  chartsStorageUrl: "https://saveload.tradingview.com",
  chartsStorageApiVersion: "1.1",
  clientId: "tradingview.com",
  userId: "public_user_id",
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},
};

export default TVChartContainer;
