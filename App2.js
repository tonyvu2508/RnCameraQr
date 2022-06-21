import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barcodes: [],
            barCodesCombo: [],
            barCodesComboWithOrder: [],
            isRender: false
        }
        this.renderBarcodes = this.renderBarcodes.bind(this);
        this.barcodeRecognized = this.barcodeRecognized.bind(this);
        this.sortBarcodesWithXCoordinate = this.sortBarcodesWithXCoordinate.bind(this);
    }
    barcodeRecognized = ({ barcodes }) => {
        if (barcodes.length > 0) {
            // console.log('barcodes: ', barcodes);
            //   let hasBarcode = false;
            barcodes.forEach(barcode => {
                let index = this.state.barCodesCombo.findIndex((item) => item.data === barcode.data)
                if (index < 0) {
                    // let barCodesCombo = [...this.state.barCodesCombo];
                    // barCodesCombo.push(barcode.data);
                    // this.setState({ barCodesCombo: barCodesCombo })
                    this.state.barCodesCombo.push(barcode);
                }
                if (index >= 0) {
                    // this.state.barCodesCombo[index].bounds = barcode.bounds;
                }
            })
            this.setState({ barcodes })
        }
    }
    sortBarcodesWithXCoordinate = (barcodes) => {
        let _barcodes = [...barcodes];
        console.log('_barcodes: ', _barcodes);
        for (let i = 0; i < _barcodes.length; i++) {
            for (let y = i + 1; y < _barcodes.length; y++) {
                if (_barcodes[i].bounds.origin.x > _barcodes[y].bounds.origin.x) {
                    let temp = _barcodes[i];
                    _barcodes[i] = _barcodes[y];
                    _barcodes[y] = temp;
                }

            }
        }
        return _barcodes;
    }
    renderBarcodes = () => {
        this.setState({ isRender: false })
        this.state.barCodesCombo = this.sortBarcodesWithXCoordinate(this.state.barCodesCombo);
        // this.setState({barCodesCombo:this.sortBarcodesWithXCoordinate(this.state.barCodesCombo)})
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

    renderBounds = () => {
        let barcodes = [...this.state.barcodes];
        if (barcodes.length > 0) {
            const boxes = barcodes.map(barcode => {
            let x = barcode.bounds.origin.x;
            let y = barcode.bounds.origin.y;
            let width = barcode.bounds.size.height;
            let height = barcode.bounds.size.height;
            return <Dot x={x} y={y} width={width} height={height} key={x+y}/>
            })
            return boxes;
        }
        else {
            // render box with blue
        }
    }
    // renderBarcode = ({ data }) => {
    //     // this.camera.pausePreview()
    //     this.setState({ barcodes: [], isRender: false })
    //     Alert.alert(
    //         'Scanned Data',
    //         data,
    //         [
    //             {
    //                 text: 'Okay',
    //                 onPress: () => {
    //                     console.log("barCodesCombo: ", this.state.barCodesCombo);
    //                     this.setState({ barCodesCombo: [] })
    //                 },
    //                 style: 'cancel'
    //             }
    //         ],
    //         { cancelable: false }
    //     )

    // }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    captureAudio={false}
                    style={styles.scanner}
                    onGoogleVisionBarcodesDetected={(barcodes)=>{
                        this.barcodeRecognized(barcodes)
                    
                    }}
                >
                    {this.state.isRender && this.renderBarcodes()}
                    {this.renderBounds()}
                    {/* {() => {
                        let barcodes = [...this.state.barcodes];
                        console.log('barcodes: ', barcodes);
                        if (barcodes.length > 0) {
                            barcodes.map(barcode => {
                                console.log('barcode: ', barcode);
                                let x = barcode.bounds.origin.x;
                                let y = barcode.bounds.origin.y;
                                let width = barcode.bounds.size.width;
                                let height = barcode.bounds.size.height;
                                return <Dot x={x} y={y} width={width} height={height} />
                            })
                        }
                    }} */}

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

class Dot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }

    }
    render() {
        return (
            <View style={{ position: 'absolute', left: this.props.x, top: this.props.y, width: this.props.width || 10, height: this.props.height || 10, borderWidth: 2, borderColor: 'red' }}>
                {/* <Text style={{ color: 'white' }}>DOT</Text> */}
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