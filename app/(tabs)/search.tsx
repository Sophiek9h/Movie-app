import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setsearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    fetchData,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchData();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className="px-5 pt-20"
        numColumns={3}
        renderItem={({ item }) => <MovieCard {...item} />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          marginBottom: 20,
          gap: 20,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center my-1">
              <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />
            </View>

            <View className="my-3">
              <SearchBar
                placeholder="Search for a movie..."
                value={searchQuery}
                onChangeText={(text: string) => setsearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 text-center mt-10">
                Error fetching movies: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold mb-5">
                Search Result for {""}
                <Text className="text-accent"> {searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View className="flex-row flex-1 items-center justify-center">
            <Text className="text-white text-center mt-10 ">
              No movies found for "{searchQuery}"
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default search;
