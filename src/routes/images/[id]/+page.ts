export async function load({ fetch, params }) {
  const id = params.id
  const response = await fetch(`/api/image?id=${id}`);
  const result = await response.json();
  return {
    image: result,
  }
}