import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../../utility-components/typography/text.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

const ProfileCamera = styled(Camera)`
    width: 100%;
    height: 100%;
`;

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef();
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        if (cameraRef && cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
            navigation.goBack();
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    ``;
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ProfileCamera
            ref={(camera) => (cameraRef.current = camera)}
            type={Camera.Constants.Type.front}
            ratio='16:9'
        >
            <TouchableOpacity onPress={snap} style={{ height: '100%', width: '100%' }} />
        </ProfileCamera>
    );
};

export default CameraScreen;
