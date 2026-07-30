export function evaluateBasicMath(expression: string): string {
  try {
    // Sanitize to allow numbers, operators, decimals, brackets, percent, scientific functions and constants
    const sanitized = expression.replace(/[^0-9+\-*/.()%a-z^]/g, '');
    
    // Check if empty or ends with a generic operator (allow ending with %, ), pi, e)
    if (!sanitized || /[+\-*/.]$/.test(sanitized)) {
      return expression; 
    }

    // Preprocess percentages: replace "X%" with "(X/100)"
    let preprocessed = sanitized.replace(/([0-9.]+)(%)/g, '($1/100)');
    
    // Preprocess scientific functions and constants
    preprocessed = preprocessed
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**');

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
