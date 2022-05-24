// module.exports = {
//     setupFilesAfterEnv: ["./jest.setup.js"],
//     moduleNameMapper: {
//         "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
//         // "react-i18next": "<rootDir>/tests/__mocks__/reacti18nextMock.js",
//     },
// }()
const esModules = ["uuid"].join("|")

module.exports = {
    setupFilesAfterEnv: [
        "./jest.setup.js",
        "@testing-library/jest-dom/extend-expect",
    ],
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    // roots: ["<rootDir>/src"],
    // roots: ["<rootDir>"],
    automock: false,

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest",
        // "^.+\\.tsx?$": "babel-jest",
    },

    testEnvironment: "jsdom",

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    // setupFilesAfterEnv: [
    //     // "@testing-library/react/cleanup-after-each",

    // ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
    // transformIgnorePatterns: [
    //     "/node_modules/(?!d3|d3-array|uuid|delaunator|robust-predicates)",
    // ],
    moduleNameMapper: {
        uuid: "<rootDir>/node_modules/uuid/dist/esm-browser/index.js",
    },
    // testRegex: "*.test.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}
