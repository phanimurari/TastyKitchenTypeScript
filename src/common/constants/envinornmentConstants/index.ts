const envVariables = process.env;

const config: any = {};

Object.keys(envVariables).forEach((variable) => {
  if (variable.includes("REACT_APP")) {
    console.log("React App");

    const envKey = variable.replace("REACT_APP_", "");
    config[envKey] = envVariables[variable];
  }
});

export default config;
