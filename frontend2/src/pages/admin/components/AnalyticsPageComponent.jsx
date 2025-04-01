import { Row, Col, Form } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect ,useRef} from "react";
import axios from "axios";

const AnalyticsPageComponent = ({
  fetchOrdersForFirstDate,
  fetchOrdersForSecondDate,
  socketIOClient
}) => {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  var previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    let today = new Date().toDateString();

    const handler = (newOrder) => {
        const orderDate = new Date(newOrder.createdAt).toLocaleString("en-US", { 
            hour: "numeric", 
            hour12: true, 
            timeZone: "UTC" 
        });

        if (new Date(newOrder.createdAt).toDateString() === today) {
            if (today === new Date(firstDateToCompare).toDateString()) {
                setDataForFirstSet((prev) => {
                    if (prev.length === 0) {
                        return [{ name: orderDate, [firstDateToCompare]: newOrder.orderTotal.cartSubtotal }];
                    }

                    const length = prev.length;
                    const lastItem = prev[length - 1];

                    if (lastItem.name === orderDate) {
                        return prev.map((item, index) =>
                            index === length - 1 
                                ? { ...item, [firstDateToCompare]: item[firstDateToCompare] + newOrder.orderTotal.cartSubtotal }
                                : item
                        );
                    } else {
                        return [...prev, { name: orderDate, [firstDateToCompare]: lastItem[firstDateToCompare] + newOrder.orderTotal.cartSubtotal }];
                    }
                });
            } 
            else if (today === new Date(secondDateToCompare).toDateString()) {
                setDataForSecondSet((prev) => {
                    if (prev.length === 0) {
                        return [{ name: orderDate, [secondDateToCompare]: newOrder.orderTotal.cartSubtotal }];
                    }

                    const length = prev.length;
                    const lastItem = prev[length - 1];

                    if (lastItem.name === orderDate) {
                        return prev.map((item, index) =>
                            index === length - 1 
                                ? { ...item, [secondDateToCompare]: item[secondDateToCompare] + newOrder.orderTotal.cartSubtotal }
                                : item
                        );
                    } else {
                        return [...prev, { name: orderDate, [secondDateToCompare]: lastItem[secondDateToCompare] + newOrder.orderTotal.cartSubtotal }];
                    }
                });
            }
        }
    };

    socket.on("newOrder", handler);

    return () => {
        socket.off("newOrder", handler);
        socket.disconnect();
    };
}, [setDataForFirstSet, setDataForSecondSet, firstDateToCompare, secondDateToCompare]);
  const abctrl = useRef(new AbortController());
  console.log(dataForFirstSet,'1',dataForSecondSet,'2')

  useEffect(() => {
    // Use useRef to persist AbortController across render

    const fetchData = async () => {
        try {
            const firstDateResponse = await fetchOrdersForFirstDate( abctrl,firstDateToCompare);
            let orderSum = 0;
            const firstOrders = firstDateResponse.map((order) => {
                orderSum += order.orderTotal.cartSubtotal;
                var date = new Date(order.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                    timeZone: "UTC",
                });
                return { name: date, [firstDateToCompare]: orderSum };
            });
            setDataForFirstSet(firstOrders);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request was canceled:", err.message);
            } else {
                console.error("API error (First Date):", err);
            }
        }

        try {
            const secondDateResponse = await fetchOrdersForSecondDate(abctrl,secondDateToCompare);
            let orderSum = 0;
            const secondOrders = secondDateResponse.map((order) => {
                orderSum += order.orderTotal.cartSubtotal;
                var date = new Date(order.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                    timeZone: "UTC",
                });
                return { name: date, [secondDateToCompare]: orderSum };
            });
            setDataForSecondSet(secondOrders);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request was canceled:", err.message);
            } else {
                console.error("API error (Second Date):", err);
            }
        }
    };

    fetchData();

    return () => {
        abctrl.current.abort(); // Cancel previous requests when dependencies change
        abctrl.current = new AbortController(); // Create a new controller for next execution
    };
}, [firstDateToCompare, secondDateToCompare]); 

  // useEffect(() => {
  //   const abctrl = new AbortController();
  //   fetchOrdersForFirstDate(abctrl, firstDateToCompare)
  //     .then((data) => {
  //       let orderSum = 0;
  //       const orders = data.map((order) => {
  //         orderSum += order.orderTotal.cartSubtotal;
  //         var date = new Date(order.createdAt).toLocaleString("en-US", {
  //           hour: "numeric",
  //           hour12: true,
  //           timeZone: "UTC",
  //         });
  //         return { name: date, [firstDateToCompare]: orderSum };
  //       });
  //       setDataForFirstSet(orders);
  //     })
  //     .catch((err) =>
  //     {
  //       if (axios.isCancel(err)) {
  //         console.log("Request was canceled:", err.message);
  //       } 
  //     }
  //     );

  //   fetchOrdersForSecondDate(abctrl, secondDateToCompare)
  //     .then((data) => {
  //       let orderSum = 0;
  //       const orders = data.map((order) => {
  //         orderSum += order.orderTotal.cartSubtotal;
  //         var date = new Date(order.createdAt).toLocaleString("en-US", {
  //           hour: "numeric",
  //           hour12: true,
  //           timeZone: "UTC",
  //         });
  //         return { name: date, [secondDateToCompare]: orderSum };
  //       });
  //       setDataForSecondSet(orders);
  //     })
  //     .catch((err) =>
  //       {
  //         if (axios.isCancel(err)) {
  //           console.log("Request was canceled:", err.message);
  //         } 
  //       }
  //     );
  //   return () => abctrl.abort();
  // }, [firstDateToCompare, secondDateToCompare]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };


  // Merge the two datasets into a single array
