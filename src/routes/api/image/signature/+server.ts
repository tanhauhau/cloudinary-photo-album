import cloudinary from 'cloudinary';
import { CLOUDINARY_SECRET } from '$env/static/private'
import { error, json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { paramsToSign } = await request.json()
    const signature = cloudinary.v2.utils.api_sign_request(
      paramsToSign,
      CLOUDINARY_SECRET
    );
    return json({ signature })
  } catch (e) {
    return error(500, (e as Error).message)
  }
}