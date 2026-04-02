import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "./config";

// Types
export interface ProductVariant {
  type: 'size' | 'color';
  value: string;
  stock: number;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  status: 'in-stock' | 'pre-order';
  variants?: ProductVariant[];
  preOrderAdvance?: number;
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
    status: product.status || 'in-stock',
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, product);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// Order Types
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id?: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'full' | 'cod';
  transId: string;
  payNumber: string;
  screenshotUrl?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const ordersCol = collection(db, ORDERS_COLLECTION);
  const q = query(ordersCol, orderBy("createdAt", "desc"));
  const orderSnapshot = await getDocs(q);
  
  return orderSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, { status });
};

const ORDERS_COLLECTION = "orders";

export const createOrder = async (order: Omit<Order, "id">): Promise<string> => {
  const ordersCol = collection(db, ORDERS_COLLECTION);
  const docRef = await addDoc(ordersCol, {
    ...order,
    status: order.status || 'pending',
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

// Settings Types
export interface SiteSettings {
  whatsapp: string;
  email: string;
  bkash: string;
  nagad: string;
  announcement?: string;
}

const SETTINGS_COLLECTION = "settings";
const GLOBAL_SETTINGS_ID = "global";

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const docRef = doc(db, SETTINGS_COLLECTION, GLOBAL_SETTINGS_ID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as SiteSettings;
  }
  // Default values
  return {
    whatsapp: "01772024655",
    email: "zevens@contact.com",
    bkash: "01772024655",
    nagad: "01772024655",
    announcement: "FREE DELIVERY ON ORDERS OVER ৳ 30,000"
  };
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  const { setDoc } = await import("firebase/firestore");
  const docRef = doc(db, SETTINGS_COLLECTION, GLOBAL_SETTINGS_ID);
  await setDoc(docRef, settings, { merge: true });
};
