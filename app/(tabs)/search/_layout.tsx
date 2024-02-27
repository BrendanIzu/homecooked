import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='Search' options={{headerTitle: ''}}/>
      <Stack.Screen name='users/[id]' options={{headerTitle: ' '}}/>
      <Stack.Screen name='userposts/[id]' options={{headerTitle: ' '}}/>
      
    </Stack>
  )
}

export default RootLayout;