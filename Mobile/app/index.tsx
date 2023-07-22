// Importações React, Expo, Expo-Google, 
import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
 
// Importações Images
import { styled } from 'nativewind';
import blurBg from '../src/assets/bg-blur.png';
import NLW from '../src/assets/nlw-spacetime-logo.svg';
import Stripes from '../src/assets/stripes.svg';
import { api } from '../src/lib/api';

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/3d5f8586e39bb2158a2d',
};


export default function App() {
  const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '3d5f8586e39bb2158a2d',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'Mobile'
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code:string){
    const response = await api.post('register',{
        code,
      })

      const {token} = response.data

      await SecureStore.setItemAsync('token', token)

      router.push('/memories')
  }

  useEffect(() => {
    // console.log(makeRedirectUri({
    //   scheme: 'Mobile'
    // }),)
    if (response?.type === 'success') {
      const { code } = response.params;
  
      handleGithubOAuthCode(code)
    }
  }, [response])

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <>
    <ImageBackground 
    source={blurBg} 
    className='bg-gray-900 flex-1 px-8 py-10 items-center'
    imageStyle={{ position:'absolute', left:'-100%'}}>
      <StyledStripes className='absolute left-1' />

      <View className='flex-1 justify-center items-center gap-6'>
        <NLW/>

        <View className='space-y-3'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        
          <TouchableOpacity activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3' onPress={() => signInWithGithub()}>
            <Text className='font-alt text-sm uppercase text-black text-center'>Cadastrar lembrança</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat por devGustavoR</Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
    </>
  )
}

