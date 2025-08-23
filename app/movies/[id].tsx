import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { router } from 'expo-router';

interface MovvieInfoProps {
  label: string;
  value: string | number | null | undefined;
}


const MovieInfo = ({label, value}: MovvieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{ label }</Text>
    <Text className='text-white font-bold text-sm mt-2'>{ value || 'N/A' }  </Text>
  </View>
);

const MovieDetails = () => {
const {id} = useLocalSearchParams();

const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
         className='w-full h-[500px]' resizeMode='stretch'/>
        </View>

        <View className='flex-col items-start justify-center px-5 mt-5'>
          <Text className='text-white font-bold text-xl'> 
            {movie?.title}
          </Text>

          <View className='flex-row gap-x-3 items-center mt-2'>
            <Text className='text-light-200 font-semibold text-sm'>
              {movie?.release_date?.split('-')[0]}
              </Text> 

              <Text className='text-light-200 font-semibold text-sm'>
                {movie?.runtime}m
              </Text>
          </View>

          <View className='flex-row rounded-lg bg-dark-100 items-center px-2 py-1 mt-2 gap-x-1'>
            <Image source={icons.star} className='size-5'/>

            <Text className='text-xs text-light-200 font-bold'>
              {movie?.vote_average?.toFixed(1)} / 10
            </Text>

            <Text className='text-xs text-light-200 font-semibold'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label='Overview' value={movie?.overview} />

          <MovieInfo label='Genres' value={movie?.genres?.map((genre: any) => genre.name).join(' - ') || 'n/a' } />

          <View className='flex flex-row w-1/2 justify-between'>
            <MovieInfo label="Budget" value={movie?.budget !== undefined ? `$${movie.budget / 1_000_000} million` : 'N/A'}/>
            <MovieInfo label="Revenue" value={movie?.revenue !== undefined ? `$${movie.revenue / 1_000_000} million` : 'N/A'}/>
          </View>

          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company: any) => company.name).join(' - ') || 'N/A'}/>

        </View>
        
      </ScrollView>

      <TouchableOpacity className='absolute top-10 left-5 p-2 bg-dark-100 rounded-full flex flex-row z-50' onPress={router.back}>

        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='text-white font-bold text-sm absolute top-3 left-10'>Back</Text>

      </TouchableOpacity>

    </View>
  )
}

export default MovieDetails