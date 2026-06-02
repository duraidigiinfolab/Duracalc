export function evaluateBasicMath(expression: string): string {
  try {
    // Sanitize to allow numbers, operators, decimals, brackets, and percent
    const sanitized = expression.replace(/[^0-9+\-*/.()%]/g, '');
    
    // Check if empty or ends with an operator (allow ending with % or ))
    if (!sanitized || /[+\-*/.]$/.test(sanitized)) {
      return expression; 
    }

    // Preprocess percentages: replace "X%" with "(X/100)"
    const preprocessed = sanitized.replace(/([0-9.]+)(%)/g, '($1/100)');

    // Safely evaluate the sanitized math expression
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${preprocessed}`)();
    
    // Handle edge cases like division by zero or NaN
    if (result === undefined || result === null || !isFinite(result) || isNaN(result)) {
      return "Error";
    }

    // Format to avoid floating point precision issues (e.g., 0.1 + 0.2 = 0.3)
    return parseFloat(result.toFixed(10)).toString();
  } catch (error) {
    return "Error";
  }
}
