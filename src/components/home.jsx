import {
  Box,
  Text,
  Heading,
  FlatList,
  HStack,
  ArrowForwardIcon,
  Input,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { usersContext } from "../context";
import { getUsersList } from "../actions";
export const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(usersContext);
  let [text, setText] = useState("");
  let [list, setList] = useState([]);
  const handleSearch = (e) => {
    //console.log(e);
    setText(e);
    search();
  };
  const search = () => {
    let arr = state.users.list.filter((user) => {
      let userInput = user.name.toLowerCase();
      return userInput.includes(text.toLowerCase());
    });
    //console.log(arr)
    setList(arr);
  };

  const resolve = async () => {
    dispatch(await getUsersList());
  };
  useEffect(() => {
    resolve();
  }, []);

  return (
    <Box>
      <Heading style={{ textAlign: "center", padding: "5%" }}>
        Users List
      </Heading>

      <Box alignItems="center">
        <Input
          placeholder="Search...."
          w="90%"
          value={text}
          margin="3"
          maxWidth="400px"
          onChangeText={handleSearch}
        />
      </Box>
      {text.length > 3 ? (
        <FlatList
          data={list || []}
          renderItem={({ item }) => {
            return (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack style={{ justifyContent: "space-between" }}>
                  <Text>{item.name}</Text>
                  <ArrowForwardIcon
                    onPress={() => {
                      navigation.navigate("Profile", { id: item.id });
                    }}
                  />
                </HStack>
              </Box>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={state.users.list || []}
          renderItem={({ item }) => {
            return (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack style={{ justifyContent: "space-between" }}>
                  <Text>{item.name}</Text>
                  <ArrowForwardIcon
                    onPress={() => {
                      navigation.navigate("Profile", { id: item.id });
                    }}
                  />
                </HStack>
              </Box>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};
