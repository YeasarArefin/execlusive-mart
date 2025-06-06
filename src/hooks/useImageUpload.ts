import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useImageUpload() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUrl, setUploadedImage] = useState<string>('');
    const [file, setFile] = useState<File | null>();

    const setImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        /*@ts-ignore*/
        const file = e.target.files[0];
        setFile(file);
    };


    useEffect(() => {
        const uploadImage = async () => {

            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            setIsLoading(true);
            try {
                const { data } = await axios.post(
                    'https://api.imgbb.com/1/upload?key=8ed590ff68ddde6cc90c42108dab7385',
                    formData
                );
                if (data.status !== 200) {
                    console.log("Not Uploaded");
                    return;
                }
                const imageUrl = data?.data?.url;
                setUploadedImage(imageUrl);
            } catch (error) {
                console.error("Upload failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (file) {
            uploadImage();
        }
    }, [file]);
    return {
        isLoading,
        imageUrl,
        setImageFile
    };
};

