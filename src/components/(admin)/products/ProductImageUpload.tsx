// components/ImageUploader.jsx
import { Input } from '@/components/ui/input';
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
                    loading && <svg className="mr-3 -ml-1 size-5 animate-spin text-primary_red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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
