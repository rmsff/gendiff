import yaml from 'js-yaml';

export default (file, pathExtname) => {
  const parserSelection = {
    '.json': f => JSON.parse(f),
    '.yml': f => yaml.safeLoad(f),
  };

  return parserSelection[pathExtname](file);
};
