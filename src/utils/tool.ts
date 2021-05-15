const genUid = () => {
  const s = [];
  const hexDigits = "0123456789abcdef";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
};

/**
 * localstorege简单处理
 */
const local = {
  set: (name, val) => {
    localStorage.setItem(name, JSON.stringify(val));
  },
  get: (name, defaultVal?) => {
    return JSON.parse(localStorage.getItem(name) || defaultVal);
  },
  clear: (name?) => {
    name ? localStorage.removeItem(name) : localStorage.clear();
  },
};

/**
 * 计算字符数量
 * @param list array
 * @returns
 */
const calcCharNum = (list: any[]) => {
  return (
    list?.reduce((ret, next) => {
      const c = next?.toString()?.chartAt?.(0) || 0;
      return c > 255 ? ret + 1 : ret + 2;
    }, 0) || 0
  );
};

export default { genUid, local, calcCharNum };
