import cloudinary from 'cloudinary';
import {
  VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  VITE_PUBLIC_CLOUDINARY_API_KEY,
} from '$env/static/public';

import { CLOUDINARY_SECRET } from '$env/static/private';

cloudinary.config({
  cloud_name: VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: VITE_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});
