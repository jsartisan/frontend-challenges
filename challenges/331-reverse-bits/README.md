Given a 32-bit unsigned integer, reverse its bits and return the resulting number.

Rules:
- Input is a 32-bit unsigned integer
- Must reverse all bits (including leading zeros)
- Return the decimal value of reversed bits

**Examples:**
```typescript
// Example 1:
console.log(reverseBits(0b00000000000000000000000000010101));
// Output: 2818572288
// Explanation: 
// Input:  00000000000000000000000000010101
// Output: 10101000000000000000000000000000
// (decimal representation: 2818572288)

// Note: In JavaScript, you'll receive and return regular numbers,
// but they represent 32-bit unsigned integers
```

Note: JavaScript doesn't have native unsigned integers, but for this problem:
- Input will be a valid 32-bit unsigned integer
- Output should be treated as unsigned 32-bit integer
