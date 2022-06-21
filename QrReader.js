import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { QRreader } from "react-native-qr-decode-image-camera";
const ImagePicker = require('react-native-image-picker');


export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: null,
        data: null
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.openPhoto();
          }}
        >
          <Text style={{ marginTop: 20 }}>просто кек бля</Text>
        </TouchableOpacity>
        <View>
          {!this.state.reader ? (
            <Text>
              {!this.state.reader.message ? "" : `${this.state.reader.message}`}
            </Text>
          ) : (
            <Text>
              {!this.state.reader.message
                ? ""
                : `${this.state.reader.message}:${this.state.reader.data}`}
            </Text>
          )}
        </View>
      </View>
    );
  }

  openPhoto() {
    console.log("ImagePicker");
    ImagePicker.launchImageLibrary({}, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        if (response.assets[0].uri) {
          var path = response.path;
          if (!path) {
            path = response.assets[0].uri;
          }
          QRreader(path)
            .then(data => {
              this.setState({
                reader: {
                  message: "message",
                  data: data
                }
              });
              setTimeout(() => {
                this.setState({
                  reader: {
                    message: null,
                    data: null
                  }
                });
              }, 10000);
            })
            .catch(err => {
              this.setState({
                reader: {
                  message: "message",
                  data: null
                }
              });
            });
        }
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});