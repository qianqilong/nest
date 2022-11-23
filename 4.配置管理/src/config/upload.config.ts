import { registerAs } from '@nestjs/config'

export default registerAs('upload', () => ({
  exts: 'jpeg,png,gif',
}))
/**
 * 这样写相当于在内置confModule中的服务提供者进行提供命名
 * providers: [{
 * provide:'xxx.key',
 * useValue:{
 * xxxx:xxxxx
 * }
 * }], // 提供服务
 */
