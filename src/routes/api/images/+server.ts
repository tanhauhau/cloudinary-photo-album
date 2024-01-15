import { json } from '@sveltejs/kit';
import cloudinary from 'cloudinary';

export async function GET({ url }) {
  const next = url.searchParams.get('next');
  const { resources, next_cursor } = await cloudinary.v2.api.resources({
    max_results: 12,
    next_cursor: next,
  });

  return json({
    data: resources.map(({ public_id }: any) => {
      return { public_id };
    }),
    next_cursor,
  });
}
