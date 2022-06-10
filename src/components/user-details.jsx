import { useContext, useEffect } from "react";
import { getUserDetails } from "../actions";
import { usersContext } from "../context";
import {
  VStack,
  Box,
  Divider,
  Text,
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base";
export const UserDetails = ({ route }) => {
  const { id } = route.params;

  const resolve = async () => {
    dispatch(await getUserDetails(id));
  };
  useEffect(() => {
    if (id) resolve();

    return () => dispatch({ type: "CLEAR" });
  }, []);
  const { state, dispatch } = useContext(usersContext);
  const user = state.users.details;

  if (!user) return <Text>Loading ...</Text>;
  return (
    <Box border="1" borderRadius="md" margin="5">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{user.name}</Text>
        </Box>
        <Box px="4" pt="4">
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{user.email}</Text>
        </Box>
        <Box px="4" pt="4">
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{user.phone}</Text>
        </Box>
      </VStack>
    </Box>
  );
};
