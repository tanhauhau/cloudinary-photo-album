import { error, json } from '@sveltejs/kit';
import cloudinary from 'cloudinary';

export async function POST({ request, url }) {
  const id = url.searchParams.get('id');
  if (!id) {
    error(500, 'Missing id');
  }
  const effects = await request.text();
  await cloudinary.v2.uploader.add_context(`effect=${effects}`, [id]);
  return json({})
}
