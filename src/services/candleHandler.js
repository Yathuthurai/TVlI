let socket = new WebSocket("ws://3.138.182.131:8765");

const msg = {
  type: "subscribe",
  market: "BTC-PERP",
};

const rs = {
  type: "done_subscribe",
};

export let dataRes = [];
export let passingData = [];

function Queue() {
  this.elements = [];
}

const subscribingInstrumentResponse = () => {
  alert("[open] Connection established 2");
  socket.send(JSON.stringify(rs));

  socket.onmessage = (event) => {
    if (event) {
      //create a JSON object
      console.log("----------subscribingInstrumentRes---------------");
      console.log(event.data);
    }
  };
};

export const subscribingInstrumentRequest = () => {
  let bool = false;
  socket.onopen = function (e) {
    alert("[open] Connection established");
    alert("Sending to server");
    socket.send(JSON.stringify(msg));
  };
  socket.onmessage = (message) => {
    console.log("----------subscribingInstrumentRequest---------------");
    // console.log("hi", message.data);
    dataRes = JSON.parse(message?.data);
    console.log(dataRes.success);
    if (dataRes.success === true) {
      bool = true;
    }
    if (bool == true) {
      console.log("sdfsdfsdfsf");
      subscribingInstrumentResponse();
    }
  };
};
