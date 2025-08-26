export const pipe = (value: any, ...fns: ((any) => any)[]) => fns.reduce((acc, fn) => fn(acc), value);
