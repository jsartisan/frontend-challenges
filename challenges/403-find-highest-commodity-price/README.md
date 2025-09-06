You are given a list of commodity price records, where each record contains:

* `commodity` (string) → name of the commodity
* `price` (number) → price of the commodity
* `timestamp` (number) → UNIX timestamp when the price was recorded

Your task is to implement a function that finds the **highest price of a given commodity up to a specified timestamp**.

### Example

```javascript
const records = [
  { commodity: "gold", price: 100, timestamp: 1 },
  { commodity: "gold", price: 120, timestamp: 3 },
  { commodity: "silver", price: 50, timestamp: 2 },
  { commodity: "gold", price: 90, timestamp: 5 },
];

findHighestPrice(records, "gold", 3);
// Expected output: 120

findHighestPrice(records, "gold", 1);
// Expected output: 100

findHighestPrice(records, "silver", 3);
// Expected output: 50

findHighestPrice(records, "silver", 1);
// Expected output: null (no records available before timestamp 1)
```

### Requirements

* If no record exists for the commodity before or at the given timestamp, return `null`.
* The function should handle multiple commodities.
* Timestamps are guaranteed to be positive integers.
* Records may not be sorted by timestamp.
