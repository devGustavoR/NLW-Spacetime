import { View } from "react-native";

import { Link } from "expo-router";
import NLW from '../src/assets/nlw-spacetime-logo.svg';

export default function NewMemories(){
  return(
    <View className="flex-1 px-8">
      <View>
        <NLW />
        <Link href="/memories"></Link>
      </View>
    </View>
  )
}