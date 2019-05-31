import yaml from 'js-yaml';
import ini from 'ini';

export default (file, pathExtname) => {
  const parserSelection = {
    '.json': f => JSON.parse(f),
    '.yml': f => yaml.safeLoad(f),
    '.ini': f => ini.parse(f),
  };

  return parserSelection[pathExtname](file);
};
