import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker, Select } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButtons";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import baseURL from "../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

const codes = [
  { name: "pending", code: "3" },
  { name: "processing", code: "2" },
  { name: "recieved", code: "1" },
];
const RequestCard = ({ item }) => {
  const [requestStatus, setRequestStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const navigation = useNavigation();

  const updateRequest = () => {
    AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const request = {
      fullname: item.fullname,
      dateofRequest: item.dateofRequest,
      id: item.id,
      requestItems: item.requestItems,
      phone: item.phone,
      status: statusChange,
      totalPrice: item.totalPrice,
      user: item.user,
      purpose: item.purpose,
    };
    axios
    .put(`${baseURL}requests/${item.id}`, request, config)
    .then((res) => {
      if (res.status == 200 || res.status == 201) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Request Edited",
          text2: "",
        });
        setTimeout(() => {
          navigation.navigate("Requests");
        }, 500);
      }
    })
    .catch((error) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
    });
}
  useEffect(() => {
    if (item.status == "3") {
      setRequestStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (item.status == "2") {
      setRequestStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("processing");
      setCardColor("#F1C40F");
    } else { if (item.status == "1")
      setRequestStatus(<TrafficLight available></TrafficLight>);
      setStatusText("received");
      setCardColor("#2ECC71");
    }

    return () => {
      setRequestStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  return (

    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Request Number: #{item.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {requestStatus}
        </Text>

        <Text>Fullname: {item.fullname}</Text>
   
        <Text>Date of Request: {item.dateofRequest.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {item.totalPrice}</Text>
        </View>
        {/* {item.editMode ? ( */}
        <View>
          <Select
            width="80%"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: undefined }}
            selectedValue={statusChange}
            color="white"
            placeholder="Change Status"
            placeholderTextColor="white"
            placeholderStyle={{ color: "#FFFFFF" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setStatusChange(e)}
          >
            {codes.map((c) => {
              return <Select.Item key={c.code} label={c.name} value={c.code} />;
            })}
          </Select>

          <EasyButton secondary large onPress={() => updateRequest()}>
            <Text style={{ color: "white" }}>Update</Text>
          </EasyButton>
        </View>
        {/* //   ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RequestCard;
