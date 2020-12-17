let list = [17,1,3,16,19,0]
let map = new Map()

list.forEach((n, i) => map.set(n, i + 1));
let current = 0
for (let i = list.length + 1; i < 30000000; i++) {
    if (map.has(current)) {
        const lastTurnSeen = map.get(current)
        map.set(current, i);
        current = i - lastTurnSeen;
    } else {
        map.set(current, i)
        current = 0
    }

}
console.log(current)
