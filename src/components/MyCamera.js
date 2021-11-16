import { Camera } from 'expo-camera';
import React, { Component } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {storage} from '../firebase/config';

class Mycamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: false,
            foto: '',
        };
        this.camera;
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync(
            ).then(() => {
                    this.setState({ hasCameraPermission: true });
            })
            .catch(() => {
                this.setState({ hasCameraPermission: false });
            });
            
    }


    takePicture(){   
            this.camera.takePictureAsync( )
            .then ((foto) =>(
                console.log(foto),
                this.setState({foto:foto.uri})))
            .catch((error) => console.log(error));
    }
    saveFoto(){
        //guardar fotos en el storage de firebase
        fetch(this.state.foto)
        .then(res => res.blob())
        .then(blob => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`);
            ref.put(blob)
            .then(() => {
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url);
                    this.setState({foto:''});
                })  
            });
        });
    }
    cancelFoto(){
        this.setState({foto:''});
    }
    render() {
        return (
            <>
            {this.state.foto ? (
                    <>
                    <Image style={styles.imagen} source={{uri: this.state.foto}}/>
                    <TouchableOpacity style={styles.button} onPress={()=>this.saveFoto()}>
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.cancelFoto()}>
                        <Text style={styles.textButton}>Canecelar</Text>
                    </TouchableOpacity>
                    </>

                ):
                    <>
                        <Camera 
                            style={styles.preview}
                            type={Camera.Constants.Type.front}
                            ref={ref => {
                                this.camera = ref;
                            }}

                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.takePicture();
                            }}>
                                <Text style={styles.textButton}>Capture</Text>
                        </TouchableOpacity>
                    </>
            }
            </>
        );
                
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignSelf: 'center',
        margin: 20
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imagen: {
        with:'100%',
        flex: 1,
    }
})

export default Mycamera;
