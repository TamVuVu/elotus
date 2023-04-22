import { ReactNode, createContext, useEffect, useState } from "react";

import { ChildrenProps, ImageConfig } from "../types";
import { ApiClient } from "../Api";
import { HTTP_METHODS, appendApiKey } from "../constant";

export const ConfigContext = createContext({
  imageConfig: {} as ImageConfig,
});

const ConfigProvider = ({ children }: ChildrenProps) => {
  let initialConfig = localStorage.getItem("APP_IMAGES_CONFIG") || "";
  if (initialConfig) {
    initialConfig = JSON.parse(initialConfig);
  }

  const [imageConfig, setImageConfig] = useState<ImageConfig | string>(
    initialConfig
  );

  useEffect(() => {
    if (initialConfig) {
      return;
    }
    const getConfig = async () => {
      const config = await ApiClient(
        HTTP_METHODS.GET,
        appendApiKey("/configuration")
      );

      localStorage.setItem("APP_IMAGES_CONFIG", JSON.stringify(config.images));
      setImageConfig(config.images);
    };
    getConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ imageConfig } as any}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
