import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
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
      },
      choicePhoto: false,
      choiceCamera: false
    };
    this.objDataToArr = this.objDataToArr.bind(this)
  }
  objDataToArr(){
    let arr = []
    for(let key in this.state.reader.data){
      arr.push(this.state.reader.data[key])
    }
    return arr
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.openPhoto();
          }}
        >
          <Text style={{ color: 'white' }}>Choice Photo</Text>
        </TouchableOpacity>
        <View>
          {/* {!this.state.reader ? (
            <Text>
              {!this.state.reader.message ? "" : `${this.state.reader.message}`}
            </Text>
          ) : (
            <Text>
              {!this.state.reader.message
                ? ""
                : `${this.state.reader.message}:${this.state.reader.data}`}
            </Text>
          )} */}
          {
            this.state.reader.data && this.objDataToArr().map((value, index) => {
              return (
                <Text key={index}>QR{index+1} : {value}</Text>
              )
            }
            )
          }
        </View>
      </SafeAreaView>
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
              console.log('data: ',data)
              this.setState({
                reader: {
                  message: "QrCode: \n",
                  data: data
                }
              });
              // setTimeout(() => {
              //   this.setState({
              //     reader: {
              //       message: null,
              //       data: null
              //     }
              //   });
              // }, 10000);
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
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    borderColor: 'black',
    padding: 15,
    marginBottom: 20,
    marginTop: 30,
    width: '50%',
    alignSelf: 'center'
  }
});
