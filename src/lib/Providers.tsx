'use client';
import { store } from '@/redux/store';
import { StyleProvider } from '@ant-design/cssinjs';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { Worker } from '@react-pdf-viewer/core';
import { ConfigProvider } from 'antd';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <StyleProvider hashPriority="high">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5371FF',
                  colorTextSecondary: '#5371FF',
                  // colorBgContainer: "#f6ffed",
                },
                components: {
                  Button: {
                    colorPrimary: '#5371FF',
                    // // algorithm: true,
                    // // colorBgContainer: "#5371FF",
                    // colorPrimaryBg: "#535BE5",
                    // defaultBg: '#5371FF'
                  },
                },
              }}
            >
              {children}
            </ConfigProvider>
          </StyleProvider>
        </Worker>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
