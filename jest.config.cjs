module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
      }
};
