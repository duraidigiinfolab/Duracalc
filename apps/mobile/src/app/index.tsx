import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Home() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>Duracalc</ThemedText>
            <ThemedText style={styles.subtitle}>Your all-in-one financial toolkit.</ThemedText>
          </View>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/emi-calculator')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#3b0764' }]}>
              <ThemedText style={styles.iconText}>%</ThemedText>
            </View>
            <ThemedText type="subtitle" style={styles.cardTitle}>EMI Calculator</ThemedText>
            <ThemedText style={styles.cardDescription}>Calculate loans and view detailed repayment schedules.</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/basic-calculator')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#1e3a8a' }]}>
              <ThemedText style={styles.iconText}>+-</ThemedText>
            </View>
            <ThemedText type="subtitle" style={styles.cardTitle}>Basic Calculator</ThemedText>
            <ThemedText style={styles.cardDescription}>Standard calculator for everyday arithmetic.</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 42,
  },
  subtitle: {
    color: '#a1a1aa',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#fff',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#a1a1aa',
    textAlign: 'center',
  }
});
