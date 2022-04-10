import { launchCamera } from 'react-native-image-picker';

export const useCameraPicker = () => {
  const getPhtoInBase64 = async () => {
    const photo = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    });
    return photo.assets?.[0].base64;
  };

  const getPhoto = async () => {
    const photo = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    });

    return photo;
  };

  return {
    getPhtoInBase64,
    getPhoto,
  };
};
