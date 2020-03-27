import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);
  const [incidents, setIncidents] = useState([]);

  function navigationToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get("incidents", {
      params: {
        page
      }
    });
    setIncidents([...incidents, ...response.data]);
    setPage(page + 1);
    setTotal(response.headers["x-total-count"]);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>Escolha um dos casos e salve o dia</Text>
      <FlatList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        style={styles.incidentList}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRl"
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigationToDetail(incident)}
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
