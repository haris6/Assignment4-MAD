import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  PulseIndicator,
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  Card,
  CardItem,
  Header,
} from 'native-base';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const theTodos = ({ navigation, route }) => {
  const { element } = route.params;
  const [Todos, setTodos] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/' + element.id + '/todos')
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setTodos(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <List
          style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}
          dataArray={Todos}
          renderRow={(element) => (
            <ListItem>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingBottom: 10,
                  paddingTop: 10,
                }}>
                <Body>
                  <Text style={{ color: '#17A589' }}>{element.title}</Text>
                </Body>
                <Right>
                  {element.completed ? (
                    <Feather name="check-square" size={18} color="#17A589" />
                  ) : (
                    <Feather name="square" size={18} color="#FBFCFC" />
                  )}
                </Right>
              </View>
            </ListItem>
          )}></List>
      </Content>
    </Container>
  );
};

const Post = ({ navigation, route }) => {
  const { element } = route.params;
  const [Comments, setComments] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/posts/' + element.id + '/comments'
    )
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setComments(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Container style={{ backgroundColor: 'rgba(33,	47,	61,0.7)' }}>
      <Content padder>
        <Card>
          <CardItem
            header
            bordered
            style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
            <View>
              <Thumbnail
                source={{
                  uri: 'https://picsum.photos/200/300?random=' + element.id,
                }}
              />
            </View>
            <Body>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#17A589',
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                {element.title}
              </Text>
            </Body>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: 'rgba(33,	47,	61,0.9)' }}>
            <Text style={{ fontWeight: 'bold', color: '#FBFCFC' }}>
              {element.body}
            </Text>
          </CardItem>
          <CardItem
            header
            bordered
            style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
            <Text style={{ fontWeight: 'bold', color: '#17A589' }}>
              Comments :
            </Text>
          </CardItem>
          <FlatList
            data={Comments}
            renderItem={({ item }) => (
              <CardItem
                bordered
                style={{
                  backgroundColor: 'rgba(33,	47,	61,0.9)',
                  borderColor: 'white',
                  borderBottomWidth: 0.3,
                }}>
                <Body>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View>
                      <Thumbnail
                        style={{ paddingTop: 15 }}
                        source={{
                          uri:
                            'https://picsum.photos/200/300?random=' + item.id,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          marginLeft: 15,
                          color: '#17A589',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 15,
                          color: '#FBFCFC',
                          fontSize: 12,
                        }}>
                        {item.email}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text style={{ marginLeft: 5, color: '#FBFCFC' }}>
                      {item.body}
                    </Text>
                  </View>
                </Body>
              </CardItem>
            )}
          />
        </Card>
      </Content>
    </Container>
  );
};

const Posts = ({ navigation, route }) => {
  const { element } = route.params;
  const [Posts, setPosts] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/' + element.id + '/posts')
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setPosts(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
      <Content>
        <List
          dataArray={Posts}
          renderRow={(element) => (
            <ListItem
              button
              onPress={() => {
                navigation.navigate('Post', { element });
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <Body style={{ justifyContent: 'center' }}>
                  <Text style={{ color: '#17A589' }}>{element.title}</Text>
                </Body>
                <Right style={{}}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={18}
                    color="#17A589"
                  />
                </Right>
              </View>
            </ListItem>
          )}></List>
      </Content>
    </Container>
  );
};

const thePosts = ({ navigation, route }) => {
  const { element } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={Posts}
        initialParams={{ element }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Photo = ({ navigation, route }) => {
  const { element } = route.params;
  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(33,	47,	61,1)',
      }}>
      <Image
        style={{ width: '80%', height: '100%', borderRadius: 15 }}
        source={{ uri: element.url }}
        resizeMode={'contain'}
      />
    </Container>
  );
};

const Photos = ({ navigation, route }) => {
  const { element } = route.params;
  const [Photos, setPhotos] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/albums/' + element.id + '/photos'
    )
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setPhotos(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <List
          style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}
          dataArray={Photos}
          renderRow={(element) => (
            <ListItem
              thumbnail
              button
              onPress={() => {
                navigation.navigate('Photo', { element });
              }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Left style={{ marginBottom: 10, marginTop: 10 }}>
                  <Thumbnail square source={{ uri: element.thumbnailUrl }} />
                </Left>
                <Body style={{ justifyContent: 'center' }}>
                  <Text style={{ color: '#17A589' }}>{element.title}</Text>
                </Body>
                <Right style={{}}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={18}
                    color="#17A589"
                  />
                </Right>
              </View>
            </ListItem>
          )}></List>
      </Content>
    </Container>
  );
};

