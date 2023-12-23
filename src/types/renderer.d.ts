export interface IElectronAPI {
  versions: () => Promise<unknown>;
}

declare global {
  interface Window {
    browserWindow: IElectronAPI;
  }
}
