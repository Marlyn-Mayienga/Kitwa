import React from "react";
import { View, Modal, Image, TouchableOpacity, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

const ImageMagnifier = (props) => {
  const { imageUrl, isVisible, close, isVideo } = props;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.9)" }}>
        <View
          style={{ flex: 1, height: 50, padding: 10, alignItems: "flex-end" }}
        >
          <TouchableOpacity onPress={close}>
            <AntDesign name="closecircle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4 }}>
          {isVideo ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Video
                ref={video}
                style={{ width: "90%", height: "70%", borderRadius: 7 }}
                source={{
                  uri: "http://techslides.com/demos/sample-videos/small.mp4",
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />

              <View style={{ width: "70%" }}>
                {/* <Button
                  color={status.isPlaying ? "#FF0E0E" : "#30b807"}
                  title={status.isPlaying ? "Pause" : "Play"}
                  onPress={() =>
                    status.isPlaying
                      ? video.current.pauseAsync()
                      : video.current.playAsync()
                  }
                /> */}
              </View>
            </View>
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: "70%", width: "100%" }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ImageMagnifier;
