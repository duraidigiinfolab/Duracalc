import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Share, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { calculateEmi } from '@calculator/shared';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PieChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EMIScheduleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const p = parseFloat((params.p as string) || '0');
  const r = parseFloat((params.r as string) || '0');
  const t = parseFloat((params.t as string) || '0');
  const y = params.y === 'true';

  const { monthlyEmi, totalInterest, totalPayment, schedule } = calculateEmi({
    principal: p,
    annualInterestRate: r,
    tenure: t,
    isTenureInYears: y,
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My EMI Repayment Schedule:\nLoan: ₹${p.toLocaleString('en-IN')}\nEMI: ₹${monthlyEmi.toLocaleString('en-IN')}\nTotal Payment: ₹${totalPayment.toLocaleString('en-IN')}`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (!schedule || schedule.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText style={styles.errorText}>Invalid loan details.</ThemedText>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.actionBtn}>
          <ThemedText style={styles.actionBtnText}>Back</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={[styles.actionBtn, styles.shareBtn]}>
          <ThemedText style={styles.shareBtnText}>Share</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <ThemedText type="title" style={styles.title}>Repayment Schedule</ThemedText>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Loan Amount</ThemedText>
            <ThemedText style={styles.summaryValue}>₹{p.toLocaleString('en-IN')}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Interest Rate</ThemedText>
            <ThemedText style={styles.summaryValue}>{r}%</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total Interest</ThemedText>
            <ThemedText style={[styles.summaryValue, { color: '#f87171' }]}>₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total Payment</ThemedText>
            <ThemedText style={styles.summaryValue}>₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <ThemedText style={styles.chartTitle}>Principal vs Interest</ThemedText>
        <PieChart
          data={[
            { name: 'Principal', amount: p, color: '#34d399', legendFontColor: '#a1a1aa', legendFontSize: 12 },
            { name: 'Interest', amount: totalInterest, color: '#f43f5e', legendFontColor: '#a1a1aa', legendFontSize: 12 }
          ]}
          width={screenWidth - 72}
          height={160}
          chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      </View>

      <View style={styles.chartCard}>
        <ThemedText style={styles.chartTitle}>Balance Over Time</ThemedText>
        {(() => {
          let chartLabels = [];
          let chartData = [];
          if (schedule.length <= 24) {
            chartLabels = schedule.filter((_, i) => i % Math.ceil(schedule.length / 6) === 0).map(s => `M${s.month}`);
            chartData = schedule.filter((_, i) => i % Math.ceil(schedule.length / 6) === 0).map(s => s.remainingBalance);
          } else {
            const yearly = schedule.reduce((acc, row) => {
              const year = Math.ceil(row.month / 12);
              if (!acc[year]) acc[year] = { year, balance: row.remainingBalance };
              acc[year].balance = row.remainingBalance;
              return acc;
            }, {} as Record<number, any>);
            const vals = Object.values(yearly);
            const filtered = vals.filter((_, i) => i % Math.ceil(vals.length / 6) === 0);
            chartLabels = filtered.map((s: any) => `Y${s.year}`);
            chartData = filtered.map((s: any) => s.balance);
          }
          if (chartLabels.length === 0) { chartLabels = ['0']; chartData = [0]; }
          
          return (
            <LineChart
              data={{ labels: chartLabels, datasets: [{ data: chartData }] }}
              width={screenWidth - 72}
              height={180}
              yAxisLabel="₹"
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#18181b',
                backgroundGradientFrom: '#18181b',
                backgroundGradientTo: '#18181b',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(168, 85, 247, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: '4', strokeWidth: '2', stroke: '#a855f7' },
                formatYLabel: (val) => `${(parseInt(val)/100000).toFixed(1)}L`
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          );
        })()}
      </View>

      <View style={styles.tableHeader}>
        <ThemedText style={[styles.tableCol, { flex: 0.5 }]}>Mth</ThemedText>
        <ThemedText style={[styles.tableCol, { textAlign: 'right' }]}>EMI</ThemedText>
        <ThemedText style={[styles.tableCol, { textAlign: 'right' }]}>Prin.</ThemedText>
        <ThemedText style={[styles.tableCol, { textAlign: 'right' }]}>Int.</ThemedText>
        <ThemedText style={[styles.tableCol, { textAlign: 'right' }]}>Bal.</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.month.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <ThemedText style={[styles.tableCell, { flex: 0.5, color: '#a1a1aa' }]}>{item.month}</ThemedText>
              <ThemedText style={[styles.tableCell, { textAlign: 'right', fontWeight: 'bold' }]}>
                {Math.round(item.emi).toLocaleString('en-IN')}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { textAlign: 'right', color: '#4ade80' }]}>
                {Math.round(item.principalPaid).toLocaleString('en-IN')}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { textAlign: 'right', color: '#f87171' }]}>
                {Math.round(item.interestPaid).toLocaleString('en-IN')}
              </ThemedText>
              <ThemedText style={[styles.tableCell, { textAlign: 'right' }]}>
                {Math.round(item.remainingBalance).toLocaleString('en-IN')}
              </ThemedText>
            </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  safeArea: { flex: 1 },
  listContent: { paddingBottom: 40 },
  header: { padding: 16 },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#27272a', borderRadius: 8 },
  actionBtnText: { color: '#a1a1aa', fontWeight: '600' },
  shareBtn: { backgroundColor: '#9333ea' },
  shareBtnText: { color: 'white', fontWeight: '600' },
  summaryCard: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#27272a' },
  title: { color: 'white', fontSize: 24, marginBottom: 16 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  summaryItem: { width: '45%' },
  summaryLabel: { color: '#a1a1aa', fontSize: 12, marginBottom: 4 },
  summaryValue: { color: 'white', fontSize: 16, fontWeight: '600' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#18181b', padding: 12, borderRadius: 8, marginBottom: 8 },
  tableCol: { flex: 1, color: '#a1a1aa', fontSize: 12, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  tableCell: { flex: 1, color: 'white', fontSize: 12 },
  errorText: { color: '#f87171', textAlign: 'center', marginTop: 40, fontSize: 16 },
  backButton: { alignSelf: 'center', marginTop: 20, padding: 12, backgroundColor: '#27272a', borderRadius: 8 },
  backButtonText: { color: 'white' },
  chartCard: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#27272a', alignItems: 'center' },
  chartTitle: { color: '#a1a1aa', fontSize: 14, marginBottom: 16, alignSelf: 'flex-start' }
});
