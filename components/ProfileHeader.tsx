import { Image, StyleSheet, Text, View } from "react-native"
import { ProfileInfoBar } from "./ProfileInfoBar"
import { MyText } from "./MyText"

interface Props {
  followersCount: number, 
  followingCount: number,
  imageUrl: string, 
  displayname: string
}

export const ProfileHeader = ({ followersCount, followingCount, imageUrl, displayname } : Props) => {
  return (
    <View style={styles.container}>
      {imageUrl != '' && <Image style={styles.image} source={{uri: imageUrl}}></Image>}
      <View style={styles.info}>
        <MyText value={displayname} bold={true} size={20}/>
        <ProfileInfoBar label={'followers: '} value={followersCount.toString()}/>
        <ProfileInfoBar label={'following: '} value={followingCount.toString()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 130,
    width: 'auto',
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 40,
    marginRight: -30,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  info: {
    paddingLeft: 30,
  }
})