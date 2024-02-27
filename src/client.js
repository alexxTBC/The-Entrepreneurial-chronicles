import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

export const client = createClient({
   projectId: 'c7z1yijy',
    dataset: 'production',
  apiVersion: '2023-05-03', 
  useCdn: true, 
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
  return builder.image(source)
}