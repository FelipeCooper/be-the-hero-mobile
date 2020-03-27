import React from "react";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";
export default function Incidents() {
  const navigation = useNavigation();

  function navigationToDetail() {
    navigation.navigate("Detail");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 Casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>Escolha um dos casos e salve o dia</Text>
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        style={styles.incidentList}
        renderItem={() => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>Apate</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>Caso 1</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>R$ 120,00</Text>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={navigationToDetail}
            >
              <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
