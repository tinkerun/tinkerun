module.exports = {
  extends: [
    'billyct',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: '16.14',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
}
