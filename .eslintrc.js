module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'node': true,
        'jest': true
    },
    'extends': ['airbnb'],
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'globals': {
        'adguard': true,
        'chrome': true,
        'browser': true,
        'page': true,
        'context': true,
        'jestPuppeteer': true
    },
    'rules': {
        'import/no-extraneous-dependencies': 0,
        'import/no-cycle': 'off',
        'for-direction': 'error',
        'no-const-assign': 'error',
        'no-dupe-args': 'error',
        'no-dupe-else-if': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-prototype-builtins': 'off',
        'no-self-compare': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        'use-isnan': 'error',
        'arrow-body-style': 'off',
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'default-case-last': 'error',
        'dot-notation': 'off',
        'eqeqeq': [
            'error',
            'smart'
        ],
        'func-names': [
            'error',
            'never',
            {
                'generators': 'as-needed'
            }
        ],
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-extra-boolean-cast': 'error',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-underscore-dangle': 'off',
        'no-unneeded-ternary': 'error',
        'no-unused-labels': 'error',
        'no-useless-escape': 'off',
        'no-void': 'off',
        // Prefer destructuring from arrays and objects
        // https://eslint.org/docs/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                'VariableDeclarator': {
                    'array': false,
                    'object': true
                },
                'AssignmentExpression': {
                    'array': true,
                    'object': false
                }
            },
            {
                'enforceForRenamedProperties': false
            }
        ],
        'strict': 'off',
        'yoda': [
            'error',
            'never'
        ],
        'arrow-parens': 'off',
        'brace-style': [
            'error',
            'stroustrup',
            {
                'allowSingleLine': true
            }
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'never',
                'objects': 'never',
                'imports': 'never',
                'exports': 'never',
                'functions': 'never'
            }
        ],
        'eol-last': ['error', 'never'],
        'function-paren-newline': 'off',
        'indent': [
            'error',
            4,
            {
                'ignoredNodes': [
                    'FunctionExpression > .params[decorators.length != 0]',
                    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                    'ClassBody.body > PropertyDefinition[decorators.length != 0] > .key'
                ],
                'SwitchCase': 1,
                'ignoreComments': false
            }
        ],
        'react/jsx-indent': [
            'error',
            4
        ],
        'react/jsx-indent-props': [
            'error',
            4
        ],
        'jsx-quotes': ['warn', 'prefer-single'],
        'linebreak-style': ['error', 'unix'],
        'max-len': [
            'error',
            {
                // https://developers.google.com/closure/compiler/faq#linefeeds
                // Recommended 120 if using tabs as indentation
                'code': 500,
                'tabWidth': 4
            }
        ],
        'no-extra-semi': 'error',
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'quote-props': 'off',
        'quotes': [
            'warn',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'semi': [
            'error',
            'always',
            {
                'omitLastInOneLineBlock': true,
                'omitLastInOneLineClassBody': true
            }
        ],
        'wrap-iife': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off'
    }
};