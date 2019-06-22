import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extName) => {
  const parserSelection = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const result = parserSelection[extName];
  if (result) return result(data);
  throw new Error((`gendiff unsupported extension '${extName}'`));
};
