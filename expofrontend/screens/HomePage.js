import { Button, StyleSheet, Text, View, Image } from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const HomePage = ({ navigation }) => {
  const TakePictureIcon = (
    <Icon
      style={styles.takePicture}
      onPress={() => takePicture()}
      name="camera"
      size={60}
      color="#000000"
    />
  );

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

  const [micPermission, setMicPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraRolePermission, setCameraRollPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(
    "https://th.bing.com/th/id/R.a9557c91c2dd70bcac67938e0b384a2c?rik=cgi1jVIfUHfaOQ&riu=http%3a%2f%2fcliparts.co%2fcliparts%2f8iG%2fb5X%2f8iGb5XKbT.jpg&ehk=n7KZax1HQ%2by8bMtkU8XpmtpDOzR8ZBjsKScHEAWFC2M%3d&risl=&pid=ImgRaw&r=0"
  );
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const micStatus = await Camera.requestMicrophonePermissionsAsync();
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setCameraPermission(cameraStatus.status === "granted");
      setMicPermission(micStatus.status === "granted");
      if (status === "granted") {
        setCameraRollPermission(true);
      }
    })();
  }, []);

  const handleSave = async (data) => {
    if (cameraRolePermission) {
      const assert = await MediaLibrary.createAssetAsync(data);
      MediaLibrary.createAlbumAsync("PhotoData", assert);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      handleSave(data.uri);
      setImage(data.uri);
    }
  };

  if (cameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View style={styles.topButtonsContainer}>
        <Text style={styles.topCameraButton}>Camera</Text>
        <Text
          onPress={() => navigation.push("VideoPage")}
          style={styles.topVideoButton}
        >
          Video
        </Text>
      </View>
      <View style={styles.buttons}>
        {image && <Image source={{ uri: image }} style={styles.imageButton} />}
        {TakePictureIcon}
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
    color: "white",
    fontSize: 22,
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  topVideoButton: {
    fontSize: 22,
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  takePicture: {},
  flipCamera: {
    marginRight: 30
  }
});

export default HomePage;
