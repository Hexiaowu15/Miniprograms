// 直接导出所有工具函数
export * from "./utils";

// 同时保留原有的命名空间导出方式
import * as utilsFunctions from "./utils";
export const utils = utilsFunctions;