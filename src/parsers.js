import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extName) => {
  const parserSelection = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  try {
    return parserSelection[extName](data);
  } catch {
    throw new Error(`gendiff unsupported extension '${extName}'`);
  }
};
