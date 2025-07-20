import { Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
        
    <Link href={`/movies/${id}`} asChild>
    <TouchableOpacity 
        className='w-[30%]'>

        <Image
            source={{
                uri: poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : `https://via.placeholder.com/500x750/1a1a1a/fffffff.png`
            }}
            className='w-full h-52 rounded-lg'
            resizeMode="cover"
        />

        <Text className='text-white text-sm mt-2' numberOfLines={1}>
            {title}
        </Text>

        <View className="flex-row mt-1 gap-x-1">
            <Image
                source={require('@/assets/icons/star.png')}
                className='size-4'
                resizeMode='contain'
                />

            <Text className='text-cyan-300 text-sm ml-2'>{(vote_average / 2).toFixed(1)}</Text>

        </View>

    </TouchableOpacity>
    </Link>
    
        
    
  )
}
 
export default MovieCard