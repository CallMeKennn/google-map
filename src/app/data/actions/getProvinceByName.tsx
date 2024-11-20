import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../configFirebase";

const getProvinceByName = async (name: any) => {
  if (!name) {
    console.error("Tên tỉnh thành không được để trống hoặc undefined");
    return null;
  }

  const provinceCollection = collection(db, "provinces");
  const provinceQuery = query(provinceCollection, where("name_lowercase", "==", name.toLowerCase()));

  try {
    const querySnapshot = await getDocs(provinceQuery);
    if (!querySnapshot.empty) {
      const provinceData = querySnapshot.docs[0].data();
      return provinceData;
    } else {
      console.log(`Không tìm thấy tỉnh thành với tên "${name}"`);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm tỉnh thành: ", error);
    return null;
  }
};

export default getProvinceByName;
