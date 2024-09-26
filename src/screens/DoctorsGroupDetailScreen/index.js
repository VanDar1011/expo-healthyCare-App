// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import styles from "./style.js";
// import fetchDoctorGroupDetail from "../../utils/doctorgroup/fetchDoctorGroupDetail";
// import ItemDoctor from "../../components/ItemDoctor.jsx";
// export default function DoctorsGroupDetailScreen({ route, navigation }) {
//   const { group } = route.params;
//   console.log(group);
//   const [doctors, setDoctor] = useState([]);
//   useEffect(() => {
//     const functionFetchDoctorGroupDetail = async () => {
//       try {
//         await fetchDoctorGroupDetail(group.id, setDoctor);
//       } catch (error) {
//         console.log(
//           "Error fetching fetchDoctorGroupDetail:",
//           error.message || error
//         );
//       }
//     };
//     functionFetchDoctorGroupDetail();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text>{group.name}</Text>
//       <View>
//         {doctors.length > 0 &&
//           doctors.map((doctor) => (
//             <ItemDoctor
//               key={doctor.id}
//               doctor={doctor}
//               navigation={navigation}
//             ></ItemDoctor>
//           ))}
//       </View>
//     </View>
//   );
// }
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./style.js";
import fetchDoctorGroupDetail from "../../utils/doctorgroup/fetchDoctorGroupDetail";
import ItemDoctor from "../../components/ItemDoctor.jsx";

export default function DoctorsGroupDetailScreen({ route, navigation }) {
  const { group } = route.params;
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const functionFetchDoctorGroupDetail = async () => {
      try {
        await fetchDoctorGroupDetail(group.id, setDoctors);
      } catch (error) {
        console.log(
          "Error fetching fetchDoctorGroupDetail:",
          error.message || error
        );
      }
    };
    functionFetchDoctorGroupDetail();
  }, []);

  const renderItem = ({ item }) => (
    <ItemDoctor doctor={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
