import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const { width } = Dimensions.get("window");

const Profile = () => {
  const router = useRouter();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    joinedDate: "Jan 2024",
    moviesWatched: 47,
    watchedHours: 94,
    favoriteGenre: "Action",
    savedMovies: 12,
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const quickActions = [
    {
      id: 1,
      title: "Watchlist",
      value: user.savedMovies,
      icon: icons.save,
      color: "#E4B054",
      bgColor: "rgba(228, 176, 84, 0.15)",
    },
    {
      id: 2,
      title: "Watched",
      value: user.moviesWatched,
      icon: icons.search,
      color: "#6366F1",
      bgColor: "rgba(99, 102, 241, 0.15)",
    },
    {
      id: 3,
      title: "Hours",
      value: `${user.watchedHours}h`,
      icon: icons.home,
      color: "#EC4899",
      bgColor: "rgba(236, 72, 153, 0.15)",
    },
  ];

  const settings = [
    { title: "Account Settings", icon: icons.person, hasNotification: false },
    { title: "Notifications", icon: icons.search, hasNotification: true },
    { title: "Privacy & Security", icon: icons.save, hasNotification: false },
    { title: "Download Quality", icon: icons.search, hasNotification: false },
    { title: "Language", icon: icons.home, hasNotification: false },
  ];

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
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Cinematic Header with Blur Effect */}
        <View className="px-5 pt-8 pb-12">
          {/* Top Bar */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Settings", "Coming soon!")}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"
            >
              <Image source={icons.search} className="w-5 h-5" tintColor="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Hero Section */}
          <View className="items-center relative">
            {/* Glowing Avatar Container */}
            <View className="relative mb-4">
              <View className="absolute inset-0 bg-secondary/30 blur-3xl rounded-full scale-110" />
              <View className="w-28 h-28 rounded-full bg-gradient-to-br from-secondary to-secondary/50 items-center justify-center border-4 border-secondary/30 relative z-10">
                {user.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <Text className="text-primary text-4xl font-bold">
                    {user.name.charAt(0)}
                  </Text>
                )}
              </View>
              {/* Active Status Indicator */}
              <View className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-primary z-20" />
            </View>

            <Text className="text-white text-2xl font-bold mb-1">
              {user.name}
            </Text>
            <Text className="text-gray-400 text-sm mb-1">{user.email}</Text>
            <View className="flex-row items-center mt-2 px-4 py-1.5 bg-white/5 rounded-full">
              <View className="w-2 h-2 bg-secondary rounded-full mr-2" />
              <Text className="text-gray-400 text-xs">
                Member since {user.joinedDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Cards - Horizontal Scroll */}
        <View className="mb-8">
          <Text className="text-white text-lg font-bold px-5 mb-4">
            Your Activity
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
          >
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.7}
                className="w-36 rounded-3xl overflow-hidden"
                style={{ backgroundColor: action.bgColor }}
              >
                <View className="p-5">
                  <View
                    className="w-12 h-12 rounded-2xl items-center justify-center mb-4"
                    style={{ backgroundColor: action.color + "30" }}
                  >
                    <Image
                      source={action.icon}
                      className="w-6 h-6"
                      tintColor={action.color}
                    />
                  </View>
                  <Text className="text-white text-3xl font-bold mb-1">
                    {action.value}
                  </Text>
                  <Text className="text-gray-400 text-xs">{action.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Favorite Genre Card */}
        <View className="px-5 mb-8">
          <View className="bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-3xl p-6 border border-secondary/30 overflow-hidden">
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/10 rounded-full" />
            <View className="absolute -left-5 -bottom-5 w-32 h-32 bg-secondary/5 rounded-full" />
            <View className="flex-row items-center justify-between relative z-10">
              <View>
                <Text className="text-gray-400 text-sm mb-2">
                  Favorite Genre
                </Text>
                <Text className="text-white text-3xl font-bold">
                  {user.favoriteGenre}
                </Text>
              </View>
              <View className="w-16 h-16 rounded-2xl bg-secondary/20 items-center justify-center">
                <Text className="text-secondary text-3xl">🎬</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View className="px-5 mb-8">
          <Text className="text-white text-lg font-bold mb-4">Settings</Text>
          <View className="bg-[#1A1825]/80 rounded-3xl overflow-hidden border border-gray-800/50">
            {settings.map((setting, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => Alert.alert(setting.title, "Coming soon!")}
                  className="flex-row items-center px-5 py-4 active:bg-white/5"
                >
                  <View className="w-11 h-11 rounded-xl bg-white/5 items-center justify-center mr-4">
                    <Image
                      source={setting.icon}
                      className="w-5 h-5"
                      tintColor="#A8B5DB"
                    />
                  </View>
                  <Text className="text-white text-base flex-1">
                    {setting.title}
                  </Text>
                  <View className="flex-row items-center">
                    {setting.hasNotification && (
                      <View className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                    )}
                    <Text className="text-gray-500 text-2xl">›</Text>
                  </View>
                </TouchableOpacity>
                {index < settings.length - 1 && (
                  <View className="h-px bg-gray-800/50 ml-20" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-5 gap-3">
          <TouchableOpacity
            onPress={() => Alert.alert("Help", "Coming soon!")}
            className="bg-white/5 rounded-2xl py-4 border border-gray-800/50 active:bg-white/10"
          >
            <Text className="text-white text-center text-base font-semibold">
              Help & Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500/10 rounded-2xl py-4 border border-red-500/30 active:bg-red-500/20"
          >
            <Text className="text-red-500 text-center text-base font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text className="text-gray-700 text-center text-xs mt-8">
          CineMax v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;