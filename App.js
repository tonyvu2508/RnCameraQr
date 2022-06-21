import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'

class App extends Component {
  state = {
    barcodes: [],
    barCodesCombo: [],
    isRender: false
  }
  g_barcodes = []

  barcodeRecognized = ({ barcodes }) => {
    if (barcodes.length > 0) {
      // console.log('barcodes: ', barcodes);
      let hasBarcode = false;
      this.state.barCodesCombo.forEach(barcode => {
        if (barcode.data === barcodes[0].data) {
          hasBarcode = true;
        }
      })
      if (!hasBarcode) {
        let barCodesCombo = this.state.barCodesCombo;
        barCodesCombo.push(barcodes[0]);
        this.setState({ barCodesCombo: barCodesCombo })
      }
      // barcodes.forEach(barcode => console.log(barcode.data))
      this.setState({ barcodes })
      // this.setState({ isRender: false })
    }
    // this.camera.pausePreview()
  }
  renderBarcodes = () => {
    this.setState({ isRender: false })
    // return <View>{this.state.barcodes.map(this.renderBarcode)}</View>
    Alert.alert('Scanned Data', this.state.barCodesCombo.map(barcode => barcode.data).join('\n\n'), 
    [
      {
        text: 'Okay',
        onPress: () => { 
          console.log("barCodesCombo: ", this.state.barCodesCombo);
          this.setState({ barCodesCombo: [] }) 
        },
        style: 'cancel'
      }
    ])

  }


  renderBarcode = ({ data }) => {
    // this.camera.pausePreview()
    this.setState({ barcodes: [], isRender: false })
    Alert.alert(
      'Scanned Data',
      data,
      [
        {
          text: 'Okay',
          onPress: () => { 
            console.log("barCodesCombo: ", this.state.barCodesCombo);
            this.setState({ barCodesCombo: [] }) 
          },
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )

  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          captureAudio={false}
          style={styles.scanner}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        >
          {this.state.isRender && this.renderBarcodes}
        </RNCamera>
        <Text style={{ color: 'white' }}>Regconize: {this.state.barCodesCombo.length}</Text>
        <TouchableOpacity style={styles.btnCapture}
          onPress={() => {
            // this.camera.resumePreview()
            this.setState({ isRender: true })
          }}
        >
          <Text>Show Text</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  // add the following
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnCapture: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20
  }
})

export default App