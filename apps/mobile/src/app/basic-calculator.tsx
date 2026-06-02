import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { evaluateBasicMath } from '@calculator/shared';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function BasicCalculatorScreen() {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' || display === 'Error' ? num : display + num);
  };

  const handleOperator = (op: string) => {
    if (display === 'Error') return;
    setExpression(expression + display + op);
    setDisplay('0');
  };

  const calculate = () => {
    if (display === 'Error') return;
    const fullExpression = expression + display;
    const result = evaluateBasicMath(fullExpression);
    setDisplay(result);
    setExpression('');
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const renderButton = (text: string, onPress: () => void, styleType: 'default' | 'operator' | 'action' = 'default') => {
    const buttonStyles = [
      styles.button,
      styleType === 'operator' && styles.operatorButton,
      styleType === 'action' && styles.actionButton,
    ];
    const textStyles = [
      styles.buttonText,
      styleType === 'operator' && styles.operatorText,
      styleType === 'action' && styles.actionText,
    ];
    
    return (
      <TouchableOpacity style={buttonStyles} onPress={onPress}>
        <ThemedText style={textStyles}>{text}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.displayContainer}>
          <ThemedText style={styles.expressionText} numberOfLines={1}>{expression}</ThemedText>
          <ThemedText style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{display}</ThemedText>
        </View>

        <View style={styles.keypad}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.actionButton, { flex: 3 }]} onPress={clear}>
              <ThemedText style={styles.actionText}>AC</ThemedText>
            </TouchableOpacity>
            {renderButton('÷', () => handleOperator('/'), 'operator')}
          </View>
          
          <View style={styles.row}>
            {renderButton('7', () => handleNumber('7'))}
            {renderButton('8', () => handleNumber('8'))}
            {renderButton('9', () => handleNumber('9'))}
            {renderButton('×', () => handleOperator('*'), 'operator')}
          </View>

          <View style={styles.row}>
            {renderButton('4', () => handleNumber('4'))}
            {renderButton('5', () => handleNumber('5'))}
            {renderButton('6', () => handleNumber('6'))}
            {renderButton('−', () => handleOperator('-'), 'operator')}
          </View>

          <View style={styles.row}>
            {renderButton('1', () => handleNumber('1'))}
            {renderButton('2', () => handleNumber('2'))}
            {renderButton('3', () => handleNumber('3'))}
            {renderButton('+', () => handleOperator('+'), 'operator')}
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { flex: 2 }]} onPress={() => handleNumber('0')}>
              <ThemedText style={styles.buttonText}>0</ThemedText>
            </TouchableOpacity>
            {renderButton('.', () => handleNumber('.'))}
            {renderButton('=', calculate, 'action')}
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  safeArea: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  displayContainer: { padding: 16, alignItems: 'flex-end', marginBottom: 20 },
  expressionText: { color: '#a1a1aa', fontSize: 24, minHeight: 30 },
  displayText: { color: '#fff', fontSize: 64, fontWeight: 'bold' },
  keypad: { gap: 12 },
  row: { flexDirection: 'row', gap: 12, height: 72 },
  button: { flex: 1, backgroundColor: '#27272a', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 28, fontWeight: '500' },
  operatorButton: { backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a' },
  operatorText: { color: '#60a5fa', fontSize: 32 },
  actionButton: { backgroundColor: '#2563eb' },
  actionText: { color: '#fff', fontSize: 28, fontWeight: 'bold' }
});
