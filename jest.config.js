module.exports = {
    setupFilesAfterEnv: ["./jest.setup.ts"],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
        // "react-i18next": "<rootDir>/tests/__mocks__/reacti18nextMock.js",
    },
}
