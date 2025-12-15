import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import useFetch from "@/services/useFetch";
// import { getSavedMovies } from "@/services/appwrite";

const { width } = Dimensions.get("window");

const Saved = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data للتجربة - احذف هذا واستخدم useFetch عندما تكون جاهزاً
  const [loading, setLoading] = useState(false);
  const error = null;

  // بيانات وهمية - استبدلها بالبيانات الحقيقية من Appwrite
  const savedMovies = [
    {
      id: 1,
      title: "Inception",
      poster_path:
        "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      vote_average: 8.8,
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster_path:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      vote_average: 9.0,
    },
    {
      id: 3,
      title: "Interstellar",
      poster_path:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      vote_average: 8.6,
    },
    // أضف المزيد من الأفلام الوهمية هنا...
  ];

  // عند الانتهاء، استخدم هذا:
  // const {
  //   data: savedMovies,
  //   loading,
  //   error,
  // } = useFetch(getSavedMovies);

  const filters = [
    { id: "all", label: "All", icon: "apps", iconFamily: "Ionicons" },
    { id: "action", label: "Action", icon: "flash", iconFamily: "Ionicons" },
    {
      id: "drama",
      label: "Drama",
      icon: "theater-masks",
      iconFamily: "MaterialIcons",
    },
    { id: "comedy", label: "Comedy", icon: "happy", iconFamily: "Ionicons" },
    {
      id: "thriller",
      label: "Thriller",
      icon: "skull",
      iconFamily: "Ionicons",
    },
  ];

  const stats = {
    total: savedMovies?.length || 0,
    watched: Math.floor((savedMovies?.length || 0) * 0.6),
    totalHours: Math.floor((savedMovies?.length || 0) * 2.1),
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with Gradient Effect */}
        <View className="px-5 pt-8 pb-6">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-white text-3xl font-bold mb-1">
                My Watchlist
              </Text>
              <Text className="text-gray-400 text-sm">
                {stats.total} movies saved
              </Text>
            </View>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-secondary/20 items-center justify-center border border-secondary/30">
              <Ionicons name="search" size={24} color="#E4B054" />
            </TouchableOpacity>
          </View>

          {/* Stats Cards - Cinematic Style */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-4 border border-secondary/20">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-400 text-xs mb-1">Total</Text>
                  <Text className="text-white text-2xl font-bold">
                    {stats.total}
                  </Text>
                </View>
                <View className="w-10 h-10 rounded-xl bg-secondary/20 items-center justify-center">
                  <Ionicons name="film" size={20} color="#E4B054" />
                </View>
              </View>
            </View>

            <View className="flex-1 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-4 border border-blue-500/20">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-400 text-xs mb-1">Hours</Text>
                  <Text className="text-white text-2xl font-bold">
                    {stats.totalHours}h
                  </Text>
                </View>
                <View className="w-10 h-10 rounded-xl bg-blue-500/20 items-center justify-center">
                  <Ionicons name="time" size={20} color="#3B82F6" />
                </View>
              </View>
            </View>
          </View>

          {/* Genre Filters - Horizontal Scroll */}
          <View>
            <Text className="text-white text-sm font-semibold mb-3">
              Filter by Genre
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            >
              {filters.map((filter) => {
                const IconComponent =
                  filter.iconFamily === "Ionicons" ? Ionicons : MaterialIcons;
                return (
                  <TouchableOpacity
                    key={filter.id}
                    onPress={() => setSelectedFilter(filter.id)}
                    className={`px-5 py-3 rounded-full border ${
                      selectedFilter === filter.id
                        ? "bg-secondary border-secondary"
                        : "bg-white/5 border-gray-800"
                    }`}
                  >
                    <View className="flex-row items-center gap-2">
                      <IconComponent
                        name={filter.icon as any}
                        size={18}
                        color={
                          selectedFilter === filter.id ? "#151312" : "#9CA3AF"
                        }
                      />
                      <Text
                        className={`font-semibold ${
                          selectedFilter === filter.id
                            ? "text-primary"
                            : "text-gray-400"
                        }`}
                      >
                        {filter.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Movies Grid */}
        <View className="px-5">
          {loading ? (
            <View className="py-20">
              <ActivityIndicator size="large" color="#E4B054" />
            </View>
          ) : error ? (
            <View className="items-center py-20">
              <View className="w-24 h-24 rounded-full bg-red-500/10 items-center justify-center mb-4">
                <Ionicons name="alert-circle" size={48} color="#EF4444" />
              </View>
              <Text className="text-white text-lg font-semibold mb-2">
                Oops! Something went wrong
              </Text>
              <Text className="text-gray-400 text-sm text-center">
                error
              </Text>
            </View>
          ) : savedMovies && savedMovies.length > 0 ? (
            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginBottom: 10,
              }}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center py-20">
              <View className="w-32 h-32 rounded-full bg-secondary/10 items-center justify-center mb-6 border-2 border-dashed border-secondary/30">
                <Ionicons name="film-outline" size={64} color="#E4B054" />
              </View>
              <Text className="text-white text-xl font-bold mb-2">
                No saved movies yet
              </Text>
              <Text className="text-gray-400 text-sm text-center mb-6 px-10">
                Start building your watchlist by saving your favorite movies
              </Text>
              <TouchableOpacity className="bg-secondary px-8 py-3 rounded-full flex-row items-center gap-2">
                <Ionicons name="search" size={20} color="#151312" />
                <Text className="text-primary font-semibold">
                  Browse Movies
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        {savedMovies && savedMovies.length > 0 && (
          <View className="px-5 mt-8 gap-3">
            <TouchableOpacity className="bg-white/5 rounded-2xl p-4 border border-gray-800/50 flex-row items-center justify-between active:bg-white/10">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-secondary/20 items-center justify-center">
                  <Ionicons name="stats-chart" size={20} color="#E4B054" />
                </View>
                <View>
                  <Text className="text-white font-semibold">
                    View Statistics
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    Your watching patterns
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-white/5 rounded-2xl p-4 border border-gray-800/50 flex-row items-center justify-between active:bg-white/10">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-blue-500/20 items-center justify-center">
                  <Ionicons name="swap-vertical" size={20} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-white font-semibold">
                    Sort & Organize
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    Manage your collection
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saved;
