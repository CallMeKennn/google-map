import db from "../configFirebase";
import { collection, getDocs } from "firebase/firestore";

async function getProvinces() {
    const provincesCollection = collection(db, "provinces"); 
    try {
      const querySnapshot = await getDocs(provincesCollection);
      const provincesList = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data() 
      }));
      console.log("Dữ liệu đã lấy từ Firestore:", provincesList);
      return provincesList;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
      return [];
    }
  }
  
  export default getProvinces;