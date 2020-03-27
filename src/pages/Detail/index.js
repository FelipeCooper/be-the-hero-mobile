import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import styles from "./style";
import logoImage from "../../assets/logo.png";
import * as MailComposer from "expo-mail-composer";

export default function Detail() {
  const navigation = useNavigation();
  const message = `Olá Apat, gostaria de ajudar no caso "Caso 1" com o valor de R$120,00`;
  function navigateBack() {
    navigation.goBack();
  }
  async function sendMail() {
    await MailComposer.composeAsync({
      subject: "Heroi do caso: caso1",
      recipients: ["hoonter69@gmail.com"],
      body: message
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>APAE</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Caso 1</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>R$ 120.00</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => {}}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
