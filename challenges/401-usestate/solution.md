1. **On first render**

   * `count = 0`
   * Console shows: **0**
   * Button shows: **`0 Count`**

2. **Click the button (1st time)**

   * React sees two updates:

     * `setCount(count + 1)` → wants to set `count = 1`
     * `setCount(count + 2)` → wants to set `count = 2`
   * React batches updates → the **last one wins** (`count = 2`)
   * Console shows: **2**
   * Button shows: **`2 Count`**

3. **Click the button (2nd time)**

   * Now `count = 2`
   * Updates:

     * `setCount(count + 1)` → `count = 3`
     * `setCount(count + 2)` → `count = 4` (last one wins)
   * Console shows: **4**
   * Button shows: **`4 Count`**

### Final console output sequence

```
0   // initial render
2   // after first click
4   // after second click
6   // after third click
... and so on
```
