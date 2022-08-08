import { Button, StyleSheet, Text, View, Image } from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const VideoPage = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState();
  const [isRecord, setIsRecord] = useState(false);
  const [video, setVideo] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRolePermission, setCameraRollPermission] = useState(false);

  const TakeVideoIcon = (
    <Icon
      style={styles.takePicture}
      onPress={isRecord ? stopRecord : recordVideo}
      name="circle"
      size={60}
      color="#000000"
    />
  );

  const handleSave = async (data) => {
    if (cameraRolePermission) {
      const assert = await MediaLibrary.createAssetAsync(data);
      MediaLibrary.createAlbumAsync("VideoData", assert);
    }
  };

  const FlipCamera = (
    <Icon
      style={styles.flipCamera}
      onPress={() =>
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        )
      }
      name="refresh"
      size={40}
      color="#000000"
    />
  );

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setCameraRollPermission(true);
      }
    })();
  }, []);

  let recordVideo = async () => {
    setIsRecord(true);
    console.log("hello")
  };

  if (video) {
    // save video
    console.log("hello");
    handleSave(video.uri);
  }

  let stopRecord = async () => {
    setIsRecord(false);
    cameraRef.stopRecording();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View style={styles.topButtonsContainer}>
        <Text
          onPress={() => {
            navigation.push("HomePage");
          }}
          style={styles.topCameraButton}
        >
          Camera
        </Text>
        <Text style={styles.topVideoButton}>Video</Text>
      </View>
      <View style={styles.buttons}>
        {video && <Image source={{ uri: video }} style={styles.imageButton} />}
        {TakeVideoIcon}
        {FlipCamera}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  cameraContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  topButtonsContainer: {
    opacity: 0.5,
    marginTop: 50,
    backgroundColor: "white",
    marginLeft: 80,
    marginRight: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    opacity: 0.5,
    backgroundColor: "white",
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20
  },
  imageButton: {
    height: 50,
    resizeMode: "contain",
    width: 50,
    marginLeft: 30,
    borderRadius: 200
  },
  topCameraButton: {
    fontSize: 22,
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  topVideoButton: {
    color: "white",
    fontSize: 22,
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  takePicture: {},
  flipCamera: {
    marginRight: 30
  }
});

export default VideoPage;
