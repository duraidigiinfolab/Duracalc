import { useState } from 'react';
import { StyleSheet, TextInput, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { calculateEmi } from '@calculator/shared';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [isYears, setIsYears] = useState<boolean>(true);
  const router = useRouter();

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(tenure) || 0;

  const { monthlyEmi, totalInterest, totalPayment } = calculateEmi({
    principal: p,
    annualInterestRate: r,
    tenure: t,
    isTenureInYears: isYears,
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate('/')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#a1a1aa" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>EMI Calculator</ThemedText>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Principal Amount (₹)</ThemedText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={principal}
                onChangeText={setPrincipal}
                placeholder="e.g. 500000"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Annual Interest Rate (%)</ThemedText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                placeholder="e.g. 8.5"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.rowBetween}>
                <ThemedText style={styles.label}>Tenure</ThemedText>
                <View style={styles.switchRow}>
                  <ThemedText style={!isYears ? styles.activeText : styles.inactiveText}>
                    Months
                  </ThemedText>
                  <Switch
                    value={isYears}
                    onValueChange={setIsYears}
                    trackColor={{ false: '#333', true: '#9333ea' }}
                    thumbColor="#fff"
                  />
                  <ThemedText style={isYears ? styles.activeText : styles.inactiveText}>
                    Years
                  </ThemedText>
                </View>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={tenure}
                onChangeText={setTenure}
                placeholder={isYears ? "e.g. 5" : "e.g. 60"}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.resultsCard}>
            <View style={styles.resultRow}>
              <ThemedText style={styles.resultLabel}>Monthly EMI</ThemedText>
              <ThemedText type="subtitle" style={styles.emiValue}>
                ₹{monthlyEmi.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </ThemedText>
            </View>
            <View style={styles.resultRow}>
              <ThemedText style={styles.resultLabel}>Total Interest</ThemedText>
              <ThemedText style={styles.resultValue}>
                ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </ThemedText>
            </View>
            <View style={styles.resultRow}>
              <ThemedText style={styles.resultLabel}>Total Payment</ThemedText>
              <ThemedText style={styles.resultValue}>
                ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </ThemedText>
            </View>
            
            {p > 0 && r > 0 && t > 0 && (
              <TouchableOpacity 
                style={styles.scheduleButton}
                onPress={() => {
                  router.push({
                    pathname: '/emi-schedule',
                    params: { p, r, t, y: isYears ? 'true' : 'false' }
                  });
                }}
              >
                <ThemedText style={styles.scheduleButtonText}>View Repayment Schedule</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b', // zinc-950
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  backButton: { marginRight: 16, padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#c084fc' },
  card: {
    backgroundColor: '#18181b', // zinc-900
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#27272a', // zinc-800
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#a1a1aa', // zinc-400
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#09090b', // zinc-950
    borderWidth: 1,
    borderColor: '#27272a', // zinc-800
    borderRadius: 8,
    color: '#f4f4f5', // zinc-100
    padding: 12,
    fontSize: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeText: {
    color: '#f4f4f5',
    fontSize: 12,
  },
  inactiveText: {
    color: '#71717a',
    fontSize: 12,
  },
  resultsCard: {
    backgroundColor: '#18181b', // zinc-900
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a', // zinc-800
    gap: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  emiValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultValue: {
    color: '#e4e4e7', // zinc-200
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: '#9333ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