const Albums = ({ navigation, route }) => {
  const { element } = route.params;
  const [Albums, setAlbums] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/users/' + element.id + '/albums'
    )
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setAlbums(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
      <Content>
        <List
          dataArray={Albums}
          renderRow={(element) => (
            <ListItem
              button
              onPress={() => {
                navigation.navigate('Photos', { element });
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <Body>
                  <Text style={{ color: '#17A589' }}>{element.title}</Text>
                </Body>
                <Right style={{}}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={18}
                    color="#17A589"
                  />
                </Right>
              </View>
            </ListItem>
          )}></List>
      </Content>
    </Container>
  );
};

const theAlbums = ({ navigation, route }) => {
  const { element } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="albums"
        component={Albums}
        initialParams={{ element }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Photo"
        component={Photo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const theDetails = ({ navigation, route }) => {
  const { element } = route.params;

  return (
    <Container style={{ backgroundColor: 'rgba(33,	47,	61,0.7)' }}>
      <Content padder >
        <Card>
          <CardItem
            header
            bordered
            style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
            <View>
              <Thumbnail
                source={{
                  uri: 'https://picsum.photos/200/300?random=' + element.id,
                }}
              />
            </View>
            <Body>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#17A589',
                  marginLeft: 15,
                  marginTop: 10,
                  fontSize: 25,
                }}>
                {element.name}
              </Text>
              <Text style={{ marginLeft: 15, color: '#D7DBDD', fontSize: 13 }}>
                {element.email}
              </Text>
            </Body>
          </CardItem>
          <CardItem
            header
            bordered
            style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
            <Text style={{ color: '#17A589', fontWeight: 'bold' }}>
              Basic Information
            </Text>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: 'rgba(33,	47,	61,0.9)' }}>
            <Body>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  UserName :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  @{element.username}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Phone :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.phone}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Website :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.website}
                </Text>
              </View>
            </Body>
          </CardItem>
          <CardItem
            header
            bordered
            style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}>
            <Text style={{ color: '#17A589', fontWeight: 'bold' }}>
              Address
            </Text>
          </CardItem>
          <CardItem bordered style={{ backgroundColor: 'rgba(33,	47,	61,0.9)' }}>
            <Body>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Street :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.address.street}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Suite :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.address.suite}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  City :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.address.city}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Zip Code :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.address.zipcode}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Geo Location :
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 20,
                  marginTop: 5,
                  borderLeftWidth: 2,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderColor: '#D7DBDD',
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      color: '#D7DBDD',
                    }}>
                    Latitude :
                  </Text>
                  <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                    {element.address.geo.lat}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      color: '#D7DBDD',
                    }}>
                    Longitude :
                  </Text>
                  <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                    {element.address.geo.lat}
                  </Text>
                </View>
              </View>
            </Body>
          </CardItem>
          <CardItem
            header
            bordered
            style={{
              borderBottomWidth: 0.5,
              backgroundColor: 'rgba(33,	47,	61,1)',
            }}>
            <Text style={{ color: '#17A589', fontWeight: 'bold' }}>
              Company
            </Text>
          </CardItem>
          <CardItem
            bordered
            style={{
              backgroundColor: 'rgba(33,	47,	61,0.9)',
              paddingBottom: 20,
            }}>
            <Body>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Name :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.company.name}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  Catch Phrase :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.company.catchPhrase}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: '#D7DBDD' }}>
                  BS :
                </Text>
                <Text style={{ marginLeft: 10, color: '#D7DBDD' }}>
                  {element.company.bs}
                </Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const Tab = createMaterialBottomTabNavigator();

const userDetails = ({ navigation, route }) => {
  const { element } = route.params;

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{
          width: 30,
          marginLeft: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Users')}>
        <Text>
          <Ionicons name="md-arrow-back" size={30} color="#FBFCFC" />
        </Text>
      </TouchableOpacity>
    ),
  });

  return (
    <Tab.Navigator activeColor="#17A589" inactiveColor="#FBFCFC">
      <Tab.Screen
        name="Details"
        component={theDetails}
        initialParams={{ element }}
        options={{
          tabBarColor: '#17202A',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Albums"
        component={theAlbums}
        initialParams={{ element }}
        options={{
          tabBarColor: '#17202A',
          tabBarLabel: 'Albums',
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={thePosts}
        initialParams={{ element }}
        options={{
          tabBarColor: '#17202A',
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color }) => (
            <AntDesign name="picture" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Todos"
        component={theTodos}
        initialParams={{ element }}
        options={{
          tabBarColor: '#17202A',
          tabBarLabel: 'Todos',
          tabBarIcon: ({ color }) => (
            <Feather name="check-square" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const theUsers = ({ navigation, route }) => {
  const [Users, setUsers] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((fetchedData) => fetchedData.json())
      .then((json) => {
        setUsers(json);
        setLoad(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (Load) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Container>
      <Content>
        <List
          style={{ backgroundColor: 'rgba(33,	47,	61,1)' }}
          dataArray={Users}
          renderRow={(element) => (
            <ListItem
              style={{}}
              avatar
              button
              onPress={() => {
                navigation.navigate('User Details', { element });
              }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Left style={{ paddingBottom: 10 }}>
                  <Thumbnail
                    source={{
                      uri: 'https://picsum.photos/200/300?random=' + element.id,
                    }}
                  />
                </Left>
                <Body
                  style={{
                    justifyContent: 'center',
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#17A589',
                  }}>
                  <Text
                    style={{
                      color: '#17A589',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {element.name}
                  </Text>
                  <Text note style={{ color: '#D7DBDD' }}>
                    {element.email}
                  </Text>
                </Body>
                <Right
                  style={{
                    justifyContent: 'center',
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#17A589',
                  }}>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={18}
                    color="#17A589"
                  />
                </Right>
              </View>
            </ListItem>
          )}></List>
      </Content>
    </Container>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={theUsers}
          options={{
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FBFCFC',
              margin: 5,
              fontSize: 30,
              paddingBottom: 10,
            },
            headerStyle: {
              backgroundColor: '#17202A',
              height: 90,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="User Details"
          component={userDetails}
          options={{
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FBFCFC',
              margin: 5,
              paddingBottom: 10,
              fontSize: 30,
            },
            headerStyle: {
              backgroundColor: '#17202A',
              height: 90,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
