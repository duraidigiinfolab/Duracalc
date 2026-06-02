import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { 
  calculatePercentage, 
  calculatePercentageOf, 
  calculatePercentageChange 
} from '@calculator/shared';
import { Ionicons } from '@expo/vector-icons';

export default function PercentageCalculatorScreen() {
  const router = useRouter();

  const [m1Pct, setM1Pct] = useState<string>('');
  const [m1Val, setM1Val] = useState<string>('');
  const m1Result = calculatePercentage(parseFloat(m1Pct) || 0, parseFloat(m1Val) || 0);

  const [m2Part, setM2Part] = useState<string>('');
  const [m2Total, setM2Total] = useState<string>('');
  const m2Result = calculatePercentageOf(parseFloat(m2Part) || 0, parseFloat(m2Total) || 0);

  const [m3Old, setM3Old] = useState<string>('');
  const [m3New, setM3New] = useState<string>('');
  const m3Result = calculatePercentageChange(parseFloat(m3Old) || 0, parseFloat(m3New) || 0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate('/')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#a1a1aa" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Percentage</ThemedText>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Card 1: Emerald Theme */}
          <View style={[styles.card, { borderColor: 'rgba(52, 211, 153, 0.3)' }]}>
            <ThemedText style={[styles.cardTitle, { color: '#34d399' }]}>What is X% of Y?</ThemedText>
            
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>Percentage (X)</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#34d399' }]}
                  keyboardType="numeric"
                  value={m1Pct}
                  onChangeText={setM1Pct}
                  placeholder="20"
                  placeholderTextColor="#52525b"
                />
              </View>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>Value (Y)</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#34d399' }]}
                  keyboardType="numeric"
                  value={m1Val}
                  onChangeText={setM1Val}
                  placeholder="150"
                  placeholderTextColor="#52525b"
                />
              </View>
            </View>

            <View style={styles.resultContainer}>
              <ThemedText style={styles.resultLabel}>Result</ThemedText>
              <ThemedText style={styles.resultText}>
                {m1Pct && m1Val ? m1Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"}
              </ThemedText>
            </View>
          </View>

          {/* Card 2: Violet Theme */}
          <View style={[styles.card, { borderColor: 'rgba(167, 139, 250, 0.3)' }]}>
            <ThemedText style={[styles.cardTitle, { color: '#a78bfa' }]}>X is what % of Y?</ThemedText>
            
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>Part (X)</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#a78bfa' }]}
                  keyboardType="numeric"
                  value={m2Part}
                  onChangeText={setM2Part}
                  placeholder="30"
                  placeholderTextColor="#52525b"
                />
              </View>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>Total (Y)</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#a78bfa' }]}
                  keyboardType="numeric"
                  value={m2Total}
                  onChangeText={setM2Total}
                  placeholder="150"
                  placeholderTextColor="#52525b"
                />
              </View>
            </View>

            <View style={styles.resultContainer}>
              <ThemedText style={styles.resultLabel}>Result</ThemedText>
              <ThemedText style={styles.resultText}>
                {m2Part && m2Total ? m2Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) + "%" : "—"}
              </ThemedText>
            </View>
          </View>

          {/* Card 3: Amber Theme */}
          <View style={[styles.card, { borderColor: 'rgba(251, 191, 36, 0.3)' }]}>
            <ThemedText style={[styles.cardTitle, { color: '#fbbf24' }]}>Percentage Change</ThemedText>
            
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>Old Value</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#fbbf24' }]}
                  keyboardType="numeric"
                  value={m3Old}
                  onChangeText={setM3Old}
                  placeholder="100"
                  placeholderTextColor="#52525b"
                />
              </View>
              <View style={styles.inputWrapper}>
                <ThemedText style={styles.label}>New Value</ThemedText>
                <TextInput
                  style={[styles.input, { borderBottomColor: '#fbbf24' }]}
                  keyboardType="numeric"
                  value={m3New}
                  onChangeText={setM3New}
                  placeholder="120"
                  placeholderTextColor="#52525b"
                />
              </View>
            </View>

            <View style={styles.resultContainer}>
              <ThemedText style={styles.resultLabel}>Result</ThemedText>
              <ThemedText style={[
                styles.resultText, 
                m3Result > 0 ? { color: '#4ade80' } : m3Result < 0 ? { color: '#f87171' } : {}
              ]}>
                {m3Old && m3New 
                  ? (m3Result > 0 ? '+' : '') + m3Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) + "%" 
                  : "—"}
              </ThemedText>
            </View>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  backButton: { marginRight: 16, padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollContent: { padding: 16 },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  inputWrapper: { flex: 1 },
  label: { color: '#a1a1aa', fontSize: 12, marginBottom: 8 },
  input: {
    backgroundColor: '#09090b',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 2,
  },
  resultContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  resultLabel: { color: '#a1a1aa', fontSize: 14, marginBottom: 4 },
  resultText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
});