const mergedData = [];

const allTimes = new Set([...dataForFirstSet.map(d => d.name), ...dataForSecondSet.map(d => d.name)]);

allTimes.forEach(time => {
    const firstSetData = dataForFirstSet.find(d => d.name === time) || {};
    const secondSetData = dataForSecondSet.find(d => d.name === time) || {};

    mergedData.push({
        name: time,
        [firstDateToCompare]: firstSetData[firstDateToCompare] || 0,
        [secondDateToCompare]: secondSetData[secondDateToCompare] || 0
    });
});

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Black Friday Cumulative Revenue {firstDateToCompare} VS{" "}
          {secondDateToCompare}
        </h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            onChange={firstDateHandler}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
            defaultValue={firstDateToCompare}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={secondDateHandler}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
            defaultValue={secondDateToCompare}
          />
        </Form.Group>
        <ResponsiveContainer width="100%" height={500}>
  <LineChart data={mergedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" 
    label={{
               
      value: "TIME",
      offset: 50,
       position: "insideBottomRight",
     }}
     allowDuplicatedCategory={false}/>
    <YAxis  label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }} />
    <Tooltip />
    <Legend />

    {/* Two separate Line components for each date */}
    <Line
      type="monotone"
      dataKey={firstDateToCompare}  // Make sure it matches mergedData
      stroke="#8884d8"
      strokeWidth={3}
      dot={{ r: 4 }}  // Ensure dots are visible for debugging
    />
    <Line
      type="monotone"
      dataKey={secondDateToCompare}  // Make sure it matches mergedData
      stroke="#82ca9d"
      strokeWidth={3}
      dot={{ r: 4 }}
    />
  </LineChart>
</ResponsiveContainer>
        {/* <ResponsiveContainer width="100%" height={500}>
          <LineChart
             data={mergedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicatedCategory={false}
            />
            <YAxis
              label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {dataForFirstSet.length > dataForSecondSet.length ? (
              <>
                <Line
                  type="monotone"
                  dataKey={firstDateToCompare} 
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                  type="monotone"
                  dataKey={secondDateToCompare} 
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            ) : (
              <>
                <Line
               
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer> */}
      </Col>
    </Row>
  );
};

export default AnalyticsPageComponent;
