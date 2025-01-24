module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Asegúrate de tener esto si usas Prettier con ESLint
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // Desactiva la regla de JSX Scope
    'prettier/prettier': 'off', // Desactiva la regla de Prettier
  },
};
