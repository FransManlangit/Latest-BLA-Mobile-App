import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text,
  VStack,
  Heading,
  Center,
  HStack,
  Box,
  Image,
} from "native-base";
import { Ionicons, MaterialIcons, SmallCloseIcon } from "@expo/vector-icons";
import DocumentList from "./DocumentList";
import SearchedDocument from "./SearchedDocument";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import {COLORS, SIZES} from "../../assets/constants";

var { width, height } = Dimensions.get("window");

const DocumentContainer = () => {
  const [documents, setDocuments] = useState([]);
  const [documentsFiltered, setDocumentsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchDocument = (text) => {
    console.log(text);
    setDocumentsFiltered(
      documents.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      axios
        .get(`${baseURL}documents`)
        .then((res) => {
          setDocuments(res.data);
          setDocumentsFiltered(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api call error");
        });
    }, [])
  );
  console.log(documentsFiltered);

  return (
    <>
      {loading === false ? (
        <Center>
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              onFocus={openList}
              onChangeText={(text) => searchDocument(text)}
              placeholder="Search"
              variant="filled"
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
              InputRightElement={
                focus === true ? (
                  <Icon
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="close" size="12" color="black" />}
                  />
                ) : null
              }
            />
          </VStack>
          {focus === true ? (
            <SearchedDocument documentsFiltered={documentsFiltered} />
          ) : (
            <ScrollView>
              {documents.length > 0 ? (
                <View style={styles.listContainer}>
                  {documents.map((item) => {
                    return <DocumentList key={item._id.$oid} item={item} />;
                  })}
                </View>
              ) : (
                <View style={[styles.center, { height: height / 2 }]}>
                  <Text>No documents found</Text>
                </View>
              )}
            </ScrollView>
          )}
        </Center>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: 8, 
    overflow: 'hidden',
    backgroundColor: 'white', 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.small / 2, 
    borderRadius: 8, 
    overflow: 'hidden',
    backgroundColor: 'white', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});


export default DocumentContainer;
