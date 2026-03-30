import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Uploads an image to Firebase Storage and returns its download URL.
 * 
 * @param file The file object to upload
 * @param path The path in Firebase Storage (e.g., 'products/image.png')
 * @returns The public download URL for the uploaded file
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};
