module.exports = {
    'env': {
        'browser': true
    },
    'extends': [
        'plugin:react/recommended',
        'airbnb',
        'plugin:react-hooks/recommended',
        '../../../.eslintrc.js'
    ],
    'parserOptions': {
        'ecmaVersion': 7,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'react/jsx-filename-extension': [
            'warn',
            {
                'extensions': [
                    '.js',
                    '.jsx'
                ]
            }
        ],
        'func-names': [
            'error',
            'as-needed'
        ],
        'no-param-reassign': [
            'error',
            {
                'props': false
            }
        ]
    }
};