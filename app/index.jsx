import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import "../global.css";

const data = {
  All: [
    { id: '2', title: 'Nihiwatu Beach', duration: '2N/3D', type: 'Luxury Beach', image: require('../assets/images/adventure.jpg'), price: 299, description: 'Relax by the beach.', location: 'Sumba, Nusa Tenggara Timur' },
    { id: '3', title: 'Raja Ampat', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure2.jpg'), price: 399, description: 'Relax by the beach.', location: 'Papua Barat' },
    { id: '4', title: 'Pantai Ora', duration: '2N/3D', type: 'Beach', image: require('../assets/images/adventure3.jpg'), price: 259, description: 'Relax by the beach.', location: 'Maluku Tengah' },
    { id: '5', title: 'Pulau Belitung', duration: '3N/4D', type: 'Normal Beach', image: require('../assets/images/adventure4.jpg'), price: 179, description: 'Relax by the beach.', location: 'Kepulauan Bangka Belitung' },
    { id: '6', title: 'Gili Trawangan', duration: '4N/5D', type: 'Normal Beach', image: require('../assets/images/adventure5.jpg'), price: 199, description: 'Explore the jungle.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '2', title: 'Nihiwatu Beach', duration: '2N/3D', type: 'Luxury Beach', image: require('../assets/images/adventure.jpg'), price: 299, description: 'Relax by the beach.', location: 'Sumba, Nusa Tenggara Timur' },
    { id: '3', title: 'Raja Ampat', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure2.jpg'), price: 399, description: 'Relax by the beach.', location: 'Papua Barat' },
    { id: '4', title: 'Pantai Ora', duration: '2N/3D', type: 'Beach', image: require('../assets/images/adventure3.jpg'), price: 259, description: 'Relax by the beach.', location: 'Maluku Tengah' },
    { id: '5', title: 'Pulau Belitung', duration: '3N/4D', type: 'Normal Beach', image: require('../assets/images/adventure4.jpg'), price: 179, description: 'Relax by the beach.', location: 'Kepulauan Bangka Belitung' },
    { id: '6', title: 'Gili Trawangan', duration: '4N/5D', type: 'Normal Beach', image: require('../assets/images/adventure5.jpg'), price: 199, description: 'Explore the jungle.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '7', title: 'Gunung Rinjani', duration: '3N/4D', type: 'Mountain Adventure', image: require('../assets/images/mountain1.jpg'), price: 299, description: 'Explore the majestic mountains.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '8', title: 'Karimun Jawa', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure6.jpg'), price: 399, description: 'Relax by the beach.', location: 'Jawa Tengah' },
    { id: '9', title: 'Pandang Pandang', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure7.jpg'), price: 399, description: 'Relax by the beach.', location: 'Bali' },
    { id: '10', title: 'Gunung Rinjani', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain1.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '11', title: 'Gunung Semeru', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain2.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Lumajang dan Kabupaten Malang.' },
    { id: '12', title: 'Gunung Bromo', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain3.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Probolinggo, Pasuruan, Lumajang, dan Malang.' },
    { id: '13', title: 'Gunung Merapi', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain4.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Sleman, Yogyakarta.' },
    { id: '14', title: 'Gunung Prau', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain5.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Wonosobo, Jawa Tengah.' },
    { id: '15', title: 'Gunung Jayawijaya', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain6.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Dugunduguo, Papua.' },
    { id: '16', title: 'Gunung Kerinci', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain7.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Kerinci, Jambi.' },
    { id: '17', title: 'Gunung Gede Pangrango', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain8.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Bogor, Cianjur, Sukabumi, Jawa Barat.' },
    { id: '18', title: 'Potato Head Suites & Studios, Seminyak beach', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel2.jpg'), price: 299, description: 'Relax by the Hotel', location: 'Bali' },
    { id: '19', title: 'Mandapa, a Ritz-Carlton Reserve, Ubud', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel3.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '20', title: 'Gaia Oasis, Tejakula', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel4.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '21', title: 'Alila Seminyak, Seminyak beach', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel5.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '22', title: 'The Langham', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel6.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Jakarta' },
    { id: '23', title: 'Park Hyatt', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel7.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Jakarta' },
    { id: '24', title: 'Garrya Bianti Yogyakarta', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel8.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Rest of Java' },
    { id: '25', title: 'Plataran Borobudur Resort', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel9.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Rest of Java' },
  ],
  Hotels: [
    { id: '2', title: 'Potato Head Suites & Studios, Seminyak beach', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel2.jpg'), price: 299, description: 'Relax by the Hotel', location: 'Bali' },
    { id: '3', title: 'Mandapa, a Ritz-Carlton Reserve, Ubud', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel3.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '4', title: 'Gaia Oasis, Tejakula', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel4.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '5', title: 'Alila Seminyak, Seminyak beach', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel5.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Bali' },
    { id: '6', title: 'The Langham', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel6.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Jakarta' },
    { id: '7', title: 'Park Hyatt', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel7.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Jakarta' },
    { id: '8', title: 'Garrya Bianti Yogyakarta, Yogyakarta', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel8.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Rest of Java' },
    { id: '9', title: 'Plataran Borobudur Resort', duration: '2N/3D', type: 'Luxury Hotel', image: require('../assets/images/hotel9.jpg'), price: 299, description: 'Relax by the Hotel.', location: 'Rest of Java' },
  ],
  Adventure: [
    { id: '18', title: 'Air Terjun Madakaripura', duration: '1d', type: 'Luxury Waterfall', image: require('../assets/images/adventure9.jpg'), price: 299, description: 'Relax by the cool Waterfall.', location: 'Probolinggo' },
    { id: '2', title: 'Nihiwatu Beach', duration: '2N/3D', type: 'Luxury Beach', image: require('../assets/images/adventure.jpg'), price: 299, description: 'Relax by the beach.', location: 'Sumba, Nusa Tenggara Timur' },
    { id: '3', title: 'Raja Ampat', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure2.jpg'), price: 399, description: 'Relax by the beach.', location: 'Papua Barat' },
    { id: '4', title: 'Pantai Ora', duration: '2N/3D', type: 'Beach', image: require('../assets/images/adventure3.jpg'), price: 259, description: 'Relax by the beach.', location: 'Maluku Tengah' },
    { id: '5', title: 'Pulau Belitung', duration: '3N/4D', type: 'Normal Beach', image: require('../assets/images/adventure4.jpg'), price: 179, description: 'Relax by the beach.', location: 'Kepulauan Bangka Belitung' },
    { id: '6', title: 'Gili Trawangan', duration: '4N/5D', type: 'Normal Beach', image: require('../assets/images/adventure5.jpg'), price: 199, description: 'Explore the jungle.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '7', title: 'Gunung Rinjani', duration: '3N/4D', type: 'Mountain Adventure', image: require('../assets/images/mountain1.jpg'), price: 299, description: 'Explore the majestic mountains.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '8', title: 'Karimun Jawa', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure6.jpg'), price: 399, description: 'Relax by the beach.', location: 'Jawa Tengah' },
    { id: '9', title: 'Pandang Pandang', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure7.jpg'), price: 399, description: 'Relax by the beach.', location: 'Bali' },
    { id: '10', title: 'Gunung Rinjani', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain1.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '11', title: 'Gunung Semeru', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain2.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Lumajang dan Kabupaten Malang.' },
    { id: '12', title: 'Gunung Bromo', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain3.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Probolinggo, Pasuruan, Lumajang, dan Malang.' },
    { id: '13', title: 'Gunung Merapi', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain4.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Sleman, Yogyakarta.' },
    { id: '14', title: 'Gunung Prau', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain5.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Wonosobo, Jawa Tengah.' },
    { id: '15', title: 'Gunung Jayawijaya', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain6.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Dugunduguo, Papua.' },
    { id: '16', title: 'Gunung Kerinci', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain7.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Kerinci, Jambi.' },
    { id: '17', title: 'Gunung Gede Pangrango', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain8.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Bogor, Cianjur, Sukabumi, Jawa Barat.' },
  ],
  Beach: [
    { id: '2', title: 'Nihiwatu Beach', duration: '2N/3D', type: 'Luxury Beach', image: require('../assets/images/adventure.jpg'), price: 299, description: 'Relax by the beach.', location: 'Sumba, Nusa Tenggara Timur' },
    { id: '3', title: 'Raja Ampat', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure2.jpg'), price: 399, description: 'Relax by the beach.', location: 'Papua Barat' },
    { id: '4', title: 'Pantai Ora', duration: '2N/3D', type: 'Beach', image: require('../assets/images/adventure3.jpg'), price: 259, description: 'Relax by the beach.', location: 'Maluku Tengah' },
    { id: '5', title: 'Pulau Belitung', duration: '3N/4D', type: 'Normal Beach', image: require('../assets/images/adventure4.jpg'), price: 179, description: 'Relax by the beach.', location: 'Kepulauan Bangka Belitung' },
    { id: '6', title: 'Gili Trawangan', duration: '4N/5D', type: 'Normal Beach', image: require('../assets/images/adventure5.jpg'), price: 199, description: 'Explore the jungle.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '7', title: 'Karimun Jawa', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure6.jpg'), price: 399, description: 'Relax by the beach.', location: 'Jawa Tengah' },
    { id: '8', title: 'Pandang Pandang', duration: '3N/4D', type: 'Luxury Beach', image: require('../assets/images/adventure7.jpg'), price: 399, description: 'Relax by the beach.', location: 'Bali' },
  ],
  Mountain: [
    { id: '1', title: 'Gunung Rinjani', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain1.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Lombok, Nusa Tenggara Barat' },
    { id: '2', title: 'Gunung Semeru', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain2.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Lumajang dan Kabupaten Malang.' },
    { id: '3', title: 'Gunung Bromo', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain3.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Probolinggo, Pasuruan, Lumajang, dan Malang.' },
    { id: '4', title: 'Gunung Merapi', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain4.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Sleman, Yogyakarta.' },
    { id: '5', title: 'Gunung Prau', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain5.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Wonosobo, Jawa Tengah.' },
    { id: '6', title: 'Gunung Jayawijaya', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain6.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Dugunduguo, Papua.' },
    { id: '7', title: 'Gunung Kerinci', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain7.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Kabupaten Kerinci, Jambi.' },
    { id: '8', title: 'Gunung Gede Pangrango', duration: 'none', type: 'Mountain Adventure', image: require('../assets/images/mountain8.jpg'), price: 20, description: 'Explore the majestic mountains.', location: 'Bogor, Cianjur, Sukabumi, Jawa Barat.' },
  ],
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-500">
        <Text className="text-white text-3xl font-bold mb-4">Travelokal</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/c3/d8/d0/c3d8d018363c14da207599ddfb51f702.jpg' }}
        resizeMode="cover"
        style={{ flex: 1, width: null, height: null }}
      >
        <View className="flex items-center mt-10">
          <Text className="text-white text-5xl mt-32 font-bold">TRAVELOKAL</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View className="w-full px-6 mb-10">
          <View className="mb-8">
            <Text className="text-left text-white text-xl">Plan your</Text>
            <Text className="text-left text-white text-3xl font-bold">Luxurious Vacations</Text>
          </View>
          <TouchableOpacity
            className="bg-blue-700 py-3 px-6 rounded-2xl w-full self-center"
            onPress={() => navigation.navigate('Details')}
          >
            <Text className="text-white text-center font-bold">Explore</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const DetailsScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  // Gabungkan semua data kategori menjadi satu array
  const allData = Object.values(data).flat();

  // Hilangkan duplikat berdasarkan ID
  const uniqueData = allData.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  // Filter data berdasarkan kategori aktif
  const filteredData = activeCategory === 'All' ? uniqueData : data[activeCategory] || [];

  // Filter data berdasarkan pencarian
  const displayedData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-200 pt-12">
      {/* Header */}
      <View className="mt-3 px-4">
        <Text className="text-black text-2xl">Explore</Text>
        <Text className="text-black text-3xl font-extrabold">Indonesia</Text>
      </View>

      {/* Search Bar */}
      <View className="mt-4 px-4">
        <View className="flex-row items-center bg-white rounded-lg shadow-md p-2">
          <Ionicons name="search" size={20} color="gray" className="mr-2" />
          <TextInput
            placeholder="Search for a destination..."
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-black text-base"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Buttons */}
      <View className="flex-row px-4 mt-4 mb-4">
        {['All', 'Hotels', 'Adventure', 'Beach', 'Mountain'].map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              setActiveCategory(category);
              setSearchText(''); // Reset pencarian saat kategori diganti
            }}
            className={`py-2 px-4 rounded-3xl mr-2 ${
              activeCategory === category ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <Text
              className={`${
                activeCategory === category ? 'text-white' : 'text-black'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FlatList */}
      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 12,
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{
              flexBasis: '48%',
              marginBottom: 12,
            }}
            onPress={() => navigation.navigate('DetailCard', item)}
          >
            <Image
              source={item.image}
              className="w-full h-40"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-lg font-bold text-black">{item.title}</Text>
              <Text className="text-gray-500 mt-2">{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500 mt-4">
            No destinations found.
          </Text>
        )}
      />

      {/* Help Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AboutApp')}
        className="absolute top-12 right-4"
      >
        <Ionicons name="help-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
    </View>
  );
};


const DetailCardScreen = ({ route, navigation }) => {
  const { title, image, description, price, location } = route.params;
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  // State untuk Modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-gray-200">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-4 p-2 bg-gray-700 rounded-full">
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <Image source={imageSource} className="w-full h-64" resizeMode="cover" />
      <View className="flex-1 px-4 mt-4">
        <Text className="text-black text-2xl font-bold">{title}</Text>
        <Text className="text-gray-500 text-sm mt-2">📍 {location}</Text>
        <Text className="text-gray-500 text-sm mt-1">⭐ 4.5 (355 Reviews)</Text>
        <Text className="text-gray-500 text-sm mt-1">💰 Prices ${price}</Text>
        <Text className="text-gray-700 text-base mt-4">{description}</Text>
        <Text className="text-black text-xl font-bold mt-6">Facilities</Text>
        {/* Bagian Ikon */}
        <View className="flex-row justify-evenly mt-4">
          <View className="items-center">
            <Ionicons name="thermometer-outline" size={24} color="gray" />
            <Text className="text-gray-500 text-sm mt-2">Heater</Text>
          </View>
          <View className="items-center">
            <Ionicons name="restaurant-outline" size={24} color="gray" />
            <Text className="text-gray-500 text-sm mt-2">Dinner</Text>
          </View>
          <View className="items-center">
            <Ionicons name="wifi-outline" size={24} color="gray" />
            <Text className="text-gray-500 text-sm mt-2">Wifi</Text>
          </View>
        </View>

        {/* Tombol Explore Now */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-blue-700 rounded-lg py-3 mt-4">
          <Text className="text-center text-white text-xl font-bold">Explore Now</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-white w-80 p-5 rounded-lg shadow-lg items-center">
            <Text className="text-xl font-bold text-black mb-2">
              Thank you for exploring!
            </Text>
            <Text className="text-gray-700 text-center mb-4">
              You are now one step closer to an unforgettable adventure.
            </Text>
            <Image
              source={require('../assets/images/travel.gif')}
              className="w-48 h-48 mb-4"
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-blue-700 px-6 py-2 rounded-lg">
              <Text className="text-white font-bold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AboutAppScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-2xl font-bold">About Travelokal</Text>
    <Text className="text-center text-gray-600 mt-4">Travelokal is your travel companion for discovering the best places to stay, explore, and enjoy in your next vacation.</Text>
  </View>
);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="DetailCard" component={DetailCardScreen} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
