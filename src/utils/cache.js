class LocalCache {
    setKey(namespace, key, value) {
      let saveKey = namespace + '.' + key;
      let saveValue = typeof value === 'string' ? value : JSON.stringify(value);
  
      localStorage.setItem(saveKey, saveValue);
    }
  
    getKey(namespace, key, defaultValue) {
      let saveKey = namespace + '.' + key;
      let ret = localStorage.getItem(saveKey);
      console.log(ret)
      if (ret === null ||ret==='') {
        this.setKey(namespace, key, defaultValue);
        return defaultValue;
      }
      try {
        return JSON.parse(ret);
      } catch (e) {
        return ret;
      }
    }
  }
  
  export { LocalCache };
  