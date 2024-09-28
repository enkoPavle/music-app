import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Text, Title } from "@/src/shared/components/ui";
import { usePlayerContext } from "@/src/context";
import { getResponsiveSize } from "@/src/util/size";
import { AntDesign } from "@expo/vector-icons";
import { useMMKVObject } from "react-native-mmkv";
import { SoundCloudSong } from "@/src/types/player";

const formatTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.length === 1 ? "0" : ""}${seconds}`;
};

export const Player = () => {
  const [soundCloudSong] = useMMKVObject<SoundCloudSong>("soundCloudSong");

  const { isPlaying, position, duration, loadSound, handlePlayPause } =
    usePlayerContext();
  const { width } = useWindowDimensions();

  const imageSize = width - 2 * getResponsiveSize(50);

  useEffect(() => {
    if (soundCloudSong) {
      loadSound(soundCloudSong.trackUrl).catch((error) =>
        console.log("loadSound", error)
      );
    }
  }, [soundCloudSong]);

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        <Image
          source={{
            uri: soundCloudSong?.artworkUrl.replace("large", "t500x500"),
          }}
          style={[styles.image, { width: imageSize, height: imageSize }]}
        />
        <Title style={styles.title}>{soundCloudSong?.title}</Title>
        <Text>{soundCloudSong?.user.username}</Text>
        <View style={styles.controls}>
          <View style={styles.leftTime}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
          </View>
          <TouchableOpacity onPress={handlePlayPause}>
            {isPlaying ? (
              <AntDesign
                name="pausecircleo"
                size={getResponsiveSize(64)}
                color="#1DB954"
              />
            ) : (
              <AntDesign
                name="playcircleo"
                size={getResponsiveSize(64)}
                color="#1DB954"
              />
            )}
          </TouchableOpacity>
          <View style={styles.rightTime}>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: getResponsiveSize(50),
  },
  player: {
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
  },
  title: {
    fontSize: getResponsiveSize(24),
  },
  controls: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  playButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginRight: 10,
  },
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 10,
  },
  leftTime: {
    position: "absolute",
    top: 0,
    left: -40,
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
  },
  rightTime: {
    position: "absolute",
    top: 0,
    right: -40,
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
  },
  timeText: {
    color: "#ffffff",
  },
});
