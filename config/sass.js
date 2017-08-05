const nodeSass = require('node-sass');
const path = require('path');
const fs = require('fs');
const paths = require('./paths');

const types = nodeSass.types;

const base64encode = (string) => {
  const stringBuffer = Buffer.from(string.getValue());
  return types.String(stringBuffer.toString('base64'));
};

const inlineSVG = (source) => {
  const sourcePath = path.join(paths.appPath, 'public', 'static', 'media', source.getValue());
  let svg = '';
  try {
    svg = fs.readFileSync(sourcePath).toString();
  } catch (err) {
    console.error('Error inlining SVG file', err); /* eslint no-console: 0 */
  }
  const dataUrl = `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}')`;
  return types.String(dataUrl);
};

module.exports = {
  'base64encode($string)': base64encode,
  'inline-svg($source)': inlineSVG,
};
