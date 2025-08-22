// track the searches made by users 
import { Client, Databases, ID, Query } from 'react-native-appwrite';


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);


export const updateSerachCount = async (query: string, movies: Movie) =>{

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        //seach if the movie search already exists in the document 
        if (result.documents.length > 0){
            const existingMovies = result.documents[0];

            await database.updateDocument(
                DATABASE_ID, 
                COLLECTION_ID,
                existingMovies.$id,
                {
                    count: existingMovies.count + 1
                }
            );
        } else {
            await database.createDocument(
                DATABASE_ID, 
                COLLECTION_ID,
                ID.unique(), // Generate a unique ID for the new document
                {
                    searchTerm: query,
                    movie_id: movies.id,
                    count: 1,
                    title: movies.title,
                    poster_url: movies.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : ''
                }
            );
        }
    } catch (error) {
        console.error('Error updating search count:', error);
    }

}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {

    try{

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[];

    }catch (error) {
        console.error('Error fetching trending movies:', error);
        return undefined;
    }

}