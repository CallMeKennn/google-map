import db from "../configFirebase";
import { vietnamProvinces } from "../locationSearch";
import { collection, addDoc, getDocs } from "firebase/firestore";
import _ from "lodash";

const addProvincesToFirestore = async () => {
  const provincesCollection = collection(db, "provinces");

  try {
    const listProvincesSnapshot = await getDocs(provincesCollection);
    const existingProvinces = listProvincesSnapshot.docs.map(doc =>
      doc.data().name.toLowerCase()
    );

    const newProvinces = vietnamProvinces.filter(
      province => !existingProvinces.includes(province.name.toLowerCase())
    );

    if (!_.isEmpty(newProvinces)) {
      for (const province of newProvinces) {
        await addDoc(provincesCollection, {
          ...province,
          name_lowercase: province.name.toLowerCase(),
          geometry: {
            type: province.geometry.type,
            coordinates: JSON.stringify(province.geometry.coordinates),
          }
        });
      }
      console.log("Dữ liệu đã được thêm thành công vào Firestore!");
    } else {
      console.log("Dữ liệu đã tồn tại, không cần thêm mới.");
    }
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu vào Firestore: ", error);
  }
};

export default addProvincesToFirestore;
