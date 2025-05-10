function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function parseData(data) {
  const numbers = [];
  const alphabets = [];
  const lowercaseLetters = [];

  for (let item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) lowercaseLetters.push(Number(item));
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) lowercaseLetters.push(item);
    }
  }

  const highestLower = lowercaseLetters
    .filter((ch) => typeof ch === 'string')
    .sort()
    .slice(-1);

  return {
    numbers,
    alphabets,
    highestLower,
    hasPrime: numbers.some((n) => isPrime(Number(n)))
  };
}

export async function validateFile(base64) {
  if (!base64 || typeof base64 !== 'string') {
    return { isValid: false };
  }

  try {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return { isValid: false };
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const sizeKB = Math.round((buffer.length / 1024) * 100) / 100;

    return { isValid: true, mimeType, sizeKB };
  } catch (err) {
    return { isValid: false };
  }
}
