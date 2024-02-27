import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

// From : https://www.youtube.com/watch?v=rIYzLhkG9TA
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -50}} {...props} />;
}

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{title:'', headerShown: false}}>
      <Tabs.Screen name='feed' options={{tabBarIcon: ({color}) => <TabBarIcon name={'home'} color={color}/>}}/>
      <Tabs.Screen name='search' options={{tabBarIcon: ({color}) => <TabBarIcon name={'search'} color={color}/>}}/>
      <Tabs.Screen name='CreatePost' options={{headerTitle:'New Post', tabBarIcon: ({color}) => <TabBarIcon name={'camera'} color={color}/>}}/>
      <Tabs.Screen name='profile' options={{headerTitle:'Profile', tabBarIcon: ({color}) => <TabBarIcon name={'user'} color={color}/>}}/>
    </Tabs>
  )
}

export default TabsLayout;