import _ from "lodash";

export const useLocalStorage = () => {
  const set = (key: string, value: any = {}) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const get = (key: string, type: string = "{}", chain: string = "", fallback?: any) => {
    const value = JSON.parse(localStorage.getItem(key) || type);

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "object") {
      return _.get(value, chain, fallback || "");
    }

    return value;
  };

  return {
    set,
    get,
  };
};
