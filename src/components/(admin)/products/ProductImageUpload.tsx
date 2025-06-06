// components/ImageUploader.jsx
import { Input } from '@/components/ui/input';
import LoadingIcon from '@/components/ui/loadingIcon';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductImageUpload({ setImage }: { setImage: (imageUrl: string) => void; }) {
    const [loading, setLoading] = useState(false);
    const [image, setUploadedImage] = useState('');

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
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
            setImage(imageUrl);
            setUploadedImage(imageUrl);
            setLoading(false);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div>
            <div className="flex items-end gap-x-4 text-sm">
                {
                    loading && <LoadingIcon />
                }
                {image && <Image src={image} alt="Uploaded" width={50} height={50} className="rounded-md border border-gray-400" unoptimized />}
                <div>
                    <h1 className='pb-2 font-medium'>Image</h1>
                    <Input className='w-56' id="file" type="file" placeholder="File" accept="image/*" onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};
