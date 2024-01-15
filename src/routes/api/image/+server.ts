import { error, json } from '@sveltejs/kit';
import cloudinary from 'cloudinary'

export async function GET({ url }) {
  const id = url.searchParams.get('id');
  if (!id) {
    error(500, 'Invalid id');
  }
  const result = await cloudinary.v2.api.resource(id);
  return json(result);
}