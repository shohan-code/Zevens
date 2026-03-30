import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "./config";

// Types
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt?: string;
}

const PRODUCTS_COLLECTION = "products";

export const getProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, PRODUCTS_COLLECTION);
  // Add a basic query ordered by latest products
  const q = query(productsCol, orderBy("createdAt", "desc"));
  const productSnapshot = await getDocs(q);
  
  return productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
  const productsCol = collection(db, PRODUCTS_COLLECTION);
  const docRef = await addDoc(productsCol, {
    ...product,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};
