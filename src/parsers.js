import yaml from 'js-yaml';
import ini from 'ini';

export default (data, pathExtname) => {
  const parserSelection = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parserSelection[pathExtname](data);
};
