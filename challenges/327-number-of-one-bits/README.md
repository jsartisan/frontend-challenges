Given an unsigned integer `n`, return the number of '1' bits in its binary representation (also known as Hamming weight).

Rules:
- Input is a non-negative integer
- Input fits within 32 bits
- Count only the '1' bits in binary representation

**Examples:**
```typescript
// Example 1:
console.log(hammingWeight(0b00000000000000000000000000010111));
// Output: 4
// Explanation: Binary has four 1's

// Example 2:
console.log(hammingWeight(0b01111111111111111111111111111101));
// Output: 30
// Explanation: Binary has thirty 1's
```

Note: In TypeScript/JavaScript, you can write binary literals with the `0b` prefix, but the function will receive a regular number.
