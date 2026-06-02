export function evaluateBasicMath(expression: string): string {
  try {
    // Sanitize to only allow numbers, basic operators, and decimals
    const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
    
    // Check if empty or ends with operator
    if (!sanitized || /[+\-*/.]$/.test(sanitized)) {
      return expression; 
    }

    // Safely evaluate the sanitized math expression
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();
    
    // Handle edge cases like division by zero or NaN
    if (!isFinite(result) || isNaN(result)) {
      return "Error";
    }

    // Format to avoid floating point precision issues (e.g., 0.1 + 0.2 = 0.3)
    return parseFloat(result.toFixed(10)).toString();
  } catch (error) {
    return "Error";
  }
}
