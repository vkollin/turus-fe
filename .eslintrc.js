module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true,
    },
    "globals": {
        "page": true,
        "browser": true,
        "context": true,
        "jestPuppeteer": true,
        "Scenario": true,
        "Feature": true,
        "Data": true,
        "DataTable": true,
        "Helper": true,
        "codecept_helper": true,
        "actor": true,
        "within": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "google",
        "plugin:react-hooks/recommended",
    ],
    "plugins": [
        "react",
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        },
        "babelOptions": {
            "configFile": "./.babelrc.js",
        },
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    "overrides": [
        {
            "files": [
                "*.ts",
                "*.tsx",
            ],
            "parser": "@typescript-eslint/parser",
            "plugins": [
                "@typescript-eslint",
            ],
            "extends": [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
            ],
            "rules": {
                "@typescript-eslint/explicit-function-return-type": [
                    "error",
                ],
                "@typescript-eslint/explicit-module-boundary-types": [
                    "error",
                ],
                "no-extra-semi": "off",
                "valid-jsdoc": "off",
                "semi": "off",
                "@typescript-eslint/semi": [
                    "error",
                ],
                "react/react-in-jsx-scope": "off",
                "@typescript-eslint/no-extra-semi": "off",
                "@typescript-eslint/member-delimiter-style": [
                    "error",
                    {
                        "multiline": {
                            "delimiter": "comma",
                            "requireLast": true,
                        },
                        "singleline": {
                            "delimiter": "comma",
                            "requireLast": false,
                        },
                    },
                ],
            },
        },
    ],
    "rules": {
        "indent": [
            "error",
            4,
            {
                "ignoredNodes": [
                    "JSXElement *",
                    "JSXElement",
                ],
                "SwitchCase": 1,
            },
        ],
        "operator-linebreak": [
            2,
            "before",
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": "off",
        "semi": [
            "error",
            "always",
        ],
        "max-len": 0,
        "require-jsdoc": 0,
        "no-invalid-this": 0,
        "no-prototype-builtins": 0,
        "arrow-parens": 0,
        "new-cap": 0,
        "react/prop-types": 1,
        "react/no-unused-prop-types": 1,
        "react/jsx-uses-vars": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-tag-spacing": [
            "error",
            {
                "beforeSelfClosing": "always",
            },
        ],
    },
};
