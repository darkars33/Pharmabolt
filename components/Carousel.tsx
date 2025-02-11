import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Slider from "@/assets/images/Slider.png";

const { width } = Dimensions.get("window");

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const data = [
    { id: "1", image: Slider, isLocal: true },
    { id: "2", image: "https://via.placeholder.com/350x150", isLocal: false },
    { id: "3", image: "https://via.placeholder.com/350x150", isLocal: false },
  ];

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: { id: string; image: any; isLocal: boolean } }) => (
    <View style={styles.card}>
      <Image
        source={item.isLocal ? item.image : { uri: item.image }}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={renderItem}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.9,
    height: 140,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default Carousel;
